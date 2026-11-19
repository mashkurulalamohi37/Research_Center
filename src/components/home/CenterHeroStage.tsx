import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, Layers, Compass, Cpu, BookOpen, Rocket, ShieldCheck, 
  ArrowRight, Sparkles, Database, FileCode, CheckCircle2 
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

  const showcaseGateways = [
    {
      title: '10 Research Divisions',
      subtitle: 'Scientific matrix spanning AI, Quantum, Cybersecurity, Healthcare & Robotics',
      link: '/divisions',
      icon: Globe,
      tag: 'Divisions Matrix',
    },
    {
      title: 'Proprietary Applications',
      subtitle: '10 deployed deep-tech platforms, clinical diagnostics & enterprise tools',
      link: '/apps',
      icon: Layers,
      tag: '10 Apps Portfolio',
    },
    {
      title: 'Peer-Reviewed Journals',
      subtitle: 'Open-access publications, preprints, datasets, and citation repositories',
      link: '/publications',
      icon: BookOpen,
      tag: 'JAIR & JAIRIC',
    },
    {
      title: 'Commercial Initiatives',
      subtitle: 'Funded investigations, spinouts, patents, and collegiate tech-transfer alliances',
      link: '/projects',
      icon: Rocket,
      tag: 'Funded Projects',
    },
  ];

  return (
    <section 
      id="center-hero-stage" 
      aria-label="Institutional Identity & Core Mission"
      className="w-full flex flex-col justify-start px-2 sm:px-4 lg:px-6 py-2 sm:py-4 relative select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-4xl space-y-4 sm:space-y-6"
      >
        {/* Official Ecosystem Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-[11px] font-mono font-medium backdrop-blur-md max-w-full">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="tracking-wider uppercase font-semibold">
            OFFICIAL RESEARCH & COMMERCIALIZATION ECOSYSTEM
          </span>
        </div>

        {/* Full Organization Name Prominently Displayed */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black tracking-tight text-slate-900 dark:text-white font-sans leading-[1.12]">
          Advanced Intelligence, Research, Innovation{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400">
            & Commercialization
          </span>{' '}
          Institute
        </h1>

        {/* Institutional Mission Tagline */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
          Transforming Ideas into Real-World Impact • Intelligent Research • Innovation • Commercialization
        </p>

        {/* 4 Core Pillars Micro-Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{pillar.label}</span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons Cluster */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link to="/divisions">
            <Button variant="cyan" size="md" className="shadow-md shadow-cyan-500/20 font-semibold h-9 px-4 text-xs sm:text-sm">
              <Globe className="w-4 h-4 mr-2" />
              Explore 10 Divisions
            </Button>
          </Link>

          <Link to="/apps">
            <Button variant="outline" size="md" className="border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/50 h-9 px-4 text-xs sm:text-sm">
              <Layers className="w-4 h-4 mr-2 text-cyan-600 dark:text-cyan-400" />
              Proprietary Applications
            </Button>
          </Link>

          <Link to="/research">
            <Button variant="ghost" size="md" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white h-9 px-3 text-xs sm:text-sm">
              <Compass className="w-4 h-4 mr-1.5 text-slate-400" />
              Scientific Research
            </Button>
          </Link>
        </div>

        {/* Institutional Telemetry Strip */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-4 sm:gap-8 text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-mono">
          {telemetry.map((item, idx) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-slate-900 dark:text-white font-bold tracking-tight text-sm sm:text-base">
                {item.val}
              </span>
              <span className="text-slate-500">
                {item.label}
              </span>
              {idx < telemetry.length - 1 && (
                <span className="text-slate-300 dark:text-slate-700 ml-2 hidden sm:inline">/</span>
              )}
            </div>
          ))}
        </div>

        {/* 4 Feature Gateways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {showcaseGateways.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.link}
                className="group p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 shadow-2xs flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase shrink-0">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
