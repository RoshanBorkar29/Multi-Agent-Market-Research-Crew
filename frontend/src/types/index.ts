export * from './research';

export type AgentStageId =
  | 'planner'
  | 'market_research'
  | 'competitor_research'
  | 'customer_research'
  | 'product_strategy'
  | 'evidence_critic'
  | 'business_analysis';

export type AgentExecutionStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface AgentStage {
  id: AgentStageId;
  name: string;
  description: string;
  status: AgentExecutionStatus;
  isParallel?: boolean;
}

export interface ResearchHistoryItem {
  id: string;
  idea: string;
  target_market: string;
  createdAt: string;
  sourcesCount: number;
}

export interface SavedIdea {
  id: string;
  title: string;
  description?: string;
  targetMarket: string;
  createdAt: string;
  tags?: string[];
}
