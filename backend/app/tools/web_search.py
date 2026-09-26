import os

from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()

tavily_client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


def web_search(
    query: str,
    max_results: int = 5
) -> list[dict]:

    response = tavily_client.search(
        query=query,
        search_depth="advanced",
        max_results=max_results
    )

    results = response.get("results", [])

    formatted_results = []

    for result in results:

        if not isinstance(result, dict):
            continue

        formatted_results.append({
            "title": result.get("title", ""),
            "url": result.get("url", ""),
            "content": result.get("content", ""),
            "score": result.get("score", 0),
        })

    return formatted_results