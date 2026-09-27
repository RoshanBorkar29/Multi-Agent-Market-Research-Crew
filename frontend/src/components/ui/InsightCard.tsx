import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface InsightCardProps {
  title: string;
  category?: string;
  description: string;
  type?: 'positive' | 'warning' | 'neutral' | 'ai';
  icon?: LucideIcon;
  badgeText?: string;
  className?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  title,
  category,
  description,
  type = 'ai',
  icon: CustomIcon,
  badgeText,
  className,
}) => {
  const typeStyles = {
    ai: {
      border: 'border-blue-100 dark:border-blue-900/40',
      bg: 'bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/20 dark:from-slate-900 dark:to-slate-900',
      iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
      defaultIcon: Sparkles,
    },
    positive: {
      border: 'border-emerald-100 dark:border-emerald-900/40',
      bg: 'bg-gradient-to-br from-emerald-50/40 via-white to-white dark:from-slate-900 dark:to-slate-900',
      iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
      defaultIcon: CheckCircle2,
    },
    warning: {
      border: 'border-amber-100 dark:border-amber-900/40',
      bg: 'bg-gradient-to-br from-amber-50/40 via-white to-white dark:from-slate-900 dark:to-slate-900',
      iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
      defaultIcon: AlertTriangle,
    },
    neutral: {
      border: 'border-slate-200 dark:border-slate-800',
      bg: 'bg-white dark:bg-slate-900',
      iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
      defaultIcon: ArrowRight,
    },
  };

  const style = typeStyles[type];
  const Icon = CustomIcon || style.defaultIcon;

  return (
    <div
      className={cn(
        'rounded-2xl p-4.5 border shadow-subtle hover:shadow-card transition-all duration-200 flex items-start gap-3.5',
        style.bg,
        style.border,
        className
      )}
    >
      <div className={cn('p-2.5 rounded-xl shrink-0 mt-0.5', style.iconBg)}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
            {title}
          </h4>
          {(badgeText || category) && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
              {badgeText || category}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
