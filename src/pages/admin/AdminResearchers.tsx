import React, { useState } from 'react';
import { 
  Users, Plus, Search, Edit3, Trash2, 
  CheckCircle2, XCircle, MoreVertical, Mail, Sparkles 
} from 'lucide-react';
import { mockResearchers } from '../../data/researchers';
import { mockResearchAreas } from '../../data/researchAreas';
import { Researcher } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminResearchers: React.FC = () => {
  const [researchers, setResearchers] = useState<Researcher[]>(mockResearchers);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<Researcher | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    title: '',
    category: 'faculty' as 'faculty' | 'postdoc' | 'student' | 'visiting',
    department: 'School of Computer Science & AI',
    email: '',
    office: 'Turing Hall, Room 301',
    bio: '',
    expertise: 'Machine Learning, Neural Fields',
  });

  const { success, error } = useToast();

  const filteredResearchers = researchers.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setIsEditing(null);
    setFormState({
      name: '',
      title: '',
      category: 'faculty',
      department: 'School of Computer Science & AI',
      email: '',
      office: 'Turing Hall, Room 301',
      bio: '',
      expertise: 'Machine Learning, Neural Fields',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (r: Researcher) => {
    setIsEditing(r);
    setFormState({
      name: r.name,
      title: r.title,
      category: r.category,
      department: r.department,
      email: r.email,
      office: r.office,
      bio: r.bio,
      expertise: r.expertise.join(', '),
    });
    setModalOpen(true);
  };

  const toggleStatus = (id: string) => {
    setResearchers(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: r.status === 'active' ? 'on-leave' : 'active' }
          : r
      )
    );
    success('Status Updated', 'Faculty active status toggled in the institutional directory.');
  };

  const handleDelete = (id: string) => {
    setResearchers(prev => prev.filter(r => r.id !== id));
    success('Researcher Record Removed', 'Researcher deleted from the directory.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) {
      error('Missing Information', 'Please fill in name and institutional email.');
      return;
    }

    if (isEditing) {
      setResearchers(prev =>
        prev.map(r =>
          r.id === isEditing.id
            ? {
                ...r,
                name: formState.name,
                title: formState.title,
                category: formState.category,
                department: formState.department,
                email: formState.email,
                office: formState.office,
                bio: formState.bio,
                expertise: formState.expertise.split(',').map(e => e.trim()),
              }
            : r
        )
      );
      success('Researcher Record Updated', 'Faculty data synchronized.');
    } else {
      const newResearcher: Researcher = {
        id: `dr-${formState.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        slug: formState.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: formState.name,
        title: formState.title,
        category: formState.category,
        department: formState.department,
        email: formState.email,
        office: formState.office,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        bio: formState.bio,
        education: [{ degree: 'Ph.D. in Computer Science', institution: 'MIT', year: 2020 }],
        researchAreaIds: ['ai-core'],
        expertise: formState.expertise.split(',').map(e => e.trim()),
        interests: ['Neural reasoning', 'Safety bounds'],
        hIndex: 10,
        citations: 450,
        featured: false,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      };
      setResearchers(prev => [newResearcher, ...prev]);
      success('Faculty Member Appointed', `${formState.name} added to the institute directory.`);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Researchers & Faculty Management
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Maintain faculty appointments, postdoctoral appointments, and student allocations.
          </p>
        </div>

        <Button variant="cyan" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" /> Appoint New Researcher
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
            placeholder="Search faculty by name or department..."
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
        >
          <option value="all">All Positions</option>
          <option value="faculty">Faculty & PIs</option>
          <option value="postdoc">Postdoctoral Fellows</option>
          <option value="student">Graduate Ph.D. Fellows</option>
        </select>
      </div>

      {/* Table (Section 51) */}
      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Faculty Member</th>
                <th className="p-4">Position / Department</th>
                <th className="p-4">Citations / h-index</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredResearchers.map(r => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <div className="font-bold text-slate-200">{r.name}</div>
                        <div className="text-slate-500 text-[11px] font-mono">{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-300">{r.title}</div>
                    <div className="text-slate-500 text-[11px]">{r.department}</div>
                  </td>
                  <td className="p-4 font-mono">
                    <div className="text-slate-200">{r.citations.toLocaleString()} Citations</div>
                    <div className="text-cyan-400">h-index: {r.hIndex}</div>
                  </td>
                  <td className="p-4">
                    <button onClick={() => toggleStatus(r.id)}>
                      <Badge variant={r.status === 'active' ? 'success' : 'secondary'} className="cursor-pointer">
                        {r.status === 'active' ? 'Active' : 'On Leave'}
                      </Badge>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(r)}>
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(r.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Researcher Dialog Modal */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Faculty Record' : 'Appoint Faculty Member'}
        description="Enter academic biographical credentials and lab assignment."
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Legal Name *</label>
              <Input
                required
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                placeholder="Prof. Dr. Jane Doe"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Title / Designation *</label>
              <Input
                required
                value={formState.title}
                onChange={e => setFormState({ ...formState, title: e.target.value })}
                placeholder="Lead Investigator, AI Foundations"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Position Category</label>
              <Select
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value as any })}
              >
                <option value="faculty">Faculty / PI</option>
                <option value="postdoc">Postdoc Fellow</option>
                <option value="student">Graduate Fellow</option>
                <option value="visiting">Visiting Scholar</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Institutional Email *</label>
              <Input
                type="email"
                required
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                placeholder="j.doe@airc.research.edu"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Office / Lab Suite</label>
              <Input
                value={formState.office}
                onChange={e => setFormState({ ...formState, office: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Academic Department</label>
            <Input
              value={formState.department}
              onChange={e => setFormState({ ...formState, department: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Expertise (comma-separated)</label>
            <Input
              value={formState.expertise}
              onChange={e => setFormState({ ...formState, expertise: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Biography</label>
            <Textarea
              rows={4}
              value={formState.bio}
              onChange={e => setFormState({ ...formState, bio: e.target.value })}
              placeholder="Enter comprehensive faculty bio..."
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {isEditing ? 'Save Changes' : 'Appoint Faculty'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
