import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderGit2, Calendar, Users, Award, 
  Github, Globe, ArrowRight, CheckCircle2, 
  Clock, DollarSign, Layers, BookOpen 
} from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { mockResearchers } from '../../data/researchers';
import { mockPublications } from '../../data/publications';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = mockProjects.find(p => p.slug === slug || p.id === slug) || mockProjects[0];
  useDocumentTitle(`${project.title} — Research Projects`);

  const leadPI = mockResearchers.find(r => r.id === project.leadResearcherId);
  const teamMembers = mockResearchers.filter(r => project.teamMemberIds.includes(r.id));
  const relatedPubs = mockPublications.filter(pub => project.publicationsIds.includes(pub.id));

  return (
    <div className="py-10 space-y-12">
      {/* Project Hero Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl p-8 sm:p-12">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/projects" className="text-xs text-slate-400 hover:text-cyan-400">Projects</Link>
              <span className="text-xs text-slate-600">/</span>
              <Badge variant={project.status === 'Ongoing' ? 'success' : 'secondary'}>{project.status}</Badge>
              <span className="text-xs text-cyan-400 font-mono">{project.fundingBody}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {project.startDate} {project.endDate ? `– ${project.endDate}` : '(Active)'}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-cyan-400 flex items-center gap-1.5 font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                {project.fundingAmount}
              </span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-purple-400" /> Open Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Problem Statement, Methodology, Timeline, Team */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Problem Statement */}
            <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Problem Statement & Research Urgency
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </Card>

            {/* Methodology */}
            <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-3">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Technical Methodology & Algorithmic Design
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.methodology}
              </p>
            </Card>

            {/* Visual Milestones Timeline (Section 29) */}
            {project.deliverables && project.deliverables.length > 0 && (
              <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-6">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" /> Project Milestones & Roadmap
                </h3>
                <div className="space-y-4">
                  {project.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        item.completed
                          ? 'border-emerald-500/30 bg-emerald-950/10'
                          : 'border-slate-800 bg-slate-950/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-5 h-5 ${item.completed ? 'text-emerald-400' : 'text-slate-600'}`}
                        />
                        <div>
                          <h5 className="text-sm font-semibold text-slate-200">{item.title}</h5>
                          <span className="text-xs text-slate-500 font-mono">Target: {item.date}</span>
                        </div>
                      </div>
                      <Badge variant={item.completed ? 'success' : 'secondary'}>
                        {item.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Concrete Scientific Outcomes */}
            <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" /> Key Research Deliverables & Outcomes
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Related Publications */}
            {relatedPubs.length > 0 && (
              <Card className="p-8 border-slate-800 bg-slate-900/60 space-y-4">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" /> Project Publications
                </h3>
                <div className="space-y-3">
                  {relatedPubs.map(pub => (
                    <div key={pub.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
                      <div>
                        <Link to={`/publications/${pub.slug}`} className="text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors">
                          {pub.title}
                        </Link>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{pub.venue} ({pub.year})</p>
                      </div>
                      <Link to={`/publications/${pub.slug}`}>
                        <Button variant="cyan" size="sm">Read</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Sidebar: Research Team & Tech Stack */}
          <div className="lg:col-span-4 space-y-6">
            {/* Principal Investigator */}
            {leadPI && (
              <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Principal Investigator
                </h4>
                <Link to={`/researchers/${leadPI.slug}`} className="flex items-center gap-3 group">
                  <img src={leadPI.avatar} alt={leadPI.name} className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/40" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {leadPI.name}
                    </h5>
                    <p className="text-xs text-cyan-400 font-mono">{leadPI.title}</p>
                  </div>
                </Link>
              </Card>
            )}

            {/* Team Members */}
            <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Investigative Team ({teamMembers.length})
              </h4>
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <Link key={member.id} to={`/researchers/${member.slug}`} className="flex items-center gap-3 group">
                    <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h6 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {member.name}
                      </h6>
                      <p className="text-[11px] text-slate-400">{member.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Technologies */}
            <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Technologies & Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
