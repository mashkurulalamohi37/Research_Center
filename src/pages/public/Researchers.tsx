import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Users, LayoutGrid, List, Mail, 
  MapPin, BookOpen, Award, ArrowRight, Sparkles 
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { mockResearchAreas } from '../../data/researchAreas';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export const Researchers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResearchers = mockResearchers.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesArea = selectedArea === 'all' || r.researchAreaIds.includes(selectedArea);

    return matchesSearch && matchesCategory && matchesArea;
  });

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Faculty & Investigators
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          AIRC Research Directory
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Distinguished faculty, principal investigators, postdoctoral fellows, and graduate researchers leading our laboratories.
        </p>

        {/* Filter Controls Bar */}
        <div className="mt-10 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or keyword..."
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filters: Category & Area */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Positions</option>
              <option value="faculty">Faculty & PIs</option>
              <option value="postdoc">Postdoctoral Fellows</option>
              <option value="student">Graduate Ph.D. Fellows</option>
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

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-950 border border-slate-700 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-cyan-500 text-navy-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${viewMode === 'list' ? 'bg-cyan-500 text-navy-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Researchers Directory Content */}
      <section className="container mx-auto px-4 lg:px-8">
        {filteredResearchers.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium text-slate-200">No researchers found matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your keyword search or position filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResearchers.map(r => (
              <Link key={r.id} to={`/researchers/${r.slug}`} className="group block">
                <Card className="overflow-hidden border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="cyan">{r.category.toUpperCase()}</Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {r.name}
                        </h3>
                        <p className="text-xs text-cyan-400 font-medium line-clamp-1">{r.title}</p>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-3">
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {r.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {r.expertise.slice(0, 3).map(exp => (
                          <span key={exp} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Citations: <strong className="text-slate-300">{r.citations.toLocaleString()}</strong></span>
                    <span>h-index: <strong className="text-cyan-400">{r.hIndex}</strong></span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResearchers.map(r => (
              <Link key={r.id} to={`/researchers/${r.slug}`} className="block group">
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={r.avatar} alt={r.name} className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{r.name}</h3>
                        <Badge variant="cyan">{r.category}</Badge>
                      </div>
                      <p className="text-xs text-cyan-400">{r.title} • {r.department}</p>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-1">{r.expertise.join(' • ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 text-xs font-mono text-slate-400">
                    <span>Citations: <strong className="text-slate-200">{r.citations.toLocaleString()}</strong></span>
                    <span>h-index: <strong className="text-cyan-400">{r.hIndex}</strong></span>
                    <Button variant="cyan" size="sm">View Profile</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
