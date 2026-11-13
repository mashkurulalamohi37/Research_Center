import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Cpu, Rocket, Globe2, ArrowRight } from 'lucide-react';

interface PillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  link: string;
  icon: React.ElementType;
  accent: string;
}

const pillars: PillarItem[] = [
  {
    id: 'research',
    number: '01',
    title: 'Research Excellence',
    subtitle: 'Frontier science, academic breakthroughs & peer-reviewed discovery',
    link: '/research',
    icon: Award,
    accent: 'cyan',
  },
  {
    id: 'technology',
    number: '02',
    title: 'Intelligent Technology',
    subtitle: 'Next-gen AI, quantum architectures & advanced software systems',
    link: '/technology',
    icon: Cpu,
    accent: 'blue',
  },
  {
    id: 'innovation',
    number: '03',
    title: 'Entrepreneurial Innovation',
    subtitle: 'Deep-tech incubation, young innovator labs & prototype engineering',
    link: '/innovation',
    icon: Rocket,
    accent: 'amber',
  },
  {
    id: 'development',
    number: '04',
    title: 'Sustainable Development',
    subtitle: 'High-impact commercialization, climate technology & healthcare solutions',
    link: '/commercialization',
    icon: Globe2,
    accent: 'emerald',
  },
];

export const PillarsBar: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 px-2 sm:px-4">
      {/* Label / Section Header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500/50"></span>
        <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-800 dark:text-cyan-400 uppercase">
          4 Core Institutional Pillars
        </span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500/50"></span>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.id}
              to={pillar.link}
              className="group relative p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900/90 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5 hover:border-cyan-500/50 text-left flex flex-col justify-between"
            >
              {/* Top Row: Icon & Pillar Number */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    PILLAR {pillar.number}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors font-sans tracking-tight">
                  {pillar.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                <span>Explore Domain</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
