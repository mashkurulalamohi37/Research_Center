import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid, Table as TableIcon, ArrowRight, ExternalLink,
  BookOpen, Sparkles, Rocket, TrendingUp, Cpu, Shield,
  Database, HeartPulse, GraduationCap, Smile, CheckCircle2,
  Users, Building2, FlaskConical, Award, X, ChevronRight,
  Layers, Filter
} from 'lucide-react';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { instituteApps } from '../../data/instituteApps';
import { AppVectorIcon } from '../apps/AppVectorIcon';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const divisionIconMap: Record<string, React.ElementType> = {
  BookOpen,
  Sparkles,
  Rocket,
  TrendingUp,
  Cpu,
  Shield,
  Database,
  HeartPulse,
  GraduationCap,
  Smile,
};

const categories = [
  'All',
  'Core Science',
  'Deep Tech',
  'Applied Commercial',
  'Human & Health',
  'Academic & Society',
] as const;

export const EcosystemGrid: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDivision, setSelectedDivision] = useState<DivisionItem | null>(null);

  const filteredDivisions = activeCategory === 'All'
    ? instituteDivisions
    : instituteDivisions.filter(d => d.category === activeCategory);

  return (
    <section className="py-20 relative bg-slate-900/60 border-y border-slate-800" id="ecosystem">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              Organizational Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              10 Specialized Divisions
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-400 max-w-2xl">
              An interconnected matrix spanning fundamental scientific inquiry, deep-tech engineering, clinical health translation, and commercial acceleration.
            </p>
          </div>

          {/* Controls: View Mode & Direct Directory Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid Matrix
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
                Directory Table
              </button>
            </div>

            <Link
              to="/divisions"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs font-semibold transition-colors"
            >
              Explore All Divisions
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === 'All' ? instituteDivisions.length : instituteDivisions.filter(d => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-700 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 1. GRID MATRIX VIEW */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredDivisions.map((division) => {
              const Icon = divisionIconMap[division.iconName] || Layers;
              const matchingApps = instituteApps.filter(a => division.associatedApps.includes(a.slug));

              return (
                <motion.div
                  key={division.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-slate-900/90 rounded-xl border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  {/* Top Bar with Number & Category */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 group-hover:scale-105 transition-transform">
                          {division.number}
                        </div>
                        <Badge variant="outline" className="text-[10px] bg-slate-800/80 border-slate-700 text-slate-300">
                          {division.category}
                        </Badge>
                      </div>

                      <span className="text-[11px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-900/40">
                        {division.badge}
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br ${division.accentColor} text-white shadow-md shadow-cyan-950/20 shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {division.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {division.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Mandate Description */}
                    <p className="text-xs text-slate-300/90 leading-relaxed mb-4 line-clamp-3">
                      {division.mandate}
                    </p>

                    {/* Focus Areas Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {division.focusAreas.slice(0, 3).map((fa, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                          {fa}
                        </span>
                      ))}
                      {division.focusAreas.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-500">
                          +{division.focusAreas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Associated Apps & Actions */}
                  <div className="pt-4 border-t border-slate-800/80">
                    {matchingApps.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Deployed Software Systems</span>
                          <span className="text-cyan-400 font-bold">{matchingApps.length} Apps</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {matchingApps.map(app => (
                            <Link
                              key={app.slug}
                              to={`/apps/${app.slug}`}
                              className="group/app flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-[11px] text-slate-300 hover:text-cyan-300 transition-all"
                              title={`${app.name}: ${app.subtitle}`}
                            >
                              <AppVectorIcon iconKey={app.iconKey} size="sm" className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="font-semibold">{app.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedDivision(division)}
                        className="text-xs text-slate-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Quick Overview
                      </button>

                      <Link
                        to={`/divisions/${division.id}`}
                        className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-8 px-2.5 rounded-md font-medium transition-colors"
                      >
                        Division Hub
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* 2. INSTITUTIONAL DIRECTORY TABLE VIEW */}
        {viewMode === 'table' && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90 shadow-xl"
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-4 font-semibold text-center w-16">#</th>
                  <th className="py-4 px-4 font-semibold">Division Name & Mandate</th>
                  <th className="py-4 px-4 font-semibold">Category</th>
                  <th className="py-4 px-4 font-semibold">Lead Scientist / Officer</th>
                  <th className="py-4 px-4 font-semibold">Key Initiatives & TRL</th>
                  <th className="py-4 px-4 font-semibold">Portfolio Apps</th>
                  <th className="py-4 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredDivisions.map((division) => {
                  const Icon = divisionIconMap[division.iconName] || Layers;
                  const matchingApps = instituteApps.filter(a => division.associatedApps.includes(a.slug));

                  return (
                    <tr
                      key={division.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDivision(division)}
                    >
                      {/* Number & Icon */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-cyan-400">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-xs">
                          {division.number}
                        </div>
                      </td>

                      {/* Division Name & Mandate */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex items-center gap-2.5 mb-1">
                          <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="font-bold text-white group-hover:text-cyan-300 text-sm transition-colors">
                            {division.name}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                          {division.mandate}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-[10px] bg-slate-800 border-slate-700 text-slate-300">
                          {division.category}
                        </Badge>
                      </td>

                      {/* Lead */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={division.leadership.avatar}
                            alt={division.leadership.name}
                            className="w-7 h-7 rounded-full object-cover border border-cyan-500/30"
                          />
                          <div>
                            <div className="font-medium text-white text-[11px]">{division.leadership.name}</div>
                            <div className="text-[10px] text-slate-400">{division.leadership.title.split(',')[0]}</div>
                          </div>
                        </div>
                      </td>

                      {/* Key Projects */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="space-y-1">
                          {division.keyProjects.slice(0, 1).map(proj => (
                            <div key={proj.id} className="flex items-center gap-1.5 text-[11px]">
                              <span className="text-cyan-400 font-medium truncate">{proj.name}</span>
                              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[9px] font-mono shrink-0">
                                TRL {proj.trlLevel}
                              </span>
                            </div>
                          ))}
                          <div className="text-[10px] text-slate-500 font-mono">
                            {division.stats[0]?.label}: {division.stats[0]?.value}
                          </div>
                        </div>
                      </td>

                      {/* Associated Apps */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {matchingApps.length > 0 ? (
                            matchingApps.map(app => (
                              <Link
                                key={app.slug}
                                to={`/apps/${app.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/40 text-[10px] text-cyan-300 flex items-center gap-1 transition-colors"
                              >
                                <AppVectorIcon iconKey={app.iconKey} size="sm" className="w-3 h-3 text-cyan-400" />
                                <span>{app.name}</span>
                              </Link>
                            ))
                          ) : (
                            <span className="text-slate-600 text-[11px]">—</span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <Link
                          to={`/divisions/${division.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium px-2 py-1 rounded hover:bg-cyan-500/10 transition-colors"
                        >
                          Details
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* 3. MODAL / QUICK-PREVIEW DRAWER */}
        <AnimatePresence>
          {selectedDivision && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDivision(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Division Modal Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800">
                    Division {selectedDivision.number}
                  </span>
                  <Badge variant="outline" className="text-xs text-slate-300 border-slate-700">
                    {selectedDivision.category}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedDivision.name}
                </h3>
                <p className="text-sm text-cyan-400 mb-6 font-mono">
                  {selectedDivision.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedDivision.description}
                </p>

                {/* Leadership Profile */}
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 mb-6 flex items-start gap-4">
                  <img
                    src={selectedDivision.leadership.avatar}
                    alt={selectedDivision.leadership.name}
                    className="w-14 h-14 rounded-xl object-cover border border-cyan-500/40 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-mono text-cyan-400">{selectedDivision.leadership.role}</div>
                    <h4 className="text-base font-bold text-white">{selectedDivision.leadership.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedDivision.leadership.title}</p>
                    <p className="text-xs text-slate-300 mt-2 italic">
                      "{selectedDivision.leadership.bio}"
                    </p>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {selectedDivision.stats.map((s, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60 text-center">
                      <div className="text-lg font-bold text-cyan-300 font-mono">{s.value}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Initiatives */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Active Initiatives & Inventions
                  </h4>
                  <div className="space-y-2.5">
                    {selectedDivision.keyProjects.map(proj => (
                      <div key={proj.id} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-white text-xs">{proj.name}</span>
                          <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-[10px] font-mono">
                            TRL {proj.trlLevel} • {proj.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{proj.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Modal CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDivision(null)}
                    className="w-full sm:w-auto text-slate-400 hover:text-white border-slate-700"
                  >
                    Close
                  </Button>
                  <Link
                    to={`/divisions/${selectedDivision.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Full Division Hub
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
