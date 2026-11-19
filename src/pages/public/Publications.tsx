import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ExternalLink, Download, 
  Copy, Check, Sparkles, ChevronLeft, ChevronRight, X 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { instituteDivisions, DivisionItem } from '../../data/divisions';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

// Helper to map publication to corresponding Institute Division
export const getDivisionForPublication = (pub: { researchAreaId?: string }): DivisionItem => {
  const map: Record<string, string> = {
    'ai-core': 'research',
    'nlp-genai': 'ai-quantum',
    'cybersecurity-ai': 'cybersecurity',
    'healthcare-biomedical': 'healthcare',
    'data-analytics': 'data-analytics',
    'iot-edge-ai': 'data-analytics',
    'robotics-autonomous': 'innovation',
    'computer-vision': 'research',
  };
  const targetId = pub.researchAreaId ? map[pub.researchAreaId] || pub.researchAreaId : 'research';
  return instituteDivisions.find(d => d.id === targetId) || instituteDivisions[0];
};

export const Publications: React.FC = () => {
  useDocumentTitle('Research Publications & Preprints | AIRIC');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { success } = useToast();

  const filteredPublications = mockPublications.filter(pub => {
    const division = getDivisionForPublication(pub);
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || pub.type === selectedType;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    const matchesDivision = selectedDivision === 'all' || division.id === selectedDivision;

    return matchesSearch && matchesType && matchesYear && matchesDivision;
  });

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const paginatedPubs = filteredPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyBibtex = (pub: typeof mockPublications[0]) => {
    const bibtex = `@article{airic_${pub.slug.replace(/-/g, '_')}_${pub.year},
  title={${pub.title}},
  author={${pub.authors.join(' and ')}},
  journal={${pub.venue}},
  year={${pub.year}},
  doi={${pub.doi || 'N/A'}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(pub.id);
    success('Citation copied to clipboard', 'BibTeX citation format ready to paste.');
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="py-10 space-y-8">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Academic & Patent Repository
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          AIRIC Publications & Preprints
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
          Peer-reviewed journal articles, conference proceedings, patents, and foundational preprints published by AIRIC faculty and investigators.
        </p>

        {/* 1. Enhanced Search Box & Type/Year Filters Bar */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          {/* Search Input */}
          <div className="relative w-full md:flex-1 md:max-w-xl">
            <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search publications by title, author, or venue"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by title, author, venue, keyword, or division…"
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type & Year Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <select
              aria-label="Filter by publication type"
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="all">All Types</option>
              <option value="Conference">Conferences (NeurIPS, CVPR)</option>
              <option value="Journal">Journals (Nature, IEEE)</option>
              <option value="Preprint">Preprints (arXiv)</option>
              <option value="Workshop">Workshops</option>
            </select>

            <select
              aria-label="Filter by publication year"
              value={selectedYear}
              onChange={e => { setSelectedYear(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
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
              Showing {filteredPublications.length} papers
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => { setSelectedDivision('all'); setCurrentPage(1); }}
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
                  onClick={() => { setSelectedDivision(division.id); setCurrentPage(1); }}
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

      {/* Publications List */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16 text-slate-500 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">No publications matched your search criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or modifying search keywords</p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedPubs.map(pub => {
              const division = getDivisionForPublication(pub);
              return (
                <div
                  key={pub.id}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-cyan-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/90 transition-all duration-300 space-y-3 group shadow-xs hover:shadow-md backdrop-blur-sm"
                >
                  {/* Top Bar with Division Badge & Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Division Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-[11px] font-mono font-semibold">
                        <span className="w-3.5 h-3.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[9px] flex items-center justify-center font-bold">
                          {division.number}
                        </span>
                        <span>{division.name}</span>
                      </span>

                      <Badge variant="cyan">{pub.type}</Badge>
                      <span className="text-xs font-mono text-slate-500 font-semibold">{pub.year}</span>
                      <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400">{pub.venue}</span>
                    </div>

                    {pub.citations !== undefined && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {pub.citations.toLocaleString()} Citations
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link to={`/publications/${pub.slug}`} className="block">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {pub.title}
                    </h3>
                  </Link>

                  {/* Authors */}
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400 font-medium">Authors: </span>
                    {pub.authors.join(', ')}
                  </div>

                  {/* Abstract */}
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {pub.abstract}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pub.keywords.map(kw => (
                      <span
                        key={kw}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyBibtex(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-mono text-xs transition-colors cursor-pointer"
                        title="Copy BibTeX Citation"
                      >
                        {copiedId === pub.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Cite BibTeX</span>
                          </>
                        )}
                      </button>

                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-mono text-xs transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>DOI</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>PDF</span>
                        </a>
                      )}

                      <Link to={`/publications/${pub.slug}`}>
                        <Button variant="cyan" size="sm">
                          Inspect Paper
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 font-mono">
                  Page {currentPage} of {totalPages} ({filteredPublications.length} total)
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="h-8 px-2.5 text-xs"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="h-8 px-2.5 text-xs"
                  >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
