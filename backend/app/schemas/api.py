from pydantic import BaseModel, Field, field_validator

from app.schemas.reports import (
    MarketReport,
    CompetitorReport,
    CustomerReport,
    ProductStrategy,
)
from app.schemas.research import ResearchPlan


class ResearchRequest(BaseModel):
    idea: str = Field(..., max_length=500, description="The business or product idea to research")
    target_market: str = Field(..., max_length=500, description="The target market or geography")

    @field_validator("idea", "target_market")
    @classmethod
    def validate_non_empty(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Field cannot be empty or contain only whitespace")
        return stripped


class ResearchResponse(BaseModel):
    idea: str
    target_market: str
    research_plan: ResearchPlan
    market_report: MarketReport | None = None
    competitor_report: CompetitorReport | None = None
    customer_report: CustomerReport | None = None
    product_strategy: ProductStrategy | None = None
    sources: list[dict] = []
