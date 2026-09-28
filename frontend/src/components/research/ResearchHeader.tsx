import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  PlusCircle, 
  FileCode, 
  Copy, 
  Check, 
  Globe, 
  CheckCircle2 
} from 'lucide-react';
import { ResearchResponse } from '../../types/research';

interface ResearchHeaderProps {
  report: ResearchResponse;
  onNewResearch: () => void;
  onRefreshResearch?: () => void;
  isLoading?: boolean;
}

export const ResearchHeader: React.FC<ResearchHeaderProps> = ({
  report,
  onNewResearch,
  onRefreshResearch,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = () => {
    const markdown = `# MarketMind AI — Research Dossier
Business Idea: ${report.idea}
Target Market: ${report.target_market}

## 1. Executive Market Overview
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

### Key Recommendations:
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
    downloadAnchor.setAttribute('download', `${(report.idea || 'research').toLowerCase().replace(/\s+/g, '-')}-research.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-elevated transition-all space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>LangGraph Multi-Agent Research</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Research completed</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {report.idea}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">Target Geography:</span>
              <strong className="text-white font-semibold">{report.target_market}</strong>
            </span>

            {report.sources && report.sources.length > 0 && (
              <span className="text-slate-400">
                • <strong className="text-white">{report.sources.length}</strong> sources verified
              </span>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onNewResearch}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Research</span>
          </button>

          {onRefreshResearch && (
            <button
              type="button"
              onClick={onRefreshResearch}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Research"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs transition-all cursor-pointer"
            title="Export JSON response"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs transition-all cursor-pointer"
            title="Copy Markdown Summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied MD</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
