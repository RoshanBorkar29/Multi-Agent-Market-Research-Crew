import sys
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from app.graph.graph import build_graph
from app.schemas.research import ResearchPlan


def main():

    graph = build_graph()

    initial_state = {
        "idea": "AI-powered resume screening platform",
        "target_market": "India",

        # Research Planner will populate this
        "research_plan": ResearchPlan(),

        # Research agents will populate these
        "market_report": None,
        "competitor_report": None,
        "customer_report": None,

        # Downstream agents will populate these
        "product_strategy": None,
        "evidence_report": None,
        "business_analysis": None,

        # Reducer will merge sources from
        # Market + Competitor + Customer
        "sources": [],

        "research_iterations": 0,
    }

    result = graph.invoke(initial_state)

    # --------------------------------------------------
    # RESEARCH PLAN
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("RESEARCH PLAN")
    print("=" * 60)

    print(result["research_plan"])

    # --------------------------------------------------
    # MARKET RESEARCH
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("MARKET RESEARCH")
    print("=" * 60)

    print(result["market_report"])

    # --------------------------------------------------
    # COMPETITOR RESEARCH
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("COMPETITOR RESEARCH")
    print("=" * 60)

    print(result["competitor_report"])

    # --------------------------------------------------
    # CUSTOMER RESEARCH
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("CUSTOMER RESEARCH")
    print("=" * 60)

    print(result["customer_report"])

    # --------------------------------------------------
    # PRODUCT STRATEGY
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("PRODUCT STRATEGY")
    print("=" * 60)

    print(result["product_strategy"])

    # --------------------------------------------------
    # EVIDENCE REPORT
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("EVIDENCE REPORT")
    print("=" * 60)

    print(result["evidence_report"])

    # --------------------------------------------------
    # BUSINESS ANALYSIS
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("BUSINESS ANALYSIS")
    print("=" * 60)

    print(result["business_analysis"])

    # --------------------------------------------------
    # SOURCES
    # --------------------------------------------------

    print("\n" + "=" * 60)
    print("SOURCES")
    print("=" * 60)

    for source in result["sources"]:
        print(source)


if __name__ == "__main__":
    main()