import React, { useState } from 'react';
import { useResearch } from '../hooks/useResearch';
import { ResearchInput } from '../components/research/ResearchInput';
import { AgentWorkflow } from '../components/workflow/AgentWorkflow';
import { ResearchWorkspace } from '../components/research/ResearchWorkspace';
import { ReportSkeleton } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';

export const DashboardPage: React.FC = () => {
  const {
    research,
    isLoading,
    error,
    startResearch,
    resetResearch,
  } = useResearch();

  const [isInputExpanded, setIsInputExpanded] = useState(true);

  const handleStartResearch = async (idea: string, market: string) => {
    const res = await startResearch(idea, market);
    if (res) {
      setIsInputExpanded(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewResearch = () => {
    setIsInputExpanded(true);
    resetResearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshResearch = () => {
    if (research?.idea && research?.target_market) {
      handleStartResearch(research.idea, research.target_market);
    }
  };

  return (
    <div className="w-full flex-1 space-y-8 min-w-0">
      {/* 1. Input Form Section (Shown when starting or creating new research) */}
      {(isInputExpanded || !research) && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <ResearchInput
            onSubmit={handleStartResearch}
            isLoading={isLoading}
            initialIdea={research?.idea || ''}
            initialMarket={research?.target_market || 'India'}
          />

          {/* Workflow DAG Architecture Visualizer */}
          <AgentWorkflow
            isLoading={isLoading}
            isCompleted={!!research}
          />
        </div>
      )}

      {/* 2. Error Notification */}
      {error && (
        <div className="max-w-5xl mx-auto">
          <ErrorState
            title="Research Pipeline Error"
            message={error}
          />
        </div>
      )}

      {/* 3. Loading Skeleton State */}
      {isLoading && (
        <div className="max-w-5xl mx-auto space-y-4">
          <ReportSkeleton />
        </div>
      )}

      {/* 4. Unified Research Workspace (Single Page, Progressive Disclosure) */}
      {!isLoading && research && (
        <ResearchWorkspace
          report={research}
          onNewResearch={handleNewResearch}
          onRefreshResearch={handleRefreshResearch}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DashboardPage;
