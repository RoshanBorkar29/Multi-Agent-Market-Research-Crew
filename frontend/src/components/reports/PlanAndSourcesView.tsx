import React from 'react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { ResearchPlan, SourceItem } from '../../types/research';
import { ReportSection } from './ReportSection';
import { EmptyState } from '../ui/EmptyState';

interface PlanAndSourcesViewProps {
  plan?: ResearchPlan | null;
  sources?: SourceItem[];
}

export const PlanAndSourcesView: React.FC<PlanAndSourcesViewProps> = ({ plan, sources = [] }) => {
  const hasPlan = plan && (
    (plan.market_queries && plan.market_queries.length > 0) ||
    (plan.competitor_queries && plan.competitor_queries.length > 0) ||
    (plan.customer_queries && plan.customer_queries.length > 0)
  );

  const hasSources = sources && sources.length > 0;

  if (!hasPlan && !hasSources) {
    return (
      <section id="sources" className="scroll-mt-24">
        <EmptyState
          title="No research queries or sources available"
          description="Run a research query to generate research plans and collect web intelligence."
        />
      </section>
    );
  }

  return (
    <section id="sources" className="scroll-mt-24">
      <ReportSection
        title="Evidence, Citations & Research Plan"
        subtitle="Autonomous search queries crafted by the planner agent and real citations collected from the web"
        status="Completed"
      >
      <div className="space-y-8">
        {/* Research Plan Queries */}
        {hasPlan && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-5">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Search className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agent Query Execution Plan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Market Queries */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Market Queries
                </span>
                <ul className="space-y-1.5 pt-1">
                  {plan.market_queries?.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Competitor Queries */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Competitor Queries
                </span>
                <ul className="space-y-1.5 pt-1">
                  {plan.competitor_queries?.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="text-purple-500 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Queries */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Customer Queries
                </span>
                <ul className="space-y-1.5 pt-1">
                  {plan.customer_queries?.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Collected Sources */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <Globe className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Collected Web Intelligence & Citations
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {sources.length} sources returned
            </span>
          </div>

          {hasSources ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-blue-600 shrink-0 mt-0.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {src.title || src.url}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">{src.url}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No sources were returned.</p>
          )}
        </div>
      </div>
    </ReportSection>
  </section>
  );
};
