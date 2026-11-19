import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  ChevronDown, Sparkles, Building2, BookOpen, Rocket, 
  TrendingUp, Cpu, GraduationCap, Users, HeartPulse, 
  Handshake, Bot, Shield, Layers, Search, X, ArrowRight,
  ExternalLink, Compass, ShieldAlert, UserCheck, LogIn, LogOut, AppWindow
} from 'lucide-react';
import { navigationCategories } from '../../data/navigation';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { Button } from '../ui/Button';

// Division Subtitle Mapping
const divisionSubtitles: Record<string, string> = {
  research: 'Scientific Research',
  innovation: 'Inventions & Rapid Prototyping',
  entrepreneurship: 'Startups & Venture Incubation',
  commercialization: 'Technology Transfer & IP Licensing',
  'ai-quantum': 'Artificial Intelligence & Quantum Systems',
  cybersecurity: 'Cyber Defense & Post-Quantum Cryptography',
  'data-analytics': 'Big Data & Analytical Intelligence',
  healthcare: 'Clinical AI & Digital Health Diagnostics',
  education: 'Academic Fellowships & AI Bootcamps',
  wellbeing: 'Mind Sciences & Cognitive Resilience',
};

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

const primaryMobileNav = [
  { name: 'Home', path: '/' },
  { name: 'Research Disciplines', path: '/research' },
  { name: 'Applications & Tools', path: '/apps' },
  { name: 'Publications & Preprints', path: '/publications' },
  { name: 'Research Projects', path: '/projects' },
  { name: 'Faculty & Experts', path: '/experts' },
  { name: 'News & Press', path: '/news' },
  { name: 'Events & Symposia', path: '/events' },
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'About Institute', path: '/about' },
  { name: 'Contact & Campus', path: '/contact' },
];

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
  onSwitchPortal: (role: 'guest' | 'researcher' | 'admin') => void;
  onOpenSearch: () => void;
  initialTab?: 'divisions' | 'pages';
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  role,
  onSwitchPortal,
  onOpenSearch,
  initialTab = 'divisions',
}) => {
  const [activeTab, setActiveTab] = useState<'divisions' | 'pages'>(initialTab);
  const [expandedDivision, setExpandedDivision] = useState<string | null>(null);
  const [expandedHub, setExpandedHub] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedDivision(null);
      setExpandedHub(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keep initial tab synced when drawer opens
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const toggleDivision = (id: string) => {
    setExpandedDivision(prev => (prev === id ? null : id));
  };

  const toggleHub = (id: string) => {
    setExpandedHub(prev => (prev === id ? null : id));
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end sm:justify-start">
      {/* Dark Blur Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="AIRIC Mobile Navigation Menu"
        className="relative z-10 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-cyan-500/20 shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] rounded-b-3xl sm:rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Drawer Header Bar */}
        <div className="px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-800 dark:text-cyan-400 uppercase">
              AIRIC Menu & Directory
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Navigation Menu"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search Trigger */}
        <div className="px-4 pt-3 pb-2 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Search research, apps, faculty...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-500">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Segmented Tab Bar (10 Divisions vs Institute Hubs) */}
        <div className="px-4 py-1.5 shrink-0">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('divisions')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'divisions'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>10 Divisions</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeTab === 'divisions' 
                  ? 'bg-cyan-500/20 dark:bg-slate-950/20 text-cyan-800 dark:text-slate-950' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}>
                10
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pages')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'pages'
                  ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Hubs & Directory</span>
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2 space-y-2 overscroll-contain">
          {/* TAB 1: 10 DIVISIONS (ACCORDION STACK) */}
          {activeTab === 'divisions' && (
            <div className="space-y-1.5 pb-2">
              {/* Apps & Software Featured Card */}
              <Link
                to="/apps"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 border border-cyan-500/30 text-slate-900 dark:text-white shadow-xs mb-2"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-xs">
                    <AppWindow className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold">Apps & Software</span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold uppercase">
                        10 APPS
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Proprietary Software Systems
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </Link>

              <div className="flex items-center justify-between px-1 py-1 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span className="uppercase tracking-wider font-semibold">Institute Divisions</span>
                <Link
                  to="/divisions"
                  onClick={onClose}
                  className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Explore Grid</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {instituteDivisions.map((division) => {
                const isExpanded = expandedDivision === division.id;
                const subtitle = divisionSubtitles[division.id] || division.tagline || 'Scientific Research';

                return (
                  <div
                    key={division.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded 
                        ? 'border-cyan-500/40 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-xs' 
                        : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60'
                    }`}
                  >
                    {/* Header Row Trigger */}
                    <button
                      onClick={() => toggleDivision(division.id)}
                      className="w-full p-3 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="w-7 h-7 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                          {division.number}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                            {division.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {subtitle}
                          </div>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-cyan-500' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-200/50 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/50 space-y-2.5 animate-in fade-in duration-150">
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {division.mandate || division.description}
                        </p>

                        {/* Focus Areas Badges */}
                        {division.focusAreas && division.focusAreas.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                              Core Disciplines
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {division.focusAreas.slice(0, 4).map((area, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-medium"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Direct Action Link */}
                        <div className="pt-1 flex items-center justify-between gap-2">
                          <Link
                            to={`/divisions`}
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 py-1"
                          >
                            <span>Open Division Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                            TRL {division.keyProjects?.[0]?.trlLevel || '1-9'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: HUBS, DIRECTORY & PAGES */}
          {activeTab === 'pages' && (
            <div className="space-y-4 pb-2">
              {/* Primary Fast Links */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  Core Navigation
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {primaryMobileNav.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-500/30'
                            : 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-transparent'
                        }`
                      }
                    >
                      <span className="truncate">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* 10 Institutional Hubs Accordion */}
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1.5">
                  10 Institutional Hubs
                </span>
                <div className="space-y-1">
                  {navigationCategories.map((cat) => {
                    const isExpanded = expandedHub === cat.id;
                    const Icon = iconMap[cat.iconName] || Layers;

                    return (
                      <div
                        key={cat.id}
                        className="rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleHub(cat.id)}
                          className="w-full px-3 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="font-mono text-[10px] text-slate-400 font-bold">
                              {cat.number}
                            </span>
                            <Icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                              {cat.title}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                              isExpanded ? 'rotate-180 text-cyan-500' : ''
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 pt-1 border-t border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/60 space-y-2">
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-500 italic truncate max-w-[70%]">
                                {cat.tagline}
                              </span>
                              <Link
                                to={cat.path}
                                onClick={onClose}
                                className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
                              >
                                Hub Home →
                              </Link>
                            </div>

                            {cat.sections.map((section, sIdx) => (
                              <div key={sIdx} className="space-y-1">
                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                                  {section.title}
                                </span>
                                <div className="grid grid-cols-1 gap-1">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.path}
                                      to={item.path}
                                      onClick={onClose}
                                      className="px-2 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
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
              </div>
            </div>
          )}
        </div>

        {/* Bottom Drawer Actions Strip */}
        <div className="px-4 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/90 shrink-0 space-y-2.5">
          {/* Workspace Switcher */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSwitchPortal('researcher');
                onClose();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                role === 'researcher'
                  ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 border-cyan-500/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>Faculty Portal</span>
            </button>

            <button
              onClick={() => {
                onSwitchPortal('admin');
                onClose();
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
                role === 'admin'
                  ? 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-500" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Primary Collaborate Button */}
          <Link
            to="/collaborate"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaborate With AIRIC</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
