import React from 'react';
import { 
  Check, 
  X, 
  ExternalLink, 
  Sparkles, 
  DollarSign, 
  Layers,
  FileCheck,
  Target
} from 'lucide-react';
import { CompetitorReport } from '../../types/research';
import { ReportSection } from './ReportSection';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

interface CompetitorResearchViewProps {
  data?: CompetitorReport | null;
}

export const CompetitorResearchView: React.FC<CompetitorResearchViewProps> = ({ data }) => {
  if (!data) {
    return (
      <section id="competitors" className="scroll-mt-24">
        <EmptyState
          title="Competitor research is not available yet"
          description="Run a research query to profile competitors and discover market gaps."
        />
      </section>
    );
  }

  return (
    <section id="competitors" className="scroll-mt-24">
      <ReportSection
        title="Competitor Intelligence"
        subtitle="Direct & indirect competitor profiling, pricing benchmarks, feature matrices, and positioning gaps"
        status="Completed"
      >
      <div className="space-y-8">
        {/* Section 1: Key Findings */}
        {data.key_findings && data.key_findings.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <FileCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Competitive Key Findings
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.key_findings.map((kf, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  • {kf}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Competitor Profiles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Competitor Profiles</span>
              <Badge variant="primary" size="sm">
                {data.competitors?.length || 0} Profiled
              </Badge>
            </h3>
          </div>

          {data.competitors && data.competitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.competitors.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {comp.name}
                        </h4>
                        {comp.website && (
                          <a
                            href={comp.website.startsWith('http') ? comp.website : `https://${comp.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <span>{comp.website.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {comp.pricing && (
                        <Badge variant="secondary" size="sm">
                          {comp.pricing}
                        </Badge>
                      )}
                    </div>

                    {comp.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {comp.description}
                      </p>
                    )}

                    {comp.target_customer && (
                      <div className="text-xs space-y-0.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Target Customer: </span>
                        <span className="text-slate-500">{comp.target_customer}</span>
                      </div>
                    )}

                    {/* Key Features */}
                    {comp.key_features && comp.key_features.length > 0 && (
                      <div className="text-xs space-y-1 pt-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Key Features:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {comp.key_features.map((feat, fIdx) => (
                            <span key={fIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Strengths & Weaknesses */}
                  {((comp.strengths && comp.strengths.length > 0) || (comp.weaknesses && comp.weaknesses.length > 0)) && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {comp.strengths && comp.strengths.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Strengths
                          </span>
                          <ul className="space-y-1">
                            {comp.strengths.map((st, sIdx) => (
                              <li key={sIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {comp.weaknesses && comp.weaknesses.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                            Weaknesses
                          </span>
                          <ul className="space-y-1">
                            {comp.weaknesses.map((wk, wIdx) => (
                              <li key={wIdx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                <X className="w-3 h-3 text-rose-500 shrink-0 mt-0.5" />
                                <span>{wk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No competitor profiles returned.</p>
          )}
        </div>

        {/* Section 3: Feature Comparison & Competitive Positioning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Comparison */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Feature Comparison & Parity
              </h3>
            </div>
            {data.feature_comparison && data.feature_comparison.length > 0 ? (
              <ul className="space-y-2.5">
                {data.feature_comparison.map((fc, i) => (
                  <li key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    {fc}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No feature comparison data returned.</p>
            )}
          </div>

          {/* Positioning */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Target className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Market Positioning
              </h3>
            </div>
            {data.positioning && data.positioning.length > 0 ? (
              <ul className="space-y-2.5">
                {data.positioning.map((pos, i) => (
                  <li key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    {pos}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No positioning analysis returned.</p>
            )}
          </div>
        </div>

        {/* Section 4: Competitive Gaps & Pricing Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Competitive Gaps */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 text-blue-600">
              <Sparkles className="w-5 h-5" />
              <span>Competitive Gaps & Opportunities</span>
            </h3>
            {data.competitive_gaps && data.competitive_gaps.length > 0 ? (
              <ul className="space-y-3 pt-1">
                {data.competitive_gaps.map((gap, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-3 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No competitive gaps listed.</p>
            )}
          </div>

          {/* Pricing Analysis */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 text-purple-600">
              <DollarSign className="w-5 h-5" />
              <span>Pricing Analysis</span>
            </h3>
            {data.pricing_analysis && data.pricing_analysis.length > 0 ? (
              <ul className="space-y-2.5 pt-1">
                {data.pricing_analysis.map((price, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                  >
                    {price}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No pricing analysis returned.</p>
            )}
          </div>
        </div>

        {/* Section 5: Evidence Grounding */}
        {data.evidence && data.evidence.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Evidence Supporting Competitor Claims
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
      </div>
    </ReportSection>
  </section>
  );
};
