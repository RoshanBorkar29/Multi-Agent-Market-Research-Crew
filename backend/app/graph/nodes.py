from app.agents.market_agent import market_research_agent
from app.graph.state import ResearchState

def market_research_node(state:ResearchState):
    try:
        report=market_research_agent(
            state["idea"],
            state["target_market"]
        )
        return{
            "market_report":{
                "content":report
            },
            "errors":[]
        }
    except Exception as e:
        return{
            "market_report":{},
            "errors":[str(e)]ok so inba
        }
