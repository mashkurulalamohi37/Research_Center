import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, ExternalLink, BookOpen, 
  FolderGit2, Award, GraduationCap, Github, Linkedin, 
  Globe, Sparkles, CheckCircle2, MessageSquare 
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { mockProjects } from '../../data/projects';
import { mockPublications } from '../../data/publications';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
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
    { id: 'publications', label: 'Publications', count: authoredPublications.length },
    { id: 'projects', label: 'Projects & Grants', count: supervisedProjects.length },
    { id: 'education', label: 'Education & Honors' },
  ];

  return (
    <div className="py-10 space-y-12">
      {/* Profile Header Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar & Badges */}
            <div className="md:col-span-4 text-center md:text-left">
              <div className="relative inline-block">
                <img
                  src={researcher.avatar}
                  alt={researcher.name}
                  className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-2 border-cyan-500/40 shadow-2xl mx-auto md:mx-0"
                />
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-navy-950 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold">
                  h-index: {researcher.hIndex}
                </span>
              </div>
            </div>

            {/* Core Info & Socials */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cyan">{researcher.category.toUpperCase()}</Badge>
                <span className="text-xs text-slate-400 font-mono">Member since {researcher.joinDate.split('-')[0]}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                {researcher.name}
              </h1>

              <p className="text-sm sm:text-base text-cyan-400 font-medium font-mono">
                {researcher.title}
              </p>

              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>{researcher.department}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {researcher.office}</span>
              </p>

              {/* Stats Bar */}
              <div className="pt-2 flex flex-wrap gap-6 text-xs font-mono border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 block">Total Citations</span>
                  <strong className="text-slate-100 text-base">{researcher.citations.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Publications</span>
                  <strong className="text-cyan-400 text-base">{authoredPublications.length}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Active Projects</span>
                  <strong className="text-slate-100 text-base">{supervisedProjects.length}</strong>
                </div>
              </div>

              {/* External Scholarly Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${researcher.email}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Lab
                </a>
                {researcher.googleScholar && (
                  <a
                    href={researcher.googleScholar}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Google Scholar
                  </a>
                )}
                {researcher.orcid && (
                  <a
                    href={researcher.orcid}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" /> ORCID
                  </a>
                )}
                {researcher.github && (
                  <a
                    href={researcher.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 hover:text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-purple-400" /> GitHub
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

        {/* Tab 1: Biography & Expertise */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Biography & Academic Background</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {researcher.bio}
                </p>
              </Card>

              <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
                <h3 className="text-lg font-bold text-slate-100">Primary Research Interests</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {researcher.interests.map((interest, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Technical Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {researcher.expertise.map(exp => (
                    <span key={exp} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                      {exp}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-3 text-center">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-100">Prospective Students</h4>
                <p className="text-xs text-slate-400">
                  Currently considering Ph.D. students and Postdoctoral Fellows for the upcoming academic year.
                </p>
                <Link to="/opportunities" className="block pt-2">
                  <Button variant="cyan" size="sm" className="w-full">
                    View Open Positions
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Publications */}
        {activeTab === 'publications' && (
          <div className="space-y-4">
            {authoredPublications.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">No publications listed yet.</p>
            ) : (
              authoredPublications.map(pub => (
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
                    <p className="text-xs text-slate-300 line-clamp-2">{pub.abstract}</p>
                  </div>
                  <Link to={`/publications/${pub.slug}`} className="shrink-0">
                    <Button variant="cyan" size="sm">Read Paper</Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supervisedProjects.map(p => (
              <Card key={p.id} className="p-6 border-slate-800 bg-slate-900/60 flex flex-col justify-between">
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
                    <Button variant="cyan" size="sm">Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 4: Education */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" /> Academic Qualifications
              </h3>
              <div className="space-y-4">
                {researcher.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{edu.year}</span>
                    <h5 className="text-sm font-bold text-slate-100">{edu.degree}</h5>
                    <p className="text-xs text-slate-400">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" /> Professional Affiliations
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Senior Member / Fellow, Association for Computing Machinery (ACM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Area Chair & Reviewer for NeurIPS, ICML, ICLR, CVPR, ACL</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Principal Investigator, National Science Foundation (NSF) Grants</span>
                </li>
              </ul>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
};
