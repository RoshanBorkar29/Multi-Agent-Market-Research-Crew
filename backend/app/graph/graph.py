from langgraph.graph import StateGraph ,START,END

from app.graph.state import ResearchState
from app.graph.nodes import market_research_node


def build_graph():
    graph=StateGraph(ResearchState)
    graph.add_node("Research_market",market_research_node)
    graph.add_edge(START,"Research_market")
    graph.add_edge("Research_market",END)

    return graph.compile()