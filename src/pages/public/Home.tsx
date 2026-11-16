import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { DivisionsNavRail } from '../../components/home/DivisionsNavRail';
import { CenterHeroStage } from '../../components/home/CenterHeroStage';
import { VideoCarousel } from '../../components/home/VideoCarousel';
import { instituteDivisions } from '../../data/divisions';

export const Home: React.FC = () => {
  useDocumentTitle('AIRIC | Advanced Intelligence Research Innovation Commercialization Institute');

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden relative bg-slate-100/70 dark:bg-slate-950">
      {/* Desktop Left Navigation Rail (10 Divisions with Subtitles & Hover Flyouts) */}
      <div className="hidden lg:block lg:w-[275px] xl:w-[295px] lg:h-full shrink-0 z-30">
        <DivisionsNavRail />
      </div>

      {/* Main Stage: Hero Stage + Bottom-Right Video Carousel */}
      <div className="flex-1 min-w-0 w-full flex flex-col lg:h-full lg:justify-between p-2 sm:p-3 lg:p-4 overflow-y-auto lg:overflow-hidden space-y-4 lg:space-y-0 relative">
        {/* Center Hero Stage (Starts directly below navbar) */}
        <div className="shrink-0 w-full pt-0.5">
          <CenterHeroStage />
        </div>

        {/* Mobile & Tablet Quick Division Showcase Strip (Visible only on < lg) */}
        <div className="lg:hidden w-full px-2 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md">
          <div className="flex items-center justify-between px-1 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800 dark:text-cyan-400 uppercase">
                10 Institute Divisions
              </span>
            </div>
            <Link
              to="/divisions"
              className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Horizontal scrollable pills for fast touch browsing on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {instituteDivisions.map((division) => (
              <Link
                key={division.id}
                to={`/divisions`}
                className="shrink-0 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 font-medium transition-colors flex items-center gap-1.5"
              >
                <span className="w-4 h-4 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[9px] font-mono font-bold flex items-center justify-center">
                  {division.number}
                </span>
                <span className="truncate max-w-[130px]">{division.shortName || division.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Video Carousel Module */}
        <div className="w-full max-w-3xl xl:max-w-4xl ml-auto min-h-[380px] sm:min-h-[360px] md:h-[300px] xl:h-[320px] shrink-0 z-10">
          <VideoCarousel />
        </div>
      </div>
    </div>
  );
};
