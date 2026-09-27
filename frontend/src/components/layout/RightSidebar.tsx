import React from 'react';
import { 
  Bot, 
  CheckCircle2, 
  ExternalLink, 
  Globe, 
  Loader2,
  Clock,
  Search
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { SourceItem, ResearchPlan } from '../../types/research';
import { Badge } from '../ui/Badge';

interface RightSidebarProps {
  sources?: SourceItem[];
  researchPlan?: ResearchPlan;
  isLoading?: boolean;
  isCompleted?: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  sources = [],
  researchPlan,
  isLoading = false,
  isCompleted = false,
}) => {
  return (
    <aside className="w-full xl:w-80 shrink-0 space-y-4 pb-8">
      {/* 1. PIPELINE STATUS CARD */}
      <div className="rounded-2xl p-4.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              'p-1.5 rounded-lg',
              isLoading 
                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 animate-pulse' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            )}>
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Swarm Status
            </span>
          </div>

          <Badge 
            variant={isCompleted ? 'success' : isLoading ? 'primary' : 'secondary'} 
            size="sm"
            dot={isLoading}
          >
            {isCompleted ? 'Completed' : isLoading ? 'Researching' : 'Ready'}
          </Badge>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            {isLoading ? 'AI Swarm Running' : isCompleted ? 'Research Completed' : 'System Idle'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {isLoading
              ? 'Multi-agent LangGraph pipeline is querying web indices, extracting evidence, and synthesizing reports.'
              : isCompleted
              ? 'All agents finalized deliverables. Full research dossier ready for review.'
              : 'Enter a business idea and target market to dispatch the LangGraph research swarm.'}
          </p>
        </div>
      </div>

      {/* 2. RESEARCH QUERIES (IF AVAILABLE) */}
      {researchPlan && (
        <div className="rounded-2xl p-4.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Generated Queries
              </span>
            </div>
            <Badge variant="primary" size="sm">
              {(researchPlan.market_queries?.length || 0) +
               (researchPlan.competitor_queries?.length || 0) +
               (researchPlan.customer_queries?.length || 0)} Queries
            </Badge>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
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
      )}

      {/* 3. SOURCES COLLECTED */}
      <div className="rounded-2xl p-4.5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Sources Extracted
            </span>
          </div>
          <Badge variant="cyan" size="sm">
            {sources.length} sources
          </Badge>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {sources.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2 text-center">
              Sources will appear here once web intelligence is retrieved.
            </p>
          ) : (
            sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-900/60 transition-all flex items-start gap-2.5 block"
              >
                <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                      {source.title || source.url}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{source.url}</p>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
