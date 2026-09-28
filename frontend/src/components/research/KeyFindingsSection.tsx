import React, { useState } from 'react';
import { 
  ListOrdered, 
  Search, 
  BarChart3, 
  Users, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2 
} from 'lucide-react';
import { ResearchResponse } from '../../types/research';

interface KeyFindingsSectionProps {
  report: ResearchResponse;
}

interface FindingCardProps {
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  colorScheme: 'blue' | 'purple' | 'emerald' | 'amber';
  items: string[];
}

const FindingCard: React.FC<FindingCardProps> = ({
  title,
  category,
  icon: Icon,
  colorScheme,
  items = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const INITIAL_COUNT = 3;

  const colorStyles = {
    blue: {
      bg: 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    purple: {
      bg: 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/40 text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    emerald: {
      bg: 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    amber: {
      bg: 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40 text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  };

  const currentTheme = colorStyles[colorScheme];
  const displayedItems = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = items.length > INITIAL_COUNT;

  if (items.length === 0) {
    return (
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">{category}</h4>
        </div>
        <p className="text-xs text-slate-400 italic">No specific findings returned.</p>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-subtle flex flex-col justify-between space-y-4">
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-xl ${currentTheme.badge}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {title}
              </h4>
            </div>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentTheme.badge}`}>
            {items.length} findings
          </span>
        </div>

        <ul className="space-y-2">
          {displayedItems.map((item, idx) => (
            <li
              key={idx}
              className={`p-3 rounded-2xl ${currentTheme.bg} border text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${currentTheme.iconColor}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(prev => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2 cursor-pointer"
        >
          {expanded ? (
            <>
              <span>Show fewer</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>View all findings ({items.length})</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export const KeyFindingsSection: React.FC<KeyFindingsSectionProps> = ({ report }) => {
  const { market_report, competitor_report, customer_report, product_strategy } = report;

  const marketFindings = market_report?.key_findings || [];
  const competitorFindings = competitor_report?.key_findings || [];
  const customerFindings = customer_report?.key_findings || [];
  const strategyRecommendations = product_strategy?.recommendations || [];

  return (
    <section id="findings" className="scroll-mt-24 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <ListOrdered className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Findings Across Domains
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Critical evidence-backed takeaways synthesized across each research dimension
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FindingCard
          category="Market Landscape"
          title="Market Trends & Sizing"
          icon={Search}
          colorScheme="blue"
          items={marketFindings}
        />

        <FindingCard
          category="Competitive Intelligence"
          title="Competitor Dynamics & Gaps"
          icon={BarChart3}
          colorScheme="purple"
          items={competitorFindings}
        />

        <FindingCard
          category="Customer & ICP"
          title="Customer Pains & Motivations"
          icon={Users}
          colorScheme="emerald"
          items={customerFindings}
        />

        <FindingCard
          category="Product Strategy"
          title="Strategic Recommendations"
          icon={Compass}
          colorScheme="amber"
          items={strategyRecommendations}
        />
      </div>
    </section>
  );
};
