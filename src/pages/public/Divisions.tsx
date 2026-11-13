import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, ChevronRight, ArrowRight, ExternalLink,
  BookOpen, Sparkles, Rocket, TrendingUp, Cpu, Shield,
  Database, HeartPulse, GraduationCap, Smile, CheckCircle2,
  Users, Building2, FlaskConical, Award, Mail, Phone,
  FileText, Briefcase, GitBranch, Share2
} from 'lucide-react';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { instituteApps } from '../../data/instituteApps';
import { AppVectorIcon } from '../../components/apps/AppVectorIcon';
import { EcosystemGrid } from '../../components/home/EcosystemGrid';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const divisionIconMap: Record<string, React.ElementType> = {
  BookOpen,
  Sparkles,
  Rocket,
  TrendingUp,
  Cpu,
  Shield,
  Database,
  HeartPulse,
  GraduationCap,
  Smile,
};

export const Divisions: React.FC = () => {
  const { divisionSlug, sectionSlug } = useParams<{ divisionSlug?: string; sectionSlug?: string }>();
  const navigate = useNavigate();

  // Match either :divisionSlug or :sectionSlug
  const slugParam = divisionSlug || sectionSlug;

  // Find division by id or slug
  const activeDivision = slugParam
    ? instituteDivisions.find(d => d.id === slugParam || d.slug === slugParam)
    : null;

  useDocumentTitle(
    activeDivision
      ? `${activeDivision.name} | AIRIC Organizational Ecosystem`
      : 'Organizational Ecosystem (10 Divisions) | AIRIC Institute'
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* 1. INSTITUTIONAL ECOSYSTEM HEADER */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20 overflow-hidden">
        <div className="absolute inset-0 scientific-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
            <Link to="/" className="hover:underline text-slate-400 hover:text-cyan-300">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/divisions" className="hover:underline text-slate-400 hover:text-cyan-300">Organizational Ecosystem</Link>
            {activeDivision && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-cyan-300 uppercase font-bold">
                  {activeDivision.name}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-4">
                <Layers className="w-3.5 h-3.5" />
                {activeDivision ? `Division ${activeDivision.number} of 10` : 'Institute Structure Matrix'}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                {activeDivision ? activeDivision.name : 'Organizational Ecosystem'}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {activeDivision
                  ? activeDivision.tagline
                  : 'Ten interconnected scientific and engineering divisions operating collaboratively from fundamental theory to licensed commercial deep-tech.'}
              </p>
            </div>

            {/* Quick Stats Pill or Category Badge */}
            {activeDivision ? (
              <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 shrink-0">
                <div className="text-xs font-mono text-cyan-400 mb-1">Division Classification</div>
                <div className="text-lg font-bold text-white mb-2">{activeDivision.category}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-cyan-950/60 text-cyan-300 border-cyan-800">
                    {activeDivision.badge}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    TRL Range 1–9
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 shrink-0">
                <div className="text-center p-2 bg-slate-900/60 rounded-lg">
                  <div className="text-2xl font-bold font-mono text-cyan-400">10</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Divisions</div>
                </div>
                <div className="text-center p-2 bg-slate-900/60 rounded-lg">
                  <div className="text-2xl font-bold font-mono text-emerald-400">10</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Software Apps</div>
                </div>
                <div className="text-center p-2 bg-slate-900/60 rounded-lg">
                  <div className="text-2xl font-bold font-mono text-indigo-400">52+</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Patents</div>
                </div>
                <div className="text-center p-2 bg-slate-900/60 rounded-lg">
                  <div className="text-2xl font-bold font-mono text-rose-400">280+</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Publications</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. DIVISION SELECTOR HORIZONTAL BAR */}
      <section className="bg-slate-950 border-b border-slate-800 sticky top-20 sm:top-24 z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar">
            <Link
              to="/divisions"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                !activeDivision
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All 10 Divisions
            </Link>

            <span className="w-px h-5 bg-slate-800 mx-1 shrink-0" />

            {instituteDivisions.map((div) => {
              const isCurrent = activeDivision?.id === div.id;
              const Icon = divisionIconMap[div.iconName] || Layers;
              return (
                <Link
                  key={div.id}
                  to={`/divisions/${div.id}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{div.number}</span>
                  <Icon className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span>{div.shortName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {activeDivision ? (
          /* DEEP DIVE DETAIL VIEW FOR A SPECIFIC DIVISION */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Main Overview, Projects, Focus Areas */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mandate & Mission */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-400" />
                  Institutional Mandate
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                  {activeDivision.mandate}
                </p>
                <div className="border-t border-slate-800/80 pt-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Scope of Operations
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {activeDivision.description}
                  </p>
                </div>
              </div>

              {/* Focus Areas & Thrusts */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-cyan-400" />
                  Strategic Research & Engineering Thrusts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeDivision.focusAreas.map((fa, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 font-medium">{fa}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Projects & Technology Readiness */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-cyan-400" />
                    Key Inventions & Technology Readiness (TRL)
                  </h2>
                  <span className="text-xs font-mono text-cyan-400">TRL 1 (Basic) to 9 (Deployment)</span>
                </div>

                <div className="space-y-4">
                  {activeDivision.keyProjects.map((proj) => (
                    <div key={proj.id} className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-white text-base">{proj.name}</h3>
                          <p className="text-xs text-cyan-400 font-mono mt-0.5">{proj.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs font-bold">
                            TRL {proj.trlLevel}
                          </span>
                          <Badge variant="outline" className="text-xs border-slate-700 text-slate-300">
                            {proj.status}
                          </Badge>
                        </div>
                      </div>

                      {/* TRL Progress Bar */}
                      <div className="w-full bg-slate-800 rounded-full h-1.5 my-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(proj.trlLevel / 9) * 100}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Deployed Software Applications */}
              {activeDivision.associatedApps.length > 0 && (
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    Proprietary Software & AI Systems
                  </h2>
                  <p className="text-xs text-slate-400 mb-6">
                    Commercialized and clinical application systems authored and stewarded by this division.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {instituteApps
                      .filter(app => activeDivision.associatedApps.includes(app.slug))
                      .map(app => (
                        <Link
                          key={app.slug}
                          to={`/apps/${app.slug}`}
                          className="group p-4 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-3.5 hover:shadow-lg hover:shadow-cyan-950/20"
                        >
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-105 transition-all">
                            <AppVectorIcon iconKey={app.iconKey} size="md" className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white group-hover:text-cyan-300 text-sm transition-colors">
                                {app.name}
                              </h4>
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-slate-900 border-slate-700 text-cyan-300">
                                {app.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                              {app.subtitle}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 mt-2 font-medium">
                              Open System Specs
                              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Leadership Card, Stats, Facilities, Actions */}
            <div className="space-y-6">
              {/* Leadership Profile Card */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Division Leadership
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={activeDivision.leadership.avatar}
                    alt={activeDivision.leadership.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-md shadow-cyan-950/40 shrink-0"
                  />
                  <div>
                    <div className="text-[11px] font-mono text-cyan-400">{activeDivision.leadership.role}</div>
                    <h4 className="font-bold text-white text-base">{activeDivision.leadership.name}</h4>
                    <p className="text-xs text-slate-400">{activeDivision.leadership.title}</p>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4 italic">
                  "{activeDivision.leadership.bio}"
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-400">
                    <span className="font-mono text-slate-500 block uppercase text-[10px]">Specialization</span>
                    <span className="text-slate-300">{activeDivision.leadership.specialization}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    to="/experts"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs transition-colors"
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    View Division Faculty
                  </Link>
                </div>
              </div>

              {/* Division Metrics */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                  Operational Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {activeDivision.stats.map((stat, i) => (
                    <div key={i} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                      <div className="text-xl font-bold font-mono text-cyan-300">{stat.value}</div>
                      <div className="text-[10px] font-mono uppercase text-slate-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities & Physical Rigs */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Dedicated Labs & Facilities
                </h3>
                <ul className="space-y-2.5">
                  {activeDivision.facilities.map((fac, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{fac}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect / Collaborate CTA */}
              <div className="p-6 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-cyan-500/30 text-white">
                <h4 className="font-bold text-base mb-1.5">Collaborate with this Division</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Submit joint research grant proposals, sponsor laboratory equipment, or license intellectual property.
                </p>
                <div className="space-y-2">
                  <Link
                    to="/collaborate#proposal"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Submit Research Proposal
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
                  >
                    Contact Division Office
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* FULL OVERVIEW / EXPLORER VIEW (WHEN BROWSING ALL 10 DIVISIONS) */
          <div>
            {/* Division Matrix Component */}
            <EcosystemGrid />

            {/* Institutional Lifecycle & Translation Flow */}
            <div className="mt-16 bg-slate-900/80 rounded-2xl border border-slate-800 p-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Ecosystem Pipeline
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  From Foundational Theory to Real-World Impact
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  AIRIC’s ten divisions operate along a closed-loop translational pipeline ensuring research never remains purely theoretical.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {/* Step 1 */}
                <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 relative">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    01
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">Inquiry & Discovery</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Research Division and AI & Quantum Division formulate mathematical proofs and train foundational models.
                  </p>
                  <div className="text-[10px] font-mono text-blue-400">TRL 1–3 • Peer Review</div>
                </div>

                {/* Step 2 */}
                <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 relative">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    02
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">Invention & Prototyping</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Innovation, Cybersecurity, and Healthcare divisions construct bench-tested prototypes and validated algorithms.
                  </p>
                  <div className="text-[10px] font-mono text-amber-400">TRL 4–6 • Proof-of-Concept</div>
                </div>

                {/* Step 3 */}
                <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 relative">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    03
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">Venture Incubation</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Entrepreneurship Division funds spin-offs, pairs student founders with venture capital, and pilots deployments.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400">TRL 7–8 • Field Validation</div>
                </div>

                {/* Step 4 */}
                <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 relative">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs mb-3">
                    04
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">Commercialization</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Commercialization Division executes enterprise licensing, patent portfolios, and government distribution contracts.
                  </p>
                  <div className="text-[10px] font-mono text-cyan-400">TRL 9 • Scaled Adoption</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
