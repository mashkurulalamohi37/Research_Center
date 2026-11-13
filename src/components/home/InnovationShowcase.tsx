import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Rocket, TrendingUp, Award, 
  ArrowRight, CheckCircle2, ChevronRight, Layers 
} from 'lucide-react';
import { Badge } from '../ui/Badge';

interface TRLStage {
  level: number;
  label: string;
  stageName: string;
  description: string;
  projectsCount: number;
  sampleItem: string;
}

const trlStages: TRLStage[] = [
  {
    level: 1,
    label: 'TRL 1',
    stageName: 'Basic Principles Observed',
    description: 'Fundamental scientific papers, mathematical proofs, and initial quantum information formulations.',
    projectsCount: 14,
    sampleItem: 'Quantum Error Bounds',
  },
  {
    level: 2,
    label: 'TRL 2',
    stageName: 'Technology Concept Formulated',
    description: 'Practical application inventions hypothesized, algorithmic architectures mapped.',
    projectsCount: 18,
    sampleItem: 'Neural Differential Equation Solvers',
  },
  {
    level: 3,
    label: 'TRL 3',
    stageName: 'Analytical & Experimental Proof',
    description: 'Laboratory simulation scripts, synthetic dataset testing, and algorithmic convergence metrics.',
    projectsCount: 22,
    sampleItem: 'Adversarial Defense Bounds',
  },
  {
    level: 4,
    label: 'TRL 4',
    stageName: 'Component Validation in Lab',
    description: 'Bench-tested working models, breadboard micro-controller sensors, and edge AI inference pipelines.',
    projectsCount: 19,
    sampleItem: 'Quantum Port Logistics Optimizer',
  },
  {
    level: 5,
    label: 'TRL 5',
    stageName: 'Validation in Relevant Environment',
    description: 'Field telemetry testing in university greenhouse and campus edge nodes.',
    projectsCount: 16,
    sampleItem: 'Smart Agricultural IoT Harvester',
  },
  {
    level: 6,
    label: 'TRL 6',
    stageName: 'System Prototype Demonstration',
    description: 'Handheld hardware scanners and beta software suites undergoing closed stakeholder trials.',
    projectsCount: 12,
    sampleItem: 'Multispectral Leaf Pathology Rig',
  },
  {
    level: 7,
    label: 'TRL 7',
    stageName: 'Operational Environment Demo',
    description: 'Clinical hospital telemetry pilots and regional grower cooperative field trials.',
    projectsCount: 9,
    sampleItem: 'MyHeart ECG Deep Arrhythmia Detector',
  },
  {
    level: 8,
    label: 'TRL 8',
    stageName: 'System Complete & Qualified',
    description: 'Production-ready apps with automated testing, ISO compliance audits, and enterprise SLAs.',
    projectsCount: 7,
    sampleItem: 'BAUSTAI Higher-Ed Adaptive Tutor',
  },
  {
    level: 9,
    label: 'TRL 9',
    stageName: 'Proven in Full Operational Mission',
    description: 'Commercial enterprise licensing, nationwide government distribution, and continuous scale.',
    projectsCount: 5,
    sampleItem: 'FlowerDoctorBD & BChat Production Suite',
  },
];

export const InnovationShowcase: React.FC = () => {
  const [activeTRL, setActiveTRL] = useState<TRLStage>(trlStages[5]); // Default to TRL 6

  return (
    <section className="py-20 relative bg-slate-900 border-t border-slate-800 text-white" id="innovation-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Technology Readiness Level (TRL 1–9)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Innovation & Incubation Pipeline
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              From theoretical formulation to validated commercial deployment, see how AIRIC systematically de-risks deep technologies across all 9 readiness milestones.
            </p>
          </div>

          <Link
            to="/innovation"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 font-bold text-xs transition-colors shrink-0"
          >
            Innovation Center Hub
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Interactive TRL Stepper / Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-8">
          {trlStages.map((stage) => {
            const isSelected = activeTRL.level === stage.level;
            return (
              <button
                key={stage.level}
                onClick={() => setActiveTRL(stage)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-950/40 text-amber-300 scale-105'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className="font-mono font-bold text-xs">{stage.label}</span>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{stage.projectsCount} Works</span>
                <div className={`w-full h-1 rounded-full mt-2 ${
                  isSelected ? 'bg-amber-400' : 'bg-slate-800'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Selected TRL Stage Spotlight Card */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeTRL.label}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Phase {activeTRL.level <= 3 ? '1: Discovery' : activeTRL.level <= 6 ? '2: Prototyping' : '3: Commercial Scale'}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {activeTRL.stageName}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeTRL.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 font-mono">
              <span>Active Initiatives in TRL {activeTRL.level}: <strong className="text-white">{activeTRL.projectsCount} projects</strong></span>
              <span>•</span>
              <span>Sample: <strong className="text-amber-400">{activeTRL.sampleItem}</strong></span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/innovation/projects"
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition-colors shadow-md"
            >
              Browse TRL {activeTRL.level} Projects
            </Link>
            <Link
              to="/commercialization/ip-patents"
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs text-center transition-colors"
            >
              View Disclosed Patents
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
