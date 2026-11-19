import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Sparkles, ArrowRight, Download, Star, 
  FileText, CheckCircle2, ShieldCheck, Award, MessageSquare, 
  X, Globe, Layers, Filter 
} from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../context/ToastContext';
import { Project } from '../../types';

// Helper to map project to corresponding Institute Division
export const getDivisionForProject = (proj: { researchAreaId?: string }): DivisionItem => {
  const map: Record<string, string> = {
    'ai-core': 'ai-quantum',
    'nlp-genai': 'ai-quantum',
    'cybersecurity-ai': 'cybersecurity',
    'healthcare-biomedical': 'healthcare',
    'data-analytics': 'data-analytics',
    'iot-edge-ai': 'data-analytics',
    'robotics-autonomous': 'innovation',
    'computer-vision': 'innovation',
  };
  const targetId = proj.researchAreaId ? map[proj.researchAreaId] || proj.researchAreaId : 'research';
  return instituteDivisions.find(d => d.id === targetId) || instituteDivisions[0];
};

export const Projects: React.FC = () => {
  useDocumentTitle('Research Projects & Spinouts | AIRIC');
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  // Review Modal State
  const [reviewingProject, setReviewingProject] = useState<Project | null>(null);
  const [reviewScore, setReviewScore] = useState<number>(5);
  const [reviewNotes, setReviewNotes] = useState<string>('');
  const [reviewerAffiliation, setReviewerAffiliation] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const filteredProjects = mockProjects.filter(p => {
    const div = getDivisionForProject(p);
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      div.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesDivision = selectedDivision === 'all' || div.id === selectedDivision;

    return matchesSearch && matchesStatus && matchesDivision;
  });

  // Handle Download Project Dossier
  const handleDownload = (proj: Project) => {
    const div = getDivisionForProject(proj);
    const dossierData = {
      project_title: proj.title,
      slug: proj.slug,
      status: proj.status,
      division: {
        number: div.number,
        name: div.name,
        id: div.id,
      },
      funding_body: proj.fundingBody,
      funding_amount: proj.fundingAmount,
      technologies: proj.technologies,
      short_description: proj.shortDescription,
      full_description: proj.description,
      problem_statement: proj.problemStatement,
      methodology: proj.methodology,
      outcomes: proj.outcomes,
      deliverables: proj.deliverables,
      timestamp: new Date().toISOString(),
      institution: 'Advanced Intelligence, Research, Innovation & Commercialization Institute (AIRIC)',
      repository_url: proj.githubUrl || 'https://github.com/airic-institute',
      demo_url: proj.demoUrl || null,
    };

    const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proj.slug || 'airic-project'}-dossier.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      type: 'success',
      title: 'Project Dossier Downloaded',
      message: `Downloaded scientific documentation package for "${proj.title}".`,
    });
  };

  // Open Review Dialog
  const handleOpenReview = (proj: Project) => {
    setReviewingProject(proj);
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
        message: `Peer review for "${reviewingProject?.title}" submitted with a score of ${reviewScore}/5.`,
      });

      setTimeout(() => {
        setReviewingProject(null);
        setReviewSubmitted(false);
      }, 1400);
    }, 600);
  };

  return (
    <div className="py-10 space-y-8">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Funded Initiatives & Commercialization Spinouts
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          AIRIC Research Projects Directory
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
          Multi-year research investigations supported by national science foundations, international medical institutes, and advanced industrial alliances.
        </p>

        {/* 1. Enhanced Search Box & Status Filter Bar */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          {/* Search Box */}
          <div className="relative w-full md:flex-1 md:max-w-xl">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search projects or technologies"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search projects by title, description, division, or tech stack…"
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-2xs"
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

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              aria-label="Filter by project status"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="Ongoing">Ongoing Projects</option>
              <option value="Completed">Completed Projects</option>
              <option value="Proposed">Proposed / Scoping</option>
            </select>
          </div>
        </div>

        {/* 2. 10 Institute Divisions Design Bar */}
        <div className="mt-4 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-700 dark:text-cyan-400 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Filter By 10 Institute Divisions
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Showing {filteredProjects.length} matching
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedDivision('all')}
              className={`shrink-0 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer border ${
                selectedDivision === 'all'
                  ? 'bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Divisions
            </button>
            {instituteDivisions.map(division => {
              const isActive = selectedDivision === division.id;
              return (
                <button
                  key={division.id}
                  onClick={() => setSelectedDivision(division.id)}
                  className={`shrink-0 px-2.5 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-900 dark:text-cyan-300 border-cyan-500 font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center ${
                    isActive
                      ? 'bg-cyan-500 text-white'
                      : 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-400'
                  }`}>
                    {division.number}
                  </span>
                  <span className="truncate max-w-[130px]">{division.shortName || division.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects List Items */}
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-500 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">No projects found matching your search</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or selecting another division</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProjects.map(proj => {
              const division = getDivisionForProject(proj);
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 group backdrop-blur-sm"
                >
                  {/* Left: Thumbnail & Status */}
                  <div className="relative w-full lg:w-56 h-44 lg:h-36 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        variant={
                          proj.status === 'Ongoing'
                            ? 'success'
                            : proj.status === 'Completed'
                            ? 'cyan'
                            : 'secondary'
                        }
                        className="text-[10px] px-2 py-0.5 shadow-sm"
                      >
                        {proj.status}
                      </Badge>
                    </div>
                    {proj.fundingAmount && (
                      <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-cyan-300 border border-slate-700 backdrop-blur-sm shadow-xs font-semibold">
                        {proj.fundingAmount}
                      </div>
                    )}
                  </div>

                  {/* Middle: Project Metadata, Division Badge, Title, Description, Tech Stack */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                    <div>
                      {/* Meta header with Division Badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-[11px] font-mono font-semibold">
                          <span className="w-3.5 h-3.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[9px] flex items-center justify-center font-bold">
                            {division.number}
                          </span>
                          <span>{division.name}</span>
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-[11px] font-mono text-slate-500">{proj.fundingBody}</span>
                        {proj.startDate && (
                          <>
                            <span className="text-slate-400">•</span>
                            <span className="text-[11px] font-mono text-slate-500">{new Date(proj.startDate).getFullYear()}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        to={`/projects/${proj.slug}`}
                        className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-1"
                      >
                        {proj.title}
                      </Link>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-1">
                        {proj.shortDescription}
                      </p>
                    </div>

                    {/* Technologies Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {proj.technologies.slice(0, 5).map(tech => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200/50 dark:border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 5 && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          +{proj.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions Cluster (Download, Review, Details) */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2.5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                      {/* Download Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(proj)}
                        className="flex-1 lg:flex-initial h-8 px-3 text-xs border-slate-300 dark:border-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-200 cursor-pointer"
                        title="Download Project Research Dossier"
                      >
                        <Download className="w-3.5 h-3.5 mr-1 text-cyan-600 dark:text-cyan-400" />
                        Download
                      </Button>

                      {/* Review Button */}
                      <Button
                        variant="cyan"
                        size="sm"
                        onClick={() => handleOpenReview(proj)}
                        className="flex-1 lg:flex-initial h-8 px-3 text-xs font-semibold shadow-xs cursor-pointer"
                        title="Peer Review & Technical Evaluation"
                      >
                        <Star className="w-3.5 h-3.5 mr-1" />
                        Review
                      </Button>
                    </div>

                    {/* Inspect details link */}
                    <Link
                      to={`/projects/${proj.slug}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Peer Review Modal Dialog */}
      <Dialog
        isOpen={!!reviewingProject}
        onClose={() => setReviewingProject(null)}
        title={reviewingProject ? `Peer Review: ${reviewingProject.title}` : 'Project Review'}
        maxWidth="lg"
      >
        {reviewingProject && (
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
                  Thank you for contributing to the academic evaluation of this initiative. Your review has been logged to the AIRIC peer-review ledger.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Project Brief Info */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Division
                    </span>
                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">
                      {getDivisionForProject(reviewingProject).name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Funding Body
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {reviewingProject.fundingBody}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">
                      Current Status
                    </span>
                    <Badge variant={reviewingProject.status === 'Ongoing' ? 'success' : 'cyan'}>
                      {reviewingProject.status}
                    </Badge>
                  </div>
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Scientific & Commercial Readiness Rating (1 - 5)
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
                    <span>Preliminary Concept</span>
                    <span>Production / Clinical Ready</span>
                  </div>
                </div>

                {/* Reviewer Affiliation */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Reviewer Identity or Institution
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Marcus Vance, MIT CSAIL / Independent Evaluator"
                    value={reviewerAffiliation}
                    onChange={e => setReviewerAffiliation(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Technical Feedback Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technical Assessment & Peer Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide insights on methodology, reproducibility, commercial viability, or risk mitigations..."
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
                    onClick={() => setReviewingProject(null)}
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
