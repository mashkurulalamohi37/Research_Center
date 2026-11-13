import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Users, Search, Filter, ShieldCheck, Mail, 
  ExternalLink, GraduationCap, ChevronRight, Award, Cpu 
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { mockResearchers } from '../../data/researchers';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

const domains = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'ai', label: 'AI & Emerging Tech' },
  { id: 'quantum', label: 'Quantum Computing' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'data-science', label: 'Data Science & Analytics' },
  { id: 'healthcare', label: 'Healthcare & Medical' },
  { id: 'scientific-research', label: 'Scientific Research' },
  { id: 'innovation', label: 'Innovation & Startup' },
  { id: 'education', label: 'Education & Training' },
  { id: 'engineering', label: 'Industry & Engineering' },
  { id: 'international', label: 'International Experts' },
  { id: 'agriculture', label: 'Agriculture & Environment' },
  { id: 'wellbeing', label: 'Mental Wellbeing' },
];

const roles = [
  { id: 'all', label: 'All Roles' },
  { id: 'ai-engineer', label: 'AI Engineers' },
  { id: 'cybersecurity-engineer', label: 'Cybersecurity Engineers' },
  { id: 'ai-cybersecurity-researcher', label: 'AI Cyber Researchers' },
  { id: 'data-analyst', label: 'Data Analysts' },
  { id: 'healthcare-expert', label: 'Healthcare Engineers' },
  { id: 'medical-consultant', label: 'Medical Consultants' },
  { id: 'scientist', label: 'Scientists' },
  { id: 'consultant', label: 'Consultants' },
  { id: 'engineer', label: 'Systems Analysts' },
];

export const Experts: React.FC = () => {
  useDocumentTitle('Professional & Expert Network | AIRIC Institute');
  const [searchParams, setSearchParams] = useSearchParams();

  const domainParam = searchParams.get('domain') || 'all';
  const roleParam = searchParams.get('role') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainParam);
  const [selectedRole, setSelectedRole] = useState(roleParam);

  useEffect(() => {
    setSelectedDomain(searchParams.get('domain') || 'all');
    setSelectedRole(searchParams.get('role') || 'all');
  }, [searchParams]);

  const handleDomainChange = (id: string) => {
    setSelectedDomain(id);
    const newParams = new URLSearchParams(searchParams);
    if (id === 'all') newParams.delete('domain');
    else newParams.set('domain', id);
    setSearchParams(newParams);
  };

  const handleRoleChange = (id: string) => {
    setSelectedRole(id);
    const newParams = new URLSearchParams(searchParams);
    if (id === 'all') newParams.delete('role');
    else newParams.set('role', id);
    setSearchParams(newParams);
  };

  // Filter researchers
  const filtered = mockResearchers.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Domain matching
    let matchesDomain = true;
    if (selectedDomain !== 'all') {
      const d = selectedDomain.toLowerCase();
      matchesDomain = r.expertise.some(e => e.toLowerCase().includes(d)) ||
                      r.interests.some(i => i.toLowerCase().includes(d)) ||
                      r.department.toLowerCase().includes(d) ||
                      r.researchAreaIds.some(area => area.includes(d));
    }

    // Role matching
    let matchesRole = true;
    if (selectedRole !== 'all') {
      const ro = selectedRole.toLowerCase();
      matchesRole = r.title.toLowerCase().includes(ro.replace('-', ' ')) ||
                    r.category.toLowerCase().includes(ro) ||
                    r.expertise.some(e => e.toLowerCase().includes(ro.replace('-', ' ')));
    }

    return matchesSearch && matchesDomain && matchesRole;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
            <Link to="/" className="hover:underline text-slate-400">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span>Institute Directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-bold">Resource Persons & Experts</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>RICC RESOURCE PERSONS & EXPERT NETWORK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional & Expert Network
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Discover our world-leading faculty, AI engineers, cybersecurity specialists, healthcare experts, and scientific consultants across 12 multidisciplinary domains.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-4">
          {/* Search Box */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search experts by name, title, or expertise..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="text-xs font-mono text-slate-500">
              Showing <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> registered experts
            </div>
          </div>

          {/* 12 Domains Filter Pills */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-500" /> Filter by 12 Resource Domains:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {domains.map(d => (
                <button
                  key={d.id}
                  onClick={() => handleDomainChange(d.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedDomain === d.id
                      ? 'bg-cyan-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Roles Filter Pills */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Filter by Professional Roles:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedRole === r.id
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(expert => (
            <Card key={expert.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-cyan-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-cyan-500/40 transition-all shrink-0"
                  />
                  <div>
                    <CardTitle className="text-base font-bold group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      <Link to={`/researchers/${expert.slug}`}>
                        {expert.name}
                      </Link>
                    </CardTitle>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5 font-medium leading-tight">
                      {expert.title}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 block mt-1">
                      {expert.department}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {expert.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {expert.expertise.slice(0, 3).map(exp => (
                    <span key={exp} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                      {exp}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Citations: <strong className="text-slate-700 dark:text-slate-300">{expert.citations.toLocaleString()}</strong></span>
                  <span>h-index: <strong className="text-slate-700 dark:text-slate-300">{expert.hIndex}</strong></span>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <Link to={`/researchers/${expert.slug}`} className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                  View Full Profile →
                </Link>
                <a href={`mailto:${expert.email}`} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
