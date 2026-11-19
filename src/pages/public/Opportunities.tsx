import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Briefcase, Calendar, DollarSign, 
  MapPin, Clock, ArrowRight, Sparkles, Filter, 
  X, Layers, Globe 
} from 'lucide-react';
import { mockOpportunities } from '../../data/opportunities';
import { mockResearchAreas } from '../../data/researchAreas';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { OpportunityType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Helper to map opportunity to corresponding Institute Division
export const getDivisionForOpportunity = (opp: { researchAreaId?: string }): DivisionItem => {
  const map: Record<string, string> = {
    'ai-core': 'ai-quantum',
    'nlp-genai': 'ai-quantum',
    'cybersecurity-ai': 'cybersecurity',
    'healthcare-biomedical': 'healthcare',
    'data-analytics': 'data-analytics',
    'iot-edge-ai': 'data-analytics',
    'robotics-autonomous': 'innovation',
    'computer-vision': 'innovation',
  };
  const targetId = opp.researchAreaId ? map[opp.researchAreaId] || opp.researchAreaId : 'research';
  return instituteDivisions.find(d => d.id === targetId) || instituteDivisions[0];
};

export const Opportunities: React.FC = () => {
  useDocumentTitle('Research Opportunities & Fellowships | AIRIC');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  const filteredOpportunities = mockOpportunities.filter(o => {
    const div = getDivisionForOpportunity(o);
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      div.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.stipend && o.stipend.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || o.type === selectedType;
    const matchesArea = selectedArea === 'all' || o.researchAreaId === selectedArea;
    const matchesDivision = selectedDivision === 'all' || div.id === selectedDivision;

    return matchesSearch && matchesType && matchesArea && matchesDivision;
  });

  return (
    <div className="py-10 space-y-8">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Careers & Fellowships
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Research Opportunities & Fellowships
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
          Join world-renowned laboratories at AIRIC. We offer competitive postdoctoral fellowships, funded Ph.D. assistantships, and commercialization venture appointments.
        </p>

        {/* 1. Enhanced Search Box & Type/Discipline Filters Bar */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:flex-1 md:max-w-xl">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search opportunities by role, discipline, or division"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by role, discipline, keywords, division, or stipend…"
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type & Discipline Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              aria-label="Filter by opportunity type"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="all">All Position Types</option>
              <option value="Fellowship">Postdoc Fellowships</option>
              <option value="Graduate Research">Ph.D. Assistantships</option>
              <option value="Internship">Summer Internships</option>
              <option value="Undergraduate Research">Undergraduate Research</option>
            </select>

            <select
              aria-label="Filter by research area"
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="all">All Disciplines</option>
              {mockResearchAreas.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. 10 Institute Divisions Design Bar */}
        <div className="mt-4 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-700 dark:text-cyan-400 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Filter By 10 Institute Divisions
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Showing {filteredOpportunities.length} positions
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedDivision('all')}
              className={`shrink-0 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer border ${
                selectedDivision === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Divisions
            </button>
            {instituteDivisions.map(division => {
              const isActive = selectedDivision === division.id;
              return (
                <button
                  key={division.id}
                  onClick={() => setSelectedDivision(division.id)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400'
                  }`}>
                    {division.number}
                  </span>
                  <span className="truncate max-w-[130px]">{division.shortName || division.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-16 text-slate-500 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">No open opportunities found matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or selecting another division</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOpportunities.map(opp => {
              const division = getDivisionForOpportunity(opp);
              return (
                <Card
                  key={opp.id}
                  className="p-5 sm:p-6 rounded-2xl border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 transition-all duration-300 shadow-xs hover:shadow-md backdrop-blur-sm"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Division Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                          <span className="w-3.5 h-3.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-[9px] flex items-center justify-center font-bold">
                            {division.number}
                          </span>
                          <span>{division.shortName || division.name}</span>
                        </span>

                        <Badge variant="cyan">{opp.type}</Badge>
                        <Badge variant={opp.status === 'Open' ? 'success' : 'secondary'}>{opp.status}</Badge>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Deadline: {opp.deadline}
                        </span>
                      </div>

                      <Link to={`/opportunities/${opp.slug}`}>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors leading-snug">
                          {opp.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {opp.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 font-mono">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {opp.location}
                        </span>
                        <span>•</span>
                        <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{opp.duration}</strong></span>
                        {opp.stipend && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{opp.stipend}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <Link to={`/opportunities/${opp.slug}`}>
                        <Button variant="cyan" size="md" className="w-full md:w-auto shadow-sm">
                          View & Apply <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
