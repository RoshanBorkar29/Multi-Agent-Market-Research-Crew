import React from 'react';
import { 
  Users, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Briefcase, 
  HelpCircle, 
  ShieldAlert,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { CustomerReport } from '../../types/research';
import { ReportSection } from './ReportSection';
import { EmptyState } from '../ui/EmptyState';

interface CustomerResearchViewProps {
  data?: CustomerReport | null;
}

export const CustomerResearchView: React.FC<CustomerResearchViewProps> = ({ data }) => {
  if (!data) {
    return (
      <section id="customers" className="scroll-mt-24">
        <EmptyState
          title="Customer research is not available yet"
          description="Run a research query to analyze customer segments, pain points, and JTBD insights."
        />
      </section>
    );
  }

  return (
    <section id="customers" className="scroll-mt-24">
      <ReportSection
        title="Customer Insights & ICP Analysis"
        subtitle="Target buyer segments, Jobs-To-Be-Done (JTBD), acute pain points, buying motivations, and adoption barriers"
        status="Completed"
      >
      <div className="space-y-8">
        {/* Section 1: Key Findings */}
        {data.key_findings && data.key_findings.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <FileCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Customer Research Key Findings
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.key_findings.map((kf, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{kf}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Customer Segments & Core Needs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Segments */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Users className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Target Customer Segments
              </h3>
            </div>
            {data.customer_segments && data.customer_segments.length > 0 ? (
              <ul className="space-y-2.5">
                {data.customer_segments.map((seg, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>{seg}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No customer segments returned.</p>
            )}
          </div>

          {/* Needs */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Core Customer Needs
              </h3>
            </div>
            {data.needs && data.needs.length > 0 ? (
              <ul className="space-y-2.5">
                {data.needs.map((need, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No customer needs returned.</p>
            )}
          </div>
        </div>

        {/* Section 3: JTBD & Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jobs To Be Done */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Target className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Jobs To Be Done (JTBD)
              </h3>
            </div>
            {data.jobs_to_be_done && data.jobs_to_be_done.length > 0 ? (
              <ul className="space-y-2.5">
                {data.jobs_to_be_done.map((jtbd, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                  >
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">🎯</span>
                    <span>{jtbd}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No JTBD data returned.</p>
            )}
          </div>

          {/* Pain Points */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Acute Customer Pain Points
              </h3>
            </div>
            {data.pain_points && data.pain_points.length > 0 ? (
              <ul className="space-y-2.5">
                {data.pain_points.map((pp, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{pp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No pain points returned.</p>
            )}
          </div>
        </div>

        {/* Section 4: Buying Motivations & Adoption Barriers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buying Motivations */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Buying Motivations & Triggers
              </h3>
            </div>
            {data.buying_motivations && data.buying_motivations.length > 0 ? (
              <ul className="space-y-2.5">
                {data.buying_motivations.map((bm, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{bm}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No buying motivations returned.</p>
            )}
          </div>

          {/* Adoption Barriers */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Adoption Barriers & Friction
              </h3>
            </div>
            {data.barriers && data.barriers.length > 0 ? (
              <ul className="space-y-2.5">
                {data.barriers.map((barrier, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{barrier}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No adoption barriers returned.</p>
            )}
          </div>
        </div>

        {/* Section 5: Evidence Grounding */}
        {data.evidence && data.evidence.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Evidence Supporting Customer Claims
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
