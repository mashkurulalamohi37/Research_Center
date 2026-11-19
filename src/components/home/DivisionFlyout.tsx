import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { DivisionItem } from '../../data/divisions';
import { instituteApps } from '../../data/instituteApps';
import { AppVectorIcon } from '../apps/AppVectorIcon';

interface DivisionFlyoutProps {
  division: DivisionItem | null;
  anchorTop: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const DivisionFlyout: React.FC<DivisionFlyoutProps> = ({
  division,
  anchorTop,
  onMouseEnter,
  onMouseLeave,
}) => {
  if (!division) return null;

  // Resolve associated apps from instituteApps data
  const associatedAppsList = (division.associatedApps || [])
    .map(appKey => 
      instituteApps.find(
        app => app.slug.toLowerCase() === appKey.toLowerCase() || 
               app.id.toLowerCase() === appKey.toLowerCase()
      )
    )
    .filter(Boolean);

  // Clamp top anchor so the flyout stays comfortably within view bounds
  const clampedTop = Math.max(0, Math.min(anchorTop - 30, 240));

  return (
    <AnimatePresence>
      <motion.div
        key={division.id}
        initial={{ opacity: 0, x: -10, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ top: `${clampedTop}px` }}
        className="absolute left-[calc(100%+0.75rem)] w-[360px] sm:w-[380px] bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/35 rounded-2xl shadow-2xl p-4 z-50 select-none overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Division Header */}
        <div className="relative z-10 pb-3 border-b border-slate-800/90">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/25">
                {division.number}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {division.category}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {associatedAppsList.length} Tools
            </span>
          </div>

          <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
            {division.name}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {division.tagline || division.mandate}
          </p>
        </div>

        {/* Associated Applications & Tools List */}
        <div className="relative z-10 py-3 space-y-2 max-h-[230px] overflow-y-auto custom-scrollbar pr-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Proprietary Applications & Tools</span>
            <span className="text-cyan-400">Live</span>
          </div>

          {associatedAppsList.length > 0 ? (
            associatedAppsList.map((app) => {
              if (!app) return null;
              return (
                <Link
                  key={app.id}
                  to={`/apps/${app.slug}`}
                  className="group flex items-start gap-2.5 p-2 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-700/60 shrink-0 group-hover:border-cyan-500/40 transition-colors">
                    <AppVectorIcon
                      iconKey={app.iconKey}
                      size="sm"
                      accentColor={app.accentColor}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                        {app.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shrink-0">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 group-hover:text-slate-300 line-clamp-1 mt-0.5 leading-normal">
                      {app.shortDesc}
                    </p>
                  </div>

                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors mt-1" />
                </Link>
              );
            })
          ) : (
            <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-800 text-center">
              <Layers className="w-5 h-5 text-slate-500 mx-auto mb-1" />
              <p className="text-xs text-slate-400">
                Core laboratory systems active
              </p>
            </div>
          )}
        </div>

        {/* Flyout Footer Action Link */}
        <div className="relative z-10 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            to={`/divisions/${division.id}`}
            className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
          >
            <span>Explore {division.shortName} Portal</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-[9px] font-mono text-slate-500">
            AIRIC ECOSYSTEM
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
