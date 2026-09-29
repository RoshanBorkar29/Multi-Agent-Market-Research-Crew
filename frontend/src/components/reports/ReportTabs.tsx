import React from 'react';
import { 
  Search, 
  BarChart3, 
  Users, 
  Compass, 
  Globe,
  FileCheck2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type ReportTabKey = 
  | 'market' 
  | 'competitor' 
  | 'customer' 
  | 'strategy' 
  | 'sources'
  | 'final';

interface ReportTabsProps {
  activeTab: ReportTabKey;
  onTabChange: (tab: ReportTabKey) => void;
  sourcesCount?: number;
}

export const ReportTabs: React.FC<ReportTabsProps> = ({
  activeTab,
  onTabChange,
  sourcesCount = 0,
}) => {
  const tabs: { key: ReportTabKey; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string | number }[] = [
    { key: 'market', label: 'Market Research', icon: Search },
    { key: 'competitor', label: 'Competitor Intelligence', icon: BarChart3 },
    { key: 'customer', label: 'Customer Research', icon: Users },
    { key: 'strategy', label: 'Product Strategy', icon: Compass },
    { 
      key: 'sources', 
      label: 'Plan & Sources', 
      icon: Globe, 
      badge: sourcesCount > 0 ? sourcesCount : undefined 
    },
    { key: 'final', label: 'Summary', icon: FileCheck2 },
  ];

  return (
    <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-16 z-20 transition-colors">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150',
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
