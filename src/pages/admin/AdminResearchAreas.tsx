import React, { useState } from 'react';
import { 
  Brain, Plus, Edit3, Trash2, ArrowRight, Search, 
  Layers, Users, Sparkles, X, CheckCircle2 
} from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { mockResearchers } from '../../data/researchers';
import { ResearchArea } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminResearchAreas: React.FC = () => {
  useDocumentTitle('Admin Research Disciplines CMS');
  const [areas, setAreas] = useState<ResearchArea[]>(mockResearchAreas);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<ResearchArea | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    shortDescription: '',
    description: '',
    iconName: 'Brain',
    leadResearcherId: 'dr-sarah-lin',
    technologies: 'Logic, SMT, Formal Verification',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    objectives: 'Pioneer neuro-symbolic algorithms\nEnsure verifiable safety invariants\nOpen-source formal benchmark suites',
  });

  const { success, error } = useToast();

  const filteredAreas = areas.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingArea(null);
    setFormState({
      title: '',
      shortDescription: '',
      description: '',
      iconName: 'Brain',
      leadResearcherId: 'dr-sarah-lin',
      technologies: 'Neural Fields, Transformers, SMT Solvers',
      heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
      objectives: 'Advance fundamental foundations\nPublish open preprints and models\nFacilitate multi-institution benchmarking',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (area: ResearchArea) => {
    setEditingArea(area);
    setFormState({
      title: area.title,
      shortDescription: area.shortDescription,
      description: area.description,
      iconName: area.iconName,
      leadResearcherId: area.leadResearcherId,
      technologies: area.technologies.join(', '),
      heroImage: area.heroImage,
      objectives: area.objectives.join('\n'),
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) {
      error('Validation Error', 'Discipline title is required.');
      return;
    }

    const techArray = formState.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const objArray = formState.objectives.split('\n').map(o => o.trim()).filter(Boolean);

    if (editingArea) {
      setAreas(prev =>
        prev.map(a =>
          a.id === editingArea.id
            ? {
                ...a,
                ...formState,
                technologies: techArray,
                objectives: objArray,
              }
            : a
        )
      );
      success('Discipline Updated', `Updated "${formState.title}".`);
    } else {
      const newArea: ResearchArea = {
        id: `area-${Date.now()}`,
        slug: formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: formState.title,
        shortDescription: formState.shortDescription,
        description: formState.description,
        iconName: formState.iconName,
        heroImage: formState.heroImage,
        leadResearcherId: formState.leadResearcherId,
        objectives: objArray,
        technologies: techArray,
        achievements: ['Tier-1 Best Paper Awards', 'Open-source Model Hub'],
        publicationCount: 12,
        projectCount: 4,
      };
      setAreas(prev => [newArea, ...prev]);
      success('Discipline Added', `Created new research discipline "${newArea.title}".`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setAreas(prev => prev.filter(a => a.id !== id));
      success('Discipline Removed', `Deleted "${title}".`);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Research Disciplines Oversight
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Manage academic discipline charters, laboratory directors, and compute budget envelopes.
          </p>
        </div>
        <Button variant="cyan" size="md" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4 mr-1.5" /> Initialize New Discipline
        </Button>
      </div>

      {/* Filter / Search */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search disciplines..."
            className="w-full h-10 pl-10 pr-4 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </Card>

      {/* Disciplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAreas.map(area => (
          <Card key={area.id} className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex flex-col justify-between shadow-md hover:shadow-xl transition-all space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="cyan">{area.publicationCount} Publications</Badge>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">{area.projectCount} Grants</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{area.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{area.shortDescription}</p>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {area.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                Lead: {area.leadResearcherId.replace('dr-', 'Dr. ').replace('-', ' ').toUpperCase()}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(area)} title="Edit Charter">
                  <Edit3 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(area.id, area.title)} className="text-red-500" title="Delete Discipline">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal Dialog */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingArea ? 'Edit Research Discipline Charter' : 'Initialize New Research Discipline'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            label="Discipline Title"
            value={formState.title}
            onChange={e => setFormState({ ...formState, title: e.target.value })}
            placeholder="e.g. Edge AI & Intelligent TinyML"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Discipline Group Icon"
              value={formState.iconName}
              onChange={e => setFormState({ ...formState, iconName: e.target.value })}
            >
              <option value="Brain">Brain (Neural & Logic)</option>
              <option value="Eye">Eye (Computer Vision)</option>
              <option value="MessageSquareText">Message (NLP & LLMs)</option>
              <option value="Bot">Bot (Robotics & Swarms)</option>
              <option value="Activity">Activity (Healthcare AI)</option>
              <option value="ShieldCheck">Shield (Trustworthy AI)</option>
              <option value="Cpu">Cpu (Edge & Hardware)</option>
            </Select>

            <Select
              label="Appointed Laboratory Director"
              value={formState.leadResearcherId}
              onChange={e => setFormState({ ...formState, leadResearcherId: e.target.value })}
            >
              {mockResearchers.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.title.split(',')[0]})
                </option>
              ))}
            </Select>
          </div>

          <Textarea
            label="Executive Summary"
            value={formState.shortDescription}
            onChange={e => setFormState({ ...formState, shortDescription: e.target.value })}
            placeholder="Brief 2-line summary of discipline scope..."
            required
          />

          <Input
            label="Key Technologies & Frameworks (comma separated)"
            value={formState.technologies}
            onChange={e => setFormState({ ...formState, technologies: e.target.value })}
            placeholder="e.g. SMT Solvers, Differentiable Physics, NeRF"
          />

          <Textarea
            label="Strategic Goals & Benchmarks (one per line)"
            value={formState.objectives}
            onChange={e => setFormState({ ...formState, objectives: e.target.value })}
            placeholder="Establish provably robust architectures&#10;Unify symbolic knowledge graphs&#10;Formulate safety standards"
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {editingArea ? 'Save Charter' : 'Create Discipline'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
