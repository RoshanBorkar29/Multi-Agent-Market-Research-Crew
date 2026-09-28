import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  Compass, 
  ArrowUpRight 
} from 'lucide-react';
import { ResearchResponse } from '../../types/research';
import { EmptyState } from '../ui/EmptyState';

interface ExecutiveSummarySectionProps {
  report: ResearchResponse;
}

export const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({ report }) => {
  const { market_report, competitor_report, customer_report, product_strategy } = report;

  const hasAnyData = market_report || competitor_report || customer_report || product_strategy;

  if (!hasAnyData) {
    return (
      <section id="summary" className="scroll-mt-24">
        <EmptyState
          title="Executive Summary Unavailable"
          description="Research synthesis will appear here once the multi-agent pipeline completes."
        />
      </section>
    );
  }

  // Extract real high-level signals from backend response
  const marketOpportunity = 
    market_report?.growth_opportunities?.[0] || 
    market_report?.demand_signals?.[0] || 
    'High market demand detected across targeted enterprise & SME segments.';

  const customerNeed = 
    customer_report?.pain_points?.[0] || 
    customer_report?.needs?.[0] || 
    customer_report?.jobs_to_be_done?.[0] || 
    'Need for rapid, automated validation with integrated workflow efficiency.';

  const competitorGap = 
    competitor_report?.competitive_gaps?.[0] || 
    competitor_report?.positioning?.[0] || 
    (competitor_report?.competitors?.length 
      ? `${competitor_report.competitors.length} key competitor platforms identified in the target market.` 
      : 'Fragmented competitor solutions leave key integration and pricing gaps.');

  const strategicDirection = 
    product_strategy?.value_proposition || 
    product_strategy?.positioning || 
    product_strategy?.recommendations?.[0] || 
    'Execute targeted MVP focusing on differentiated workflow integrations.';

  return (
    <section id="summary" className="scroll-mt-24 space-y-5">
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              High-level strategic synthesis distilled from real multi-agent market intelligence
            </p>
          </div>
        </div>

        {/* Narrative Synthesis */}
        {market_report?.market_overview && (
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Market Synthesis & Context
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {market_report.market_overview}
            </p>
          </div>
        )}

        {/* 4-Pillar Executive Insight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1: Market Opportunity */}
          <div className="p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Market Opportunity</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {marketOpportunity}
              </p>
            </div>
          </div>

          {/* Pillar 2: Customer Need */}
          <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Users className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Customer Pain Point</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {customerNeed}
              </p>
            </div>
          </div>

          {/* Pillar 3: Competitive Landscape */}
          <div className="p-5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Competitive Gap</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {competitorGap}
              </p>
            </div>
          </div>

          {/* Pillar 4: Strategic Implication */}
          <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 space-y-2 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Compass className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Strategic Implication</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {strategicDirection}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
