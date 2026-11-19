import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Sparkles, AppWindow, Layers } from 'lucide-react';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { DivisionFlyout } from './DivisionFlyout';

// Subtitle mappings matching the wireframe specification
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

export const DivisionsNavRail: React.FC = () => {
  const [activeDivision, setActiveDivision] = useState<DivisionItem | null>(null);
  const [anchorTop, setAnchorTop] = useState<number>(0);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleItemMouseEnter = (division: DivisionItem, e: React.MouseEvent<HTMLElement>) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    const currentTarget = e.currentTarget;
    const parentContainer = containerRef.current;
    
    if (parentContainer && currentTarget) {
      const parentRect = parentContainer.getBoundingClientRect();
      const targetRect = currentTarget.getBoundingClientRect();
      const relativeTop = targetRect.top - parentRect.top;
      setAnchorTop(relativeTop);
    } else {
      setAnchorTop(currentTarget.offsetTop);
    }

    setActiveDivision(division);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    // 250ms hover bridge delay to allow smooth pointer transit to the flyout
    leaveTimerRef.current = setTimeout(() => {
      setActiveDivision(null);
    }, 250);
  };

  const handleFlyoutMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const handleFlyoutMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setActiveDivision(null);
    }, 250);
  };

  return (
    <aside
      ref={containerRef}
      aria-label="AIRIC 10 Divisions Navigation Rail"
      className="w-full h-full flex flex-col justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-xl relative select-none"
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Banner: Apps & Software Direct Access */}
      <div className="p-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-cyan-50/60 to-white dark:from-slate-900/90 dark:to-slate-900/60 shrink-0">
        <Link
          to="/apps"
          onMouseEnter={() => setActiveDivision(null)}
          className="group relative flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-cyan-500/10 dark:hover:bg-cyan-950/40 border border-slate-200/90 dark:border-slate-700/80 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <AppWindow className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors tracking-tight leading-tight">
                  Apps & Software
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 font-bold uppercase leading-none">
                  10 APPS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors truncate mt-0.5 leading-tight">
                Proprietary Software Systems
              </p>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
        </Link>
      </div>

      {/* Top Header Label */}
      <div className="px-3.5 py-2.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-cyan-400 uppercase">
            10 Divisions
          </span>
        </div>
        <Link
          to="/divisions"
          className="text-[10px] text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-300 font-mono transition-colors flex items-center gap-0.5"
        >
          <span>All</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </Link>
      </div>

      {/* 10 Division Items Stack - matching wireframe layout */}
      <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
        {instituteDivisions.map((division) => {
          const isActive = activeDivision?.id === division.id;
          const subtitle = divisionSubtitles[division.id] || division.tagline || 'Scientific Research';

          return (
            <Link
              key={division.id}
              to={`/divisions/${division.id}`}
              onMouseEnter={(e) => handleItemMouseEnter(division, e)}
              className={`group relative px-3 py-2 sm:py-2.5 transition-all duration-150 cursor-pointer flex items-center justify-between ${
                isActive
                  ? 'bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-900 dark:text-white border-l-4 border-cyan-500'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200 border-l-4 border-transparent'
              }`}
            >
              {/* Left: Division Name & Subtitle */}
              <div className="min-w-0 pr-2">
                <h4 className="text-xs sm:text-[13px] font-bold tracking-tight truncate leading-tight">
                  {division.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate mt-0.5">
                  {subtitle}
                </p>
              </div>

              {/* Right: Chevron Down Icon matching wireframe */}
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 rotate-180'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`}
              />
            </Link>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      <div className="px-3.5 py-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <span>PORTFOLIO</span>
        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">HOVER TO EXPLORE</span>
      </div>

      {/* Floating Glassmorphism Flyout Panel */}
      <DivisionFlyout
        division={activeDivision}
        anchorTop={anchorTop}
        onMouseEnter={handleFlyoutMouseEnter}
        onMouseLeave={handleFlyoutMouseLeave}
      />
    </aside>
  );
};
