import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Briefcase, Calendar, DollarSign, 
  MapPin, Clock, ArrowRight, Sparkles, Filter 
} from 'lucide-react';
import { mockOpportunities } from '../../data/opportunities';
import { mockResearchAreas } from '../../data/researchAreas';
import { OpportunityType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

export const Opportunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredOpportunities = mockOpportunities.filter(o => {
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.overview.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || o.type === selectedType;
    const matchesArea = selectedArea === 'all' || o.researchAreaId === selectedArea;

    return matchesSearch && matchesType && matchesArea;
  });

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Careers & Fellowships
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Research Opportunities & Fellowships
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Join world-renowned laboratories at AIRC. We offer competitive postdoctoral fellowships, funded Ph.D. assistantships, and research internships.
        </p>

        {/* Filter Controls Bar */}
        <div className="mt-10 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by role or discipline..."
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Opportunity Types</option>
              <option value="Fellowship">Postdoc Fellowships</option>
              <option value="Graduate Research">Ph.D. Assistantships</option>
              <option value="Internship">Summer Internships</option>
              <option value="Undergraduate Research">Undergraduate Research</option>
            </select>

            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Disciplines</option>
              {mockResearchAreas.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium text-slate-200">No open opportunities found matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Check back soon or submit a spontaneous fellowship inquiry</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOpportunities.map(opp => (
              <Card
                key={opp.id}
                className="p-6 rounded-2xl border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="cyan">{opp.type}</Badge>
                      <Badge variant={opp.status === 'Open' ? 'success' : 'secondary'}>{opp.status}</Badge>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> Deadline: {opp.deadline}
                      </span>
                    </div>

                    <Link to={`/opportunities/${opp.slug}`}>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 hover:text-cyan-300 transition-colors leading-snug">
                        {opp.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {opp.overview}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {opp.location}
                      </span>
                      <span>•</span>
                      <span>Duration: <strong className="text-slate-200">{opp.duration}</strong></span>
                      {opp.stipend && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">{opp.stipend}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <Link to={`/opportunities/${opp.slug}`}>
                      <Button variant="cyan" size="md" className="w-full md:w-auto">
                        View & Apply <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
