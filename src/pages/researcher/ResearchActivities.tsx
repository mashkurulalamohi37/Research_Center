import React from 'react';
import { Activity, Award, Calendar, Mic, Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

export const ResearchActivities: React.FC = () => {
  const activities = [
    {
      title: 'Plenary Keynote: Real-Time Dynamic Neural Splatting in Operating Theaters',
      venue: 'CVPR 2025 Workshop on Medical Augmented Reality, Seattle, WA',
      date: 'June 2025',
      type: 'Keynote Lecture',
    },
    {
      title: 'Senior Area Chair & Meta-Reviewer',
      venue: 'NeurIPS 2025 (Computer Vision & Neuro-Symbolic Tracks)',
      date: 'Aug – Dec 2025',
      type: 'Conference Committee',
    },
    {
      title: 'NIH Study Section Grant Reviewer',
      venue: 'Biomedical Imaging and Bioengineering (NIBIB) Study Section',
      date: 'March 2026',
      type: 'Grant Review Panel',
    },
    {
      title: 'Co-Organizer & Program Chair',
      venue: 'AIRC International Symposium on Verifiable AI Safety 2026',
      date: 'September 2026',
      type: 'Symposium Organization',
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Academic & Professional Activities
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Invited keynotes, conference area chairs, grant review panels, and international committee service.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((item, i) => (
          <Card key={i} className="p-6 border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4 shadow-xl">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">{item.type}</Badge>
                <span className="text-xs font-mono text-slate-500">{item.date}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.venue}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Mic className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
