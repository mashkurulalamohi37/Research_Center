import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Brain, Eye, MessageSquareText, 
  Bot, Activity, ShieldCheck, Cpu, Network, BookOpen, 
  ExternalLink, Calendar, Users, MapPin, Download, CheckCircle2 
} from 'lucide-react';
import { HeroCanvas } from '../../components/home/HeroCanvas';
import { StatsCounter } from '../../components/home/StatsCounter';
import { InteractiveResearchMap } from '../../components/home/InteractiveResearchMap';
import { mockResearchAreas } from '../../data/researchAreas';
import { mockProjects } from '../../data/projects';
import { mockPublications } from '../../data/publications';
import { mockResearchers } from '../../data/researchers';
import { mockNews } from '../../data/news';
import { mockEvents } from '../../data/events';
import { mockOpportunities } from '../../data/opportunities';
import { mockPartners } from '../../data/partners';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle('Advancing Intelligence. Enabling Innovation.');
  const featuredProjects = mockProjects.filter(p => p.featured).slice(0, 3);
  const featuredPublications = mockPublications.filter(p => p.featured).slice(0, 3);
  const coreFaculty = mockResearchers.filter(r => r.featured).slice(0, 4);
  const latestNews = mockNews.slice(0, 3);
  const upcomingEvents = mockEvents.filter(e => e.featured).slice(0, 2);
  const openOpportunities = mockOpportunities.filter(o => o.status === 'Open').slice(0, 3);

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Network className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-navy-950">
        {/* Interactive Neural Canvas */}
        <HeroCanvas />

        {/* Hero Background Grid */}
        <div className="absolute inset-0 scientific-grid opacity-30 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-4xl">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold tracking-wide backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Advancing Intelligence. Enabling Innovation.</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] font-sans"
          >
            Advanced Intelligent <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Research Center</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            A multidisciplinary international research institute pioneering verifiable neuro-symbolic reasoning, 3D intraoperative perception, embodied robotics, and translational precision medicine.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/research" className="w-full sm:w-auto">
              <Button variant="cyan" size="lg" className="w-full sm:w-auto">
                Explore Research Disciplines
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/collaborate" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Collaborate With AIRC
              </Button>
            </Link>
          </motion.div>

          {/* Institutional Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Peer-Reviewed Open Science
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Tier-1 Academic Consortium
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Verifiable AI Benchmarks
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. RESEARCH STATISTICS COUNTER */}
      <StatsCounter />

      {/* 3. ABOUT AIRC PREVIEW */}
      <section className="py-20 bg-slate-950/40 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="cyan">About the Center</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                Pioneering the Next Generation of Trustworthy & Embodied AI
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded with a mandate for foundational excellence and tangible societal impact, AIRC operates at the intersection of mathematical reasoning, computer vision, autonomous physical systems, and computational oncology.
              </p>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5 font-bold">01</div>
                  <p><strong className="text-slate-200">Provable Soundness:</strong> Eliminating hallucination by embedding rigorous mathematical logic into neural models.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5 font-bold">02</div>
                  <p><strong className="text-slate-200">Clinical & Industrial Impact:</strong> Translating research from laboratory benches to operating rooms and rescue swarms.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5 font-bold">03</div>
                  <p><strong className="text-slate-200">Open Science:</strong> Releasing code, models, and formal benchmark suites to the international community.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/about">
                  <Button variant="outline" size="md">
                    Discover AIRC Vision & Leadership <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80"
                  alt="AIRC Autonomous Laboratory"
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-navy-950/85 backdrop-blur-md border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-cyan-400 font-mono">FLAGSHIP FACILITY</div>
                    <div className="text-sm font-semibold text-slate-100">Cyber-Physical Robotics & Supercompute Cluster</div>
                  </div>
                  <Badge variant="cyan">Cambridge Campus</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESEARCH AREAS GRID */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Core Disciplines</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Our Research Domains
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Explore our 8 specialized laboratory groups tackling major scientific frontiers.
              </p>
            </div>
            <Link to="/research">
              <Button variant="ghost" size="sm">
                View All Research Areas <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockResearchAreas.map(area => (
              <Link key={area.id} to={`/research/${area.slug}`} className="group block">
                <Card className="h-full border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1 shadow-lg hover:shadow-cyan-950/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-400 group-hover:text-navy-950 transition-colors">
                        {getAreaIcon(area.iconName)}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                        {area.publicationCount} Papers
                      </span>
                    </div>
                    <CardTitle className="text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2 mt-1">
                      {area.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 font-medium">
                    <span>{area.projectCount} Active Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE RESEARCH TOPOLOGY MAP */}
      <InteractiveResearchMap />

      {/* 6. FEATURED PROJECTS SHOWCASE */}
      <section className="py-20 bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Active Initiatives</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Featured Research Projects
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Multi-year funded investigations advancing computational biology, vision, and robotics.
              </p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" size="sm">
                View All 30+ Projects <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(proj => (
              <Card key={proj.id} className="overflow-hidden border-slate-800 bg-slate-900/60 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'}>
                      {proj.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950/80 text-cyan-400 border border-slate-700 backdrop-blur-sm">
                    {proj.fundingBody}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {proj.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-2">
                    {proj.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    Grant: <strong className="text-slate-200">{proj.fundingAmount}</strong>
                  </span>
                  <Link to={`/projects/${proj.slug}`}>
                    <Button variant="cyan" size="sm">
                      View Project <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FEATURED PUBLICATIONS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Scientific Output</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Recent Peer-Reviewed Publications
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Leading contributions published in NeurIPS, CVPR, Nature, ACL, and IEEE Transactions.
              </p>
            </div>
            <Link to="/publications">
              <Button variant="ghost" size="sm">
                Explore All 150+ Papers <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {featuredPublications.map(pub => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-slate-400 font-mono">{pub.year}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-cyan-400 font-medium">{pub.venue}</span>
                  </div>
                  <Link to={`/publications/${pub.slug}`}>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                      {pub.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-400 font-mono">
                    Authors: {pub.authors.join(', ')}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-400 border border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> DOI
                    </a>
                  )}
                  <Link to={`/publications/${pub.slug}`}>
                    <Button variant="cyan" size="sm">
                      Read Paper
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FACULTY & INVESTIGATORS SPOTLIGHT */}
      <section className="py-20 bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Leadership & Faculty</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Principal Investigators
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                World-class scientists and fellows leading research programs at AIRC.
              </p>
            </div>
            <Link to="/researchers">
              <Button variant="ghost" size="sm">
                View All Faculty & Fellows <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFaculty.map(r => (
              <Link key={r.id} to={`/researchers/${r.slug}`} className="group block">
                <Card className="overflow-hidden border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {r.name}
                      </h4>
                      <p className="text-xs text-cyan-400 line-clamp-1">{r.title}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 pt-3 space-y-2">
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {r.bio}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-800">
                      <span>Citations: <strong className="text-slate-300">{r.citations.toLocaleString()}</strong></span>
                      <span>h-index: <strong className="text-cyan-400">{r.hIndex}</strong></span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWS & EVENTS SPLIT SECTION */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: News */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="cyan">Institute News</Badge>
                  <h3 className="text-2xl font-bold text-slate-100 mt-1">Recent Press & Highlights</h3>
                </div>
                <Link to="/news" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                  All News <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {latestNews.map((news, idx) => (
                  <Link key={news.id} to={`/news/${news.slug}`} className="block group">
                    <div className={`p-4 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all flex flex-col sm:flex-row gap-4 ${idx === 0 ? 'border-cyan-500/30' : ''}`}>
                      <img
                        src={news.coverImage}
                        alt={news.title}
                        className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px]">
                          <Badge variant="outline">{news.category}</Badge>
                          <span className="text-slate-400 font-mono">{news.publishDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                          {news.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {news.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Upcoming Events */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="cyan">Calendar</Badge>
                  <h3 className="text-2xl font-bold text-slate-100 mt-1">Upcoming Events</h3>
                </div>
                <Link to="/events" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                  All Events <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <Link key={event.id} to={`/events/${event.slug}`} className="block group">
                    <Card className="border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all p-5">
                      <div className="flex items-start gap-4">
                        {/* Date badge */}
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center shrink-0 w-16">
                          <div className="text-[10px] font-bold text-cyan-400 font-mono uppercase">
                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                          </div>
                          <div className="text-xl font-extrabold text-white font-mono">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>

                        <div className="space-y-1 flex-1">
                          <Badge variant="purple">{event.type}</Badge>
                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                            {event.title}
                          </h4>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {event.location}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            Speaker: {event.speaker.name}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OPEN OPPORTUNITIES SPOTLIGHT */}
      <section className="py-20 bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Careers & Fellowships</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                Join the AIRC Research Community
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Postdoctoral fellowships, Ph.D. assistantships, and undergraduate research opportunities.
              </p>
            </div>
            <Link to="/opportunities">
              <Button variant="ghost" size="sm">
                View All Opportunities <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openOpportunities.map(opp => (
              <Card key={opp.id} className="border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="cyan">{opp.type}</Badge>
                    <span className="text-[11px] font-mono text-emerald-400">Deadline: {opp.deadline}</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-cyan-300 transition-colors leading-snug">
                    {opp.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-2">
                    {opp.overview}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{opp.duration}</span>
                  <Link to={`/opportunities/${opp.slug}`}>
                    <Button variant="cyan" size="sm">
                      Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PARTNERS & COLLABORATING INSTITUTIONS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <Badge variant="cyan" className="mb-3">Global Alliance</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Academic & Technology Partners
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            AIRC actively collaborates with world-leading universities, research hospitals, and computing consortia.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {mockPartners.map(partner => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/30 transition-all flex flex-col items-center justify-center text-center group h-32"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all mb-2 border border-slate-700"
                />
                <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{partner.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL HIGH-IMPACT COLLABORATION CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-navy-950 to-navy-900 border-t border-cyan-500/20">
        <div className="absolute inset-0 radial-glow pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Institutional Alliances
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Collaborate With <span className="text-gradient-cyan">AIRC</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Partner with our faculty and investigators to co-develop verifiable AI systems, deploy autonomous swarms, discover targeted therapeutics, and solve grand societal challenges.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collaborate" className="w-full sm:w-auto">
              <Button variant="cyan" size="lg" className="w-full sm:w-auto">
                Submit Partnership Proposal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact Office of Sponsored Research
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
