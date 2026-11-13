import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Award, ExternalLink, ArrowRight, 
  FileText, CheckCircle2, Sparkles, Send, ChevronRight 
} from 'lucide-react';
import { journalData } from '../../data/journals';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const JournalsShowcase: React.FC = () => {
  const journals = Object.values(journalData);

  return (
    <section className="py-20 relative bg-slate-900/80 border-t border-slate-800 text-white" id="journals-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Scholarly Journals & Publications
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              JAIR & JAIRIC Journals
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Double-blind peer-reviewed international scientific journals published by AIRIC, bridging mathematical machine intelligence with deep-tech commercialization.
            </p>
          </div>

          <Link
            to="/journals"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition-colors shrink-0"
          >
            All Journal Volumes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Dual Spotlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {journals.map((journal) => (
            <div
              key={journal.id}
              className="bg-slate-950/90 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {journal.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {journal.issn}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                    {journal.frequency}
                  </Badge>
                </div>

                {/* Journal Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                  {journal.name}
                </h3>
                <p className="text-xs text-cyan-400/90 font-mono mb-4">
                  {journal.tagline}
                </p>

                {/* Aims & Scope */}
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {journal.aims}
                </p>

                {/* Metrics Pill */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between mb-6 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Impact & Valuation</span>
                    <span className="font-semibold text-slate-200">{journal.impactMetric}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Acceptance Rate</span>
                    <span className="font-mono font-bold text-cyan-400">{journal.acceptanceRate}</span>
                  </div>
                </div>

                {/* Latest Dispatches / Articles */}
                <div className="mb-6">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                    <span>Recent Indexed Papers ({journal.latestIssue.split(' ')[0]} {journal.latestIssue.split(' ')[1]})</span>
                    <span className="text-cyan-400 font-mono">Crossref DOI</span>
                  </h4>
                  <div className="space-y-2.5">
                    {journal.articles.slice(0, 2).map((art, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                        <h5 className="font-semibold text-white text-xs line-clamp-1">{art.title}</h5>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
                          <span>{art.authors}</span>
                          <span className="text-cyan-400">{art.doi}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-500 text-[10px] block">Editor-in-Chief</span>
                  <span className="font-medium text-slate-200">{journal.editorInChief.split(',')[0]}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    to={`/journals/${journal.id}`}
                    className="w-full sm:w-auto text-center px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    View Issue
                  </Link>
                  <Link
                    to={`/journals/${journal.id}#submit`}
                    className="w-full sm:w-auto text-center px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Submit Paper
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
