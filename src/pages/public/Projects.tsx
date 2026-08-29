import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, FolderGit2, Calendar, Users, 
  ArrowRight, Sparkles, Filter 
} from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { mockResearchAreas } from '../../data/researchAreas';
import { ProjectStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

export const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredProjects = mockProjects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesArea = selectedArea === 'all' || p.researchAreaId === selectedArea;

    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Funded Initiatives
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          AIRC Research Projects
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Multi-year research investigations supported by national science foundations, medical institutes, and advanced industrial alliances.
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
              placeholder="Search projects or technologies..."
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Statuses</option>
              <option value="Ongoing">Ongoing Projects</option>
              <option value="Completed">Completed Projects</option>
              <option value="Proposed">Proposed / Scoping</option>
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

      {/* Projects Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium text-slate-200">No projects found matching your search</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or using broader terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(proj => (
              <Card key={proj.id} className="overflow-hidden border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={proj.status === 'Ongoing' ? 'success' : proj.status === 'Completed' ? 'cyan' : 'secondary'}>
                        {proj.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950/90 text-cyan-300 border border-slate-700 backdrop-blur-sm">
                      {proj.fundingAmount}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-base group-hover:text-cyan-300 transition-colors leading-snug">
                      {proj.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 mt-2 leading-relaxed">
                      {proj.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <div className="px-6 py-2">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <CardFooter className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono">
                    <span>{proj.fundingBody}</span>
                  </div>
                  <Link to={`/projects/${proj.slug}`}>
                    <Button variant="cyan" size="sm">
                      Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
