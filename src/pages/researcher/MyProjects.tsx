import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderGit2, Plus, Calendar, DollarSign, 
  Users, CheckCircle2, Clock, Edit3, ArrowRight 
} from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { Project } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const MyProjects: React.FC = () => {
  useDocumentTitle('My Research Projects — Faculty');
  const [projects] = useState<Project[]>(mockProjects);
  const { success } = useToast();

  const handleUpdateMilestone = (projectTitle: string, milestoneTitle: string) => {
    success('Milestone Updated', `Progress recorded for ${milestoneTitle} on "${projectTitle.substring(0, 30)}..."`);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            My Research Projects & Grants
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Manage multi-year funded grants, track team deliverables, and log project milestones.
          </p>
        </div>

        <Button variant="cyan" size="md" onClick={() => success('Project Wizard Initiated', 'Fill out grant proposal specifications.')}>
          <Plus className="w-4 h-4 mr-1.5" /> Propose New Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map(proj => (
          <Card key={proj.id} className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'}>{proj.status}</Badge>
                  <span className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-semibold">{proj.fundingBody}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">{proj.title}</h3>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block">Grant Commitment</span>
                <span className="text-base font-black text-cyan-700 dark:text-cyan-400 font-mono">{proj.fundingAmount}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {proj.shortDescription}
            </p>

            {/* Milestones Checklist */}
            {proj.deliverables && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Grant Deliverables & Milestones
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {proj.deliverables.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleUpdateMilestone(proj.title, item.title)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        item.completed
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <CheckCircle2 className={`w-4 h-4 ${item.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 font-mono">
                Duration: {proj.startDate} – {proj.endDate || 'Active'}
              </span>
              <Link to={`/projects/${proj.slug}`}>
                <Button variant="outline" size="sm">
                  View Public Record <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};