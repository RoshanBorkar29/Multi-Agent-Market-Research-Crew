from app.agents.recursive_setup import product_llm

def product_strategy_agent(
    idea: str,
    target_market: str,
    market_report: dict,
    competitor_report: dict,
    customer_report: dict,
) -> dict:

    prompt = f"""
You are a senior product strategist.

Business/product idea:
{idea}

Target market:
{target_market}

MARKET RESEARCH:
{market_report}

COMPETITOR RESEARCH:
{competitor_report}

CUSTOMER RESEARCH:
{customer_report}

Using the research above, develop a product strategy covering:
- value_proposition (string)
- mvp_features (list of strings)
- feature_priorities (list of strings)
- differentiators (list of strings)
- positioning (string)
- recommendations (list of strings)

Important rules:
- Base recommendations on the provided research.
- Do not invent market statistics.
- Do not invent competitors.
- Do not claim something is a customer need unless the research supports it.
- Clearly distinguish evidence-backed conclusions from assumptions.
- Focus on actionable product strategy.

Return a structured product strategy report conforming to the schema.
"""

    response = product_llm.invoke(prompt)

    return {
        "report": response
    }