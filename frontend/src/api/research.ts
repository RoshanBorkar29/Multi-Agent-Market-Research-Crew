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

/**
 * Sends a RAG chat question grounded on a specific market research report.
 */
export async function chatWithReport(
  reportId: string,
  question: string
): Promise<{ answer: string; sources: Array<{ content: string; section: string; similarity_score?: number }> }> {
  const response = await apiClient.post<{
    answer: string;
    sources: Array<{ content: string; section: string; similarity_score?: number }>;
  }>(`/api/reports/${reportId}/chat`, { question });
  return response.data;
}
