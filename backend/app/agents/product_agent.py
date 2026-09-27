from app.agents.recursive_setup import llm

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

Using the research above, develop a product strategy.

Analyze:

1. Value proposition
2. MVP features
3. Feature priorities
4. Product differentiators
5. Market positioning
6. Product recommendations

Important rules:

- Base recommendations on the provided research.
- Do not invent market statistics.
- Do not invent competitors.
- Do not claim something is a customer need unless the research supports it.
- Clearly distinguish evidence-backed conclusions from assumptions.
- Focus on actionable product strategy.

Return a structured product strategy report.
"""

    response = llm.invoke(prompt)

    return {
        "report": response.content
    }