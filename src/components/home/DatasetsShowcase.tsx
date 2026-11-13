import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, ShieldCheck, Lock, Download, 
  ExternalLink, ArrowRight, Layers, FileText, ChevronRight 
} from 'lucide-react';
import { mockDatasets } from '../../data/datasets';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const DatasetsShowcase: React.FC = () => {
  return (
    <section className="py-20 relative bg-slate-950 text-white border-t border-slate-800" id="datasets-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Database className="w-3.5 h-3.5" />
              Dataset & Data Center
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Scientific Datasets
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              High-value annotated corpora, clinical telemetry, and botanical benchmarks governed with granular access-control tiers.
            </p>
          </div>

          <Link
            to="/datasets"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition-colors shrink-0"
          >
            All Datasets Repository
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDatasets.slice(0, 6).map((dataset) => {
            const isRestricted = dataset.accessTier === 'Restricted Healthcare';
            const isAcademic = dataset.accessTier === 'Academic License';

            return (
              <div
                key={dataset.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 group"
              >
                <div>
                  {/* Access Control Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {dataset.domain}
                    </span>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                      isRestricted
                        ? 'bg-rose-950/60 text-rose-300 border-rose-800/80'
                        : isAcademic
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/80'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                    }`}>
                      {isRestricted ? (
                        <Lock className="w-2.5 h-2.5" />
                      ) : (
                        <ShieldCheck className="w-2.5 h-2.5" />
                      )}
                      {dataset.accessTier}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {dataset.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {dataset.description}
                  </p>

                  {/* Specs & Metrics */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 mb-4 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 uppercase text-[9px] block">Volume</span>
                      <span className="text-slate-200">{dataset.records}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[9px] block">Size & Format</span>
                      <span className="text-cyan-300">{dataset.fileSize} • {dataset.format.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500 uppercase text-[9px] block">License</span>
                    <span className="text-slate-300 truncate max-w-[130px] block">{dataset.license}</span>
                  </div>

                  <Link
                    to={`/datasets`}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold group-hover:translate-x-0.5 transition-all"
                  >
                    Request Access
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
