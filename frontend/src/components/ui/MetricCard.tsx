import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  variant?: 'default' | 'primary' | 'purple' | 'emerald';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  description,
  trend,
  icon: Icon,
  variant = 'default',
  className,
}) => {
  const variantBg = {
    default: 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800',
    primary: 'bg-gradient-to-br from-blue-50/70 to-white dark:from-blue-950/20 dark:to-slate-900 border-blue-100 dark:border-blue-900/50',
    purple: 'bg-gradient-to-br from-purple-50/70 to-white dark:from-purple-950/20 dark:to-slate-900 border-purple-100 dark:border-purple-900/50',
    emerald: 'bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-950/20 dark:to-slate-900 border-emerald-100 dark:border-emerald-900/50',
  };

  const iconBg = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',
    primary: 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100/80 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
    emerald: 'bg-emerald-100/80 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl p-5 border shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between',
        variantBg[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className={cn('p-2 rounded-xl shrink-0', iconBg[variant])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </span>
          {change && (
            <span
              className={cn(
                'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
                trend === 'up' && 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
                trend === 'down' && 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300',
                trend === 'neutral' && 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
              )}
            >
              {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
              {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
              {change}
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
