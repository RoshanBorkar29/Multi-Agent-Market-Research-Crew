import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


def business_analyst_agent(
    market_report: dict,
    competitor_report: dict,
    customer_report: dict,
    product_strategy: dict,
    evidence_report: dict,
) -> dict:

    prompt = f"""
You are a senior business analyst.

Use the following research:

MARKET:
{market_report}

COMPETITORS:
{competitor_report}

CUSTOMERS:
{customer_report}

PRODUCT STRATEGY:
{product_strategy}

EVIDENCE AUDIT:
{evidence_report}

Create a final business analysis covering:

1. Business opportunity
2. Revenue model possibilities
3. Go-to-market considerations
4. Business risks
5. Strategic recommendations

Only use information supported by the research.
Clearly identify assumptions.
"""

    response = llm.invoke(prompt)

    return {
        "report": response.content
    }