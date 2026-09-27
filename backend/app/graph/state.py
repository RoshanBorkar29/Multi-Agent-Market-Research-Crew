from typing import TypedDict, Annotated
import operator

from app.schemas.reports import (
    MarketReport,
    CompetitorReport,
    CustomerReport,
    ProductStrategy,
    EvidenceReport,
    BusinessAnalysis,
)

from app.schemas.research import ResearchPlan


class ResearchState(TypedDict):

    idea: str
    target_market: str

    research_plan: ResearchPlan

    market_report: MarketReport | None
    competitor_report: CompetitorReport | None
    customer_report: CustomerReport | None

    product_strategy: ProductStrategy | None
    evidence_report: EvidenceReport | None
    business_analysis: BusinessAnalysis | None

    sources: Annotated[
        list[dict],
        operator.add
    ]

    research_iterations: int