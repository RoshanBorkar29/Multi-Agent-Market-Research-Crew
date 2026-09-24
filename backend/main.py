from app.graph.graph import build_graph

def main():
    graph=build_graph()

    initial_state={
        "idea": "AI-powered resume screening platform",
        "target_market": "India",
    
    }
    result=graph.invoke(initial_state)
    print("\n"+"="*60)
    print("MARKET_RESEARCH_REPORT")
    print("="*60)

    print(result["market_report"]["content"])
    if result["errors"]:
        print("\nERRORS:")
        for error in result["errors"]:
            print(error)


if __name__ == "__main__":
    main()