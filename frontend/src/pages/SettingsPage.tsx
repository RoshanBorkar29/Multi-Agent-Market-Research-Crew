import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Palette, 
  ShieldCheck, 
  Sliders, 
  Check, 
  RefreshCw, 
  Zap, 
  Sun, 
  Moon, 
  Laptop
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { checkBackendHealth } from '../api/research';
import { TARGET_MARKETS } from '../lib/constants';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'api' | 'preferences'>('profile');

  // Profile state
  const [name, setName] = useState('Researcher');
  const [email, setEmail] = useState('researcher@marketmind.ai');
  const [company, setCompany] = useState('MarketMind Labs');

  // API Configuration state
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestStatus, setApiTestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Research preferences
  const [defaultMarket, setDefaultMarket] = useState('India');

  const [isSaved, setIsSaved] = useState(false);

  const handleTestApiConnection = async () => {
    setIsTestingApi(true);
    setApiTestStatus('idle');
    try {
      const res = await checkBackendHealth();
      if (res.status === 'healthy') {
        setApiTestStatus('success');
      } else {
        setApiTestStatus('error');
      }
    } catch {
      setApiTestStatus('error');
    } finally {
      setIsTestingApi(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
    { id: 'api', label: 'FastAPI Backend Connection', icon: ShieldCheck },
    { id: 'preferences', label: 'Research Defaults', icon: Sliders },
  ];

  return (
    <div className="space-y-6 max-w-5xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-blue-600" />
            <span>Platform Settings & API Status</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure appearance, API connection, and user preferences.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold text-xs animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Settings Navigation Tabs */}
        <div className="md:col-span-4 bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors text-left cursor-pointer',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Tab Content */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-subtle">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* 1. PROFILE */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Information</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Organization</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. APPEARANCE */}
            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance & Theme</h3>
                <p className="text-xs text-slate-500">Choose how MarketMind AI looks on your device.</p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={cn(
                      'p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer',
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 font-bold ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    )}
                  >
                    <Sun className="w-5 h-5 mx-auto" />
                    <span className="text-xs block">Light Theme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer',
                      theme === 'dark'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 font-bold ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    )}
                  >
                    <Moon className="w-5 h-5 mx-auto" />
                    <span className="text-xs block">Dark Theme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme('system')}
                    className={cn(
                      'p-4 rounded-2xl border text-center space-y-2 transition-all cursor-pointer',
                      theme === 'system'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 font-bold ring-2 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                    )}
                  >
                    <Laptop className="w-5 h-5 mx-auto" />
                    <span className="text-xs block">System Default</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. FASTAPI API CONFIGURATION */}
            {activeTab === 'api' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>FastAPI Backend Connection</span>
                    <Badge variant="primary" size="sm">REST Service</Badge>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Configured via <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]">VITE_API_BASE_URL</code> in <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]">.env.local</code>.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      FastAPI Base URL
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={apiUrl}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 cursor-not-allowed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleTestApiConnection}
                      disabled={isTestingApi}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      {isTestingApi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                      <span>Test GET /health</span>
                    </button>

                    {apiTestStatus === 'success' && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Backend Connected & Healthy
                      </span>
                    )}

                    {apiTestStatus === 'error' && (
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                        Unable to connect to backend at {apiUrl}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESEARCH PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Research Defaults</h3>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Default Target Market</label>
                    <select
                      value={defaultMarket}
                      onChange={(e) => setDefaultMarket(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                    >
                      {TARGET_MARKETS.map((m: string) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
