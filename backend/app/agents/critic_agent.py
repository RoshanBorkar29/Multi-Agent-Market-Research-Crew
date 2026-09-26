import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


def evidence_critic_agent(
    market_report: dict,
    competitor_report: dict,
    customer_report: dict,
    product_strategy: dict,
    sources: list[dict],
) -> dict:

    prompt = f"""
You are an Evidence Critic and Research Quality Auditor.

Your job is to verify whether the proposed product strategy
is adequately supported by the research evidence.

MARKET RESEARCH:
{market_report}

COMPETITOR RESEARCH:
{competitor_report}

CUSTOMER RESEARCH:
{customer_report}

PRODUCT STRATEGY:
{product_strategy}

AVAILABLE SOURCES:
{sources}

Evaluate the research carefully.

Check:

1. Are important claims supported by evidence?
2. Are there unsupported claims?
3. Are there contradictions between sources?
4. Are the sources relevant to the claims?
5. Are important statistics or market claims missing evidence?
6. Is the product strategy actually supported by the research?
7. Are there important research gaps?

Return the following structure:

VALID:
true or false

VALIDATED_CLAIMS:
- claim 1
- claim 2

UNSUPPORTED_CLAIMS:
- claim 1
- claim 2

CONTRADICTORY_CLAIMS:
- claim 1

SOURCE_QUALITY_ISSUES:
- issue 1

RESEARCH_GAPS:
- gap 1

RECOMMENDED_RESEARCH_AREA:
market / competitor / customer / multiple / none

OVERALL_ASSESSMENT:
short explanation

Important rules:

- Do not invent evidence.
- Do not treat assumptions as facts.
- Do not approve a claim merely because it sounds plausible.
- Be conservative when evidence is insufficient.
"""

    response = llm.invoke(prompt)

    return {
        "report": response.content
    }