import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Download, Copy, Check, ExternalLink, 
  Github, Database, Share2, Sparkles, ArrowLeft, Layers 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { mockResearchers } from '../../data/researchers';
import { mockResearchAreas } from '../../data/researchAreas';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const PublicationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [citeModalOpen, setCiteModalOpen] = useState(false);
  const [citeFormat, setCiteFormat] = useState<'bibtex' | 'apa' | 'ieee'>('bibtex');
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const pub = mockPublications.find(p => p.slug === slug || p.id === slug) || mockPublications[0];
  useDocumentTitle(`${pub.title} — Publications`);
  const area = mockResearchAreas.find(a => a.id === pub.researchAreaId);

  const getCitationText = () => {
    if (citeFormat === 'bibtex') {
      return `@article{airc_${pub.slug.replace(/-/g, '_')}_${pub.year},
  title = {${pub.title}},
  author = {${pub.authors.join(' and ')}},
  journal = {${pub.venue}},
  year = {${pub.year}},
  doi = {${pub.doi || '10.1145/airc.2025.01'}}
}`;
    } else if (citeFormat === 'apa') {
      return `${pub.authors.join(', ')} (${pub.year}). ${pub.title}. ${pub.venue}.${pub.doi ? ` https://doi.org/${pub.doi}` : ''}`;
    } else {
      return `${pub.authors.join(', ')}, "${pub.title}," ${pub.venue}, ${pub.year}.`;
    }
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopied(true);
    success('Citation Copied', `${citeFormat.toUpperCase()} formatted citation copied to clipboard.`);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPdf = () => {
    success('PDF Download Initialized', `Downloading preprint manuscript: ${pub.title.substring(0, 40)}...`);
  };

  return (
    <div className="py-10 space-y-12">
      {/* Top Back Nav */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link to="/publications" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Publications Repository
        </Link>
      </div>

      {/* Main Academic Article Paper Header */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan">{pub.type}</Badge>
            <span className="text-xs font-mono text-cyan-400 font-bold">{pub.year}</span>
            <span className="text-xs text-slate-600">•</span>
            {area && <span className="text-xs text-slate-400 font-medium">{area.title}</span>}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-snug">
            {pub.title}
          </h1>

          {/* Authors List */}
          <div className="pt-1">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              Authors
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              {pub.authors.map((author, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 font-medium">
                  {author}
                </span>
              ))}
            </div>
          </div>

          {/* Publication Metadata Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 block">Published In</span>
              <strong className="text-slate-200">{pub.venue}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Publisher</span>
              <strong className="text-slate-200">{pub.publisher || 'AIRC Open Press'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">DOI Identifier</span>
              <strong className="text-cyan-400">{pub.doi || 'arXiv:2602.04819'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Citations</span>
              <strong className="text-slate-100">{pub.citations} citations</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button variant="cyan" size="md" onClick={handleDownloadPdf}>
              <Download className="w-4 h-4 mr-1.5" /> Download Full PDF
            </Button>
            <Button variant="secondary" size="md" onClick={() => setCiteModalOpen(true)}>
              <Copy className="w-4 h-4 mr-1.5" /> Cite Paper
            </Button>
            {pub.codeUrl && (
              <a href={pub.codeUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="md">
                  <Github className="w-4 h-4 mr-1.5 text-purple-400" /> Source Code
                </Button>
              </a>
            )}
            {pub.datasetUrl && (
              <a href={pub.datasetUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" size="md">
                  <Database className="w-4 h-4 mr-1.5 text-emerald-400" /> Benchmark Data
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Abstract & Content Body */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-8">
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Abstract
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed text-justify font-sans">
            {pub.abstract}
          </p>

          <div className="pt-6 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
              Indexed Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {pub.keywords.map(kw => (
                <span key={kw} className="px-3 py-1 rounded-xl bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Citation Dialog Modal */}
      <Dialog
        isOpen={citeModalOpen}
        onClose={() => setCiteModalOpen(false)}
        title="Export Citation"
        description="Select your preferred academic citation standard or copy BibTeX for LaTeX."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            {(['bibtex', 'apa', 'ieee'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => setCiteFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-colors ${
                  citeFormat === fmt
                    ? 'bg-cyan-500 text-navy-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {getCitationText()}
          </pre>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setCiteModalOpen(false)}>
              Close
            </Button>
            <Button variant="cyan" size="sm" onClick={handleCopyCitation}>
              {copied ? <Check className="w-4 h-4 mr-1 text-emerald-950" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy Citation'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
