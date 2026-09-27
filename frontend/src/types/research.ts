/**
 * TypeScript definitions matching backend Pydantic schemas.
 */

export interface Evidence {
  claim: string;
  source_title: string;
  url: string;
  supporting_text?: string;
  source_type?: string;
}

export interface MarketReport {
  market_overview: string;
  market_segments: string[];
  market_trends: string[];
  demand_signals: string[];
  growth_opportunities: string[];
  risks: string[];
  key_findings: string[];
  evidence: Evidence[];
}

export interface Competitor {
  name: string;
  website?: string;
  description?: string;
  pricing?: string;
  target_customer?: string;
  key_features?: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export interface CompetitorReport {
  competitors: Competitor[];
  pricing_analysis: string[];
  feature_comparison: string[];
  positioning: string[];
  competitive_gaps: string[];
  key_findings: string[];
  evidence: Evidence[];
}

export interface CustomerReport {
  customer_segments: string[];
  pain_points: string[];
  jobs_to_be_done: string[];
  needs: string[];
  buying_motivations: string[];
  barriers: string[];
  key_findings: string[];
  evidence: Evidence[];
}

export interface ProductStrategy {
  value_proposition: string;
  mvp_features: string[];
  feature_priorities: string[];
  differentiators: string[];
  positioning: string;
  recommendations: string[];
}

export interface ResearchPlan {
  market_queries: string[];
  competitor_queries: string[];
  customer_queries: string[];
}

export interface SourceItem {
  title: string;
  url: string;
}

export interface ResearchResponse {
  idea: string;
  target_market: string;
  research_plan: ResearchPlan;
  market_report: MarketReport | null;
  competitor_report: CompetitorReport | null;
  customer_report: CustomerReport | null;
  product_strategy: ProductStrategy | null;
  sources: SourceItem[];
}

export interface ResearchRequest {
  idea: string;
  target_market: string;
}
