import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ExternalLink, Download, 
  Copy, Check, Sparkles, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { mockResearchAreas } from '../../data/researchAreas';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Publications: React.FC = () => {
  useDocumentTitle('Research Publications & Preprints');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { success } = useToast();

  const filteredPublications = mockPublications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'all' || pub.type === selectedType;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    const matchesArea = selectedArea === 'all' || pub.researchAreaId === selectedArea;

    return matchesSearch && matchesType && matchesYear && matchesArea;
  });

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const paginatedPubs = filteredPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyBibtex = (pub: typeof mockPublications[0]) => {
    const bibtex = `@article{iricc_${pub.slug.replace(/-/g, '_')}_${pub.year},
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
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Academic & Patent Repository
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          IRICC Publications & Preprints
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Peer-reviewed journal articles, conference proceedings, patents, and foundational preprints published by IRICC faculty and investigators.
        </p>

        {/* Filters Bar */}
        <div className="mt-10 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search publications by title, author, or venue"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by title, author, venue, keyword…"
              className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              aria-label="Filter by publication type"
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            <select
              value={selectedArea}
              onChange={e => { setSelectedArea(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Disciplines</option>
              {mockResearchAreas.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {filteredPublications.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">No publications matched your search criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or modifying search keywords</p>
          </div>
        ) : (
          <div className="space-y-6">
            {paginatedPubs.map(pub => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/90 transition-all duration-300 space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-xs font-mono text-slate-500 font-semibold">{pub.year}</span>
                    <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
                    <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400">{pub.venue}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    Citations: <strong className="text-slate-800 dark:text-slate-200">{pub.citations}</strong>
                  </div>
                </div>

                <Link to={`/publications/${pub.slug}`}>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                    {pub.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  {pub.authors.join(', ')}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {pub.abstract}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1.5">
                    {pub.keywords.slice(0, 4).map(kw => (
                      <span key={kw} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyBibtex(pub)}
                      className="text-xs flex items-center gap-1"
                    >
                      {copiedId === pub.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === pub.id ? 'Copied' : 'BibTeX'}
                    </Button>

                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 transition-colors"
                        title="View Official DOI"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700 transition-colors"
                        title="Download PDF Preprint"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <Link to={`/publications/${pub.slug}`}>
                      <Button variant="cyan" size="sm">
                        View Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="gap-1 text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Previous
                </Button>

                <span className="text-xs text-slate-500 font-mono">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="gap-1 text-xs"
                >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
