import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mail, MapPin, BookOpen, 
  Award, GraduationCap, Github, 
  Globe, Sparkles, CheckCircle2, Phone,
  Briefcase, ExternalLink, Lightbulb, FileText,
  BookCheck, Users, ChevronRight
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { mockProjects } from '../../data/projects';
import { mockPublications } from '../../data/publications';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ResearcherProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const researcher = mockResearchers.find(r => r.slug === slug || r.id === slug) || mockResearchers[0];
  useDocumentTitle(`${researcher.name} — Faculty & Investigators`);

  // Authored Publications & Supervised Projects
  const authoredPublications = mockPublications.filter(p => 
    p.authors.some(a => a.toLowerCase().includes(researcher.name.split(' ').slice(-1)[0].toLowerCase())) ||
    p.authorIds?.includes(researcher.id)
  );

  const supervisedProjects = mockProjects.filter(p => 
    p.leadResearcherId === researcher.id || p.teamMemberIds.includes(researcher.id)
  );

  const tabs = [
    { id: 'overview', label: 'Biography & Focus' },
    ...(researcher.experiences && researcher.experiences.length > 0 
      ? [{ id: 'experience', label: 'Academic & Professional Experience', count: researcher.experiences.length }]
      : []),
    { id: 'publications', label: 'Publications & Books', count: authoredPublications.length },
    { id: 'projects', label: 'Projects & Grants', count: supervisedProjects.length },
    { id: 'education', label: 'Education & Honors' },
  ];

  const stats = researcher.academicStats;

  return (
    <div className="py-10 space-y-12">
      {/* Profile Header Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar & Badges */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="relative inline-block">
                <img
                  src={researcher.avatar}
                  alt={researcher.name}
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-2 border-cyan-500/40 shadow-xl mx-auto md:mx-0"
                />
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white dark:bg-navy-950 text-cyan-700 dark:text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold shadow-xs">
                  h-index: {researcher.hIndex}
                </span>
              </div>
            </div>

            {/* Core Info & Socials */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cyan">{researcher.expertCategory || researcher.category.toUpperCase()}</Badge>
                {stats?.activeUniversityYears && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
                    {stats.activeUniversityYears} Years University Leadership
                  </span>
                )}
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Member since {researcher.joinDate.split('-')[0]}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {researcher.name}
              </h1>

              <p className="text-sm sm:text-base text-cyan-700 dark:text-cyan-400 font-medium font-mono">
                {researcher.title}
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-2">
                <span>{researcher.department}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {researcher.office}
                </span>
              </p>

              {/* Stats Bar */}
              <div className="pt-2 flex flex-wrap gap-6 text-xs font-mono border-t border-slate-100 dark:border-slate-800/80">
                <div>
                  <span className="text-slate-500 block">Total Citations</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-base">{researcher.citations.toLocaleString()}</strong>
                </div>
                {stats?.patentsCount !== undefined && (
                  <div>
                    <span className="text-slate-500 block">Patents Granted</span>
                    <strong className="text-amber-600 dark:text-amber-400 text-base">{stats.patentsCount} Patents</strong>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block">
                    {stats?.publicationsCount ? 'Publications (Total)' : 'Publications'}
                  </span>
                  <strong className="text-cyan-700 dark:text-cyan-400 text-base">
                    {stats?.publicationsCount || authoredPublications.length}
                    {stats?.sciIndexedCount ? ` (${stats.sciIndexedCount} SCI/EI)` : ''}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Research Projects</span>
                  <strong className="text-slate-900 dark:text-slate-100 text-base">
                    {stats?.completedResearchProjects ? `${stats.completedResearchProjects} Completed` : supervisedProjects.length}
                  </strong>
                </div>
              </div>

              {/* External Scholarly & Contact Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${researcher.email}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> {researcher.email}
                </a>

                {researcher.phone && (
                  <a
                    href={`tel:${researcher.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {researcher.phone}
                  </a>
                )}

                {researcher.googleScholar && (
                  <a
                    href={researcher.googleScholar}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Google Scholar
                  </a>
                )}

                {researcher.orcid && (
                  <a
                    href={researcher.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> ORCID
                  </a>
                )}

                {researcher.github && (
                  <a
                    href={researcher.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation & Details Content */}
      <section className="container mx-auto px-4 lg:px-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-8" />

        {/* Tab 1: Biography & Focus */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Biography */}
              <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Biography & Academic Background
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {researcher.bio}
                </p>
              </Card>

              {/* Quantitative Academic Milestones (If Available) */}
              {stats && (
                <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Academic Impact & Career Milestones
                    </h3>
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">
                      {stats.activeUniversityYears} Years Active Experience
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                      <span className="text-2xl font-black text-cyan-700 dark:text-cyan-300 font-mono block">
                        {stats.activeUniversityYears} yrs
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Active University Experience ({stats.teachingYears}y Teach / {stats.researchYears}y Research)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <span className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono block">
                        {stats.patentsCount}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Patents Filed & Granted
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono block">
                        {stats.publicationsCount}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Publications ({stats.sciIndexedCount} SCI/EI Indexed)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <span className="text-2xl font-black text-purple-700 dark:text-purple-400 font-mono block">
                        {stats.completedResearchProjects}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Completed Research Projects
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
                        {stats.completedTeachingProjects}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Completed Teaching Projects
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
                        {stats.thesisSupervisionCount}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        B.Sc. & M.Sc. Theses Supervised
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono block">
                        {stats.phdSupervisedCount}
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                        Ph.D. Students Supervised/Co-supervised
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center flex flex-col justify-between">
                      <div>
                        <span className="text-2xl font-black text-cyan-700 dark:text-cyan-300 font-mono block">
                          {stats.moocCount}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium leading-tight block mt-1">
                          International MOOC Project
                        </span>
                      </div>
                      {stats.moocUrl && (
                        <a
                          href={stats.moocUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline font-bold mt-2"
                        >
                          <span>View Course</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Book Publication Card (If Available) */}
              {researcher.bookPublication && (
                <Card className="p-8 border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/5 via-white to-cyan-500/5 dark:from-amber-500/10 dark:via-slate-900 dark:to-cyan-500/10 shadow-xs space-y-4">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
                        <BookCheck className="w-3.5 h-3.5" />
                        <span>AUTHORED MONOGRAPH / TEXTBOOK</span>
                      </div>
                      <h4 className="text-xl font-extrabold text-slate-900 dark:text-white pt-1">
                        {researcher.bookPublication.title}
                      </h4>
                      <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                        {researcher.bookPublication.publisher} • {researcher.bookPublication.category}
                      </p>
                    </div>

                    {researcher.bookPublication.url && (
                      <a
                        href={researcher.bookPublication.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <span>Purchase on Amazon</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Published with Taylor & Francis, CRC Press (USA), this authoritative volume delivers comprehensive coverage of classical and modern control engineering theory and state-space applications for undergraduate and master's degree candidates.
                  </p>
                </Card>
              )}

              {/* Primary Research Interests */}
              <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Areas of Specialization & Research Interests
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
                  {researcher.interests.map((interest, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs leading-relaxed">{interest}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Technical Expertise */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Technical Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {researcher.expertise.map(exp => (
                    <span key={exp} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-cyan-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700">
                      {exp}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Academic Highlights Summary */}
              {researcher.experiences && (
                <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
                    Key Appointments
                  </h4>
                  <div className="space-y-3">
                    {researcher.experiences.slice(0, 4).map((exp, i) => (
                      <div key={i} className="text-xs pb-2 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                        <span className="font-bold text-slate-900 dark:text-slate-100 block leading-tight">
                          {exp.role}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                          {exp.organization}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('experience')}
                    className="text-xs text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>View all {researcher.experiences.length} appointments</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </Card>
              )}

              {/* Opportunities card */}
              <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-3 text-center">
                <Sparkles className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Research & Academic Fellowships</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Collaborate with our research divisions or inquire about graduate thesis co-supervision.
                </p>
                <Link to="/collaborate" className="block pt-2">
                  <Button variant="cyan" size="sm" className="w-full">
                    Collaborate with Advisor
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Academic & Professional Experience */}
        {activeTab === 'experience' && researcher.experiences && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  18 Years of Continuous Academic & Research Leadership
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  14 Years University Level Teaching Position • 4 Years Dedicated Scientific & Industrial Research Position
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-cyan-600 text-white text-xs font-mono font-bold shrink-0">
                {researcher.experiences.length} Distinguished Appointments
              </span>
            </div>

            <div className="space-y-4">
              {researcher.experiences.map((exp, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs hover:border-cyan-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400 border border-slate-200 dark:border-slate-700">
                        {exp.period || 'Academic Position'}
                      </span>
                      {exp.location && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                          📍 {exp.location}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {exp.role}
                    </h4>

                    <p className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
                      {exp.organization}
                    </p>

                    {exp.highlights && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                        {exp.highlights}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            {stats && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span>Total Publications: <strong className="text-slate-900 dark:text-white">{stats.publicationsCount}</strong></span>
                <span>SCI/SCIE/EI Indexed: <strong className="text-cyan-600 dark:text-cyan-400">{stats.sciIndexedCount}</strong></span>
                <span>Patents: <strong className="text-amber-600 dark:text-amber-400">{stats.patentsCount} Granted</strong></span>
              </div>
            )}

            <div className="space-y-4">
              {authoredPublications.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">No publications listed yet.</p>
              ) : (
                authoredPublications.map(pub => (
                  <div key={pub.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="cyan">{pub.type}</Badge>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">{pub.year}</span>
                        <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{pub.venue}</span>
                      </div>
                      <Link to={`/publications/${pub.slug}`}>
                        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                          {pub.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 font-mono">Authors: {pub.authors.join(', ')}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{pub.abstract}</p>
                    </div>
                    {pub.pdfUrl && (
                      <a 
                        href={pub.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="shrink-0"
                      >
                        <Button variant="cyan" size="sm" className="flex items-center gap-1.5">
                          <span>{pub.type === 'Book' ? 'View Book' : 'Read Publication'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {stats && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span>Scientific Research Projects: <strong className="text-slate-900 dark:text-white">{stats.completedResearchProjects} Completed</strong></span>
                <span>Teaching Projects: <strong className="text-cyan-600 dark:text-cyan-400">{stats.completedTeachingProjects} Completed</strong></span>
                <span>International MOOC: <strong className="text-emerald-600 dark:text-emerald-400">{stats.moocCount} on XuetangX</strong></span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supervisedProjects.map(p => (
                <Card key={p.id} className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={p.status === 'Ongoing' ? 'success' : 'secondary'}>{p.status}</Badge>
                      <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">{p.fundingAmount}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">{p.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">{p.shortDescription}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{p.fundingBody}</span>
                    <Link to={`/projects/${p.slug}`}>
                      <Button variant="cyan" size="sm">Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Education */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Academic Degrees & Qualifications
              </h3>
              <div className="space-y-4">
                {researcher.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1">
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold">{edu.year}</span>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">{edu.degree}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{edu.institution}</p>
                  </div>
                ))}
              </div>

              {stats && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Student Supervision & Mentorship
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <strong className="text-base text-cyan-600 block">{stats.phdSupervisedCount}</strong>
                      <span className="text-slate-500">Ph.D. Scholars Supervised</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <strong className="text-base text-slate-800 dark:text-slate-200 block">{stats.thesisSupervisionCount}</strong>
                      <span className="text-slate-500">B.Sc. & M.Sc. Theses</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Professional Honors & Appointments
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Foreign Expert (High-Level Talent, Category A)</strong>
                    <span className="text-slate-500">Awarded by South China University of Technology (SCUT), China</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Director, Institutional Quality Assurance Cell (IQAC)</strong>
                    <span className="text-slate-500">Bangladesh Army University of Science and Technology (BAUST)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Head of CSE & Head of ICT Departments</strong>
                    <span className="text-slate-500">Bangladesh Army University of Science and Technology (BAUST)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">International Visiting Professor & Faculty</strong>
                    <span className="text-slate-500">University of British Columbia (Canada), UTHM (Malaysia), IIUM (Malaysia)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Published Textbook Author</strong>
                    <span className="text-slate-500">Taylor & Francis, CRC Press (USA)</span>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};
