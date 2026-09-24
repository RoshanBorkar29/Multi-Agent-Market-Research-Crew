from typing import TypedDict,Any
from app.schemas.reports import (
    MarketReport,
    CompetitorReport,
    CustomerReport,
    ProductStrategy,
    EvidenceReport,
    BusinessAnalysis,
)

class ResearchState(TypedDict):
    idea:str
    target_market:str
    research_plan:list[str]

    market_report:MarketReport|None
    competitor_report:CompetitorReport|None
    customer_report:CustomerReport|None

    product_strategy:ProductStrategy|None
    evidence_report: EvidenceReport|None
    evidence_valid: bool

    unsupported_claims: list[str]
    business_analysis: BusinessAnalysis|None
    sources: list[dict[str, Any]]   

    current_agent: str
    errors: list[str]
 
    research_iterations: int 
    final_report: dict[str, Any]