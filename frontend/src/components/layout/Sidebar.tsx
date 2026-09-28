import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  LayoutDashboard, 
  FileText, 
  Bookmark, 
  Settings, 
  Bot
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Past Reports', icon: FileText, path: '/history' },
    { label: 'Saved Ideas', icon: Bookmark, path: '/saved' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNewResearchClick = () => {
    navigate('/');
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 lg:top-16 z-40 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="space-y-6">
          {/* Primary Action: + New Research */}
          <div>
            <button
              onClick={handleNewResearchClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow-glow-primary transition-all duration-150 active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Research</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Workspace
            </p>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    )
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Agent Swarm Info Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800/20 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                LangGraph Agents
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              7 parallel & critic research agents orchestrated for comprehensive market synthesis.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
