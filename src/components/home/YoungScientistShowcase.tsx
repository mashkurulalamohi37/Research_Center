import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Sparkles, Award, ArrowRight, 
  Users, CheckCircle2, ChevronRight, BookOpen, Rocket 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const YoungScientistShowcase: React.FC = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-white" id="young-scientists-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Mandate */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              Next-Generation Talent Accelerator
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Young Scientist Programme
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Empowering visionary undergraduate and high-school researchers to conduct publishable scientific inquiry, access supercomputing clusters, and receive direct 1-on-1 mentorship from international Principal Investigators.
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Full Research Fellowships
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monthly research stipends, computational credits, and dedicated laboratory benches for top applicants.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Fast-Track Publication
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mentored manuscript preparation targeting JAIR, IEEE student branches, and Scopus conferences.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                  Startup Incubation Bridge
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct pipeline to the Entrepreneurship Division for student-authored software and hardware prototypes.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Global Mentor Pairing
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Collaborate bi-weekly with senior scientists across 12 disciplines in AI, Quantum, and Biomedical Engineering.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                to="/young-scientists"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
              >
                Explore Cohort & Fellowships
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                to="/collaborate#researcher"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/40 font-medium text-xs transition-colors"
              >
                Apply as Student Fellow
              </Link>
            </div>
          </div>

          {/* Right Column: Cohort Highlight Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/90 rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-xs bg-cyan-950/60 text-cyan-300 border-cyan-800">
                  Cohort 2026 Active
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  250+ Mentored Fellows
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Recent Student Breakthroughs
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Featured work from young researchers under 24 years old within the AIRIC ecosystem.
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-cyan-300">FlowerDoctor Mobile CNN</span>
                    <span className="text-[10px] font-mono text-emerald-400">Deployed App</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Engineered by 3 undergraduate fellows; achieves 96.8% accuracy on 42 regional plant blights.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-cyan-300">ExamScriptAI Rubric Assessor</span>
                    <span className="text-[10px] font-mono text-blue-400">Published in JAIR</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    High school fellow formulated handwritten stroke segmentation algorithms now adopted by 14 universities.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 rounded-xl border border-cyan-500/20 text-center">
                <div className="text-xs font-mono text-cyan-300 mb-1">Annual Fellowship Submissions Open</div>
                <div className="text-xs text-slate-300">Next Cohort Selection: December 31, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
