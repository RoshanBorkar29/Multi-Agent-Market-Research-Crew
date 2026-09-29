import React from 'react';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Award,
  Compass,
  Lightbulb,
  ListOrdered
} from 'lucide-react';
import { ProductStrategy } from '../../types/research';
import { ReportSection } from './ReportSection';
import { EmptyState } from '../ui/EmptyState';

interface ProductStrategyViewProps {
  data?: ProductStrategy | null;
}

export const ProductStrategyView: React.FC<ProductStrategyViewProps> = ({ data }) => {
  if (!data) {
    return (
      <section id="strategy" className="scroll-mt-24">
        <EmptyState
          title="Product strategy is not available yet"
          description="Run a research query to generate value propositions, MVP feature priorities, and positioning."
        />
      </section>
    );
  }

  return (
    <section id="strategy" className="scroll-mt-24">
      <ReportSection
        title="Product Strategy & Recommendations"
        subtitle="Core value proposition, market positioning, MVP feature priorities, differentiators, and recommendations"
        status="Completed"
      >
      <div className="space-y-8">
        {/* Section 1: Value Proposition Canvas */}
        {data.value_proposition && (
          <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-card space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Core Value Proposition
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-relaxed">
              {data.value_proposition}
            </h3>
          </div>
        )}

        {/* Section 2: Market Positioning Statement */}
        {data.positioning && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Market Positioning
            </h4>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {data.positioning}
            </p>
          </div>
        )}

        {/* Section 3: MVP Features & Priorities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MVP Features */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Layers className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                MVP Features
              </h3>
            </div>
            {data.mvp_features && data.mvp_features.length > 0 ? (
              <ul className="space-y-2.5">
                {data.mvp_features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No MVP features returned.</p>
            )}
          </div>

          {/* Feature Priorities */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <ListOrdered className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Feature Priorities
              </h3>
            </div>
            {data.feature_priorities && data.feature_priorities.length > 0 ? (
              <ul className="space-y-2.5">
                {data.feature_priorities.map((fp, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{fp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No feature priorities returned.</p>
            )}
          </div>
        </div>

        {/* Section 4: Differentiators & Strategic Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Differentiators */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Product Differentiators & Moats
              </h3>
            </div>
            {data.differentiators && data.differentiators.length > 0 ? (
              <ul className="space-y-2.5">
                {data.differentiators.map((diff, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No differentiators returned.</p>
            )}
          </div>

          {/* Recommendations */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Strategic Recommendations
              </h3>
            </div>
            {data.recommendations && data.recommendations.length > 0 ? (
              <ul className="space-y-2.5">
                {data.recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                  >
                    <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400 italic">No strategic recommendations returned.</p>
            )}
          </div>
        </div>
      </div>
    </ReportSection>
  </section>
  );
};
