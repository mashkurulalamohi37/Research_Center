import React, { useState } from 'react';
import { FolderGit2, Plus, Search, Edit3, Trash2, CheckCircle2, DollarSign } from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { Project, ProjectStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const { success } = useToast();

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.fundingBody.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'Ongoing' ? 'Completed' : 'Ongoing' }
          : p
      )
    );
    success('Project Status Changed', 'Updated project grant state.');
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Institutional Projects & Grants Oversight
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Oversight of NSF, NIH, DARPA, and industrial sponsored research contracts.
          </p>
        </div>

        <Button variant="cyan" size="md" onClick={() => success('Add Grant', 'Opening sponsored project agreement wizard.')}>
          <Plus className="w-4 h-4 mr-1.5" /> Initialize New Grant
        </Button>
      </div>

      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Project Title</th>
                <th className="p-4">Sponsoring Agency</th>
                <th className="p-4">Grant Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-md">
                    <div className="font-bold text-slate-200">{proj.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{proj.startDate} – {proj.endDate || 'Active'}</div>
                  </td>
                  <td className="p-4 font-mono text-cyan-400 font-medium">{proj.fundingBody}</td>
                  <td className="p-4 font-mono text-slate-200 font-bold">{proj.fundingAmount}</td>
                  <td className="p-4">
                    <button onClick={() => toggleStatus(proj.id)}>
                      <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'} className="cursor-pointer">
                        {proj.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => success('Editing Project', `Editing ${proj.title}`)}>
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
