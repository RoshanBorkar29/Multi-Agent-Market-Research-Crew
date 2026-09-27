from langgraph.graph import StateGraph, START, END

from app.graph.state import ResearchState

from app.graph.nodes import (
    market_research_node,
    competitor_research_node,
    customer_research_node,
    product_agent_node,
    evidence_critic_node,
    business_analysis_node,
    research_planner_node
)

def evidence_router(state:ResearchState):
    report=state.get("evidence_report","")
    iterations=state.get("research_iterations",0)

    if iterations>=2:
        print(
            "\nMaximum research iterations reached."
        )

        return "business_analysis"


    report_text=str(report).lower()
    if "valid:true" in report_text:
           return "business_analysis"
    
    return "research"


def build_graph():

    graph = StateGraph(ResearchState)

    graph.add_node("research_planner",research_planner_node)
    # Add nodes
    graph.add_node(
        "market_research",
        market_research_node
    )

    graph.add_node(
        "competitor_research",
        competitor_research_node
    )

    graph.add_node(
        "customer_research",
        customer_research_node
    )

    graph.add_node(
        "product_strategy",
        product_agent_node
    )
    graph.add_node("evidence_critic",evidence_critic_node)
    graph.add_node("business_analysis",business_analysis_node)
    graph.add_edge(START,"research_planner")
    # Fan-out
    graph.add_edge(
        "research_planner",
        "market_research"
    )

    graph.add_edge(
        "research_planner",
        "competitor_research"
    )

    graph.add_edge(
        "research_planner",
        "customer_research"
    )
    graph.add_edge(
        "market_research",
        "product_strategy"
    )

    graph.add_edge(
        "competitor_research",
        "product_strategy"
    )

    graph.add_edge(
        "customer_research",
        "product_strategy"
    )

    graph.add_edge(
        "product_strategy",
        "evidence_critic"
    )
    graph.add_conditional_edges(
         "evidence_critic",
         evidence_router,{
             "business_analysis": "business_analysis",
            "research": "market_research", 
         }
    )
    graph.add_edge(
        "business_analysis",
        END
    )

    return graph.compile()