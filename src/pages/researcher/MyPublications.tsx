import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, Edit3, Trash2, 
  Send, ExternalLink, CheckCircle2, Clock, Sparkles 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { mockResearchAreas } from '../../data/researchAreas';
import { Publication, PublicationType, PublicationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const MyPublications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<Publication | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    authors: 'Marcus Vance, Ananya Patel',
    venue: '',
    year: '2026',
    type: 'Conference' as PublicationType,
    researchAreaId: 'computer-vision',
    abstract: '',
    doi: '',
  });

  const { success, error } = useToast();

  const filteredPubs = publications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setIsEditing(null);
    setFormState({
      title: '',
      authors: 'Marcus Vance, Ananya Patel',
      venue: '',
      year: '2026',
      type: 'Conference',
      researchAreaId: 'computer-vision',
      abstract: '',
      doi: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (pub: Publication) => {
    setIsEditing(pub);
    setFormState({
      title: pub.title,
      authors: pub.authors.join(', '),
      venue: pub.venue,
      year: pub.year.toString(),
      type: pub.type,
      researchAreaId: pub.researchAreaId,
      abstract: pub.abstract,
      doi: pub.doi || '',
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPublications(prev => prev.filter(p => p.id !== id));
    success('Publication Removed', 'The publication has been deleted from your lab roster.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.venue) {
      error('Missing Information', 'Please complete the title and venue fields.');
      return;
    }

    if (isEditing) {
      setPublications(prev =>
        prev.map(p =>
          p.id === isEditing.id
            ? {
                ...p,
                title: formState.title,
                authors: formState.authors.split(',').map(a => a.trim()),
                venue: formState.venue,
                year: parseInt(formState.year) || 2026,
                type: formState.type,
                researchAreaId: formState.researchAreaId,
                abstract: formState.abstract,
                doi: formState.doi,
              }
            : p
        )
      );
      success('Publication Updated', 'Changes saved successfully.');
    } else {
      const newPub: Publication = {
        id: `pub-${Date.now()}`,
        slug: formState.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
        title: formState.title,
        authors: formState.authors.split(',').map(a => a.trim()),
        venue: formState.venue,
        year: parseInt(formState.year) || 2026,
        type: formState.type,
        researchAreaId: formState.researchAreaId,
        abstract: formState.abstract,
        keywords: ['Computer Vision', 'Neural Fields', 'AIRC'],
        doi: formState.doi,
        citations: 0,
        featured: false,
        status: 'Pending Review',
        submittedDate: new Date().toISOString().split('T')[0],
      };
      setPublications(prev => [newPub, ...prev]);
      success('Submitted for Review', 'Publication queued for Director review.');
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            My Authored Publications
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage peer-reviewed articles, submit preprints for review, and track citations.
          </p>
        </div>

        <Button variant="cyan" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" /> Submit New Paper
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Filter by title or venue..."
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      {/* Publications Table / List */}
      <div className="space-y-4">
        {filteredPubs.map(pub => (
          <div
            key={pub.id}
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant={pub.status === 'Published' ? 'success' : pub.status === 'Pending Review' ? 'warning' : 'secondary'}>
                  {pub.status}
                </Badge>
                <Badge variant="cyan">{pub.type}</Badge>
                <span className="text-slate-400 font-mono">{pub.year}</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400 font-semibold truncate">{pub.venue}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100 leading-snug truncate">
                {pub.title}
              </h3>

              <p className="text-xs text-slate-400 font-mono">
                Authors: {pub.authors.join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(pub)}>
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(pub.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Publication Dialog Modal */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Publication' : 'Add New Publication'}
        description="Enter publication metadata for verification and indexing."
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Paper Title *</label>
            <Input
              required
              value={formState.title}
              onChange={e => setFormState({ ...formState, title: e.target.value })}
              placeholder="e.g. Sub-Millimeter 3D Intraoperative Neural Splatting"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Authors (comma-separated)</label>
              <Input
                value={formState.authors}
                onChange={e => setFormState({ ...formState, authors: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Publication Venue *</label>
              <Input
                required
                value={formState.venue}
                onChange={e => setFormState({ ...formState, venue: e.target.value })}
                placeholder="e.g. NeurIPS 2025 / CVPR 2025"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Year</label>
              <Input
                value={formState.year}
                onChange={e => setFormState({ ...formState, year: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Type</label>
              <Select
                value={formState.type}
                onChange={e => setFormState({ ...formState, type: e.target.value as PublicationType })}
              >
                <option value="Conference">Conference</option>
                <option value="Journal">Journal</option>
                <option value="Preprint">Preprint</option>
                <option value="Workshop">Workshop</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Research Area</label>
              <Select
                value={formState.researchAreaId}
                onChange={e => setFormState({ ...formState, researchAreaId: e.target.value })}
              >
                {mockResearchAreas.map(a => (
                  <option key={a.id} value={a.id}>{a.title}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">DOI Identifier (Optional)</label>
            <Input
              value={formState.doi}
              onChange={e => setFormState({ ...formState, doi: e.target.value })}
              placeholder="10.1109/CVPR52688.2025.01248"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Abstract</label>
            <Textarea
              rows={4}
              value={formState.abstract}
              onChange={e => setFormState({ ...formState, abstract: e.target.value })}
              placeholder="Paste publication abstract..."
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {isEditing ? 'Save Changes' : 'Submit Publication'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
