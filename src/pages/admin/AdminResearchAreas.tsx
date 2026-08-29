import React, { useState } from 'react';
import { Brain, Plus, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { ResearchArea } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const AdminResearchAreas: React.FC = () => {
  const [areas] = useState<ResearchArea[]>(mockResearchAreas);
  const { success } = useToast();

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Research Disciplines Oversight
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage academic discipline charters, laboratory directors, and compute budget envelopes.
          </p>
        </div>
        <Button variant="cyan" size="sm" onClick={() => success('Add Discipline', 'Discipline charter builder initiated.')}>
          <Plus className="w-3.5 h-3.5 mr-1" /> New Discipline
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map(area => (
          <Card key={area.id} className="p-6 border-slate-800 bg-slate-900/60 flex flex-col justify-between shadow-xl space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="cyan">{area.publicationCount} Publications</Badge>
                <span className="text-xs font-mono text-slate-400">{area.projectCount} Grants</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{area.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{area.shortDescription}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400">Lead: {area.leadResearcherId}</span>
              <Button variant="outline" size="sm" onClick={() => success('Discipline Settings', `Editing ${area.title}`)}>
                Edit Charter
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
