import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Atom, Target, Award, Users, CheckCircle2, 
  ArrowRight, ShieldCheck, Cpu, Lightbulb, Sparkles 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const About: React.FC = () => {
  useDocumentTitle('About the Institute');

  return (
    <div className="py-12 space-y-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          About the Institute
        </Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Advancing Intelligence. <br />
          <span className="text-gradient-cyan">Enabling Innovation.</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-6 leading-relaxed max-w-3xl mx-auto">
          The Advanced Intelligent Research Center (AIRC) is an autonomous international academic research center dedicated to the mathematical foundations, embodied physics, and clinical applications of artificial intelligence.
        </p>
      </section>

      {/* Vision, Mission, Values Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 shadow-md hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our Vision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              To be the premier global academic institution advancing verifiable, provably safe, and human-collaborative artificial intelligence systems that elevate science and humanity.
            </p>
          </Card>

          <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 shadow-md hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Conduct peer-reviewed foundational research, train future scientific leaders, open-source transformative technologies, and translate algorithmic breakthroughs into real-world medicine and robotics.
            </p>
          </Card>

          <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 shadow-md hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Research Philosophy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Rigorous mathematical epistemology over superficial benchmarks. We prioritize formal verification, reproducibility, open science, and ethical algorithmic governance.
            </p>
          </Card>
        </div>
      </section>

      {/* Director's Message */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="relative inline-block rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                  alt="Prof. Dr. Sarah Lin"
                  className="w-48 sm:w-60 h-60 object-cover"
                />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Prof. Dr. Sarah Lin</h4>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">Founding Director & Chief Scientist</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">IEEE & ACM Fellow • Ph.D. Stanford</p>
            </div>

            <div className="lg:col-span-8 space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <Badge variant="cyan">Director's Statement</Badge>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                "Building Verifiable AI for the Next Century"
              </h3>
              <p>
                At AIRC, we believe the current paradigm of generative artificial intelligence is approaching a critical scientific inflection point. While deep foundation models demonstrate startling conversational fluency, high-stakes human endeavors—such as robotic surgery, autonomous flight, and molecular pharmacology—cannot tolerate stochastic hallucinations.
              </p>
              <p>
                Our center was founded on the conviction that the future belongs to hybrid neuro-symbolic systems: architectures that unite the continuous perception of deep neural nets with the undeniable certainty of mathematical logic.
              </p>
              <p>
                We invite visionary researchers, doctoral scholars, and industrial partners from around the globe to collaborate with us in forging this new frontier.
              </p>
              <div className="pt-2">
                <Link to="/researchers/dr-sarah-lin">
                  <Button variant="cyan" size="sm">
                    View Director's Academic Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Timeline / Milestones */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="cyan" className="mb-2">History & Growth</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Key Institutional Milestones
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-5/12 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 text-right shadow-sm">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">2020</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">Founding of AIRC</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Established with an initial $25M founding grant to explore neuro-symbolic reasoning and AI safety.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white dark:bg-cyan-400 dark:text-navy-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-lg shadow-cyan-400/30">
              1
            </div>
            <div className="w-full md:w-5/12 hidden md:block" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-5/12 hidden md:block" />
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white dark:bg-cyan-400 dark:text-navy-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-lg shadow-cyan-400/30">
              2
            </div>
            <div className="w-full md:w-5/12 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 text-left shadow-sm">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">2022</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">Expansion into Embodied Robotics</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Launched the High-Bay Robotics Pavilion and initiated DARPA swarm subterranean challenge partnerships.</p>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-5/12 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 text-right shadow-sm">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">2024</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">Nature Chemical Biology Drug Discovery</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Synthesized 18 novel small molecules with selective oncogenic KRAS-G12D mutation affinity.</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white dark:bg-cyan-400 dark:text-navy-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-lg shadow-cyan-400/30">
              3
            </div>
            <div className="w-full md:w-5/12 hidden md:block" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-5/12 hidden md:block" />
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white dark:bg-cyan-400 dark:text-navy-950 flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-lg shadow-cyan-400/30">
              4
            </div>
            <div className="w-full md:w-5/12 p-6 rounded-2xl border border-cyan-500/40 bg-white dark:bg-slate-900/90 text-left shadow-lg shadow-cyan-500/10">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">2025–2026</span>
              <h4 className="text-base font-bold text-cyan-600 dark:text-cyan-300 mt-1">NeuroLogic-v2 & Clinical Trials</h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">Open-source release of NeuroLogic-v2 foundation model and multi-center hospital clinical trials for LaproSplat 3D surgical guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 text-center max-w-4xl mx-auto space-y-6 shadow-md">
          <Badge variant="cyan">Governance</Badge>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Institutional Governance & Advisory</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            AIRC is governed by an independent International Board of Scientific Overseers comprising Nobel Laureates, Turing Award winners, and senior university chancellors.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-semibold text-slate-800 dark:text-slate-300">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-sm">
              Board of Overseers
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-sm">
              Scientific Advisory Council
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-sm">
              AI Ethics & Safety Board
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-sm">
              Office of Tech Transfer
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
