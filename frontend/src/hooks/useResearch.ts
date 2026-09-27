import { useState, useCallback } from 'react';
import { researchIdea } from '../api/research';
import { ResearchResponse } from '../types/research';

export function useResearch() {
  const [research, setResearch] = useState<ResearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startResearch = useCallback(async (idea: string, targetMarket: string): Promise<ResearchResponse | null> => {
    if (!idea.trim() || !targetMarket.trim()) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await researchIdea(idea, targetMarket);
      setResearch(data);
      return data;
    } catch (err: any) {
      console.error('Failed to execute research pipeline:', err);
      const detailMsg = err?.response?.data?.detail;
      const displayMsg = typeof detailMsg === 'string'
        ? detailMsg
        : 'Research could not be completed. Please make sure the backend is running and try again.';
      setError(displayMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetResearch = useCallback(() => {
    setResearch(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    research,
    isLoading,
    error,
    startResearch,
    resetResearch,
  };
}

export default useResearch;
