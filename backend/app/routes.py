import logging
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.graph.graph import build_graph
from app.schemas.api import ResearchRequest, ResearchResponse, ChatRequest, ChatResponse
from app.schemas.research import ResearchPlan
from app.db.database import get_db
from app.db.models import Report
from app.services.rag_service import index_report_for_rag, answer_report_question
from app.services.embeddings import get_embeddings_model

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["research"])

# Initialize compiled research graph once at module startup
research_graph = build_graph()


@router.post(
    "/research",
    response_model=ResearchResponse,
    status_code=status.HTTP_200_OK,
    summary="Execute multi-agent market research and save report",
)
async def conduct_research(
    request: ResearchRequest,
    db: Optional[AsyncSession] = Depends(get_db)
) -> ResearchResponse:
    """Execute the multi-agent market research pipeline for a given idea and target market."""
    initial_state = {
        "idea": request.idea.strip(),
        "target_market": request.target_market.strip(),
        "research_plan": ResearchPlan(),
        "market_report": None,
        "competitor_report": None,
        "customer_report": None,
        "product_strategy": None,
        "evidence_report": None,
        "business_analysis": None,
        "sources": [],
        "research_iterations": 0,
    }

    try:
        result = research_graph.invoke(initial_state)
    except Exception as e:
        logger.exception("Error executing research pipeline: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Research pipeline failed",
        ) from e

    # Persist report and index in pgvector if DB is available
    report_id_str = None
    if db is not None:
        try:
            market_dict = (
                result.get("market_report").model_dump()
                if hasattr(result.get("market_report"), "model_dump")
                else result.get("market_report")
            )
            comp_dict = (
                result.get("competitor_report").model_dump()
                if hasattr(result.get("competitor_report"), "model_dump")
                else result.get("competitor_report")
            )
            cust_dict = (
                result.get("customer_report").model_dump()
                if hasattr(result.get("customer_report"), "model_dump")
                else result.get("customer_report")
            )
            strat_dict = (
                result.get("product_strategy").model_dump()
                if hasattr(result.get("product_strategy"), "model_dump")
                else result.get("product_strategy")
            )
            plan_dict = (
                result.get("research_plan").model_dump()
                if hasattr(result.get("research_plan"), "model_dump")
                else result.get("research_plan")
            )

            report_record = Report(
                idea=result.get("idea", request.idea.strip()),
                target_market=result.get("target_market", request.target_market.strip()),
                market_report=market_dict,
                competitor_report=comp_dict,
                customer_report=cust_dict,
                product_strategy=strat_dict,
                research_plan=plan_dict,
                sources=result.get("sources", []),
            )
            db.add(report_record)
            await db.commit()
            await db.refresh(report_record)
            report_id_str = str(report_record.id)

            # Generate embeddings and store chunks for RAG
            embeddings_model = get_embeddings_model()
            await index_report_for_rag(db, report_record, embeddings_model)
            logger.info(f"Report {report_id_str} saved and indexed successfully.")
        except Exception as db_err:
            logger.warning(f"Failed to persist/index report to database: {db_err}")

    return ResearchResponse(
        id=report_id_str,
        idea=result.get("idea", request.idea.strip()),
        target_market=result.get("target_market", request.target_market.strip()),
        research_plan=result.get("research_plan", ResearchPlan()),
        market_report=result.get("market_report"),
        competitor_report=result.get("competitor_report"),
        customer_report=result.get("customer_report"),
        product_strategy=result.get("product_strategy"),
        sources=result.get("sources", []),
    )


@router.post(
    "/reports/{report_id}/chat",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Chat with a market research report using RAG",
)
async def chat_with_report(
    report_id: str,
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
) -> ChatResponse:
    """Answers questions regarding a specific market research report using pgvector RAG."""
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection is not available."
        )

    embeddings_model = get_embeddings_model()
    try:
        rag_result = await answer_report_question(
            session=db,
            report_id=report_id,
            question=request.question,
            embeddings_model=embeddings_model
        )
        return ChatResponse(
            answer=rag_result["answer"],
            sources=rag_result.get("sources", [])
        )
    except Exception as e:
        logger.exception("Error in RAG chat: %s", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate answer: {str(e)}"
        )


@router.get(
    "/reports",
    summary="List all past research reports",
)
async def list_reports(db: AsyncSession = Depends(get_db)):
    """Fetches a list of all saved research reports."""
    if db is None:
        return []

    stmt = select(Report).order_by(desc(Report.created_at))
    result = await db.execute(stmt)
    reports = result.scalars().all()
    return [
        {
            "id": str(r.id),
            "idea": r.idea,
            "target_market": r.target_market,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in reports
    ]


@router.get(
    "/reports/{report_id}",
    summary="Get a specific research report by ID",
)
async def get_report(report_id: str, db: AsyncSession = Depends(get_db)):
    """Fetches full details of a specific report."""
    if db is None:
        raise HTTPException(status_code=503, detail="Database is not available")

    stmt = select(Report).where(Report.id == report_id)
    result = await db.execute(stmt)
    report = result.scalar_one_or_none()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return {
        "id": str(report.id),
        "idea": report.idea,
        "target_market": report.target_market,
        "research_plan": report.research_plan,
        "market_report": report.market_report,
        "competitor_report": report.competitor_report,
        "customer_report": report.customer_report,
        "product_strategy": report.product_strategy,
        "sources": report.sources,
        "created_at": report.created_at.isoformat() if report.created_at else None,
    }
