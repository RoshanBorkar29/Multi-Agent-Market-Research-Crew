import React from 'react';
import { ResearchResponse } from '../../types/research';
import { ResearchHeader } from './ResearchHeader';
import { SectionNav } from './SectionNav';
import { ExecutiveSummarySection } from './ExecutiveSummarySection';
import { KeyFindingsSection } from './KeyFindingsSection';
import { MarketResearchView } from '../reports/MarketResearchView';
import { CompetitorResearchView } from '../reports/CompetitorResearchView';
import { CustomerResearchView } from '../reports/CustomerResearchView';
import { ProductStrategyView } from '../reports/ProductStrategyView';
import { PlanAndSourcesView } from '../reports/PlanAndSourcesView';
import { AskMarketMindButton } from './AskMarketMindButton';

interface ResearchWorkspaceProps {
  report: ResearchResponse;
  onNewResearch: () => void;
  onRefreshResearch?: () => void;
  isLoading?: boolean;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  report,
  onNewResearch,
  onRefreshResearch,
  isLoading = false,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 transition-all animate-in fade-in duration-300">
      {/* 1. Master Research Header */}
      <ResearchHeader
        report={report}
        onNewResearch={onNewResearch}
        onRefreshResearch={onRefreshResearch}
        isLoading={isLoading}
      />

      {/* 2. Sticky In-Page Section Sub-Navigation */}
      <SectionNav sourcesCount={report.sources?.length || 0} />

      {/* 3. Single Seamless Page — All Major Research Sections */}
      <div className="space-y-12">
        {/* Section 1: Executive Summary */}
        <ExecutiveSummarySection report={report} />

        {/* Section 2: Key Findings */}
        <KeyFindingsSection report={report} />

        {/* Section 3: Market Landscape */}
        <MarketResearchView 
          data={report.market_report} 
          sources={report.sources} 
        />

        {/* Section 4: Competitor Intelligence */}
        <CompetitorResearchView 
          data={report.competitor_report} 
        />

        {/* Section 5: Customer Insights */}
        <CustomerResearchView 
          data={report.customer_report} 
        />

        {/* Section 6: Product Strategy */}
        <ProductStrategyView 
          data={report.product_strategy} 
        />

        {/* Section 7: Evidence & Sources */}
        <PlanAndSourcesView 
          plan={report.research_plan} 
          sources={report.sources} 
        />
      </div>

      {/* 4. Future AI Assistant Floating Placeholder */}
      <AskMarketMindButton />
    </div>
  );
};
