import logging
from fastapi import APIRouter, HTTPException, status

from app.graph.graph import build_graph
from app.schemas.api import ResearchRequest, ResearchResponse
from app.schemas.research import ResearchPlan

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["research"])

# Initialize compiled research graph once at module startup
research_graph = build_graph()


@router.post(
    "/research",
    response_model=ResearchResponse,
    status_code=status.HTTP_200_OK,
    summary="Execute multi-agent market research",
)
async def conduct_research(request: ResearchRequest) -> ResearchResponse:
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

    return ResearchResponse(
        idea=result.get("idea", request.idea.strip()),
        target_market=result.get("target_market", request.target_market.strip()),
        research_plan=result.get("research_plan", ResearchPlan()),
        market_report=result.get("market_report"),
        competitor_report=result.get("competitor_report"),
        customer_report=result.get("customer_report"),
        product_strategy=result.get("product_strategy"),
        sources=result.get("sources", []),
    )
