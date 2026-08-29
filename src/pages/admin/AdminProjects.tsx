import React, { useState } from 'react';
import { 
  FolderGit2, Plus, Search, Edit3, Trash2, CheckCircle2, 
  DollarSign, Calendar, Building, Sparkles, Filter, X 
} from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { Project, ProjectStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminProjects: React.FC = () => {
  useDocumentTitle('Admin Projects & Grants CMS');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    shortDescription: '',
    description: '',
    fundingBody: 'National Science Foundation (NSF)',
    fundingAmount: '$1,200,000',
    status: 'Ongoing' as ProjectStatus,
    startDate: '2025-01-01',
    endDate: '2028-12-31',
    leadResearcherId: 'dr-sarah-lin',
    researchAreaId: 'ai-core',
    technologies: 'Neural-Symbolic, First-Order Logic',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    featured: false,
  });

  const { success, error } = useToast();

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fundingBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormState({
      title: '',
      shortDescription: '',
      description: '',
      fundingBody: 'National Science Foundation (NSF)',
      fundingAmount: '$1,200,000',
      status: 'Ongoing',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2028-12-31',
      leadResearcherId: 'dr-sarah-lin',
      researchAreaId: 'ai-core',
      technologies: 'PyTorch, SMT Solvers, CUDA',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      featured: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormState({
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.description,
      fundingBody: project.fundingBody,
      fundingAmount: project.fundingAmount || '$1,000,000',
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate || '',
      leadResearcherId: project.leadResearcherId,
      researchAreaId: project.researchAreaId,
      technologies: project.technologies.join(', '),
      image: project.image,
      featured: project.featured,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.fundingBody) {
      error('Validation Error', 'Title and funding body are required.');
      return;
    }

    const techArray = formState.technologies.split(',').map(t => t.trim()).filter(Boolean);

    if (editingProject) {
      setProjects(prev =>
        prev.map(p =>
          p.id === editingProject.id
            ? {
                ...p,
                ...formState,
                technologies: techArray,
              }
            : p
        )
      );
      success('Project Updated', `Successfully updated "${formState.title}".`);
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        slug: formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: formState.title,
        shortDescription: formState.shortDescription,
        description: formState.description,
        problemStatement: formState.shortDescription,
        methodology: 'Iterative empirical experimentation and formal verification.',
        outcomes: ['Tier-1 Conference Publications', 'Open Benchmark Suites'],
        fundingBody: formState.fundingBody,
        fundingAmount: formState.fundingAmount,
        status: formState.status,
        startDate: formState.startDate,
        endDate: formState.endDate || undefined,
        leadResearcherId: formState.leadResearcherId,
        researchAreaId: formState.researchAreaId,
        teamMemberIds: ['dr-sarah-lin'],
        publicationsIds: ['pub-1'],
        technologies: techArray,
        image: formState.image,
        featured: formState.featured,
      };
      setProjects(prev => [newProj, ...prev]);
      success('Project Created', `Added new grant "${newProj.title}".`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setProjects(prev => prev.filter(p => p.id !== id));
      success('Project Removed', `Deleted "${title}".`);
    }
  };

  const toggleStatus = (id: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'Ongoing' ? 'Completed' : 'Ongoing' }
          : p
      )
    );
    success('Status Updated', 'Toggled grant lifecycle state.');
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Institutional Projects & Grants CMS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Full lifecycle oversight of NSF, NIH, DARPA, and industrial sponsored research contracts.
          </p>
        </div>

        <Button variant="cyan" size="md" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" /> Initialize New Grant
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
              placeholder="Search projects, sponsors, or tags..."
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
              <option value="all">All Lifecycles ({projects.length})</option>
              <option value="Ongoing">Ongoing ({projects.filter(p => p.status === 'Ongoing').length})</option>
              <option value="Completed">Completed ({projects.filter(p => p.status === 'Completed').length})</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Sponsoring Agency</th>
                <th className="p-4">Grant Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {filteredProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-md">
                    <div className="font-bold text-slate-900 dark:text-slate-200">{proj.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {proj.startDate} – {proj.endDate || 'Active'}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{proj.fundingBody}</td>
                  <td className="p-4 font-mono text-slate-900 dark:text-slate-200 font-bold">{proj.fundingAmount || 'N/A'}</td>
                  <td className="p-4">
                    <button onClick={() => toggleStatus(proj.id)}>
                      <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'} className="cursor-pointer">
                        {proj.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(proj)} title="Edit Grant">
                      <Edit3 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(proj.id, proj.title)} title="Delete Grant">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grant Create/Edit Modal Dialog */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Institutional Project' : 'Initialize New Research Grant'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Project Title"
            value={formState.title}
            onChange={e => setFormState({ ...formState, title: e.target.value })}
            placeholder="e.g. NeuroLogic: Verifiable First-Order Transformer Solvers"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Sponsoring Agency"
              value={formState.fundingBody}
              onChange={e => setFormState({ ...formState, fundingBody: e.target.value })}
              placeholder="e.g. NSF, NIH, DARPA"
              required
            />
            <Input
              label="Grant Value / Funding"
              value={formState.fundingAmount}
              onChange={e => setFormState({ ...formState, fundingAmount: e.target.value })}
              placeholder="e.g. $1,500,000"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={formState.startDate}
              onChange={e => setFormState({ ...formState, startDate: e.target.value })}
              required
            />
            <Input
              type="date"
              label="Projected End Date"
              value={formState.endDate}
              onChange={e => setFormState({ ...formState, endDate: e.target.value })}
            />
          </div>

          <Textarea
            label="Short Overview"
            value={formState.shortDescription}
            onChange={e => setFormState({ ...formState, shortDescription: e.target.value })}
            placeholder="Brief 2-line summary of project goals..."
            required
          />

          <Input
            label="Key Technologies (comma separated)"
            value={formState.technologies}
            onChange={e => setFormState({ ...formState, technologies: e.target.value })}
            placeholder="e.g. PyTorch, SMT, NeRF, ROS2"
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={formState.featured}
              onChange={e => setFormState({ ...formState, featured: e.target.checked })}
              className="rounded text-cyan-500 focus:ring-cyan-400"
            />
            <label htmlFor="featured" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
              Feature this project on public homepage and annual report
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {editingProject ? 'Save Changes' : 'Create Grant'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
