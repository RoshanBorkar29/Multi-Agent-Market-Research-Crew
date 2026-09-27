from app.agents.recursive_setup import market_llm
from app.tools.web_search import web_search
from app.tools.web_scrapper import scrape_url


def create_market_prompt(
    idea: str,
    target_market: str,
    scraped_sources: list[dict]
) -> str:

    return f"""
You are an experienced market research analyst.

Business/product idea:
{idea}

Target market:
{target_market}

Research collected from the web:
{scraped_sources}

Provide a structured market research report in JSON format covering:

1. Market overview (market_overview: string)
2. Market segments (market_segments: list of strings)
3. Market trends (market_trends: list of strings)
4. Demand signals (demand_signals: list of strings)
5. Growth opportunities (growth_opportunities: list of strings)
6. Risks (risks: list of strings)
7. Key findings (key_findings: list of strings)
8. Evidence supporting important claims (evidence: list of objects with fields claim, source_title, url, supporting_text, source_type)

Rules:

- Do not invent market statistics.
- Do not invent growth rates.
- Do not invent market sizes.
- Do not make unsupported claims.
- Clearly distinguish evidence-backed findings from assumptions.
- Base conclusions on the provided sources.

Return only a valid JSON object conforming to the schema.
"""


def market_research_agent(
    idea: str,
    target_market: str,
    queries: list[str]
):

    # --------------------------------------------------
    # 1. WEB SEARCH
    # --------------------------------------------------

    all_results = []

    for query in queries:

        try:
            results = web_search(
                query=query,
                max_results=5
            )

            if isinstance(results, list):
                all_results.extend(results)

        except Exception as e:
            print(f"Search failed for '{query}': {e}")

    # --------------------------------------------------
    # 2. REMOVE DUPLICATES
    # --------------------------------------------------

    unique_results = {}

    for result in all_results:

        if not isinstance(result, dict):
            continue

        url = result.get("url")

        if url and url not in unique_results:
            unique_results[url] = result

    # --------------------------------------------------
    # 3. SELECT TOP SOURCES
    # --------------------------------------------------

    selected_results = list(
        unique_results.values()
    )[:3]

    # --------------------------------------------------
    # 4. SCRAPE
    # --------------------------------------------------

    scraped_sources = []

    for result in selected_results:

        try:

            page = scrape_url(
                result["url"]
            )

            scraped_sources.append(page)

        except Exception as e:
            print(
                f"Scraping failed for "
                f"{result.get('url')}: {e}"
            )
            if result.get("content"):
                scraped_sources.append({
                    "url": result.get("url", ""),
                    "title": result.get("title", ""),
                    "content": result.get("content", "")
                })

    # --------------------------------------------------
    # 5. ONE LLM CALL
    # --------------------------------------------------

    prompt = create_market_prompt(
        idea,
        target_market,
        scraped_sources
    )

    report = market_llm.invoke(prompt)

    # --------------------------------------------------
    # 6. RETURN
    # --------------------------------------------------

    return {
        "report": report,

        "sources": [
            {
                "title": source.get(
                    "title",
                    ""
                ),
                "url": source.get(
                    "url",
                    ""
                )
            }

            for source in scraped_sources

            if isinstance(source, dict)
        ]
    }