import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from app.tools.web_search import web_search
from app.tools.web_scrapper import scrape_url

load_dotenv()

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


def customer_research_agent(
    idea: str,
    target_market: str
) -> dict:

    # --------------------------------------------------
    # 1. Generate research queries
    # --------------------------------------------------

    query_prompt = f"""
You are a customer research analyst.

Business/product idea:
{idea}

Target market:
{target_market}

Generate exactly 4 web search queries for understanding
the potential customers of this product.

Cover:

1. Target customer segments and personas
2. Customer pain points and problems
3. Existing customer solutions and alternatives
4. Customer needs, buying motivations and adoption barriers

Return ONLY the queries, one per line.
"""

    query_response = llm.invoke(query_prompt)

    queries = [
        q.strip()
        for q in query_response.content.split("\n")
        if q.strip()
    ]

    queries = queries[:4]

    # --------------------------------------------------
    # 2. Web search
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
                f"Search failed for '{query}': {e}"
            )

    # --------------------------------------------------
    # 3. Remove duplicate URLs
    # --------------------------------------------------

    unique_results = {}

    for result in search_results:

        if not isinstance(result, dict):
            continue

        url = result.get("url")

        if url and url not in unique_results:
            unique_results[url] = result

    search_results = list(
        unique_results.values()
    )

    # --------------------------------------------------
    # 4. Select useful sources
    # --------------------------------------------------

    source_prompt = f"""
You are a customer research source evaluator.

Business/product idea:
{idea}

Target market:
{target_market}

Search results:
{search_results}

Select up to 5 URLs that are most useful for
understanding the potential customers.

Prefer sources such as:

- customer research
- industry reports
- surveys
- user discussions
- company/customer studies
- reliable industry publications

Return ONLY the URLs, one per line.
"""

    source_response = llm.invoke(
        source_prompt
    )

    selected_urls = [
        url.strip()
        for url in source_response.content.split("\n")
        if url.strip().startswith("http")
    ]

    selected_urls = selected_urls[:5]

    # --------------------------------------------------
    # 5. Scrape selected sources
    # --------------------------------------------------

    scraped_sources = []

    for url in selected_urls:

        try:

            page = scrape_url(url)

            scraped_sources.append(page)

        except Exception as e:

            print(
                f"Scraping failed for {url}: {e}"
            )

    # --------------------------------------------------
    # 6. Analyze customer research
    # --------------------------------------------------

    research_prompt = f"""
You are an experienced customer research analyst.

Business/product idea:
{idea}

Target market:
{target_market}

Research collected from the web:
{scraped_sources}

Analyze the potential customers.

Provide a structured customer research report containing:

1. Customer segments
2. Customer personas
3. Major pain points
4. Jobs-to-be-done
5. Customer needs
6. Buying motivations
7. Adoption barriers
8. Existing alternatives
9. Key customer insights

Important rules:

- Do not invent customer data.
- Do not invent statistics.
- Do not make unsupported claims.
- Clearly distinguish evidence from assumptions.
- Base conclusions on the provided sources.
"""

    report_response = llm.invoke(
        research_prompt
    )

    # --------------------------------------------------
    # 7. Return result
    # --------------------------------------------------

    return {
        "report": report_response.content,

        "queries": queries,

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