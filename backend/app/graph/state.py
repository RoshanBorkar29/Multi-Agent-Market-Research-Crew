from typing import TypedDict, Any, Annotated
import operator


class ResearchState(TypedDict):

    # Input
    idea: str
    target_market: str

    # Planner
    research_plan: list[str]

    # Research reports
    market_report: dict[str, Any]
    competitor_report: dict[str, Any]
    customer_report: dict[str, Any]

    # Strategy
    product_strategy: dict[str, Any]

    # Evidence
    evidence_report: dict[str, Any]
    evidence_valid: bool
    unsupported_claims: list[str]

    # Business analysis
    business_analysis: dict[str, Any]

    # Shared research sources
    sources: Annotated[
        list[dict[str, Any]],
        operator.add
    ]

    # Execution tracking
    current_agent: str
    errors: Annotated[
        list[str],
        operator.add
    ]

    research_iterations: int

    # Final output
    final_report: dict[str, Any]