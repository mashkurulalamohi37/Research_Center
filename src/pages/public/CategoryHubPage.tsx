import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, CheckCircle2, ChevronRight, 
  ExternalLink, Layers, Shield, BookOpen, Cpu, Rocket, 
  TrendingUp, GraduationCap, HeartPulse, Handshake, Bot, Building2
} from 'lucide-react';
import { navigationCategories, NavCategory, NavSubItem } from '../../data/navigation';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  BookOpen,
  Rocket,
  TrendingUp,
  Cpu,
  GraduationCap,
  Users: Building2,
  HeartPulse,
  Handshake,
  Bot,
};

export const CategoryHubPage: React.FC = () => {
  const { categorySlug, sectionSlug } = useParams<{ categorySlug?: string; sectionSlug?: string }>();
  
  // Resolve category from URL (or fallback to innovation)
  const activeSlug = categorySlug || 'innovation';
  const category: NavCategory = navigationCategories.find(c => c.id === activeSlug) || navigationCategories[2];
  
  useDocumentTitle(`${category.title} | AIRIC Institute`);

  // Flatten all sub-items in this category
  const allItems: NavSubItem[] = category.sections.flatMap(s => s.items);

  // Active section item
  const [selectedItem, setSelectedItem] = useState<NavSubItem>(
    allItems.find(item => sectionSlug && item.path.includes(sectionSlug)) || allItems[0]
  );

  useEffect(() => {
    if (sectionSlug) {
      const match = allItems.find(item => item.path.includes(sectionSlug));
      if (match) setSelectedItem(match);
    } else {
      setSelectedItem(allItems[0]);
    }
  }, [categorySlug, sectionSlug, category]);

  const Icon = iconMap[category.iconName] || Layers;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. Category Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 scientific-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
            <Link to="/" className="hover:underline text-slate-400 hover:text-cyan-300">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-400">Institutional Hubs</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 uppercase font-bold">Category {category.number}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
                <Icon className="w-3.5 h-3.5" />
                <span>CATEGORY {category.number} • OFFICIAL DIVISION HUB</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                {category.title}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {category.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link to="/collaborate">
                <Button variant="cyan" size="md" className="shadow-lg shadow-cyan-500/10 w-full sm:w-auto">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Submit Proposal
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md" className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 w-full sm:w-auto">
                  Contact Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Section Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sub-Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
              <div className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-3 mb-3">
                Hub Sub-Sections
              </div>
              <div className="space-y-1.5">
                {allItems.map((item) => {
                  const isSelected = selectedItem.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-500/30 shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex flex-col pr-2">
                        <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                        {item.desc && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 line-clamp-1">
                            {item.desc}
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links across other hubs */}
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 text-xs">
              <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Related Portals
              </span>
              <div className="flex flex-wrap gap-1.5">
                <Link to="/apps" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600">
                  10 Applications
                </Link>
                <Link to="/datasets" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600">
                  Datasets Repository
                </Link>
                <Link to="/experts" className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-600">
                  Expert Network
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Active Section Detail Card */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <Badge variant="cyan" className="font-mono text-[10px]">
                  ACTIVE INITIATIVE
                </Badge>
                {selectedItem.badge && (
                  <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5">
                    {selectedItem.badge}
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {selectedItem.name}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedItem.desc || `${selectedItem.name} represents a dedicated operational initiative of the ${category.title} division at the AIRIC Institute. It facilitates multidisciplinary research, applied engineering, cross-sector translation, and structured stakeholder engagement.`}
              </p>

              {/* Mandate & Execution Matrix */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 dark:text-cyan-400 font-mono uppercase mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> Core Mandate
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Advance frontier methodologies, ensure rigorous peer validation, and accelerate technology readiness levels (TRL) for global deployment.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 dark:text-cyan-400 font-mono uppercase mb-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-600" /> Governance & Standards
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Governed under the AIRIC Institutional Academic Council, following open science data principles and ISO/IEC technical standards.
                  </p>
                </div>
              </div>

              {/* Call-to-actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>Target Route:</span>
                  <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {selectedItem.path}
                  </code>
                </div>

                <div className="flex items-center gap-3">
                  <Link to="/collaborate">
                    <Button variant="cyan" size="sm">
                      Engage With Center <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Quick Overview of all sections in this Category */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm">
              <h3 className="text-sm font-bold font-mono tracking-wider text-slate-500 dark:text-slate-400 uppercase mb-4">
                All Initiatives in this Division
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {allItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setSelectedItem(item)}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500/40 cursor-pointer transition-all hover:shadow-xs group"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 block transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block mt-1">
                      {item.path}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
