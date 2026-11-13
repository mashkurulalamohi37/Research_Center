import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AppWindow, ArrowRight, ChevronRight, Sparkles, 
  ExternalLink, Layers, CheckCircle2, ShieldCheck 
} from 'lucide-react';
import { instituteApps, InstituteApp } from '../../data/instituteApps';
import { AppVectorIcon } from '../apps/AppVectorIcon';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const categories = [
  'All',
  'Enterprise AI & Communication',
  'Digital Healthcare',
  'Agricultural AI',
  'Education & Academic AI',
  'Smart Infrastructure & IoT',
] as const;

export const ApplicationsShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredApps = activeCategory === 'All'
    ? instituteApps
    : instituteApps.filter(app => app.category === activeCategory);

  return (
    <section className="py-20 relative bg-slate-950 border-t border-slate-800 text-white" id="applications-showcase">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <AppWindow className="w-3.5 h-3.5" />
              Software & AI Systems
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              10 Proprietary Applications
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              From encrypted institutional messaging to clinical arrhythmia detection and botanical computer vision, explore AIRIC’s operational software portfolio.
            </p>
          </div>

          <Link
            to="/apps"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0"
          >
            Full Applications Catalog
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Apps Bento Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Top Row: Icon, Name & Status */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                      <AppVectorIcon iconKey={app.iconKey} size="md" className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-xs text-cyan-400/90 font-mono">
                        {app.version}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    app.status === 'Production'
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                      : app.status === 'Beta'
                      ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800'
                      : 'bg-amber-950/60 text-amber-300 border-amber-800'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-300 mb-2">
                  {app.subtitle}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {app.shortDesc}
                </p>

                {/* Key Features Chips */}
                <div className="space-y-1.5 mb-4">
                  {app.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Row: Metrics & Drill-down Link */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 uppercase text-[9px] block">Key Benchmark</span>
                  <span className="text-cyan-300 font-semibold">{app.metrics[0]?.value} {app.metrics[0]?.label}</span>
                </div>

                <Link
                  to={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold group-hover:translate-x-0.5 transition-all"
                >
                  System Specs
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
