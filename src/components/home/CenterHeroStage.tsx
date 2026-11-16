import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, Layers, Compass, Cpu, BookOpen, Rocket, ShieldCheck 
} from 'lucide-react';
import { Button } from '../ui/Button';

export const CenterHeroStage: React.FC = () => {
  const pillars = [
    { label: 'Research Excellence', icon: BookOpen },
    { label: 'Intelligent Technology', icon: Cpu },
    { label: 'Entrepreneurial Innovation', icon: Rocket },
    { label: 'Sustainable Impact', icon: ShieldCheck },
  ];

  const telemetry = [
    { label: 'Divisions', val: '10' },
    { label: 'Applications', val: '10' },
    { label: 'Publications', val: '280+' },
    { label: 'Incubated Capital', val: '$4.2M' },
  ];

  return (
    <section 
      id="center-hero-stage" 
      aria-label="Institutional Identity & Core Mission"
      className="w-full flex flex-col justify-start px-2 sm:px-4 lg:px-6 py-0.5 relative select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        {/* Official Ecosystem Status Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-[10px] font-mono font-medium mb-1.5 backdrop-blur-md max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-wider uppercase font-semibold truncate hidden sm:inline">
            OFFICIAL RESEARCH & COMMERCIALIZATION ECOSYSTEM
          </span>
          <span className="tracking-wider uppercase font-semibold truncate sm:hidden">
            OFFICIAL RESEARCH ECOSYSTEM
          </span>
        </div>

        {/* Full Organization Name Prominently Displayed - matching wireframe focal point */}
        <h1 className="text-xl sm:text-2xl lg:text-[30px] xl:text-[34px] font-black tracking-tight text-slate-900 dark:text-white font-sans leading-[1.12] mb-1.5">
          Advanced Intelligence Research, Innovation{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400">
            & Commercialization
          </span>{' '}
          Institute
        </h1>

        {/* Institutional Mission Tagline */}
        <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-2">
          Transforming Ideas into Real-World Impact • Intelligent Research • Innovation • Commercialization
        </p>

        {/* 4 Core Pillars Micro-Bar */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium"
              >
                <Icon className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{pillar.label}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons Cluster */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Link to="/divisions">
            <Button variant="cyan" size="sm" className="shadow-md shadow-cyan-500/20 font-semibold h-8 px-3 text-xs">
              <Globe className="w-3.5 h-3.5 mr-1.5" />
              Explore 10 Divisions
            </Button>
          </Link>

          <Link to="/apps">
            <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/50 h-8 px-3 text-xs">
              <Layers className="w-3.5 h-3.5 mr-1.5 text-cyan-600 dark:text-cyan-400" />
              Proprietary Applications
            </Button>
          </Link>

          <Link to="/research">
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white h-8 px-2.5 text-xs">
              <Compass className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Scientific Research
            </Button>
          </Link>
        </div>

        {/* Institutional Telemetry Micro-Strip */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2.5 sm:gap-5 text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px] font-mono">
          {telemetry.map((item, idx) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-white font-bold tracking-tight">
                {item.val}
              </span>
              <span className="text-slate-500 text-[10px] sm:text-[11px]">
                {item.label}
              </span>
              {idx < telemetry.length - 1 && (
                <span className="text-slate-300 dark:text-slate-700 ml-1.5 hidden sm:inline">/</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
