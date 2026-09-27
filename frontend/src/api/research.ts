import { apiClient } from './client';
import { ResearchRequest, ResearchResponse } from '../types/research';

/**
 * Executes the multi-agent market research pipeline for a given business idea and target market.
 */
export async function researchIdea(
  idea: string,
  targetMarket: string
): Promise<ResearchResponse> {
  const payload: ResearchRequest = {
    idea: idea.trim(),
    target_market: targetMarket.trim(),
  };

  const response = await apiClient.post<ResearchResponse>('/api/research', payload);
  return response.data;
}

/**
 * Checks backend health status.
 */
export async function checkBackendHealth(): Promise<{ status: string }> {
  const response = await apiClient.get<{ status: string }>('/health');
  return response.data;
}
