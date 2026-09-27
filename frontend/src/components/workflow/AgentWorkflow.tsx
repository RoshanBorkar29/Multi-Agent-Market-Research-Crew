import React from 'react';
import { 
  Bot, 
  Search, 
  Users, 
  Compass, 
  BarChart3, 
  CheckCircle2, 
  Loader2, 
  Clock, 
  GitBranch
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ReportTabKey } from '../reports/ReportTabs';

interface AgentWorkflowProps {
  isLoading?: boolean;
  isCompleted?: boolean;
  onSelectTab?: (tabKey: ReportTabKey) => void;
  activeTab?: ReportTabKey;
}

export const AgentWorkflow: React.FC<AgentWorkflowProps> = ({
  isLoading = false,
  isCompleted = false,
  onSelectTab,
  activeTab,
}) => {
  const stages = [
    {
      id: 'planner',
      name: 'Research Planner',
      tabKey: 'sources' as ReportTabKey,
      description: 'Generates specific queries for market, competitor, and customer research',
      icon: Bot,
      isParallel: false,
    },
    {
      id: 'market_research',
      name: 'Market Research',
      tabKey: 'market' as ReportTabKey,
      description: 'Analyzes market overview, segments, trends, signals, and opportunities',
      icon: Search,
      isParallel: true,
    },
    {
      id: 'competitor_research',
      name: 'Competitor Research',
      tabKey: 'competitor' as ReportTabKey,
      description: 'Profiles competitor products, pricing models, and competitive gaps',
      icon: BarChart3,
      isParallel: true,
    },
    {
      id: 'customer_research',
      name: 'Customer Research',
      tabKey: 'customer' as ReportTabKey,
      description: 'Extracts buyer personas, JTBD frameworks, and acute pain points',
      icon: Users,
      isParallel: true,
    },
    {
      id: 'product_strategy',
      name: 'Product Strategy',
      tabKey: 'strategy' as ReportTabKey,
      description: 'Synthesizes value propositions, MVP features, differentiators, and recommendations',
      icon: Compass,
      isParallel: false,
    },
  ];

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-6">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              LangGraph Research Swarm Pipeline
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Multi-Agent DAG
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Planner orchestrates parallel research agents into a unified product strategy
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          {isLoading ? (
            <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>AI Agents Executing Swarm</span>
            </span>
          ) : isCompleted ? (
            <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pipeline Completed</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>System Ready</span>
            </span>
          )}
        </div>
      </div>

      {/* WORKFLOW TREE VISUALIZATION */}
      <div className="flex flex-col items-center space-y-3 relative py-2">
        {/* Step 1: Research Planner */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => onSelectTab && onSelectTab('sources')}
            className={cn(
              'w-full max-w-md p-4 rounded-2xl border transition-all text-left group cursor-pointer',
              activeTab === 'sources'
                ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40 dark:bg-blue-950/40'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Research Planner Agent
                </h4>
              </div>
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Decomposes hypothesis and crafts targeted search queries.
            </p>
          </button>
        </div>

        {/* Vertical Line to Parallel Split */}
        <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

        {/* Parallel Split Header & Fork */}
        <div className="w-full max-w-4xl relative">
          <div className="hidden md:block absolute top-0 left-[16.66%] right-[16.66%] h-0.5 bg-slate-300 dark:bg-slate-700" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
            {/* Market Research */}
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('market')}
              className={cn(
                'w-full p-4 rounded-2xl border transition-all text-left cursor-pointer',
                activeTab === 'market'
                  ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Market Research
                  </h4>
                </div>
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <GitBranch className="w-3 h-3 text-blue-500" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                Market sizing, macro trends, demand signals & opportunities.
              </p>
            </button>

            {/* Competitor Research */}
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('competitor')}
              className={cn(
                'w-full p-4 rounded-2xl border transition-all text-left cursor-pointer',
                activeTab === 'competitor'
                  ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Competitor Research
                  </h4>
                </div>
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <GitBranch className="w-3 h-3 text-purple-500" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                Direct/indirect competitors, pricing & positioning gaps.
              </p>
            </button>

            {/* Customer Research */}
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('customer')}
              className={cn(
                'w-full p-4 rounded-2xl border transition-all text-left cursor-pointer',
                activeTab === 'customer'
                  ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Customer Research
                  </h4>
                </div>
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <GitBranch className="w-3 h-3 text-emerald-500" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                ICPs, JTBD frameworks, pain points & buying motivations.
              </p>
            </button>
          </div>

          <div className="hidden md:block absolute bottom-0 left-[16.66%] right-[16.66%] h-0.5 bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Vertical Line to Product Strategy */}
        <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-700" />

        {/* Step 3: Product Strategy */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={() => onSelectTab && onSelectTab('strategy')}
            className={cn(
              'w-full max-w-md p-4 rounded-2xl border transition-all text-left group cursor-pointer',
              activeTab === 'strategy'
                ? 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40 dark:bg-blue-950/40'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Product Strategy Agent
                </h4>
              </div>
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Synthesizes research into value propositions, MVP features, and differentiators.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
