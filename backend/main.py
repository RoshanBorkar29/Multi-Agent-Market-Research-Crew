from app.graph.graph import build_graph


def main():

    graph = build_graph()

    initial_state = {
        "idea": "AI-powered resume screening platform",
        "target_market": "India",

        "research_plan": [],

        "market_report": {},
        "competitor_report": {},
        "customer_report": {},

        "product_strategy": {},

        "evidence_report": {},
        "evidence_valid": False,
        "unsupported_claims": [],

        "business_analysis": {},

        "sources": [],
        "current_agent": "",
        "errors": [],

        "research_iterations": 0,

        "final_report": {}
    }

    result = graph.invoke(initial_state)

    print("\n" + "=" * 60)
    print("MARKET RESEARCH")
    print("=" * 60)

    print(result["market_report"])

    print("\n" + "=" * 60)
    print("COMPETITOR RESEARCH")
    print("=" * 60)

    print(result["competitor_report"])

    print("\n" + "=" * 60)
    print("CUSTOMER RESEARCH")
    print("=" * 60)

    print(result["customer_report"])

    print("\n" + "=" * 60)
    print("PRODUCT STRATEGY")
    print("=" * 60)

    print(result["product_strategy"])

    print("\n" + "=" * 60)
    print("SOURCES")
    print("=" * 60)

    for source in result["sources"]:
        print(source)

    if result["errors"]:

        print("\n" + "=" * 60)
        print("ERRORS")
        print("=" * 60)

        for error in result["errors"]:
            print(error)


if __name__ == "__main__":
    main()