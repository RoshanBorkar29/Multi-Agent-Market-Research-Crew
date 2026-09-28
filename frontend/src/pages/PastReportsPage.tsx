import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Plus 
} from 'lucide-react';
import { ResearchHistoryItem } from '../types/index';
import { EmptyState } from '../components/ui/EmptyState';
import { TARGET_MARKETS } from '../lib/constants';

export const PastReportsPage: React.FC = () => {
  const [reports] = useState<ResearchHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<string>('All');
  const navigate = useNavigate();

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.idea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.target_market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = selectedMarket === 'All' || r.target_market.includes(selectedMarket);
    return matchesSearch && matchesMarket;
  });

  return (
    <div className="space-y-6 max-w-6xl w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Research Reports History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse and export previously generated agentic market intelligence summaries.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Research</span>
        </button>
      </div>

      {/* Search & Filtering Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by keyword, sector, or idea..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs cursor-pointer font-medium"
          >
            <option value="All">All Target Markets</option>
            {TARGET_MARKETS.map((m: string) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <EmptyState
          title="No past research reports"
          description="Reports will appear here once generated through the research dashboard."
          actionText="+ Start New Research"
          onAction={() => navigate('/')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/')}
              className="p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle hover:shadow-card hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.idea}
              </h3>
              <p className="text-xs text-slate-400">{item.target_market}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
