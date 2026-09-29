import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Target, 
  Sparkles, 
  Compass, 
  Users,
  FileCode,
  ExternalLink
} from 'lucide-react';
import { ResearchResponse } from '../../types/research';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

interface FinalReportViewProps {
  report?: ResearchResponse | null;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({ report }) => {
  const [copied, setCopied] = useState(false);

  if (!report) {
    return (
      <EmptyState
        title="No research summary generated yet"
        description="Enter a business idea to generate a comprehensive research summary."
      />
    );
  }

  const handleCopyAll = () => {
    const markdown = `# MarketMind AI — Executive Intelligence Summary
Business Idea: ${report.idea}
Target Market: ${report.target_market}

## 1. Market Research
${report.market_report?.market_overview || 'N/A'}

### Key Market Findings:
${report.market_report?.key_findings?.map(f => `- ${f}`).join('\n') || 'N/A'}

## 2. Competitor Intelligence
${report.competitor_report?.key_findings?.map(f => `- ${f}`).join('\n') || 'N/A'}

### Competitive Gaps:
${report.competitor_report?.competitive_gaps?.map(g => `- ${g}`).join('\n') || 'N/A'}

## 3. Customer Research
### Customer Segments:
${report.customer_report?.customer_segments?.map(s => `- ${s}`).join('\n') || 'N/A'}

### Pain Points:
${report.customer_report?.pain_points?.map(p => `- ${p}`).join('\n') || 'N/A'}

## 4. Product Strategy
Value Proposition: ${report.product_strategy?.value_proposition || 'N/A'}
Positioning: ${report.product_strategy?.positioning || 'N/A'}

### Recommendations:
${report.product_strategy?.recommendations?.map(r => `- ${r}`).join('\n') || 'N/A'}

Generated autonomously via MarketMind AI Multi-Agent Backend.`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${report.idea.toLowerCase().replace(/\s+/g, '-')}-summary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Summary Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl border border-slate-800 shadow-elevated space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm" dot>
                LangGraph Multi-Agent Research Summary
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {report.idea}
            </h1>

            <p className="text-sm text-slate-300">
              <span className="text-slate-400">Target Geography:</span>{' '}
              <span className="font-semibold text-white">{report.target_market}</span>
            </p>
          </div>

          {/* Summary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy Report'}</span>
            </button>
          </div>
        </div>

        {/* Real Summary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Market Findings</span>
            <p className="text-lg font-bold text-blue-400">{report.market_report?.key_findings?.length ?? 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Competitors</span>
            <p className="text-lg font-bold text-purple-400">{report.competitor_report?.competitors?.length ?? 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Pain Points</span>
            <p className="text-lg font-bold text-rose-400">{report.customer_report?.pain_points?.length ?? 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Sources Citations</span>
            <p className="text-lg font-bold text-emerald-400">{report.sources?.length ?? 0}</p>
          </div>
        </div>
      </div>

      {/* Unified Sections */}
      <div className="space-y-6">
        {/* Section 1: Market Research Overview */}
        {report.market_report && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Target className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Market Overview & Key Findings
              </h3>
            </div>
            {report.market_report.market_overview && (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {report.market_report.market_overview}
              </p>
            )}
            {report.market_report.key_findings && report.market_report.key_findings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {report.market_report.key_findings.map((f, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
                    • {f}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Competitor Intelligence */}
        {report.competitor_report && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Competitor Intelligence & Gaps
              </h3>
            </div>
            {report.competitor_report.competitive_gaps && report.competitor_report.competitive_gaps.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Competitive Gaps:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {report.competitor_report.competitive_gaps.map((gap, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-slate-700 dark:text-slate-300">
                      ⭐ {gap}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 3: Customer Research */}
        {report.customer_report && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <Users className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3. Customer Research & JTBD
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.customer_report.customer_segments && report.customer_report.customer_segments.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Segments:</span>
                  <ul className="space-y-1">
                    {report.customer_report.customer_segments.map((seg, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-400">• {seg}</li>
                    ))}
                  </ul>
                </div>
              )}
              {report.customer_report.pain_points && report.customer_report.pain_points.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Pain Points:</span>
                  <ul className="space-y-1">
                    {report.customer_report.pain_points.map((pp, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-400">• {pp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 4: Product Strategy */}
        {report.product_strategy && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 text-indigo-600">
              <Compass className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Product Strategy & Recommendations
              </h3>
            </div>
            {report.product_strategy.value_proposition && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Value Proposition</span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{report.product_strategy.value_proposition}</p>
              </div>
            )}
            {report.product_strategy.recommendations && report.product_strategy.recommendations.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Recommendations:</span>
                <div className="space-y-1.5">
                  {report.product_strategy.recommendations.map((rec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-300">
                      • {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 5: Sources Citations */}
        {report.sources && report.sources.length > 0 && (
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5. Sources & Citations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {report.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-xs block truncate hover:text-blue-600"
                >
                  <span className="font-semibold">{src.title || src.url}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
