import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, Globe, Shield, BookOpen, Layers } from 'lucide-react';

interface TopHeaderBarProps {
  onOpenSearch?: () => void;
}

export const TopHeaderBar: React.FC<TopHeaderBarProps> = ({ onOpenSearch }) => {
  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-cyan-500/20 text-[11px] font-mono select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 overflow-hidden">
        {/* Left: Official Title & Live Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase hidden md:inline">
              OFFICIAL
            </span>
          </div>

          <div className="font-bold tracking-wider text-slate-100 uppercase truncate">
            <span className="text-cyan-400 font-extrabold mr-1.5">AIRIC —</span>
            <span className="tracking-widest">
              ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER
            </span>
          </div>
        </div>

        {/* Right: Quick Portals, Quick Search & Links */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-[10px] font-sans font-medium">
          {/* Quick Hub Links */}
          <div className="hidden lg:flex items-center gap-3 text-slate-300">
            <Link
              to="/research"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>Research</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/apps"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Layers className="w-3 h-3 text-amber-400" />
              <span>Applications</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/divisions"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Globe className="w-3 h-3 text-blue-400" />
              <span>10 Divisions</span>
            </Link>
          </div>

          {/* Quick Search trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all cursor-pointer font-mono text-[10px]"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-2.5 h-2.5 text-cyan-400" />
              <span>Search</span>
              <kbd className="px-1 py-0.2 rounded bg-slate-900 border border-slate-700 text-[9px] text-slate-400">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Quick Portal Switch */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all font-semibold"
          >
            <Shield className="w-2.5 h-2.5" />
            <span>Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
