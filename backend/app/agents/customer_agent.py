from app.agents.recursive_setup import customer_llm
from app.tools.web_search import web_search
from app.tools.web_scrapper import scrape_url


def create_customer_prompt(
    idea: str,
    target_market: str,
    scraped_sources: list[dict]
) -> str:

    return f"""
You are an experienced customer research analyst.

Business/product idea:
{idea}

Target market:
{target_market}

Research collected from the web:
{scraped_sources}

Provide a structured customer research report in JSON format covering:

1. Customer segments (customer_segments: list of strings)
2. Pain points (pain_points: list of strings)
3. Jobs-to-be-done (jobs_to_be_done: list of strings)
4. Customer needs (needs: list of strings)
5. Buying motivations (buying_motivations: list of strings)
6. Adoption barriers (barriers: list of strings)
7. Key findings (key_findings: list of strings)
8. Evidence supporting important claims (evidence: list of objects with fields claim, source_title, url, supporting_text, source_type)

Rules:

- Do not invent customer data.
- Do not invent statistics.
- Do not make unsupported claims.
- Clearly distinguish evidence from assumptions.
- Base conclusions on the provided sources.

Return only a valid JSON object conforming to the schema.
"""


def customer_research_agent(
    idea: str,
    target_market: str,
    queries: list[str]
):

    # --------------------------------------------------
    # 1. WEB SEARCH
    # --------------------------------------------------

    search_results = []

    for query in queries:

        try:

            results = web_search(
                query=query,
                max_results=5
            )

            if isinstance(results, list):
                search_results.extend(results)

        except Exception as e:

            print(
                f"Search failed for "
                f"'{query}': {e}"
            )

    # --------------------------------------------------
    # 2. REMOVE DUPLICATES
    # --------------------------------------------------

    unique_results = {}

    for result in search_results:

        if not isinstance(result, dict):
            continue

        url = result.get("url")

        if url and url not in unique_results:

            unique_results[url] = result

    # --------------------------------------------------
    # 3. SELECT TOP 3 SOURCES
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

    prompt = create_customer_prompt(
        idea,
        target_market,
        scraped_sources
    )

    report = customer_llm.invoke(prompt)

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