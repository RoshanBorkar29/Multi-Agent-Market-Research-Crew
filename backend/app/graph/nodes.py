from app.agents.market_agent import market_research_agent
from app.agents.competitor_agent import competitor_research_agent
from app.agents.customer_agent import customer_research_agent
from app.agents.product_agent import (
    product_strategy_agent
)
from app.agents.business_agent import (
    business_analyst_agent
)
from app.agents.critic_agent import (
    evidence_critic_agent
)
from app.graph.state import ResearchState


def market_research_node(state:ResearchState):
    try:
        result=market_research_agent(
            idea=state["idea"],
            target_market=state["target_market"]
        )
        return{
            "market_report":{
                "content":result["report"],
                "queries":result["queries"],

            },
            "sources":result["sources"],
            "current_agent":"market_research",
            "errors":[]
        }
    except Exception as e:
        return{
            "market_report":{},
            "current_agent": "market_research",
            "errors":[str(e)]
        }

def competitor_research_node(state: ResearchState):

    print("\n========== COMPETITOR NODE START ==========")

    result = competitor_research_agent(
        idea=state["idea"],
        target_market=state["target_market"]
    )

    print("\n========== COMPETITOR NODE END ==========")

    return {
        "competitor_report": result["report"],
        "sources": state.get("sources", []) + result["sources"],
        "current_agent": "competitor_research",
        "errors": []
    }

def customer_research_node(state:ResearchState):
    print("\n========== CUSTOMER NODE START ==========")

    result = customer_research_agent(
        idea=state["idea"],
        target_market=state["target_market"]
    )

    print("\n========== CUSTOMER NODE END ==========")

    return {
        "customer_report": result["report"],

        "sources": (
            state.get("sources", [])
            + result["sources"]
        ),

        "current_agent": "customer_research",

        "errors": []
    }

def product_agent_node(state:ResearchState):
    print("\n========== PRODUCT STRATEGY NODE START ==========")

    result = product_strategy_agent(
        idea=state["idea"],
        target_market=state["target_market"],
        market_report=state["market_report"],
        competitor_report=state["competitor_report"],
        customer_report=state["customer_report"],
    )

    print("\n========== PRODUCT STRATEGY NODE END ==========")

    return {
        "product_strategy": result["report"],
        "current_agent": "product_strategy",
        "errors": []
    }


def evidence_critic_node(state: ResearchState):

    print("\n========== EVIDENCE CRITIC START ==========")

    result = evidence_critic_agent(
        market_report=state["market_report"],
        competitor_report=state["competitor_report"],
        customer_report=state["customer_report"],
        product_strategy=state["product_strategy"],
        sources=state["sources"],
    )

    print("\n========== EVIDENCE CRITIC END ==========")

    return {
        "evidence_report": result["report"],
        "current_agent": "evidence_critic",
        "research_iterations": state.get(
            "research_iterations",
            0
        ) + 1,
        "errors": []
    }
def business_analysis_node(state: ResearchState):

    print("\n========== BUSINESS ANALYST START ==========")

    result = business_analyst_agent(
        market_report=state["market_report"],
        competitor_report=state["competitor_report"],
        customer_report=state["customer_report"],
        product_strategy=state["product_strategy"],
        evidence_report=state["evidence_report"],
    )

    print("\n========== BUSINESS ANALYST END ==========")

    return {
        "business_analysis": result["report"],
        "current_agent": "business_analyst",
        "errors": []
    }