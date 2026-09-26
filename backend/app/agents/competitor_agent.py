import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from app.tools.web_search import web_search
from app.tools.web_scrapper import scrape_url

load_dotenv()

llm = ChatGroq(
    model="meta-llama/llama-4-scout-17b-16e-instruct",
    temperature=0,
    api_key=os.getenv("GROQ_API_KEY"),
)


def competitor_research_agent(
    idea: str,
    target_market: str
) -> dict:

    # 1. Generate competitor-search queries
    query_prompt = f"""
You are a competitive intelligence researcher.

Business/product idea:
{idea}

Target market:
{target_market}

Generate exactly 4 web search queries to discover competitors.

Cover:
1. Direct competitors
2. Alternative solutions
3. Leading companies in this market
4. Competitor pricing/features

Return ONLY the queries, one per line.
"""

    query_response = llm.invoke(query_prompt)

    queries = [
        q.strip()
        for q in query_response.content.split("\n")
        if q.strip()
    ][:4]

    # 2. Search the web
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
            print(f"Search failed: {e}")

    # 3. Remove duplicate URLs
    unique_results = {}

    for result in search_results:

        if not isinstance(result, dict):
            continue

        url = result.get("url")

        if url and url not in unique_results:
            unique_results[url] = result

    search_results = list(unique_results.values())

    # 4. Ask LLM to select useful competitor sources
    source_prompt = f"""
You are a competitive intelligence researcher.

Business idea:
{idea}

Target market:
{target_market}

Search results:
{search_results}

Select up to 5 URLs that are most useful for competitor research.

Prefer:
- official competitor websites
- official pricing pages
- product pages
- reliable industry sources

Return ONLY URLs, one per line.
"""

    source_response = llm.invoke(source_prompt)

    selected_urls = [
        url.strip()
        for url in source_response.content.split("\n")
        if url.strip().startswith("http")
    ][:5]

    # 5. Scrape selected sources
    scraped_sources = []

    for url in selected_urls:
        try:
            page = scrape_url(url)
            scraped_sources.append(page)

        except Exception as e:
            print(f"Scraping failed for {url}: {e}")

    # 6. Analyze competitors
    research_prompt = f"""
You are an experienced competitive intelligence analyst.

Business idea:
{idea}

Target market:
{target_market}

Research collected from the web:
{scraped_sources}

Analyze the competitive landscape.

Provide:

1. Major competitors
2. Competitor descriptions
3. Pricing
4. Target customers
5. Key features
6. Competitor strengths
7. Competitor weaknesses
8. Market positioning
9. Competitive gaps
10. Key findings

Rules:
- Do not invent information.
- Do not invent pricing.
- Clearly distinguish evidence from assumptions.
- Base conclusions on the provided research.
"""

    report_response = llm.invoke(research_prompt)

    return {
        "report": report_response.content,
        "queries": queries,
        "sources": [
            {
                "title": source.get("title", ""),
                "url": source.get("url", "")
            }
            for source in scraped_sources
            if isinstance(source, dict)
        ]
    }