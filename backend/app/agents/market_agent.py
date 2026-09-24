import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq


load_dotenv()

llm=ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
    model="openai/gpt-oss-120b",
)

def market_research_agent(idea:str,target_market:str):
    prompt=f"""
    You are a Market research analyst.
    Research the following business/proudct idea:

    Idea:{idea}
    Target market:{target_market}

    Analyze:
    1.Market Overview
    2.Target customer segments
    3.Current market trends
    4.Growth opportunities
    5.Major Risks
    6.Demand signals
    
    Important:
- Clearly distinguish facts from assumptions.
- Do not invent statistics.
- If you make a claim requiring evidence, state that it needs verification.
- Return a structured market research report.

    
    """
    response=llm.invoke(prompt)

    return response.content
