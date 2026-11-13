import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ArrowRight, Award, BookOpen, 
  ExternalLink, ChevronRight, Filter 
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { Badge } from '../ui/Badge';

const expertFilterCategories = [
  { id: 'all', label: 'All Experts' },
  { id: 'ai', label: 'AI & Neural Systems' },
  { id: 'quantum', label: 'Quantum Computing' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'healthcare', label: 'Digital Health & Medical' },
  { id: 'data', label: 'Data Science & Datasets' },
];

export const ExpertsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperts = mockResearchers.filter(r => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return r.department.toLowerCase().includes('intelligence') || r.department.toLowerCase().includes('neural');
    if (activeFilter === 'quantum') return r.department.toLowerCase().includes('quantum') || r.bio.toLowerCase().includes('quantum');
    if (activeFilter === 'cybersecurity') return r.department.toLowerCase().includes('cyber') || r.department.toLowerCase().includes('security');
    if (activeFilter === 'healthcare') return r.department.toLowerCase().includes('health') || r.department.toLowerCase().includes('medical');
    if (activeFilter === 'data') return r.department.toLowerCase().includes('data') || r.department.toLowerCase().includes('science');
    return true;
  });

  return (
    <section className="py-20 relative bg-slate-900 border-t border-slate-800 text-white" id="experts-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <Users className="w-3.5 h-3.5" />
              Resource Persons & Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meet Our Experts & Investigators
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Distinguished researchers, AI engineers, cybersecurity architects, and clinical medical consultants across 12 institutional domains.
            </p>
          </div>

          <Link
            to="/experts"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-bold text-xs transition-colors shrink-0"
          >
            All 12 Disciplines Directory
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {expertFilterCategories.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                activeFilter === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Experts Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperts.slice(0, 4).map((r) => (
            <Link
              key={r.id}
              to={`/researchers/${r.slug}`}
              className="group bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                      {r.department.split('&')[0]}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {r.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{r.title}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {r.bio}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Citations: <strong className="text-white">{r.citations.toLocaleString()}</strong></span>
                <span>h-index: <strong className="text-cyan-400">{r.hIndex}</strong></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
