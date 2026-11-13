import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Award, CheckCircle2, FileText, Send, 
  Sparkles, ExternalLink, Calendar, Users, ShieldAlert, ChevronRight 
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

interface JournalInfo {
  id: string;
  code: string;
  name: string;
  tagline: string;
  issn: string;
  frequency: string;
  indexing: string[];
  scope: string[];
  aims: string;
  editorInChief: string;
  managingEditor: string;
  submissionEmail: string;
  latestIssue: string;
  articles: { title: string; authors: string; doi: string; pages: string }[];
}

const journalData: Record<string, JournalInfo> = {
  jair: {
    id: 'jair',
    code: 'JAIR',
    name: 'Journal of Advanced Intelligent Research',
    tagline: 'Leading peer-reviewed international journal for theoretical and foundational artificial intelligence',
    issn: 'ISSN 2984-7128 (Online)',
    frequency: 'Quarterly (4 issues/year)',
    indexing: ['Scopus (Review)', 'DOAJ', 'Google Scholar', 'Crossref DOI', 'DBLP'],
    scope: [
      'Multi-Agent Coordination & Autonomous Reasoning',
      'Quantum Neural Architectures & Error Mitigation',
      'Neural-Symbolic AI & Knowledge Graphs',
      'Adversarial Machine Learning & Security Guardrails',
      'High-Performance Deep Learning Compilers',
    ],
    aims: 'The Journal of Advanced Intelligent Research (JAIR) publishes high-impact, rigorous theoretical, algorithmic, and experimental research bridging foundational artificial intelligence, computational neuroscience, and quantum algorithmic computing.',
    editorInChief: 'Prof. Sarah Lin, Ph.D. (Director of AI & Neural Systems)',
    managingEditor: 'Dr. Marcus Vance, Ph.D. (Lead AI Architect)',
    submissionEmail: 'jair-submissions@airic.research.edu',
    latestIssue: 'Volume 4, Issue 3 (Fall 2026)',
    articles: [
      {
        title: 'Provable Convergence Bounds in Multi-Agent Mixture-of-Experts Alignment',
        authors: 'S. Lin, M. Vance, K. Ahmed',
        doi: '10.5281/jair.2026.040301',
        pages: 'pp. 112–134',
      },
      {
        title: 'Surface-Code Quantum Fault Tolerance with Neural Decoder Ensembles',
        authors: 'A. Rahman, T. Hossain, D. Chen',
        doi: '10.5281/jair.2026.040302',
        pages: 'pp. 135–158',
      },
      {
        title: 'Adversarial Prompt Invariance in Agentic Planning Subroutines',
        authors: 'F. Kabir, M. Vance, L. Zhang',
        doi: '10.5281/jair.2026.040303',
        pages: 'pp. 159–181',
      },
    ],
  },
  jairic: {
    id: 'jairic',
    code: 'JAIRIC',
    name: 'Journal of Advanced Intelligence Research Innovation & Commercialization',
    tagline: 'International journal dedicated to deep-tech translation, spinouts, patents, and commercialization pipelines',
    issn: 'ISSN 2984-8842 (Online)',
    frequency: 'Bi-Annual (2 issues/year)',
    indexing: ['Crossref DOI', 'Google Scholar', 'IEEE Collabratec', 'SSRN'],
    scope: [
      'Deep-Tech Spinout Case Studies & Valuations',
      'Intellectual Property, Patents & Tech Transfer Models',
      'Clinical Translation of Digital Health & Medical AI',
      'Industrial IoT & Automated Infrastructure Telemetry',
      'Regulatory Compliance & AI Ethics Audits',
    ],
    aims: 'JAIRIC provides a rigorous academic venue for engineers, venture founders, technology transfer officers, and translational researchers to publish methodology, patents, clinical trials, and economic models of deep-tech commercialization.',
    editorInChief: 'Dr. Elena Rostova, Ph.D. (VP of Research Commercialization)',
    managingEditor: 'Dr. K. M. Sadik, Ph.D. (Head of Intellectual Property)',
    submissionEmail: 'jairic-editorial@airic.research.edu',
    latestIssue: 'Volume 2, Issue 2 (Winter 2026)',
    articles: [
      {
        title: 'From Lab to Clinic: Multi-Center Trial of Ambulatory ECG Arrhythmia Diagnostics',
        authors: 'E. Rostova, N. Sultana, M. Haque',
        doi: '10.5281/jairic.2026.020201',
        pages: 'pp. 45–68',
      },
      {
        title: 'Automated Microgrid SCADA Defense: Commercial Deployment & ROI Case Study',
        authors: 'R. Chowdhury, T. Ahmed, P. Roy',
        doi: '10.5281/jairic.2026.020202',
        pages: 'pp. 69–92',
      },
      {
        title: 'University IP Valuation in the Age of Generative AI: Patent Licensing Frameworks',
        authors: 'K. M. Sadik, J. Miller',
        doi: '10.5281/jairic.2026.020203',
        pages: 'pp. 93–115',
      },
    ],
  },
};

