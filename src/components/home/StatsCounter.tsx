import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BookOpen, FolderGit2, Users, Cpu, Handshake, Award } from 'lucide-react';
import { mockStats } from '../../data/statistics';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtext?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, subtext, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group p-6 rounded-2xl border border-slate-800 bg-slate-900/50 dark:bg-slate-950/60 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-slate-800/80">
          Verified
        </span>
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono tracking-tight group-hover:text-cyan-400 transition-colors">
        {value}
      </div>
      <div className="text-sm font-semibold text-slate-300 mt-1">{label}</div>
      {subtext && <div className="text-xs text-slate-400 mt-0.5">{subtext}</div>}
    </motion.div>
  );
};

export const StatsCounter: React.FC = () => {
  return (
    <section className="relative py-12 border-y border-slate-800/60 bg-navy-950/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          <StatItem
            icon={<BookOpen className="w-5 h-5" />}
            value={mockStats.publicationsDisplay}
            label="Publications"
            subtext="NeurIPS, CVPR, Nature"
            delay={0.05}
          />
          <StatItem
            icon={<FolderGit2 className="w-5 h-5" />}
            value={mockStats.projectsDisplay}
            label="Funded Projects"
            subtext="NSF, NIH & DARPA"
            delay={0.1}
          />
          <StatItem
            icon={<Users className="w-5 h-5" />}
            value={mockStats.researchersDisplay}
            label="Researchers"
            subtext="Faculty & Fellows"
            delay={0.15}
          />
          <StatItem
            icon={<Cpu className="w-5 h-5" />}
            value={mockStats.researchAreasDisplay}
            label="Research Areas"
            subtext="Multidisciplinary"
            delay={0.2}
          />
          <StatItem
            icon={<Handshake className="w-5 h-5" />}
            value={mockStats.collaborationsDisplay}
            label="Collaborations"
            subtext="MIT, Stanford, ETH"
            delay={0.25}
          />
          <StatItem
            icon={<Award className="w-5 h-5" />}
            value={mockStats.citationsTotal}
            label="Citations"
            subtext="h-index average: 36"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};
