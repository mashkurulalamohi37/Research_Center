import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, 
  ExternalLink, Layers, ShieldCheck, Terminal, 
  Play, Download, Sparkles, Cpu, Clock, Award 
} from 'lucide-react';
import { instituteApps, InstituteApp } from '../../data/instituteApps';
import { AppVectorIcon } from '../../components/apps/AppVectorIcon';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

export const AppDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = instituteApps.find(a => a.slug === slug) || instituteApps[0];

  useDocumentTitle(`${app.name} — ${app.subtitle} | AIRIC`);

  const [sandboxActive, setSandboxActive] = useState(false);
  const [sandboxLogs, setSandboxLogs] = useState<string[]>([
    `[INFO] Initializing ${app.name} secure session...`,
    `[INFO] Target Protocol: ${app.techStack[0]} connection established.`,
    `[OK] Health check passed. Latency: 12ms. Ready for user query.`,
  ]);

  const handleRunSimulation = () => {
    setSandboxActive(true);
    setSandboxLogs(prev => [
      ...prev,
      `[SIMULATION] Executing automated inference cycle on sample payload...`,
      `[INFERENCE] Output validated against AIRIC benchmark suite. Verification: 100% PASS.`,
    ]);
  };

  // Find next and previous apps
  const currentIndex = instituteApps.findIndex(a => a.slug === app.slug);
  const prevApp = instituteApps[(currentIndex - 1 + instituteApps.length) % instituteApps.length];
  const nextApp = instituteApps[(currentIndex + 1) % instituteApps.length];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* 1. Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20 overflow-hidden">
        <div className="absolute inset-0 scientific-grid opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-6">
            <Link to="/" className="hover:underline text-slate-400">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/apps" className="hover:underline text-slate-400">Applications Portfolio</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-bold">{app.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              {/* Bespoke Vector Icon */}
              <div className="p-4 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl shrink-0">
                <AppVectorIcon iconKey={app.iconKey} size="xl" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="cyan" className="font-mono text-[10px]">
                    {app.category}
                  </Badge>
                  <Badge variant="outline" className="font-mono text-[10px] border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    {app.status}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    {app.version}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                  {app.name}
                </h1>
                <p className="text-base sm:text-xl font-medium text-cyan-400 mt-1">
                  {app.subtitle}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {app.shortDesc}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Button
                variant="cyan"
                size="md"
                onClick={handleRunSimulation}
                className="shadow-lg shadow-cyan-500/10"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" /> Launch Live Demo
              </Button>
              <Link to="/collaborate">
                <Button variant="outline" size="md" className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 w-full">
                  Request Institutional License
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Overview, Sandbox, Architecture */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Platform Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {app.fullDesc}
              </p>

              {/* Key Features */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
                  Key Capabilities & Features
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {app.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Interactive Live Sandbox Mockup */}
            <Card className="border-slate-200 dark:border-slate-800 bg-slate-950 text-white shadow-xl overflow-hidden">
              <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {app.name} Interactive Testing Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">ONLINE</span>
                </div>
              </div>

              <div className="p-6 font-mono text-xs space-y-2">
                {sandboxLogs.map((log, lIdx) => (
                  <div key={lIdx} className="text-slate-300 leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Ready to test with custom parameters
                </span>
                <Button variant="cyan" size="sm" onClick={handleRunSimulation} className="text-xs h-8">
                  Run Diagnostic Simulation
                </Button>
              </div>
            </Card>

            {/* Architecture Specifications */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-600" /> System Architecture & Engineering
              </h2>
              <div className="space-y-4">
                {app.architecture.map((arch, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                  >
                    <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-400 uppercase block mb-1">
                      {arch.layer}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {arch.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right 4 Cols: Specs, Audience, Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {app.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">License:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{app.license}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Released:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{app.releaseDate}</span>
                </div>
              </div>
            </Card>

            {/* Target Audience */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
                Target User Groups
              </h3>
              <div className="space-y-2">
                {app.targetAudience.map((aud, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                    <span>{aud}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Metrics */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
                Operational Metrics
              </h3>
              <div className="space-y-3">
                {app.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500">{m.label}</span>
                    <strong className="font-mono text-cyan-700 dark:text-cyan-400">{m.value}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* 3. Next / Previous Application Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <Link
            to={`/apps/${prevApp.slug}`}
            className="group flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-white dark:bg-slate-900 transition-all text-left"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Previous App</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600">{prevApp.name}</span>
            </div>
          </Link>

          <Link to="/apps" className="text-xs font-mono text-slate-500 hover:text-cyan-600 hidden sm:inline">
            Back to All 10 Apps
          </Link>

          <Link
            to={`/apps/${nextApp.slug}`}
            className="group flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-white dark:bg-slate-900 transition-all text-right"
          >
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Next App</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600">{nextApp.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};