export const Journals: React.FC = () => {
  const { journalSlug } = useParams<{ journalSlug?: string }>();
  const activeJournalKey = journalSlug === 'jairic' ? 'jairic' : 'jair';
  const journal = journalData[activeJournalKey];

  useDocumentTitle(`${journal.code} — ${journal.name} | AIRIC`);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Journal Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
            <Link to="/" className="hover:underline text-slate-400">AIRIC</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link to="/publications" className="hover:underline text-slate-400">Publications</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-bold">{journal.code}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>OFFICIAL AIRIC PEER-REVIEWED JOURNAL • {journal.issn}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {journal.name}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {journal.tagline}
              </p>
            </div>

            {/* Journal Switcher */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Link to="/journals/jair">
                <Button 
                  variant={activeJournalKey === 'jair' ? 'cyan' : 'outline'} 
                  size="md"
                  className={activeJournalKey !== 'jair' ? 'bg-slate-800/80 text-slate-300 border-slate-700' : ''}
                >
                  JAIR Journal
                </Button>
              </Link>
              <Link to="/journals/jairic">
                <Button 
                  variant={activeJournalKey === 'jairic' ? 'cyan' : 'outline'} 
                  size="md"
                  className={activeJournalKey !== 'jairic' ? 'bg-slate-800/80 text-slate-300 border-slate-700' : ''}
                >
                  JAIRIC Journal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scope, Indexing & Editorial Board */}
          <div className="lg:col-span-4 space-y-6">
            {/* Journal Metadata Card */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <CardHeader>
                <CardTitle className="text-sm font-mono uppercase tracking-wider text-slate-400">
                  Publication Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Frequency:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{journal.frequency}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Editor-in-Chief:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{journal.editorInChief}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Managing Editor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{journal.managingEditor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Indexing:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {journal.indexing.map(idx => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-cyan-700 dark:text-cyan-400">
                        {idx}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scope Card */}
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <CardHeader>
                <CardTitle className="text-sm font-mono uppercase tracking-wider text-slate-400">
                  Core Subject Scope
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {journal.scope.map(s => (
                  <div key={s} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call for papers box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-900/10 to-blue-500/10 border border-cyan-500/30 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-cyan-700 dark:text-cyan-400 uppercase mb-2">
                <Send className="w-4 h-4" /> Call For Papers (2026)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Submissions are invited for the upcoming special issue. All submissions undergo double-blind peer review within 4 weeks.
              </p>
              <a href={`mailto:${journal.submissionEmail}`} className="w-full">
                <Button variant="cyan" size="sm" className="w-full">
                  Submit Manuscript
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Aims & Latest Issue Articles */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                Aims & Editorial Mission
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {journal.aims}
              </p>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                    Latest Published Issue
                  </h3>
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400">
                    {journal.latestIssue}
                  </span>
                </div>
                <Badge variant="cyan">Open Access Issue</Badge>
              </div>

              <div className="space-y-4">
                {journal.articles.map((art, i) => (
                  <Card key={i} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/40 shadow-xs transition-all p-5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>Article {i + 1} • {art.pages}</span>
                      <span className="text-cyan-700 dark:text-cyan-400">DOI: {art.doi}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {art.title}
                    </h4>
                    <span className="text-xs text-slate-600 dark:text-slate-400 block mt-1">
                      Authors: {art.authors}
                    </span>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                        Peer Reviewed & Validated
                      </span>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <FileText className="w-3 h-3 mr-1" /> PDF Full Text
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
