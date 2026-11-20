import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Users, Search, X, ChevronRight, Mail, Phone,
  Award, Sparkles, Cpu, Bot, Database, 
  Layers, Code, LineChart, TrendingUp, Lightbulb, 
  ShieldCheck, GraduationCap,
  Terminal, Megaphone, Microscope, Cog, CircuitBoard, Wrench
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { mockResearchers, EXPERT_CATEGORIES, ExpertCategory } from '../../data/researchers';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';

export type ExpertSectionId = 'all' | 'faculty' | 'engineering';

export const SECTION_GROUPS: {
  id: ExpertSectionId;
  label: string;
  shortLabel: string;
  count: number;
  description: string;
  categories: ExpertCategory[];
}[] = [
  {
    id: 'all',
    label: 'All Sections',
    shortLabel: 'All 18 Roles',
    count: 18,
    description: 'Complete multidisciplinary institute talent roster across research, architecture, and engineering.',
    categories: [...EXPERT_CATEGORIES],
  },
  {
    id: 'faculty',
    label: 'Leadership & Research Faculty',
    shortLabel: 'Core Faculty (12)',
    count: 12,
    description: 'Chief advisor, executive advisors, scientific directors, foundational researchers, and system architects.',
    categories: [
      'Chief Advisor',
      'Executive Advisor',
      'Advisor',
      'Scientist',
      'AI Engineer',
      'Innovators',
      'Commercial Analyst',
      'Data Scientist',
      'Data Analyst',
      'Apps Architect',
      'Software Analyst',
      'Software Engineer',
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering, Development & Robotics Disciplines',
    shortLabel: 'Engineering & Robotics (6)',
    count: 6,
    description: 'Autonomous robotics engineers, embedded firmware architects, technical marketing, applied researchers, and junior developers.',
    categories: [
      'Developer/ Junior Engineer',
      'Marketing Engineer',
      'Researcher',
      'Automation & Robotics',
      'Automation & Robotics Engineer',
      'Embedded Engineer',
    ],
  },
];

// Meta configuration for all 18 official categories
const categoryMeta: Record<ExpertCategory, { 
  icon: React.FC<{ className?: string }>; 
  badgeColor: string; 
  roleDesc: string; 
  sectionId: 'faculty' | 'engineering';
}> = {
  'Chief Advisor': {
    icon: ShieldCheck,
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
    roleDesc: 'Supreme Advisory Directorate, International Science & Strategic Governance',
    sectionId: 'faculty',
  },
  'Executive Advisor': {
    icon: Award,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
    roleDesc: 'Executive Council, Scientific Direction & AI Research Governance',
    sectionId: 'faculty',
  },
  'Advisor': {
    icon: Award,
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-500/15 dark:text-yellow-300 dark:border-yellow-500/30',
    roleDesc: 'Strategic Academic Governance, Nano/IT & Engineering Systems',
    sectionId: 'faculty',
  },
  'Scientist': {
    icon: GraduationCap,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
    roleDesc: 'Foundational AI, Mathematical Bounds & Theoretical Science',
    sectionId: 'faculty',
  },
  'AI Engineer': {
    icon: Bot,
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30',
    roleDesc: 'Large Model Serving, Tensor Systems & Neural Inference',
    sectionId: 'faculty',
  },
  'Innovators': {
    icon: Lightbulb,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
    roleDesc: 'TRL 1–8 Rapid Prototyping & Invention Maturation',
    sectionId: 'faculty',
  },
  'Commercial Analyst': {
    icon: TrendingUp,
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
    roleDesc: 'Patent Valuation, Technology Licensing & Venture Structuring',
    sectionId: 'faculty',
  },
  'Data Scientist': {
    icon: Database,
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
    roleDesc: 'Statistical Learning, Causal Networks & Knowledge Discovery',
    sectionId: 'faculty',
  },
  'Data Analyst': {
    icon: LineChart,
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
    roleDesc: 'Exploratory Cohort Telemetry & Institutional BI Pipelines',
    sectionId: 'faculty',
  },
  'Apps Architect': {
    icon: Layers,
    badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30',
    roleDesc: 'Distributed Enterprise Systems & Microservices Architecture',
    sectionId: 'faculty',
  },
  'Software Analyst': {
    icon: ShieldCheck,
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
    roleDesc: 'Formal Systems Verification & Architecture Quality Audits',
    sectionId: 'faculty',
  },
  'Software Engineer': {
    icon: Code,
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
    roleDesc: 'Full-Stack Web Platforms & High-Concurrency APIs',
    sectionId: 'faculty',
  },
  'Developer/ Junior Engineer': {
    icon: Terminal,
    badgeColor: 'bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30',
    roleDesc: 'Frontend Interfaces, Component Frameworks & Unit Test Automation',
    sectionId: 'engineering',
  },
  'Marketing Engineer': {
    icon: Megaphone,
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300 dark:bg-pink-500/15 dark:text-pink-300 dark:border-pink-500/30',
    roleDesc: 'Technical Product Marketing, Developer Advocacy & Growth Telemetry',
    sectionId: 'engineering',
  },
  'Researcher': {
    icon: Microscope,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
    roleDesc: 'Empirical Lab Investigations, Benchmark Verification & Peer-Reviewed Science',
    sectionId: 'engineering',
  },
  'Automation & Robotics': {
    icon: Cog,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
    roleDesc: 'Autonomous Fleet Systems, Kinematic Modeling & Industrial Cobot Cells',
    sectionId: 'engineering',
  },
  'Automation & Robotics Engineer': {
    icon: Cpu,
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30',
    roleDesc: 'ROS 2 Motion Planning, Sensor Fusion Telemetry & Mechatronic Control',
    sectionId: 'engineering',
  },
  'Embedded Engineer': {
    icon: CircuitBoard,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
    roleDesc: 'Firmware Engineering, RTOS Kernels & Ultra-Low-Power Edge Microcontrollers',
    sectionId: 'engineering',
  },
};

export const Experts: React.FC = () => {
  useDocumentTitle('Professional & Expert Network | AIRIC Institute');
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const sectionParam = (searchParams.get('section') as ExpertSectionId) || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedSection, setSelectedSection] = useState<ExpertSectionId>(sectionParam);

  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const sec = (searchParams.get('section') as ExpertSectionId) || 'all';
    setSelectedCategory(cat);
    setSelectedSection(sec);
  }, [searchParams]);

  const handleSectionChange = (sec: ExpertSectionId) => {
    setSelectedSection(sec);
    setSelectedCategory('all');
    const newParams = new URLSearchParams(searchParams);
    if (sec === 'all') {
      newParams.delete('section');
    } else {
      newParams.set('section', sec);
    }
    newParams.delete('category');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
      // Auto-align section if specific category belongs to a section
      const catTyped = cat as ExpertCategory;
      if (categoryMeta[catTyped]) {
        const targetSection = categoryMeta[catTyped].sectionId;
        if (selectedSection !== 'all' && selectedSection !== targetSection) {
          setSelectedSection('all');
          newParams.delete('section');
        }
      }
    }
    setSearchParams(newParams);
  };

  // Extract all experts belonging to official categories
  const categoryExperts = mockResearchers
    .filter(r => r.expertCategory && EXPERT_CATEGORIES.includes(r.expertCategory as ExpertCategory))
    .map(employee => ({
      category: employee.expertCategory as ExpertCategory,
      employee,
    }));

  // Filter based on selected section, category, and search term
  const filtered = categoryExperts.filter(({ category, employee }) => {
    const meta = categoryMeta[category];

    // Section match
    if (selectedSection !== 'all' && meta.sectionId !== selectedSection) {
      return false;
    }

    // Category match
    if (selectedCategory !== 'all' && selectedCategory !== category) {
      return false;
    }

    // Search term match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = employee.name.toLowerCase().includes(q);
      const matchTitle = employee.title.toLowerCase().includes(q);
      const matchCategory = category.toLowerCase().includes(q);
      const matchDept = employee.department.toLowerCase().includes(q);
      const matchExpertise = employee.expertise.some(e => e.toLowerCase().includes(q));
      const matchPhone = employee.phone ? employee.phone.includes(q) : false;
      return matchName || matchTitle || matchCategory || matchDept || matchExpertise || matchPhone;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Banner */}
      <section className="relative py-14 sm:py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-3">
            <Link to="/" className="hover:underline text-slate-400">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span>Institute Directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-bold">18 Specialized Categories</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>18 PROFESSIONAL DISCIPLINES • {categoryExperts.length} APPOINTED ADVISORS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional & Expert Network
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Explore AIRIC’s multidisciplinary talent across research, systems architecture, robotics, and software engineering. Connect with verified specialists across all 18 institute disciplines.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Search & Statistics Bar */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by category, name, or expertise..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="text-xs font-mono text-slate-500">
            Showing <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> of {categoryExperts.length} specialists
          </div>
        </div>

        {/* Section Tabs Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SECTION_GROUPS.map(sec => {
            const isSecActive = selectedSection === sec.id;
            const secTotalExperts = sec.id === 'all'
              ? categoryExperts.length
              : categoryExperts.filter(e => categoryMeta[e.category].sectionId === sec.id).length;
            return (
              <button
                key={sec.id}
                onClick={() => handleSectionChange(sec.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSecActive
                    ? 'border-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-xs ring-1 ring-cyan-500/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono tracking-wide uppercase ${isSecActive ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {sec.label}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isSecActive 
                      ? 'bg-cyan-600 text-white dark:bg-cyan-400 dark:text-slate-950' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {secTotalExperts} {secTotalExperts === 1 ? 'Expert' : 'Experts'} • {sec.count} Roles
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sec.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Categories Filter Pills */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              Filter by Category:
            </span>
            {(selectedCategory !== 'all' || selectedSection !== 'all') && (
              <button
                onClick={() => {
                  handleCategoryChange('all');
                  handleSectionChange('all');
                }}
                className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>All Categories</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/10 dark:bg-black/20">
                {selectedSection === 'all' 
                  ? categoryExperts.length 
                  : categoryExperts.filter(e => categoryMeta[e.category].sectionId === selectedSection).length}
              </span>
            </button>

            {EXPERT_CATEGORIES.filter(cat => {
              if (selectedSection === 'all') return true;
              return categoryMeta[cat].sectionId === selectedSection;
            }).map(cat => {
              const isSelected = selectedCategory === cat;
              const MetaIcon = categoryMeta[cat].icon;
              const catCount = categoryExperts.filter(e => e.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold border-cyan-600 dark:border-cyan-400 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <MetaIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat}</span>
                  {catCount > 1 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isSelected 
                        ? 'bg-black/20 text-white dark:text-slate-950 font-bold' 
                        : 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
                    }`}>
                      {catCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experts Grid */}
        {filtered.length === 0 ? (
          searchTerm.trim() ? (
            <div className="text-center py-12 p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No expert found matching <strong className="text-slate-800 dark:text-slate-200">"{searchTerm}"</strong>.
              </p>
              <button
                onClick={() => { 
                  setSearchTerm(''); 
                  setSelectedCategory('all'); 
                  setSelectedSection('all');
                }}
                className="mt-3 px-4 py-2 text-xs font-bold rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center rounded-3xl border border-dashed border-cyan-500/20 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                {selectedCategory !== 'all' 
                  ? `Appointments in Progress: ${selectedCategory}` 
                  : 'Specialist Appointments in Progress'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                AIRIC is currently finalizing appointments for this discipline. Distinguished faculty nominations, principal investigators, and specialist inquiries may be submitted to the Directorate.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCategory('all'); 
                    setSelectedSection('all');
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  View Appointed Leadership
                </button>
                <Link
                  to="/contact"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
                >
                  Contact Directorate
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-8">
            {/* If All Categories are shown with no active search, display section dividers */}
            {selectedCategory === 'all' && selectedSection === 'all' && !searchTerm ? (
              <>
                {/* Section 1: Leadership & Research Faculty */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Leadership & Research Faculty
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                        {categoryExperts.filter(e => categoryMeta[e.category].sectionId === 'faculty').length} Specialists • 12 Roles
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Foundational Science, Governance & Architecture
                    </span>
                  </div>

                  <div className="space-y-6">
                    {renderExpertsList(filtered.filter(({ category }) => categoryMeta[category].sectionId === 'faculty'))}
                  </div>
                </div>

                {/* Section 2: Engineering, Development & Robotics Disciplines */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Engineering, Development & Robotics Disciplines
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-lime-500/10 text-lime-700 dark:text-lime-300 border border-lime-500/20">
                        {categoryExperts.filter(e => categoryMeta[e.category].sectionId === 'engineering').length} Specialists • 6 Roles
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      Autonomous Robotics, Firmware, Marketing & Junior Engineers
                    </span>
                  </div>

                  <div className="space-y-6">
                    {categoryExperts.filter(e => categoryMeta[e.category].sectionId === 'engineering').length > 0 ? (
                      renderExpertsList(filtered.filter(({ category }) => categoryMeta[category].sectionId === 'engineering'))
                    ) : (
                      <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-3">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-600 dark:text-lime-400">
                          <Wrench className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          Engineering & Autonomous Robotics Appointments in Progress
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                          AIRIC is actively screening nominations and principal engineers across Autonomous Robotics, Embedded Systems, and AI Engineering disciplines.
                        </p>
                        <div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                          >
                            Inquire with Academic Directorate →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div>
                {renderExpertsList(filtered)}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );

  function renderExpertsList(experts: typeof filtered) {
    const chiefAdvisorItem = experts.find(e => e.category === 'Chief Advisor');
    const regularExperts = experts.filter(e => e.category !== 'Chief Advisor');

    return (
      <div className="space-y-6">
        {chiefAdvisorItem && (
          <div className="flex justify-center w-full">
            <div className="w-full max-w-md">
              {renderExpertCard(chiefAdvisorItem.category, chiefAdvisorItem.employee, true)}
            </div>
          </div>
        )}

        {regularExperts.length > 0 && (
          <div className="flex justify-center w-full">
            <div className={`grid gap-6 w-full ${
              regularExperts.length === 1 
                ? 'max-w-md grid-cols-1' 
                : regularExperts.length === 2 
                ? 'max-w-3xl grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {regularExperts.map(({ category, employee }) => renderExpertCard(category, employee, false))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderExpertCard(category: ExpertCategory, employee: typeof mockResearchers[0], isChiefAdvisor = false) {
    const meta = categoryMeta[category];
    const CategoryIcon = meta.icon;

    return (
      <Card 
        key={employee.id} 
        className={`border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden ${
          isChiefAdvisor 
            ? 'border-indigo-400/60 dark:border-indigo-500/40 hover:border-indigo-500 ring-1 ring-indigo-500/20 shadow-sm' 
            : 'hover:border-cyan-500/40'
        }`}
      >
        <CardHeader className="pb-3">
          {/* Category Identifier Ribbon */}
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border ${meta.badgeColor}`}>
              <CategoryIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{category}</span>
            </span>
            <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
              employee.id === 'prof-dr-hu-guoqing' || employee.id === 'lt-col-shameem-reza' || employee.id === 'mashkurul-alam-ohi' || employee.id === 'mehadi-talha' || employee.id === 'ahnaf-shahryar-nayem'
                ? 'text-cyan-600 dark:text-cyan-400 font-bold' 
                : 'text-slate-400'
            }`}>
              {employee.id === 'prof-dr-hu-guoqing'
                ? 'CHIEF ADVISOR'
                : employee.id === 'lt-col-shameem-reza'
                ? 'EXECUTIVE ADVISOR' 
                : employee.id === 'mashkurul-alam-ohi'
                ? 'RESEARCH SCIENTIST'
                : employee.id === 'mehadi-talha'
                ? 'AI ENGINEER'
                : employee.id === 'ahnaf-shahryar-nayem'
                ? 'SOFTWARE ENGINEER'
                : 'INSTITUTE APPOINTEE'}
            </span>
          </div>

          <div className="flex items-start gap-3.5">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-cyan-500/40 transition-all shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                <Link to={`/researchers/${employee.slug}`}>
                  {employee.name}
                </Link>
              </CardTitle>
              <span className="text-xs text-slate-600 dark:text-slate-300 block mt-0.5 font-medium leading-tight">
                {employee.title}
              </span>
              <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 block mt-1 truncate">
                {employee.department}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {employee.bio}
          </p>

          <div className="space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-slate-400">
              Primary Expertise:
            </div>
            <div className="flex flex-wrap gap-1">
              {employee.expertise.slice(0, 3).map(exp => (
                <span 
                  key={exp} 
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Citations: <strong className="text-slate-800 dark:text-slate-200">{employee.citations.toLocaleString()}</strong></span>
            <span>h-index: <strong className="text-slate-800 dark:text-slate-200">{employee.hIndex}</strong></span>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <Link 
            to={`/researchers/${employee.slug}`} 
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Full Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-1">
            {employee.phone && (
              <a 
                href={`tel:${employee.phone.split(',')[0].trim()}`} 
                title={`Call ${employee.name}: ${employee.phone}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            <a 
              href={`mailto:${employee.email}`} 
              title={`Email ${employee.name}: ${employee.email}`}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </CardFooter>
      </Card>
    );
  }
};
