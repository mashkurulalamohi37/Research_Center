import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, ArrowRight, Calendar, CheckCircle2, 
  Briefcase, Sparkles, ExternalLink, ChevronRight 
} from 'lucide-react';
import { mockGrants } from '../../data/funding';
import { Badge } from '../ui/Badge';

export const FundingShowcase: React.FC = () => {
  return (
    <section className="py-20 relative bg-slate-950 text-white border-t border-slate-800" id="funding-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <DollarSign className="w-3.5 h-3.5" />
              Grants, Endowments & Venture Capital
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Research Funding & Grants
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Competitive seed funding, commercialization vouchers, student fellowships, and matched corporate co-investments open for applications.
            </p>
          </div>

          <Link
            to="/commercialization/funding"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs transition-colors shrink-0"
          >
            All Funding Opportunities
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Grants Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockGrants.map((grant) => (
            <div
              key={grant.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                    {grant.grantCode}
                  </span>
                  <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                    {grant.category}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                  {grant.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {grant.description}
                </p>

                {/* Pool & Award Info */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 mb-4 text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Total Pool</span>
                    <span className="font-bold text-emerald-400">{grant.totalPool.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Max Award</span>
                    <span className="font-bold text-slate-200">{grant.maxPerAward.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Duration</span>
                    <span className="text-slate-300">{grant.duration}</span>
                  </div>
                </div>

                {/* Eligible Disciplines Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {grant.eligibleDisciplines.map((d, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 uppercase text-[9px] block">Deadline</span>
                  <span className="text-emerald-400 font-semibold">{grant.deadline}</span>
                </div>

                <Link
                  to="/collaborate#proposal"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
                >
                  Submit Proposal
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
