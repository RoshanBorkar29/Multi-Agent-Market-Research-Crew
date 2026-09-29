import React, { useState } from 'react';
import { Copy, Download, Bookmark, Check } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

interface ReportSectionProps {
  title: string;
  subtitle?: string;
  status?: 'Completed' | 'In Progress' | 'Draft';
  children: React.ReactNode;
  onSave?: () => void;
  onDownload?: () => void;
  className?: string;
  rawTextForCopy?: string;
}

export const ReportSection: React.FC<ReportSectionProps> = ({
  title,
  subtitle,
  status = 'Completed',
  children,
  onSave,
  onDownload,
  className,
  rawTextForCopy = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    if (rawTextForCopy) {
      navigator.clipboard.writeText(rawTextForCopy);
    } else {
      navigator.clipboard.writeText(`${title}\n${subtitle || ''}\nMarketMind AI Research Report`);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    if (onSave) onSave();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      window.print();
    }
  };

  return (
    <div className={cn('space-y-6 pt-2', className)}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <Badge variant="success" size="sm" dot>
              {status}
            </Badge>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons: Copy, Download, Save */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Copy section to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            title="Download PDF or print report"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>

          <button
            onClick={handleSave}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
              saved
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
            )}
            title="Save to ideas"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{saved ? 'Saved!' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};
