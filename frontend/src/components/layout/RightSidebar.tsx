import React from 'react';
import { Search } from 'lucide-react';
import { ResearchPlan } from '../../types/research';
import { Badge } from '../ui/Badge';

interface RightSidebarProps {
  researchPlan?: ResearchPlan;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  researchPlan,
}) => {
  const totalQueries = 
    (researchPlan?.market_queries?.length || 0) +
    (researchPlan?.competitor_queries?.length || 0) +
    (researchPlan?.customer_queries?.length || 0);

  if (!researchPlan || totalQueries === 0) {
    return null;
  }

  return (
    <aside className="w-full xl:w-80 shrink-0 space-y-4 pb-8">
      {/* RESEARCH QUERIES */}
      <div className="rounded-2xl p-4.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Generated Queries
            </span>
          </div>
          <Badge variant="primary" size="sm">
            {totalQueries} Queries
          </Badge>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {researchPlan.market_queries?.map((q, idx) => (
            <div key={`m-${idx}`} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-[11px] text-slate-700 dark:text-slate-300">
              <span className="text-blue-500 font-bold mr-1">[Market]</span> {q}
            </div>
          ))}
          {researchPlan.competitor_queries?.map((q, idx) => (
            <div key={`c-${idx}`} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-[11px] text-slate-700 dark:text-slate-300">
              <span className="text-purple-500 font-bold mr-1">[Competitor]</span> {q}
            </div>
          ))}
          {researchPlan.customer_queries?.map((q, idx) => (
            <div key={`cu-${idx}`} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 text-[11px] text-slate-700 dark:text-slate-300">
              <span className="text-emerald-500 font-bold mr-1">[Customer]</span> {q}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
