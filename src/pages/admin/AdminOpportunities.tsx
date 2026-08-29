import React, { useState } from 'react';
import { Briefcase, Plus, Edit3, Trash2, CheckCircle2 } from 'lucide-react';
import { mockOpportunities } from '../../data/opportunities';
import { Opportunity } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const AdminOpportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const { success } = useToast();

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Careers & Research Fellowships Oversight
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Post fellowship openings, configure stipend envelopes, and manage application deadlines.
          </p>
        </div>
        <Button variant="cyan" size="sm" onClick={() => success('Add Opportunity', 'Opened position creator.')}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Post New Fellowship
        </Button>
      </div>

      <div className="space-y-4">
        {opportunities.map(opp => (
          <Card key={opp.id} className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">{opp.type}</Badge>
                <span className="text-xs font-mono text-emerald-400">Deadline: {opp.deadline}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{opp.title}</h3>
              <p className="text-xs text-slate-400">{opp.duration} • {opp.stipend || 'Competitive Stipend'}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => toggleStatus(opp.id)}>
                <Badge variant={opp.status === 'Open' ? 'success' : 'secondary'} className="cursor-pointer">
                  {opp.status}
                </Badge>
              </button>
              <Button variant="ghost" size="sm" onClick={() => setOpportunities(prev => prev.filter(x => x.id !== opp.id))} className="text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
