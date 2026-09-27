import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from app.schemas.reports import (
    MarketReport,
    CompetitorReport,
    CustomerReport,
)

load_dotenv()


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
    reasoning_effort="low",
    max_tokens=1500,
    max_retries=10,
)


market_llm = llm.with_structured_output(
    MarketReport,
    method="json_mode",
)

competitor_llm = llm.with_structured_output(
    CompetitorReport,
    method="json_mode",
)

customer_llm = llm.with_structured_output(
    CustomerReport,
    method="json_mode",
)