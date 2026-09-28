import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BarChart3, 
  Users, 
  Compass, 
  Globe, 
  ListOrdered 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SectionNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface SectionNavProps {
  sourcesCount?: number;
}

export const SectionNav: React.FC<SectionNavProps> = ({ sourcesCount = 0 }) => {
  const [activeSection, setActiveSection] = useState<string>('summary');

  const sections: SectionNavItem[] = [
    { id: 'summary', label: 'Executive Summary', icon: Sparkles },
    { id: 'findings', label: 'Key Findings', icon: ListOrdered },
    { id: 'market', label: 'Market Landscape', icon: Search },
    { id: 'competitors', label: 'Competitor Intelligence', icon: BarChart3 },
    { id: 'customers', label: 'Customer Insights', icon: Users },
    { id: 'strategy', label: 'Product Strategy', icon: Compass },
    { 
      id: 'sources', 
      label: 'Evidence & Sources', 
      icon: Globe, 
      badge: sourcesCount > 0 ? sourcesCount : undefined 
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav 
      aria-label="Research Workspace Sections"
      className="sticky top-16 z-30 w-full py-2.5 px-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-y border-slate-200/80 dark:border-slate-800 shadow-2xs transition-colors rounded-2xl"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleScrollTo(sec.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer',
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{sec.label}</span>
              {sec.badge !== undefined && (
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-none',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  )}
                >
                  {sec.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
