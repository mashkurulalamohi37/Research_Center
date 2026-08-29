import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Brain, Eye, MessageSquareText, Bot, 
  Activity, ShieldCheck, Cpu, Network, ArrowRight, Sparkles, Layers, BookOpen 
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { InteractiveResearchMap } from '../../components/home/InteractiveResearchMap';
import { StatsCounter } from '../../components/home/StatsCounter';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';

export const Research: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = mockResearchAreas.filter(
    area =>
      area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'Eye': return <Eye className="w-6 h-6" />;
      case 'MessageSquareText': return <MessageSquareText className="w-6 h-6" />;
      case 'Bot': return <Bot className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <Network className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-12 space-y-20">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Research Architecture
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          Scientific Disciplines & Laboratories
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          A multidisciplinary portfolio spanning mathematical logic, high-speed 3D computer vision, multi-agent robotics, and molecular healthcare AI.
        </p>

        {/* Filter / Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search disciplines or technologies (e.g. NeRF, Logic, TinyML)..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-lg"
          />
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map(area => (
            <Card
              key={area.id}
              className="overflow-hidden border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-950/30"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={area.heroImage}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-navy-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400">
                    {getAreaIcon(area.iconName)}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <Badge variant="cyan">{area.projectCount} Projects</Badge>
                    <span className="text-xs font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      {area.publicationCount} Papers
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-cyan-300 transition-colors leading-snug">
                    {area.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-3 mt-2 leading-relaxed">
                    {area.shortDescription}
                  </CardDescription>
                </CardHeader>

                <div className="px-6 pb-2">
                  <div className="flex flex-wrap gap-1.5">
                    {area.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700/60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <CardFooter className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Lead: <strong className="text-slate-200">{area.leadResearcherId.replace('dr-', 'Dr. ').replace('-', ' ').toUpperCase()}</strong>
                </span>
                <Link to={`/research/${area.slug}`}>
                  <Button variant="cyan" size="sm">
                    View Group <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Interactive Topology Section */}
      <InteractiveResearchMap />

      {/* Statistics */}
      <StatsCounter />
    </div>
  );
};
