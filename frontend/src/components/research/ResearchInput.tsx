import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Globe, 
  Lightbulb, 
  Loader2, 
  Zap
} from 'lucide-react';
import { SUGGESTED_RESEARCH_IDEAS, TARGET_MARKETS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface ResearchInputProps {
  onSubmit: (idea: string, market: string) => Promise<void> | void;
  isLoading?: boolean;
  initialIdea?: string;
  initialMarket?: string;
}

export const ResearchInput: React.FC<ResearchInputProps> = ({
  onSubmit,
  isLoading = false,
  initialIdea = '',
  initialMarket = 'India',
}) => {
  const [businessIdea, setBusinessIdea] = useState(initialIdea);
  const [targetMarket, setTargetMarket] = useState(initialMarket);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessIdea.trim() || isLoading) return;
    onSubmit(businessIdea.trim(), targetMarket.trim());
  };

  const handleSuggestionClick = (item: { title: string; market: string }) => {
    setBusinessIdea(item.title);
    setTargetMarket(item.market);
    setSelectedSuggestion(item.title);
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 border border-slate-200/80 dark:border-slate-800 shadow-card transition-all">
      {/* Header & Subtitle */}
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Agent Swarm Orchestration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Generate Your Business Research Report
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Get comprehensive market research, competitive analysis, customer insights, and product strategy powered by LangGraph AI agents.
        </p>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
          {/* Business Idea Input */}
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Lightbulb className="w-5 h-5 text-blue-500" />
            </div>
            <input
              type="text"
              value={businessIdea}
              onChange={(e) => {
                setBusinessIdea(e.target.value);
                setSelectedSuggestion(null);
              }}
              placeholder="e.g. AI-powered resume screening platform"
              disabled={isLoading}
              maxLength={500}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-subtle disabled:opacity-60"
            />
          </div>

          {/* Target Market Dropdown */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4 text-blue-500" />
            </div>
            <select
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-subtle cursor-pointer disabled:opacity-60 appearance-none font-medium"
            >
              {TARGET_MARKETS.map((market: string) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Action Row & Start Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          {/* Suggested Ideas Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              Try:
            </span>
            {SUGGESTED_RESEARCH_IDEAS.map((item) => {
              const isSelected = selectedSuggestion === item.title;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleSuggestionClick(item)}
                  disabled={isLoading}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 border',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-slate-700 disabled:opacity-50'
                  )}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={!businessIdea.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-sm shadow-md hover:shadow-glow-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI agents are researching your idea...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Start Research</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
