import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Compass, 
  ShieldAlert, 
  ExternalLink,
  CheckCircle2,
  Layers,
  FileCheck
} from 'lucide-react';
import { MarketReport, SourceItem } from '../../types/research';
import { ReportSection } from './ReportSection';
import { EmptyState } from '../ui/EmptyState';

interface MarketResearchViewProps {
  data?: MarketReport | null;
  sources?: SourceItem[];
}

export const MarketResearchView: React.FC<MarketResearchViewProps> = ({ data, sources = [] }) => {
  if (!data) {
    return (
      <section id="market" className="scroll-mt-24">
        <EmptyState
          title="Market research is not available yet"
          description="Run a research query to generate real-time market intelligence."
        />
      </section>
    );
  }

  return (
    <section id="market" className="scroll-mt-24">
      <ReportSection
        title="Market Landscape & Overview"
        subtitle="Macro market overview, industry segments, market trends, growth signals, and market risks"
        status="Completed"
      >
      <div className="space-y-6">
        {/* Section 1: Market Overview */}
        {data.market_overview && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Market Overview
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {data.market_overview}
            </p>
          </div>
        )}

        {/* Section 2: Key Findings */}
        {data.key_findings && data.key_findings.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <FileCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Key Market Findings
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.key_findings.map((finding, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Market Segments & Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Segments */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Target Market Segments
              </h3>
            </div>
            {data.market_segments && data.market_segments.length > 0 ? (
              <ul className="space-y-2.5">
                {data.market_segments.map((seg, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>{seg}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No specific segment breakdown returned.</p>
            )}
          </div>

          {/* Trends */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Market Trends
              </h3>
            </div>
            {data.market_trends && data.market_trends.length > 0 ? (
              <ul className="space-y-2.5">
                {data.market_trends.map((trend, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No market trends returned.</p>
            )}
          </div>
        </div>

        {/* Section 4: Demand Signals, Opportunities & Risks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Demand Signals */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Demand Signals
              </h3>
            </div>
            {data.demand_signals && data.demand_signals.length > 0 ? (
              <ul className="space-y-2">
                {data.demand_signals.map((signal, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No demand signals listed.</p>
            )}
          </div>

          {/* Growth Opportunities */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Compass className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Growth Opportunities
              </h3>
            </div>
            {data.growth_opportunities && data.growth_opportunities.length > 0 ? (
              <ul className="space-y-2">
                {data.growth_opportunities.map((opp, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {opp}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No growth opportunities listed.</p>
            )}
          </div>

          {/* Risks */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Market Risks
              </h3>
            </div>
            {data.risks && data.risks.length > 0 ? (
              <ul className="space-y-2">
                {data.risks.map((risk, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {risk}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No market risks listed.</p>
            )}
          </div>
        </div>

        {/* Section 5: Evidence Grounding */}
        {data.evidence && data.evidence.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Evidence Supporting Claims
            </h3>
            <div className="space-y-3">
              {data.evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 text-xs"
                >
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    "{ev.claim}"
                  </p>
                  {ev.supporting_text && (
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {ev.supporting_text}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">{ev.source_title}</span>
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <span>Source Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Verified Sources */}
        {sources && sources.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Verified Sources Used
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {sources.length} sources returned
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all flex items-start gap-3 group"
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
          </div>
        )}
      </div>
    </ReportSection>
  </section>
  );
};
