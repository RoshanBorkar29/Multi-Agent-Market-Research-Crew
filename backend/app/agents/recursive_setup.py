import json
import os
import re
from typing import Any, Type, TypeVar

from dotenv import load_dotenv
from langchain_core.output_parsers import PydanticOutputParser
from langchain_groq import ChatGroq
from pydantic import BaseModel

from app.schemas.reports import (
    MarketReport,
    CompetitorReport,
    CustomerReport,
    ProductStrategy,
)
from app.schemas.research import ResearchPlan

load_dotenv()

T = TypeVar("T", bound=BaseModel)


class StructuredRunner:
    """Invokes LLM with Pydantic output formatting and robust JSON parsing."""

    def __init__(self, pydantic_cls: Type[T], chat_llm: ChatGroq):
        self.pydantic_cls = pydantic_cls
        self.llm = chat_llm
        self.parser = PydanticOutputParser(pydantic_object=pydantic_cls)

    def invoke(self, prompt: str) -> T:
        instructions = self.parser.get_format_instructions()
        full_prompt = f"{prompt}\n\n{instructions}"
        raw_response = self.llm.invoke(full_prompt)
        content = raw_response.content if hasattr(raw_response, "content") else str(raw_response)

        # Strip reasoning/think tags if present
        content = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL).strip()

        try:
            return self.parser.parse(content)
        except Exception:
            # Fallback: extract JSON object from text
            match = re.search(r"(\{.*\})", content, re.DOTALL)
            if match:
                data = json.loads(match.group(1))
                if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
                    data = data[0]
                return self.pydantic_cls.model_validate(data)
            raise


llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
    reasoning_effort="low",
    max_tokens=2000,
    max_retries=5,
)

market_llm = StructuredRunner(MarketReport, llm)
competitor_llm = StructuredRunner(CompetitorReport, llm)
customer_llm = StructuredRunner(CustomerReport, llm)
product_llm = StructuredRunner(ProductStrategy, llm)
planner_llm = StructuredRunner(ResearchPlan, llm)