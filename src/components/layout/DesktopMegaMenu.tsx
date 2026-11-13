import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, ArrowRight, Layers, Building2, BookOpen, 
  Rocket, TrendingUp, Cpu, GraduationCap, Users, 
  HeartPulse, Handshake, Bot, Sparkles, X, ChevronRight 
} from 'lucide-react';
import { navigationCategories, NavCategory } from '../../data/navigation';

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

interface DesktopMegaMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const DesktopMegaMenu: React.FC<DesktopMegaMenuProps> = ({ isOpen, onToggle, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<NavCategory>(navigationCategories[0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Keyboard navigation (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const ActiveIcon = iconMap[activeCategory.iconName] || Layers;

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
          isOpen
            ? 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/30'
            : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
        }`}
        aria-expanded={isOpen}
      >
        <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
        <span>10 Institute Hubs</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mega Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[92vw] max-w-6xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-navy-950/98 shadow-2xl backdrop-blur-2xl p-6 z-50 animate-fade-in overflow-hidden">
          {/* Top Panel Banner */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-bold border border-cyan-500/20">
                10-CATEGORY DIRECTORY
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Select an institutional division to view sub-sections and resources
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-6 items-start max-h-[70vh] overflow-y-auto pr-1">
            {/* Left 4 Cols: Category Index (01 through 10) */}
            <div className="col-span-4 space-y-1 pr-3 border-r border-slate-100 dark:border-slate-800/80">
              {navigationCategories.map((cat) => {
                const CatIcon = iconMap[cat.iconName] || Layers;
                const isSelected = activeCategory.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer group ${
                      isSelected
                        ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 font-bold shadow-xs border border-cyan-200 dark:border-cyan-500/20'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                        {cat.number}
                      </span>
                      <CatIcon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                      <span className="truncate">{cat.shortTitle}</span>
                    </div>
                    <ChevronRight className={`w-3 h-3 text-slate-400 shrink-0 ${isSelected ? 'opacity-100 text-cyan-600 dark:text-cyan-400 translate-x-0.5' : 'opacity-0 group-hover:opacity-100'} transition-all`} />
                  </button>
                );
              })}
            </div>

            {/* Right 8 Cols: Active Category Details & Sections */}
            <div className="col-span-8 pl-2 space-y-6">
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-cyan-700 dark:text-cyan-400">
                      CATEGORY {activeCategory.number}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Division Hub</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
                    {activeCategory.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                    {activeCategory.tagline}
                  </p>
                </div>

                <Link
                  to={activeCategory.path}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs shrink-0 transition-all hover:gap-2"
                >
                  <span>Explore Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Category Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeCategory.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2.5">
                    <h4 className="text-[11px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      {section.title}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 block transition-all group border border-transparent hover:border-slate-200 dark:hover:border-slate-700/60"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">
                              {item.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
