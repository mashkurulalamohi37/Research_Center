import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, Search, Filter, ArrowRight, Sparkles, 
  ExternalLink, CheckCircle2, ShieldCheck, Cpu 
} from 'lucide-react';
import { instituteApps, InstituteApp } from '../../data/instituteApps';
import { AppVectorIcon } from '../../components/apps/AppVectorIcon';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

const categories = [
  'All',
  'Digital Healthcare',
  'Agricultural AI',
  'Education & Academic AI',
  'Enterprise AI & Communication',
  'Smart Infrastructure & IoT',
];

export const Apps: React.FC = () => {
  useDocumentTitle('Applications Portfolio | AIRIC Institute');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = instituteApps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Production':
        return <Badge variant="cyan" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">● Production</Badge>;
      case 'Beta':
        return <Badge variant="secondary" className="font-mono text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">Beta Release</Badge>;
      case 'Clinical Trial':
        return <Badge variant="outline" className="font-mono text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">⚕ Clinical Trial</Badge>;
      default:
        return <Badge className="font-mono text-[10px]">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>AIRIC PROPRIETARY SOFTWARE SUITE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Dedicated Applications Portfolio
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Ten proprietary intelligence platforms developed and maintained by AIRIC research laboratories, translating cutting-edge AI, quantum computing, and biomedical engineering into real-world impact.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search applications, technologies, features..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 10 Applications Bento Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <Card
              key={app.id}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 shadow-xs hover:shadow-lg hover:shadow-cyan-500/5 transition-all flex flex-col justify-between group overflow-hidden"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {app.category}
                  </span>
                  {getStatusBadge(app.status)}
                </div>

                <div className="flex items-start gap-4">
                  {/* Bespoke Vector Icon */}
                  <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 group-hover:scale-105 transition-transform shrink-0">
                    <AppVectorIcon iconKey={app.iconKey} size="md" />
                  </div>

                  <div>
                    <CardTitle className="text-xl font-bold group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                      <Link to={`/apps/${app.slug}`}>
                        {app.name}
                      </Link>
                    </CardTitle>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                      {app.subtitle}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-1">
                <CardDescription className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {app.shortDesc}
                </CardDescription>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1">
                  {app.techStack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {app.techStack.length > 3 && (
                    <span className="text-[10px] font-mono text-slate-400 self-center">
                      +{app.techStack.length - 3} more
                    </span>
                  )}
                </div>

                {/* Key Metrics Banner */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center font-mono text-[10px]">
                  {app.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span className="text-slate-400 block text-[9px] truncate">{m.label}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{m.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {app.version}
                </span>
                <Link to={`/apps/${app.slug}`}>
                  <Button variant="cyan" size="sm" className="text-xs group-hover:gap-1.5 transition-all">
                    Explore Product <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
