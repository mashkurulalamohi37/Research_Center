import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Eye, MessageSquareText, Bot, Activity, 
  ShieldCheck, Cpu, ArrowRight, Sparkles 
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { mockResearchers } from '../../data/researchers';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const InteractiveResearchMap: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(mockResearchAreas[0].id);

  const selectedArea = mockResearchAreas.find(a => a.id === selectedAreaId) || mockResearchAreas[0];
  const leadResearcher = mockResearchers.find(r => r.id === selectedArea.leadResearcherId);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-navy-950/30">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Knowledge Topology
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Interconnected Research Architecture
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mt-3 leading-relaxed">
            IRICC connects mathematical foundations, visual intelligence, physical robotics, and biomedical translation into a cohesive interdisciplinary network.
          </p>
        </div>

        {/* Interactive Map Layout: Left Graph Node Selector, Right Dynamic Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Node Hierarchy Tree & Grid */}
          <div className="lg:col-span-6 space-y-3">
            {/* Center Node Indicator */}
            <div className="p-4 rounded-2xl border border-cyan-500/40 bg-white dark:bg-cyan-950/20 backdrop-blur-md flex items-center justify-between shadow-xs dark:shadow-lg dark:shadow-cyan-950/30">
              <div className="flex items-center gap-3">
                <img
                  src="/iricc-logo.jpg"
                  alt="IRICC Official Seal"
                  width="40"
                  height="40"
                  className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-amber-400/40 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">IRICC Knowledge Topology</h4>
                  <p className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-medium">8 Core Research Groups • 32 Projects</p>
                </div>
              </div>
              <Badge variant="cyan">Unified Hub</Badge>
            </div>

            {/* Research Disciplines Selectable Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mockResearchAreas.map(area => {
                const isSelected = area.id === selectedAreaId;
                return (
                  <button
                    key={area.id}
                    onClick={() => setSelectedAreaId(area.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-500/15 shadow-sm shadow-cyan-500/10 scale-[1.01]'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-cyan-600 text-white dark:bg-cyan-400 dark:text-navy-950'
                          : 'bg-slate-100 text-cyan-700 dark:bg-slate-800 dark:text-cyan-400'
                      }`}
                    >
                      {getIcon(area.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-800 dark:text-cyan-300' : 'text-slate-900 dark:text-slate-200'}`}>
                        {area.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {area.publicationCount} Papers • {area.projectCount} Projects
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Node Live Deep Dive */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArea.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-6 relative overflow-hidden"
              >
                {/* Background Image Preview Accent */}
                <div className="relative h-44 -mx-8 -mt-8 mb-6 overflow-hidden">
                  <img
                    src={selectedArea.heroImage}
                    alt={selectedArea.title}
                    className="w-full h-full object-cover opacity-40 dark:opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/60 dark:to-transparent" />
                  <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-cyan-600 text-white dark:bg-cyan-400 dark:text-navy-950 font-bold">
                        {getIcon(selectedArea.iconName)}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {selectedArea.title}
                      </h3>
                    </div>
                    <Badge variant="cyan">{selectedArea.projectCount} Active Initiatives</Badge>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {selectedArea.description}
                </p>

                {/* Sub-Specialties Matrix */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">
                    Core Specializations
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedArea.technologies.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lead PI */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-mono">Principal Investigator</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {leadResearcher?.name || 'Principal Investigator'}
                    </div>
                  </div>
                  <Link to={`/researchers/${selectedArea.leadResearcherId}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      Faculty Bio <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>

                {/* CTA Link to Area Page */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    {selectedArea.publicationCount} Peer-Reviewed Articles
                  </span>
                  <Link to={`/research/${selectedArea.slug}`}>
                    <Button variant="cyan" size="sm">
                      Explore Full Research Discipline
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
