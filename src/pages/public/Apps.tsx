import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, Search, Filter, ArrowRight, Sparkles, 
  ExternalLink, CheckCircle2, ShieldCheck, Cpu, Download, 
  Star, FileText, X 
} from 'lucide-react';
import { instituteApps, InstituteApp } from '../../data/instituteApps';
import { AppVectorIcon } from '../../components/apps/AppVectorIcon';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';

const categories = [
  'All',
  'Digital Healthcare',
  'Agricultural AI',
  'Education & Academic AI',
  'Enterprise AI & Communication',
  'Smart Infrastructure & IoT',
];

export const Apps: React.FC = () => {
  useDocumentTitle('Applications Portfolio | AIRIC Institute');
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Review Modal State
  const [reviewingApp, setReviewingApp] = useState<InstituteApp | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(5);
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [reviewerAffiliation, setReviewerAffiliation] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const filteredApps = instituteApps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Production':
        return <Badge variant="cyan" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">● Production</Badge>;
      case 'Beta':
        return <Badge variant="secondary" className="font-mono text-[10px] bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">Beta Release</Badge>;
      case 'Clinical Trial':
        return <Badge variant="outline" className="font-mono text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30">⚕ Clinical Trial</Badge>;
      default:
        return <Badge className="font-mono text-[10px]">{status}</Badge>;
    }
  };

  // Handle Download App Technical Specification Dossier
  const handleDownload = (app: InstituteApp) => {
    const appDossier = {
      app_name: app.name,
      slug: app.slug,
      version: app.version,
      status: app.status,
      category: app.category,
      subtitle: app.subtitle,
      overview: app.shortDesc,
      full_description: app.fullDesc,
      features: app.features,
      tech_stack: app.techStack,
      target_audience: app.targetAudience,
      architecture_layers: app.architecture,
      benchmarks_metrics: app.metrics,
      timestamp: new Date().toISOString(),
      institution: 'AIRIC — Advanced Intelligence, Research, Innovation & Commercialization Institute',
      license: 'AIRIC Commercial & Academic Research License'
    };

    const blob = new Blob([JSON.stringify(appDossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.slug || 'airic-app'}-spec-dossier.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      type: 'success',
      title: 'App Dossier Downloaded',
      message: `Downloaded technical specification package for "${app.name}".`,
    });
  };

  // Open Review Dialog
  const handleOpenReview = (app: InstituteApp) => {
    setReviewingApp(app);
    setReviewScore(5);
    setReviewNotes('');
    setReviewerAffiliation('');
    setReviewSubmitted(false);
  };

  // Submit Review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    setTimeout(() => {
      setIsSubmittingReview(false);
      setReviewSubmitted(true);
      toast({
        type: 'success',
        title: 'Review Recorded',
        message: `Evaluation for "${reviewingApp?.name}" recorded with a score of ${reviewScore}/5.`,
      });

      setTimeout(() => {
        setReviewingApp(null);
        setReviewSubmitted(false);
      }, 1400);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-14 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>AIRIC PROPRIETARY SOFTWARE SUITE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Dedicated Applications Portfolio
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Ten proprietary intelligence platforms developed and maintained by AIRIC research laboratories, translating cutting-edge AI, quantum computing, and biomedical engineering into real-world impact.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between backdrop-blur-md">
          {/* Enhanced Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400" />
            <input
              type="text"
              aria-label="Search applications"
              placeholder="Search applications, technologies, features..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filter Indicator */}
        <div className="mt-3 px-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>Showing <strong>{filteredApps.length}</strong> of {instituteApps.length} applications</span>
          {searchTerm && <span>Search query: &quot;{searchTerm}&quot;</span>}
        </div>

        {/* 3. Applications List Items */}
        <div className="mt-6 flex flex-col gap-4">
          {filteredApps.length === 0 ? (
            <div className="text-center py-16 text-slate-500 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">No applications matched your criteria</p>
              <p className="text-xs text-slate-500 mt-1">Try resetting search keywords or category filters</p>
            </div>
          ) : (
            filteredApps.map(app => (
              <div
                key={app.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 group backdrop-blur-sm"
              >
                {/* Left: Vector Icon Container & Category Badge */}
                <div className="flex items-center lg:flex-col justify-between lg:justify-center gap-3 shrink-0 lg:w-44 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:scale-105 transition-transform inline-flex mx-auto">
                    <AppVectorIcon iconKey={app.iconKey} size="lg" />
                  </div>
                  <div className="flex flex-col items-end lg:items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {app.category}
                    </span>
                    <div className="mt-1">
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                </div>

                {/* Middle: App Title, Description, Tech Stack, Key Metrics */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2.5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        to={`/apps/${app.slug}`}
                        className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug"
                      >
                        {app.name}
                      </Link>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/80 dark:border-slate-700/80">
                        {app.version}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-cyan-700 dark:text-cyan-400 mb-1.5">
                      {app.subtitle}
                    </p>

                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {app.shortDesc}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {app.techStack.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-mono border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center font-mono text-[10px] border border-slate-100 dark:border-slate-800 max-w-lg">
                    {app.metrics.map((m, idx) => (
                      <div key={idx} className="truncate">
                        <span className="text-slate-400 block text-[9px] truncate">{m.label}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Actions Cluster (Download, Review, Details) */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    {/* Download Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(app)}
                      className="flex-1 lg:flex-initial h-8 px-3 text-xs border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-200 cursor-pointer"
                      title="Download Application Technical Specification"
                    >
                      <Download className="w-3.5 h-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
                      Download
                    </Button>

                    {/* Review Button */}
                    <Button
                      variant="cyan"
                      size="sm"
                      onClick={() => handleOpenReview(app)}
                      className="flex-1 lg:flex-initial h-8 px-3 text-xs font-semibold shadow-xs cursor-pointer"
                      title="Peer Review & Usability Evaluation"
                    >
                      <Star className="w-3.5 h-3.5 mr-1" />
                      Review
                    </Button>
                  </div>

                  {/* Explore Product Link */}
                  <Link
                    to={`/apps/${app.slug}`}
                    className="text-[11px] font-semibold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors mt-0.5"
                  >
                    <span>Explore Product</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Review Dialog Modal */}
      <Dialog
        isOpen={!!reviewingApp}
        onClose={() => setReviewingApp(null)}
        title={reviewingApp ? `Peer Review: ${reviewingApp.name}` : 'Application Review'}
        maxWidth="lg"
      >
        {reviewingApp && (
          <div className="space-y-5">
            {reviewSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Technical Review Recorded
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for contributing to the application audit. Your evaluation has been logged to the AIRIC software verification registry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* App Brief Header */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Category
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {reviewingApp.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Deployment Stage
                    </span>
                    {getStatusBadge(reviewingApp.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Current Version
                    </span>
                    <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                      {reviewingApp.version}
                    </span>
                  </div>
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Usability & Architectural Score (1 - 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(score => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setReviewScore(score)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                          reviewScore >= score
                            ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{score}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>Experimental Prototype</span>
                    <span>Production Enterprise Ready</span>
                  </div>
                </div>

                {/* Reviewer Affiliation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Evaluator Name & Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Marcus Vance, Enterprise Architecture Lead"
                    value={reviewerAffiliation}
                    onChange={e => setReviewerAffiliation(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Technical Feedback Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technical Assessment & Usability Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide evaluation on UI/UX ergonomics, API robustness, security controls, or integration scalability..."
                    value={reviewNotes}
                    onChange={e => setReviewNotes(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setReviewingApp(null)}
                    disabled={isSubmittingReview}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="cyan"
                    size="sm"
                    disabled={isSubmittingReview}
                    className="font-semibold"
                  >
                    {isSubmittingReview ? 'Submitting...' : 'Submit Evaluation'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
};
