import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Eye, MessageSquareText, Bot, Activity, 
  ShieldCheck, Cpu, ArrowRight, Sparkles, Layers, CheckCircle2 
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const InteractiveResearchMap: React.FC = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string>('ai-core');

  const selectedArea = mockResearchAreas.find(a => a.id === selectedAreaId) || mockResearchAreas[0];

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
    <section className="py-20 relative overflow-hidden bg-navy-950/30">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="cyan" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Knowledge Topology
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Interconnected Research Architecture
          </h2>
          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            AIRC connects mathematical foundations, visual intelligence, physical robotics, and biomedical translation into a cohesive interdisciplinary network.
          </p>
        </div>

        {/* Interactive Map Layout: Left Graph Node Selector, Right Dynamic Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Node Hierarchy Tree & Grid */}
          <div className="lg:col-span-6 space-y-3">
            {/* Center Node Indicator */}
            <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md flex items-center justify-between shadow-lg shadow-cyan-950/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400 text-navy-950 flex items-center justify-center font-bold text-xs">
                  AIRC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Central Institute Topology</h4>
                  <p className="text-xs text-cyan-400 font-mono">8 Core Research Groups • 32 Projects</p>
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
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/15 shadow-md shadow-cyan-500/10 scale-[1.02]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected ? 'bg-cyan-400 text-navy-950' : 'bg-slate-800 text-cyan-400'
                      }`}
                    >
                      {getIcon(area.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {area.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
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
                className="p-8 rounded-3xl border border-slate-700/80 bg-slate-900/80 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden"
              >
                {/* Background Image Preview Accent */}
                <div className="relative h-44 -mx-8 -mt-8 mb-6 overflow-hidden">
                  <img
                    src={selectedArea.heroImage}
                    alt={selectedArea.title}
                    className="w-full h-full object-cover opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-cyan-400 text-navy-950 font-bold">
                        {getIcon(selectedArea.iconName)}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {selectedArea.title}
                      </h3>
                    </div>
                    <Badge variant="cyan">{selectedArea.projectCount} Active Grants</Badge>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedArea.description}
                </p>

                {/* Core Technologies Badges */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" /> Key Technical Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArea.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-cyan-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Strategic Objectives */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Core Research Goals
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedArea.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Lead: <span className="text-slate-200 font-semibold">{selectedArea.leadResearcherId.replace('dr-', 'Dr. ').replace('-', ' ').toUpperCase()}</span>
                  </div>
                  <Link to={`/research/${selectedArea.slug}`}>
                    <Button variant="cyan" size="sm">
                      Explore Discipline <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
