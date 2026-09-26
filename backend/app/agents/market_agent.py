import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from app.tools.web_scrapper import scrape_url
from app.tools.web_search import web_search


load_dotenv()

llm=ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
    model="openai/gpt-oss-120b",
)

def market_research_agent(idea:str,target_market:str)->dict:
    query_prompt = f"""
    You are a market research planner.

    Business/product idea:
    {idea}

    Target market:
    {target_market}

    Generate exactly 4 web search queries that would help
    research this idea.

    The queries should cover:
    1. Market overview and demand
    2. Market trends
    3. Target customers
    4. Existing market opportunities

    Return ONLY the queries, one per line.
    """
    response=llm.invoke(query_prompt)

    queries=[
        q.strip()
        for q in response.content.split("\n")
        if q.strip()
    ]
    queries=queries[:4]

    search_results=[]
    for query in queries:
        try:
            results=web_search(query,max_results=5)
            search_results.append(results)
        except Exception as e:
            print(f"Search falied for '{query}:{e}")

    unique_results=[]
    for result in search_results:
        url=result.get("url")
        if url and url not in unique_results:
            unique_results[url]=result

    search_result=list(unique_results.values())

    source_selection_prompt = f"""
    You are a research source evaluator.

    Research idea:
    {idea}

    Target market:
    {target_market}

    Below are web search results:

    {search_results}

    Select the 5 most relevant sources for understanding
    the market.

    Return ONLY the URLs, one per line.
    """

    source_response=llm.invoke(source_selection_prompt)
    selected_urls=[
        url.strip()
        for url in source_response.content.split("\n")
        if url.strip().startswith("http")
    ]
    selected_urls=selected_urls[:5]

    scraped_sources=[]
    for url in selected_urls:
        try:
            page=scrape_url(url)
            scraped_sources.append(page)
        except Exception as e:            
            print(
                f"Scraping failed for {url}: {e}"
            )

    research_prompt = f"""
    You are an experienced Market Research Analyst.

    Analyze the research collected for:

    Idea:
    {idea}

    Target market:
    {target_market}

    Research sources:

    {scraped_sources}

    Produce a structured market research report containing:

    1. Market overview
    2. Relevant market segments
    3. Current market trends
    4. Demand signals
    5. Growth opportunities
    6. Major risks
    7. Key findings

    Important rules:

    - Do not invent statistics.
    - Do not make unsupported claims.
    - Clearly distinguish evidence from assumptions.
    - Base conclusions on the provided sources.
    """

    report_response=llm.invoke(research_prompt)
    return{
        "report":report_response.content,
        "queries":queries,
         "sources":[
             {
                 "title":source.get("title",""),
                 "url":source.get("url",""),
             }
             for source in scraped_sources
         ]
    }

##workflow->idea->llm generates research queries->web search->llm selects relevants sources->web scraper->actual relavnt source content
##->llm analyzes and gives marker report!!