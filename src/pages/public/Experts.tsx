import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Users, Search, X, ChevronRight, Mail, 
  Award, Sparkles, Cpu, Bot, Database, 
  Layers, Code, LineChart, TrendingUp, Lightbulb, 
  ShieldCheck, GraduationCap, Briefcase
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { mockResearchers, EXPERT_CATEGORIES, ExpertCategory } from '../../data/researchers';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';

// Meta configuration for the 10 official categories
const categoryMeta: Record<ExpertCategory, { icon: React.FC<{ className?: string }>; badgeColor: string; roleDesc: string }> = {
  'Advisor': {
    icon: Award,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
    roleDesc: 'Strategic Council & Technology Commercialization Governance',
  },
  'Scientist': {
    icon: GraduationCap,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
    roleDesc: 'Foundational AI, Mathematical Bounds & Theoretical Science',
  },
  'AI Engineer': {
    icon: Bot,
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30',
    roleDesc: 'Large Model Serving, Tensor Systems & Neural Inference',
  },
  'Innovators': {
    icon: Lightbulb,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
    roleDesc: 'TRL 1–8 Rapid Prototyping & Invention Maturation',
  },
  'Commercial Analyst': {
    icon: TrendingUp,
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
    roleDesc: 'Patent Valuation, Technology Licensing & Venture Structuring',
  },
  'Data Scientist': {
    icon: Database,
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
    roleDesc: 'Statistical Learning, Causal Networks & Knowledge Discovery',
  },
  'Data Analyst': {
    icon: LineChart,
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
    roleDesc: 'Exploratory Cohort Telemetry & Institutional BI Pipelines',
  },
  'Apps Architect': {
    icon: Layers,
    badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/30',
    roleDesc: 'Distributed Enterprise Systems & Microservices Architecture',
  },
  'Software Analyst': {
    icon: ShieldCheck,
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30',
    roleDesc: 'Formal Systems Verification & Architecture Quality Audits',
  },
  'Software Engineer': {
    icon: Code,
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
    roleDesc: 'Full-Stack Web Platforms & High-Concurrency APIs',
  },
};

export const Experts: React.FC = () => {
  useDocumentTitle('Professional & Expert Network | AIRIC Institute');
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  // We extract exactly one primary demo employee for each of the 10 official categories
  const categoryDemoEmployees = EXPERT_CATEGORIES.map(category => {
    const employee = mockResearchers.find(r => r.expertCategory === category);
    return {
      category,
      employee,
    };
  }).filter((item): item is { category: ExpertCategory; employee: typeof mockResearchers[0] } => !!item.employee);

  // Filter based on selected category and search term
  const filtered = categoryDemoEmployees.filter(({ category, employee }) => {
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
      return matchName || matchTitle || matchCategory || matchDept || matchExpertise;
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
            <span className="text-cyan-300 font-bold">10 Expert Categories</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>10 PROFESSIONAL CATEGORIES • 1 DEMO EMPLOYEE PER ROLE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional & Expert Network
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Connect with our 10 specialized categories: Advisor, Scientist, AI Engineer, Innovators, Commercial Analyst, Data Scientist, Data Analyst, Apps Architect, Software Analyst, and Software Engineer.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-4">
          {/* Search Box */}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="text-xs font-mono text-slate-500">
              Showing <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> of 10 category specialists
            </div>
          </div>

          {/* 10 Official Categories Filter Pills */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                Filter by 10 Categories:
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => handleCategoryChange('all')}
                  className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  Reset to All
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
                  10
                </span>
              </button>

              {EXPERT_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat;
                const MetaIcon = categoryMeta[cat].icon;

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
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 10 Experts Grid (1 Demo Employee per Category) */}
        {filtered.length === 0 ? (
          <div className="mt-12 text-center py-12 p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No expert found matching <strong className="text-slate-800 dark:text-slate-200">"{searchTerm}"</strong> in category <strong className="text-slate-800 dark:text-slate-200">{selectedCategory}</strong>.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-2 text-xs font-bold rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(({ category, employee }) => {
              const meta = categoryMeta[category];
              const CategoryIcon = meta.icon;

              return (
                <Card 
                  key={employee.id} 
                  className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    {/* Category Identifier Ribbon */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border ${meta.badgeColor}`}>
                        <CategoryIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{category}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        DEMO EXPERT
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
                    <a 
                      href={`mailto:${employee.email}`} 
                      title={`Email ${employee.name}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
