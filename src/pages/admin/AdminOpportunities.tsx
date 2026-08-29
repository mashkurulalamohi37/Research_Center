import React, { useState } from 'react';
import { 
  Briefcase, Plus, Edit3, Trash2, CheckCircle2, 
  Search, Calendar, DollarSign, Sparkles, Filter, X 
} from 'lucide-react';
import { mockOpportunities } from '../../data/opportunities';
import { Opportunity, OpportunityType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminOpportunities: React.FC = () => {
  useDocumentTitle('Admin Fellowships & Careers CMS');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    type: 'Fellowship' as OpportunityType,
    duration: '2 Years (Renewable)',
    stipend: '$85,000 / year + Comprehensive Benefits',
    deadline: '2026-06-30',
    status: 'Open' as 'Open' | 'Closed' | 'Under Review',
    overview: '',
    location: 'Cambridge, MA (On-Campus)',
    researchAreaId: 'ai-core',
    supervisorId: 'dr-sarah-lin',
    requirements: 'Ph.D. in Computer Science or related field\nFirst-author publications at Tier-1 venues\nStrong proficiency in PyTorch/C++',
  });

  const { success, error } = useToast();

  const filteredOpportunities = opportunities.filter(o => {
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingOpp(null);
    setFormState({
      title: '',
      type: 'Fellowship',
      duration: '2 Years (Renewable)',
      stipend: '$85,000 / year + Benefits',
      deadline: '2026-09-30',
      status: 'Open',
      overview: '',
      location: 'Cambridge, MA (On-Campus)',
      researchAreaId: 'ai-core',
      supervisorId: 'dr-sarah-lin',
      requirements: 'Strong mathematical background\nExperience with deep generative architectures\nDemonstrated publication track record',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (opp: Opportunity) => {
    setEditingOpp(opp);
    setFormState({
      title: opp.title,
      type: opp.type,
      duration: opp.duration,
      stipend: opp.stipend || '',
      deadline: opp.deadline,
      status: opp.status,
      overview: opp.overview,
      location: opp.location,
      researchAreaId: opp.researchAreaId,
      supervisorId: opp.supervisorId,
      requirements: opp.requirements.join('\n'),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.deadline) {
      error('Validation Error', 'Title and deadline are required.');
      return;
    }

    const reqArray = formState.requirements.split('\n').map(r => r.trim()).filter(Boolean);

    if (editingOpp) {
      setOpportunities(prev =>
        prev.map(o =>
          o.id === editingOpp.id
            ? {
                ...o,
                title: formState.title,
                type: formState.type,
                duration: formState.duration,
                stipend: formState.stipend,
                deadline: formState.deadline,
                status: formState.status,
                overview: formState.overview,
                location: formState.location,
                researchAreaId: formState.researchAreaId,
                supervisorId: formState.supervisorId,
                requirements: reqArray,
              }
            : o
        )
      );
      success('Opportunity Updated', `Updated "${formState.title}".`);
    } else {
      const newOpp: Opportunity = {
        id: `opp-${Date.now()}`,
        slug: formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: formState.title,
        type: formState.type,
        researchAreaId: formState.researchAreaId,
        supervisorId: formState.supervisorId,
        duration: formState.duration,
        stipend: formState.stipend,
        deadline: formState.deadline,
        status: formState.status,
        overview: formState.overview,
        eligibility: ['Ph.D. or Master degree in Computer Science', 'Fluency in English scientific writing'],
        responsibilities: ['Lead independent research investigations', 'Mentor doctoral students', 'Publish at top venues'],
        requirements: reqArray,
        applicationProcess: ['Submit CV and research statement', 'Provide 3 letters of reference', 'Virtual interview'],
        location: formState.location,
        featured: true,
        postedDate: new Date().toISOString().split('T')[0],
      };
      setOpportunities(prev => [newOpp, ...prev]);
      success('Opportunity Created', `Posted new position "${newOpp.title}".`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setOpportunities(prev => prev.filter(o => o.id !== id));
      success('Opportunity Removed', `Deleted "${title}".`);
    }
  };

  const toggleStatus = (id: string) => {
    setOpportunities(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: o.status === 'Open' ? 'Closed' : 'Open' } : o
      )
    );
    success('Recruitment Status Toggled', 'Updated opportunity availability.');
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Careers & Research Fellowships Oversight
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Post fellowship openings, configure stipend envelopes, and manage application deadlines.
          </p>
        </div>
        <Button variant="cyan" size="md" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" /> Post New Fellowship
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search fellowship title or discipline..."
              className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Positions ({opportunities.length})</option>
              <option value="Open">Open ({opportunities.filter(o => o.status === 'Open').length})</option>
              <option value="Closed">Closed ({opportunities.filter(o => o.status === 'Closed').length})</option>
              <option value="Under Review">Under Review ({opportunities.filter(o => o.status === 'Under Review').length})</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map(opp => (
          <Card key={opp.id} className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md hover:shadow-lg transition-all">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">{opp.type}</Badge>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Deadline: {opp.deadline}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{opp.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{opp.duration} • {opp.stipend || 'Competitive Academic Stipend'} • {opp.location}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{opp.overview}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => toggleStatus(opp.id)}>
                <Badge variant={opp.status === 'Open' ? 'success' : 'secondary'} className="cursor-pointer">
                  {opp.status}
                </Badge>
              </button>
              <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(opp)} title="Edit Position">
                <Edit3 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(opp.id, opp.title)} className="text-red-500" title="Delete Position">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal Dialog */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingOpp ? 'Edit Research Fellowship' : 'Post New Research Fellowship'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Position Title"
            value={formState.title}
            onChange={e => setFormState({ ...formState, title: e.target.value })}
            placeholder="e.g. Postdoctoral Fellow in Provable Neural-Symbolic Reasoning"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Position Category"
              value={formState.type}
              onChange={e => setFormState({ ...formState, type: e.target.value as OpportunityType })}
            >
              <option value="Fellowship">Fellowship</option>
              <option value="Graduate Research">Graduate Research</option>
              <option value="Research Assistant">Research Assistant</option>
              <option value="Visiting Researcher">Visiting Researcher</option>
              <option value="Internship">Internship</option>
              <option value="Undergraduate Research">Undergraduate Research</option>
              <option value="Thesis">Thesis</option>
            </Select>

            <Input
              type="date"
              label="Application Deadline"
              value={formState.deadline}
              onChange={e => setFormState({ ...formState, deadline: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Duration & Terms"
              value={formState.duration}
              onChange={e => setFormState({ ...formState, duration: e.target.value })}
              placeholder="e.g. 2 Years (Renewable)"
            />
            <Input
              label="Stipend / Salary"
              value={formState.stipend}
              onChange={e => setFormState({ ...formState, stipend: e.target.value })}
              placeholder="e.g. $85,000/yr + Health Benefits"
            />
          </div>

          <Textarea
            label="Position Overview"
            value={formState.overview}
            onChange={e => setFormState({ ...formState, overview: e.target.value })}
            placeholder="Detailed description of research expectations and laboratory context..."
            required
          />

          <Textarea
            label="Candidate Requirements (one per line)"
            value={formState.requirements}
            onChange={e => setFormState({ ...formState, requirements: e.target.value })}
            placeholder="Ph.D. in Computer Science or related&#10;Track record at NeurIPS/ICML/CVPR&#10;Proficiency with deep learning libraries"
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {editingOpp ? 'Save Position' : 'Publish Fellowship'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
