import React from 'react';
import { GraduationCap, Mail, UserCheck, Plus, CheckCircle2, Award } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const MyStudents: React.FC = () => {
  const { success } = useToast();

  const advisees = [
    {
      id: 'std-1',
      name: 'James K. Chen',
      role: 'Senior Ph.D. Candidate (4th Year)',
      topic: 'Mechanistic Circuit Tracing and Formal Logic Verification in Large Language Models',
      email: 'j.chen@airc.research.edu',
      status: 'Dissertation Defense Scheduled (Nov 2026)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      publicationsCount: 6,
    },
    {
      id: 'std-2',
      name: 'Sophia Meng',
      role: 'Ph.D. Student (2nd Year)',
      topic: 'Real-Time 3D Gaussian Splatting for Surgical Endoscopic Guidance',
      email: 's.meng@airc.research.edu',
      status: 'Qualifying Exam Passed',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      publicationsCount: 3,
    },
    {
      id: 'std-3',
      name: 'Dr. Maya Lin-Siddiqui',
      role: 'Senior Postdoctoral Fellow',
      topic: 'Decentralized Multi-Agent Reinforcement Learning for Drone Swarms',
      email: 'm.linsiddiqui@airc.research.edu',
      status: 'DARPA Project Lead',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
      publicationsCount: 8,
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Advisees & Research Fellows
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Doctoral candidates, postdoctoral fellows, and graduate research assistants.
          </p>
        </div>
        <Button variant="cyan" size="sm" onClick={() => success('Add Advisee', 'Opened graduate advising allocation dialog.')}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Advisee
        </Button>
      </div>

      <div className="space-y-4">
        {advisees.map(student => (
          <Card key={student.id} className="p-6 border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/30 shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100">{student.name}</h3>
                  <Badge variant="cyan">{student.role.split(' ')[0]}</Badge>
                </div>
                <p className="text-xs text-cyan-400 font-mono">{student.role}</p>
                <p className="text-xs text-slate-300">Thesis: {student.topic}</p>
                <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {student.status}
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800 text-xs font-mono">
              <span className="text-slate-400">{student.publicationsCount} Papers Authored</span>
              <a href={`mailto:${student.email}`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Mail className="w-3 h-3" /> Contact
                </Button>
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
