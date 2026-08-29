import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Brain, Eye, MessageSquareText, Bot, Activity, 
  ShieldCheck, Cpu, Network, ArrowRight, CheckCircle2, 
  BookOpen, FolderGit2, Users, Award, ExternalLink, Sparkles 
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { mockResearchers } from '../../data/researchers';
import { mockProjects } from '../../data/projects';
import { mockPublications } from '../../data/publications';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ResearchAreaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const area = mockResearchAreas.find(a => a.slug === slug || a.id === slug) || mockResearchAreas[0];
  useDocumentTitle(`${area.title} — Research Disciplines`);

  const initialTab = window.location.hash.replace('#', '') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  // Linked entities
  const linkedResearchers = mockResearchers.filter(r => r.researchAreaIds.includes(area.id));
  const linkedProjects = mockProjects.filter(p => p.researchAreaId === area.id);
  const linkedPublications = mockPublications.filter(pub => pub.researchAreaId === area.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'objectives', label: 'Objectives & Goals' },
    { id: 'technologies', label: 'Technologies & Tools' },
    { id: 'researchers', label: 'Faculty & Team', count: linkedResearchers.length },
    { id: 'projects', label: 'Projects', count: linkedProjects.length },
    { id: 'publications', label: 'Publications', count: linkedPublications.length },
  ];

  return (
    <div className="py-10 space-y-12">
      {/* Discipline Hero Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl p-8 sm:p-12">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 opacity-25">
            <img src={area.heroImage} alt={area.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Link to="/research" className="text-xs text-slate-400 hover:text-cyan-400">Research</Link>
              <span className="text-xs text-slate-600">/</span>
              <Badge variant="cyan">{area.title}</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {area.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {area.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400">
                {area.publicationCount} Publications
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200">
                {area.projectCount} Funded Grants
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300">
                {linkedResearchers.length} Active Faculty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation & Content */}
      <section className="container mx-auto px-4 lg:px-8">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} className="mb-8" />

        {/* Tab 1: Overview & Achievements */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="p-6 border-slate-800 bg-slate-900/60">
                <h3 className="text-lg font-bold text-slate-100 mb-3">Discipline Scope & Mission</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {area.description}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our group develops both foundational theoretical models and direct software artifacts deployed across clinical surgical suites, search-and-rescue quadrotor swarms, and supercomputing clusters.
                </p>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/60">
                <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" /> Key Scientific Achievements
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {area.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-slate-800 bg-slate-900/60">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Key Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.technologies.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/60 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">Collaborate with this Lab</h4>
                <p className="text-xs text-slate-400">
                  We welcome sponsored research, graduate applications, and joint industrial inquiries.
                </p>
                <Link to="/collaborate" className="block pt-2">
                  <Button variant="cyan" size="sm" className="w-full">
                    Initiate Collaboration
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Objectives */}
        {activeTab === 'objectives' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {area.objectives.map((obj, i) => (
              <Card key={i} className="p-6 border-slate-800 bg-slate-900/60 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs">
                    0{i + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-100 leading-snug">{obj}</h4>
                </div>
                <div className="pt-4 text-xs text-slate-500 font-mono">Multi-Year Strategic Deliverable</div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 3: Technologies */}
        {activeTab === 'technologies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {area.technologies.map((tech, i) => (
              <Card key={i} className="p-6 border-slate-800 bg-slate-900/60 text-center space-y-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto inline-block">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-100">{tech}</h4>
                <p className="text-xs text-slate-400">High-performance implementations developed in-house and validated on top benchmarks.</p>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 4: Researchers */}
        {activeTab === 'researchers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedResearchers.map(r => (
              <Link key={r.id} to={`/researchers/${r.slug}`} className="group block">
                <Card className="p-6 border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex items-start gap-4">
                  <img src={r.avatar} alt={r.name} className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30 shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                      {r.name}
                    </h4>
                    <p className="text-xs text-cyan-400 line-clamp-1">{r.title}</p>
                    <p className="text-xs text-slate-500 font-mono">Citations: {r.citations.toLocaleString()}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Tab 5: Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {linkedProjects.map(p => (
              <Card key={p.id} className="border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={p.status === 'Ongoing' ? 'success' : 'secondary'}>{p.status}</Badge>
                    <span className="text-xs font-mono text-cyan-400">{p.fundingAmount}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 leading-snug">{p.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3">{p.shortDescription}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{p.fundingBody}</span>
                  <Link to={`/projects/${p.slug}`}>
                    <Button variant="cyan" size="sm">
                      Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 6: Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-4">
            {linkedPublications.map(pub => (
              <div key={pub.id} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-slate-400 font-mono">{pub.year}</span>
                    <span className="text-cyan-400">{pub.venue}</span>
                  </div>
                  <Link to={`/publications/${pub.slug}`}>
                    <h4 className="text-base font-bold text-slate-100 hover:text-cyan-300 transition-colors">
                      {pub.title}
                    </h4>
                  </Link>
                  <p className="text-xs text-slate-400 font-mono">Authors: {pub.authors.join(', ')}</p>
                </div>
                <Link to={`/publications/${pub.slug}`} className="shrink-0">
                  <Button variant="cyan" size="sm">View Details</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
