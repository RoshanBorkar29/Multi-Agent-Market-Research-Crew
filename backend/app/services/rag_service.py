import os
import uuid
import logging
from typing import List, Dict, Any, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from app.db.models import Report, ReportEmbedding

logger = logging.getLogger(__name__)

# Text splitter for chunking report sections
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=600,
    chunk_overlap=80,
    separators=["\n\n", "\n", ". ", " ", ""]
)


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Computes cosine similarity between two vector lists."""
    dot = sum(a * b for a, b in zip(vec1, vec2))
    norm_a = sum(a * a for a in vec1) ** 0.5
    norm_b = sum(b * b for b in vec2) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


async def index_report_for_rag(
    session: AsyncSession,
    report: Report,
    embeddings_model
) -> int:
    """
    Splits report sections into text chunks, generates vector embeddings,
    and stores them in the report_embeddings table.
    """
    sections: Dict[str, Any] = {
        "market": report.market_report,
        "competitor": report.competitor_report,
        "customer": report.customer_report,
        "product_strategy": report.product_strategy,
    }

    total_chunks_indexed = 0

    for section_name, section_data in sections.items():
        if not section_data:
            continue

        # Convert structured dictionary/model or string to text
        if isinstance(section_data, dict):
            text = "\n".join([f"{k.replace('_', ' ').title()}: {v}" for k, v in section_data.items() if v])
        else:
            text = str(section_data)

        chunks = text_splitter.split_text(text)
        if not chunks:
            continue

        # Batch embed all chunks for this section
        if hasattr(embeddings_model, "aembed_documents"):
            vectors = await embeddings_model.aembed_documents(chunks)
        elif hasattr(embeddings_model, "embed_documents"):
            vectors = embeddings_model.embed_documents(chunks)
        else:
            vectors = [embeddings_model.embed_query(chunk) for chunk in chunks]

        for chunk, vector in zip(chunks, vectors):
            record = ReportEmbedding(
                report_id=report.id,
                section=section_name,
                content=chunk,
                embedding=[float(v) for v in vector]
            )
            session.add(record)
            total_chunks_indexed += 1

    await session.commit()
    logger.info(f"Indexed {total_chunks_indexed} chunks for report {report.id}")
    return total_chunks_indexed


async def retrieve_relevant_chunks(
    session: AsyncSession,
    report_id: str,
    query: str,
    embeddings_model,
    top_k: int = 4
) -> List[Dict[str, Any]]:
    """
    Generates query embedding and retrieves the top_k most similar chunks using cosine similarity.
    """
    if hasattr(embeddings_model, "aembed_query"):
        query_vector = await embeddings_model.aembed_query(query)
    else:
        query_vector = embeddings_model.embed_query(query)

    query_vector = [float(v) for v in query_vector]

    # Convert string report_id to UUID if needed
    try:
        report_uuid = uuid.UUID(str(report_id))
    except Exception:
        report_uuid = report_id

    stmt = select(ReportEmbedding).where(ReportEmbedding.report_id == report_uuid)
    result = await session.execute(stmt)
    records = result.scalars().all()

    if not records:
        return []

    scored_records = []
    for rec in records:
        sim = cosine_similarity(query_vector, rec.embedding)
        scored_records.append({
            "content": rec.content,
            "section": rec.section,
            "similarity_score": round(sim, 4)
        })

    # Sort descending by similarity
    scored_records.sort(key=lambda x: x["similarity_score"], reverse=True)
    return scored_records[:top_k]


async def answer_report_question(
    session: AsyncSession,
    report_id: str,
    question: str,
    embeddings_model,
    groq_api_key: Optional[str] = None
) -> Dict[str, Any]:
    """
    RAG pipeline:
    1. Retrieve relevant chunks.
    2. Synthesize an answer with Groq LLM.
    """
    chunks = await retrieve_relevant_chunks(session, report_id, question, embeddings_model, top_k=4)

    if not chunks:
        return {
            "answer": "No indexed research found for this report. Please ensure the report has been processed and indexed.",
            "sources": []
        }

    # Format context with section markers
    context_text = "\n\n".join([
        f"[Section: {c['section'].upper()}]\n{c['content']}"
        for c in chunks
    ])

    prompt = ChatPromptTemplate.from_messages([
        ("system", (
            "You are a Senior Market Research Analyst assistant. Answer the user's question "
            "based strictly on the provided research report context below. "
            "If the context does not contain the answer, state that clearly rather than hallucinating. "
            "Format your answer cleanly with bullet points where appropriate.\n\n"
            "=== REPORT CONTEXT ===\n"
            "{context}"
        )),
        ("human", "{question}")
    ])

    llm = ChatGroq(
        model="openai/gpt-oss-120b",
        temperature=0.2,
        api_key=groq_api_key or os.getenv("GROQ_API_KEY")
    )

    chain = prompt | llm | StrOutputParser()
    answer = await chain.ainvoke({"context": context_text, "question": question})

    return {
        "answer": answer,
        "sources": chunks
    }