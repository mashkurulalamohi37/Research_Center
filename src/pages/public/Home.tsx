import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Brain, Eye, MessageSquareText, 
  Bot, Activity, ShieldCheck, Cpu, Network,
  ExternalLink, MapPin, CheckCircle2 
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
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Home: React.FC = () => {
  useDocumentTitle('Research, Innovation & Commercialization');
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
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-slate-800">
        {/* Interactive Neural Canvas */}
        <HeroCanvas />

        {/* Hero Background Grid */}
        <div className="absolute inset-0 scientific-grid opacity-35 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-4xl">
          {/* Official Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative group">
              <img
                src="/iricc-logo.jpg"
                alt="IRICC Official Seal — Intelligent Research, Innovation & Commercialization Center"
                width="112"
                height="112"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-xl ring-4 ring-amber-400/50 hover:ring-amber-500/80 transition-all duration-300"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 text-xs font-semibold tracking-wide backdrop-blur-md mb-6 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Advancing Research. Enabling Innovation. Accelerating Commercialization.</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-sans"
          >
            <span className="text-cyan-700 dark:text-cyan-400">IRICC</span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl mt-2 text-slate-800 dark:text-slate-100 font-bold">
              Intelligent Research, Innovation & Commercialization Center
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            A world-leading center uniting multidisciplinary scientific discovery, cutting-edge engineering, and high-impact deep-tech commercialization.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/research" className="w-full sm:w-auto">
              <Button variant="cyan" size="lg" className="w-full sm:w-auto shadow-md">
                Explore Research Disciplines
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/collaborate" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:border-slate-700">
                Collaborate With IRICC
              </Button>
            </Link>
          </motion.div>

          {/* Institutional Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Peer-Reviewed Open Science
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Deep-Tech Spinout Pipeline
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Global Industry Commercialization
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. RESEARCH STATISTICS COUNTER */}
      <StatsCounter />

      {/* 3. ABOUT IRICC PREVIEW */}
      <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="cyan">About the Center</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                Pioneering Scientific Frontiers & Industry Commercialization
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                Founded with a mandate for scientific excellence and real-world economic impact, IRICC operates at the intersection of mathematical reasoning, computer vision, autonomous physical systems, and commercial biotech translation.
              </p>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-400 shrink-0 mt-0.5 font-bold">01</div>
                  <p><strong className="text-slate-900 dark:text-slate-200">Fundamental Research:</strong> Advancing breakthrough discoveries in neural systems, quantum fields, and robotics.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-400 shrink-0 mt-0.5 font-bold">02</div>
                  <p><strong className="text-slate-900 dark:text-slate-200">Innovation & Incubation:</strong> Nurturing high-potential deep-tech prototypes and intellectual property portfolios.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-400 shrink-0 mt-0.5 font-bold">03</div>
                  <p><strong className="text-slate-900 dark:text-slate-200">Commercialization:</strong> Accelerating lab-to-market pipelines, licensing ventures, and industry partnerships.</p>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/about">
                  <Button variant="outline" size="md">
                    Discover IRICC Vision & Leadership <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80"
                  alt="IRICC Autonomous Laboratory"
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 flex items-center justify-between text-slate-900 dark:text-white shadow-lg">
                  <div>
                    <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 font-mono">FLAGSHIP FACILITY</div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Cyber-Physical Robotics & Supercompute Cluster</div>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Our Research Domains
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
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
                <Card className="h-full border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1 shadow-xs hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-500/20 group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-navy-950 transition-colors">
                        {getAreaIcon(area.iconName)}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
                        {area.publicationCount} Papers
                      </span>
                    </div>
                    <CardTitle className="text-base group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2 mt-1">
                      {area.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 font-medium">
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
      <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Active Initiatives</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Featured Projects & Spinouts
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Funded multi-year research initiatives advancing high-impact technologies.
              </p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" size="sm">
                View All Projects <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(proj => {
              const lead = mockResearchers.find(r => r.id === proj.leadResearcherId);
              return (
              <Card key={proj.id} className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'}>
                        {proj.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-medium">
                      PI: {lead?.name || 'Principal Investigator'}
                    </div>
                    <CardTitle className="text-lg group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors line-clamp-1 mt-1">
                      {proj.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 mt-2">
                      {proj.shortDescription}
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Grant: <strong className="text-slate-900 dark:text-slate-200">{proj.fundingAmount}</strong>
                  </span>
                  <Link to={`/projects/${proj.slug}`}>
                    <Button variant="cyan" size="sm">
                      View Project <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FEATURED PUBLICATIONS */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Scientific Output</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Recent Peer-Reviewed Publications
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Leading contributions published in NeurIPS, CVPR, Nature, ACL, and IEEE Transactions.
              </p>
            </div>
            <Link to="/publications">
              <Button variant="ghost" size="sm">
                Explore All Papers <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {featuredPublications.map(pub => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">{pub.year}</span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-medium">{pub.venue}</span>
                  </div>
                  <Link to={`/publications/${pub.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {pub.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Authors: {pub.authors.join(', ')}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1"
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
      <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Leadership & Faculty</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Principal Investigators
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                World-class scientists and fellows leading research and innovation programs at IRICC.
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
                <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {r.name}
                      </h4>
                      <p className="text-xs text-cyan-300 line-clamp-1">{r.title}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 pt-3 space-y-2">
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {r.bio}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100 dark:border-slate-800">
                      <span>Citations: <strong className="text-slate-900 dark:text-slate-300">{r.citations.toLocaleString()}</strong></span>
                      <span>h-index: <strong className="text-cyan-700 dark:text-cyan-400">{r.hIndex}</strong></span>
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
                  <Badge variant="cyan">Center News</Badge>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">Recent Press & Highlights</h3>
                </div>
                <Link to="/news" className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                  All News <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {latestNews.map(item => (
                  <Link key={item.id} to={`/news/${item.slug}`} className="block group">
                    <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full sm:w-32 h-24 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="font-semibold text-cyan-700 dark:text-cyan-400">{item.category}</span>
                            <span>•</span>
                            <span className="font-mono">{item.publishDate}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Events */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="cyan">Academic Calendar</Badge>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">Upcoming Symposia</h3>
                </div>
                <Link to="/events" className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                  All Events <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map(evt => (
                  <Link key={evt.id} to={`/events/${evt.slug}`} className="block group">
                    <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold uppercase font-mono">{evt.date.split(',')[0]}</span>
                          <span className="text-lg font-black leading-none">{evt.date.split(' ')[1]?.replace(',', '') || '24'}</span>
                        </div>
                        <div className="space-y-1 flex-1">
                          <Badge variant="secondary" className="text-[10px]">{evt.type}</Badge>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors line-clamp-1 mt-1">
                            {evt.title}
                          </h4>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-cyan-700 dark:text-cyan-400" /> {evt.location}</span>
                          </div>
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

      {/* 10. FELLOWSHIPS & RESEARCH GRANTS */}
      <section className="py-20 bg-slate-50/70 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="cyan" className="mb-2">Careers & Fellowships</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Open Research Positions
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Postdoctoral fellowships, Ph.D. studentships, and commercialization venture fellow appointments.
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
              <Card key={opp.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="cyan">{opp.type}</Badge>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Deadline: {opp.deadline}</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                    {opp.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2 mt-2">
                    {opp.overview}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-600 dark:text-slate-400">{opp.duration}</span>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Academic & Commercialization Partners
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            IRICC actively collaborates with world-leading universities, venture accelerators, and enterprise technology leaders.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {mockPartners.map(partner => (
              <div
                key={partner.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-center text-center group h-32"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all mb-2 border border-slate-200 dark:border-slate-700"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-300 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{partner.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL COLLABORATION CTA (LIGHT THEMED & CLEAN) */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-cyan-50/40 to-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex justify-center mb-6">
            <img
              src="/iricc-logo.jpg"
              alt="IRICC Official Seal"
              width="64"
              height="64"
              className="w-16 h-16 rounded-full object-cover shadow-md ring-4 ring-amber-400/40"
            />
          </div>
          <div className="mb-4">
            <Badge variant="cyan">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Institutional Alliances
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Collaborate With <span className="text-cyan-700 dark:text-cyan-400">IRICC</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            Partner with our faculty, research scientists, and innovation fellows to co-develop breakthrough scientific discoveries, license patents, and commercialize deep-tech solutions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collaborate" className="w-full sm:w-auto">
              <Button variant="cyan" size="lg" className="w-full sm:w-auto shadow-md">
                Submit Partnership Proposal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-slate-800 hover:bg-slate-50 border-slate-300 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700">
                Contact Technology Transfer Office
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
