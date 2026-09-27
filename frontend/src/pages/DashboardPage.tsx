import React, { useState } from 'react';
import { useResearch } from '../hooks/useResearch';
import { ResearchInput } from '../components/research/ResearchInput';
import { AgentWorkflow } from '../components/workflow/AgentWorkflow';
import { ReportTabs, ReportTabKey } from '../components/reports/ReportTabs';
import { MarketResearchView } from '../components/reports/MarketResearchView';
import { CompetitorResearchView } from '../components/reports/CompetitorResearchView';
import { CustomerResearchView } from '../components/reports/CustomerResearchView';
import { ProductStrategyView } from '../components/reports/ProductStrategyView';
import { PlanAndSourcesView } from '../components/reports/PlanAndSourcesView';
import { FinalReportView } from '../components/reports/FinalReportView';
import { RightSidebar } from '../components/layout/RightSidebar';
import { ReportSkeleton } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { EmptyState } from '../components/ui/EmptyState';
import { Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    research,
    isLoading,
    error,
    startResearch,
  } = useResearch();

  const [activeTab, setActiveTab] = useState<ReportTabKey>('market');

  const handleStartResearch = async (idea: string, market: string) => {
    const res = await startResearch(idea, market);
    if (res) {
      setActiveTab('market');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col xl:flex-row gap-6 items-start">
      {/* Center / Main Workspace */}
      <div className="flex-1 min-w-0 w-full space-y-6">
        {/* Hero Input Section */}
        <ResearchInput
          onSubmit={handleStartResearch}
          isLoading={isLoading}
          initialIdea={research?.idea || ''}
          initialMarket={research?.target_market || 'India'}
        />

        {/* Error Notification */}
        {error && (
          <ErrorState
            title="Research Pipeline Error"
            message={error}
          />
        )}

        {/* Agent Workflow Visualizer */}
        <AgentWorkflow
          isLoading={isLoading}
          isCompleted={!!research}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-4">
            <ReportSkeleton />
          </div>
        )}

        {/* Real Research Results */}
        {!isLoading && research && (
          <div className="space-y-4">
            <ReportTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              sourcesCount={research.sources?.length || 0}
            />

            <div className="min-h-[400px]">
              {activeTab === 'market' && (
                <MarketResearchView
                  data={research.market_report}
                  sources={research.sources}
                />
              )}
              {activeTab === 'competitor' && (
                <CompetitorResearchView
                  data={research.competitor_report}
                />
              )}
              {activeTab === 'customer' && (
                <CustomerResearchView
                  data={research.customer_report}
                />
              )}
              {activeTab === 'strategy' && (
                <ProductStrategyView
                  data={research.product_strategy}
                />
              )}
              {activeTab === 'sources' && (
                <PlanAndSourcesView
                  plan={research.research_plan}
                  sources={research.sources}
                />
              )}
              {activeTab === 'final' && (
                <FinalReportView
                  report={research}
                />
              )}
            </div>
          </div>
        )}

        {/* Empty State before any research query */}
        {!isLoading && !research && !error && (
          <EmptyState
            title="No research yet"
            description="Enter a business idea above to dispatch autonomous AI agents for deep market intelligence."
            icon={Sparkles}
          />
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-80 shrink-0">
        <RightSidebar
          sources={research?.sources || []}
          researchPlan={research?.research_plan}
          isLoading={isLoading}
          isCompleted={!!research}
        />
      </div>
    </div>
  );
};
