from pydantic import BaseModel,Field
class ResearchPlan(BaseModel):
    market_queries:list[str]=Field(default_factory=list)
    competitor_queries:list[str]=Field(default_factory=list)
    customer_queries:list[str]=Field(default_factory=list)