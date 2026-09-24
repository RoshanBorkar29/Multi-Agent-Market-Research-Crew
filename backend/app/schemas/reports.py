from pydantic import BaseModel, Field


class Evidence(BaseModel):
    claim: str
    source_title: str
    url: str
    supporting_text: str = ""
    source_type: str = "web"


class MarketReport(BaseModel):
    market_overview: str

    market_segments: list[str] = Field(default_factory=list)

    market_trends: list[str] = Field(default_factory=list)

    demand_signals: list[str] = Field(default_factory=list)

    growth_opportunities: list[str] = Field(default_factory=list)

    risks: list[str] = Field(default_factory=list)

    key_findings: list[str] = Field(default_factory=list)

    evidence: list[Evidence] = Field(default_factory=list)


class Competitor(BaseModel):
    name: str
    website: str = ""
    description: str = ""
    pricing: str = ""
    target_customer: str = ""
    key_features: list[str] = Field(default_factory=list)
    strengths: list[str] = Field(default_factory=list)
    weaknesses: list[str] = Field(default_factory=list)


class CompetitorReport(BaseModel):
    competitors: list[Competitor] = Field(default_factory=list)

    pricing_analysis: list[str] = Field(default_factory=list)

    feature_comparison: list[str] = Field(default_factory=list)

    positioning: list[str] = Field(default_factory=list)

    competitive_gaps: list[str] = Field(default_factory=list)

    key_findings: list[str] = Field(default_factory=list)

    evidence: list[Evidence] = Field(default_factory=list)


class CustomerReport(BaseModel):
    customer_segments: list[str] = Field(default_factory=list)

    pain_points: list[str] = Field(default_factory=list)

    jobs_to_be_done: list[str] = Field(default_factory=list)

    needs: list[str] = Field(default_factory=list)

    buying_motivations: list[str] = Field(default_factory=list)

    barriers: list[str] = Field(default_factory=list)

    key_findings: list[str] = Field(default_factory=list)

    evidence: list[Evidence] = Field(default_factory=list)


class ProductStrategy(BaseModel):
    value_proposition: str = ""

    mvp_features: list[str] = Field(default_factory=list)

    feature_priorities: list[str] = Field(default_factory=list)

    differentiators: list[str] = Field(default_factory=list)

    positioning: str = ""

    recommendations: list[str] = Field(default_factory=list)


class EvidenceReport(BaseModel):
    validated_claims: list[str] = Field(default_factory=list)

    unsupported_claims: list[str] = Field(default_factory=list)

    contradictory_claims: list[str] = Field(default_factory=list)

    source_quality_issues: list[str] = Field(default_factory=list)

    overall_assessment: str = ""


class BusinessAnalysis(BaseModel):
    business_opportunity: str = ""

    revenue_models: list[str] = Field(default_factory=list)

    go_to_market: list[str] = Field(default_factory=list)

    business_risks: list[str] = Field(default_factory=list)

    strategic_recommendations: list[str] = Field(default_factory=list)