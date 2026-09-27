from app.agents.recursive_setup import llm

from app.schemas.research import ResearchPlan

structured_llm = llm.with_structured_output(ResearchPlan, method="json_mode")

def research_planner_agent(idea:str,target_market:str)->ResearchPlan:
    prompt = f"""
You are a research planning agent.

Business idea:
{idea}

Target market:
{target_market}

Create a research plan for three areas:

1. Market research
2. Competitor research
3. Customer research

Generate exactly 3 high-quality search queries for each area.

Rules:
- Queries must be specific to the business idea.
- Queries must consider the target market.
- Avoid duplicate queries.
- Prefer queries that can retrieve useful factual evidence.
- Do not generate questions requiring the LLM to answer directly.
- These queries will be sent to a web search engine.

Return only a valid JSON object matching the ResearchPlan schema with fields:
- market_queries: list of exactly 3 search query strings
- competitor_queries: list of exactly 3 search query strings
- customer_queries: list of exactly 3 search query strings
"""

    return structured_llm.invoke(prompt)