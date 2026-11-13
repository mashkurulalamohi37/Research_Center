import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  ChevronDown, Sparkles, Building2, BookOpen, Rocket, 
  TrendingUp, Cpu, GraduationCap, Users, HeartPulse, 
  Handshake, Bot, Shield, Layers, Search 
} from 'lucide-react';
import { navigationCategories, NavCategory } from '../../data/navigation';
import { Button } from '../ui/Button';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  BookOpen,
  Rocket,
  TrendingUp,
  Cpu,
  GraduationCap,
  Users,
  HeartPulse,
  Handshake,
  Bot,
};

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
  onSwitchPortal: (role: 'guest' | 'researcher' | 'admin') => void;
  onOpenSearch: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  role,
  onSwitchPortal,
  onOpenSearch,
}) => {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCat(expandedCat === id ? null : id);
  };

  return (
    <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 dark:bg-navy-950/98 border-b border-slate-200 dark:border-cyan-500/20 backdrop-blur-2xl p-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
      {/* Search Bar Prompt */}
      <button
        onClick={() => { onClose(); onOpenSearch(); }}
        className="w-full mb-4 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Search articles, apps, faculty...</span>
        </span>
        <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>

      {/* 10 Categories Accordion List */}
      <div className="space-y-1 mb-5">
        <div className="px-2 py-1 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          10 Institutional Hubs
        </div>

        {navigationCategories.map((cat) => {
          const isExpanded = expandedCat === cat.id;
          const Icon = iconMap[cat.iconName] || Layers;

          return (
            <div
              key={cat.id}
              className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden bg-slate-50/50 dark:bg-slate-900/40"
            >
              {/* Category Header Row */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">
                    {cat.number}
                  </span>
                  <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {cat.title}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-cyan-500' : ''
                  }`}
                />
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-200/40 dark:border-slate-800/40 bg-white/80 dark:bg-slate-950/60 space-y-3">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 italic">
                      {cat.tagline}
                    </span>
                    <Link
                      to={cat.path}
                      onClick={onClose}
                      className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
                    >
                      Hub Home →
                    </Link>
                  </div>

                  {cat.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        {section.title}
                      </span>
                      <div className="grid grid-cols-1 gap-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className="px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
                          >
                            <span>{item.name}</span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 font-bold">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Workspace Switcher */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2.5 mb-4">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Direct Workspace Switcher
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { onSwitchPortal('researcher'); onClose(); }}
            className={`text-xs ${role === 'researcher' ? 'border-cyan-500 text-cyan-600' : ''}`}
          >
            Researcher UI
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { onSwitchPortal('admin'); onClose(); }}
            className={`text-xs ${role === 'admin' ? 'border-purple-500 text-purple-600' : ''}`}
          >
            Admin Portal
          </Button>
        </div>
      </div>

      {/* Collaborate CTA */}
      <Link to="/collaborate" onClick={onClose} className="w-full block">
        <Button variant="cyan" size="md" className="w-full text-xs">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Collaborate With AIRIC
        </Button>
      </Link>
    </div>
  );
};
