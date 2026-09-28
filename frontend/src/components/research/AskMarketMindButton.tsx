import React, { useState } from 'react';
import { Sparkles, MessageSquare, X } from 'lucide-react';

export const AskMarketMindButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-elevated hover:shadow-glow-primary transition-all duration-200 active:scale-95 cursor-pointer group"
        aria-label="Ask MarketMind Assistant"
      >
        <div className="p-1 rounded-lg bg-white/20 text-white">
          {isOpen ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
        </div>
        <span>Ask MarketMind</span>
        <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-blue-100 font-bold hidden sm:inline">
          AI
        </span>
      </button>

      {/* Placeholder Modal / Flyout for future RAG */}
      {isOpen && (
        <div className="mt-3 w-80 sm:w-96 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-elevated animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ask MarketMind</h4>
                <p className="text-[11px] text-slate-400">Context-aware research copilot</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
              Coming Soon
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
            Interactive deep-dive chat and retrieval over this market research dossier is being prepared for the upcoming release.
          </p>
        </div>
      )}
    </div>
  );
};
