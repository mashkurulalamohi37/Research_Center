import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, FolderGit2, BookOpen, Briefcase, 
  UserCheck, Handshake, TrendingUp, AlertCircle, 
  CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { mockResearchers } from '../../data/researchers';
import { mockPublications } from '../../data/publications';
import { mockProjects } from '../../data/projects';
import { mockApplications, mockCollaborations } from '../../data/applications';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const publicationsYearData = [
  { year: '2022', journal: 12, conference: 24 },
  { year: '2023', journal: 18, conference: 32 },
  { year: '2024', journal: 26, conference: 42 },
  { year: '2025', journal: 35, conference: 58 },
  { year: '2026', journal: 14, conference: 22 },
];

const grantFundingData = [
  { domain: 'AI Foundations', amount: 4.8 },
  { domain: 'Computer Vision', amount: 3.2 },
  { domain: 'Healthcare AI', amount: 3.5 },
  { domain: 'Robotics', amount: 2.75 },
  { domain: 'Cybersecurity', amount: 2.1 },
  { domain: 'Edge AI', amount: 1.9 },
];

export const AdminDashboard: React.FC = () => {
  useDocumentTitle('Directorate Executive Suite — Admin');
  const pendingPubs = mockPublications.filter(p => p.status === 'Pending Review');
  const pendingApps = mockApplications.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const pendingCollabs = mockCollaborations.filter(c => c.status === 'Submitted' || c.status === 'In Discussion');

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              IRICC Directorate Executive Suite
            </h1>
            <Badge variant="purple">Superadmin</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Institutional overview, faculty appointments, grant distribution, and publication review queues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/publications">
            <Button variant="cyan" size="sm">
              Review Queue ({pendingPubs.length})
            </Button>
          </Link>
          <Link to="/admin/applications">
            <Button variant="secondary" size="sm">
              Applications ({pendingApps.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Total Faculty</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">{mockResearchers.length}</div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-0.5 block font-medium">8 Principal Labs</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Total Projects</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">{mockProjects.length}</div>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-0.5 block font-medium">$18.25M Total Grants</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Publications</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">154</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block font-medium">100% Open Access</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Active Fellowships</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">4</div>
          <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-0.5 block font-medium">Recruitment Active</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Pending Reviews</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1">{pendingPubs.length + pendingApps.length}</div>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono mt-0.5 block font-medium">Requires Action</span>
        </Card>

        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">Partnerships</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">{mockCollaborations.length}</div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block font-medium">Active Pipeline</span>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Publications Output by Year */}
        <Card className="lg:col-span-7 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Institutional Publication Trajectory</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Annual growth in Tier-1 Conferences & Journals</p>
            </div>
            <Badge variant="purple">Recharts Engine</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={publicationsYearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0f172a'
                  }}
                />
                <Bar dataKey="conference" fill="#0284c7" radius={[4, 4, 0, 0]} name="Conferences" />
                <Bar dataKey="journal" fill="#a855f7" radius={[4, 4, 0, 0]} name="Journals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Grant Distribution by Research Domain */}
        <Card className="lg:col-span-5 p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Grant Commitments ($ Millions)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total sponsored funding per discipline</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={grantFundingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} unit="M" />
                <YAxis dataKey="domain" type="category" stroke="#94a3b8" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0f172a'
                  }}
                />
                <Bar dataKey="amount" fill="#0ea5e9" radius={[0, 4, 4, 0]} name="Funding ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Action Items / Pending Approval Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Publications Queue */}
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Publications Awaiting Review</h3>
              <Badge variant="warning">{pendingPubs.length} Pending</Badge>
            </div>
            <Link to="/admin/publications" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
              Manage Review Board
            </Link>
          </div>

          <div className="space-y-3">
            {pendingPubs.map(pub => (
              <div key={pub.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold">Pending Approval</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">{pub.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Authors: {pub.authors.join(', ')}</p>
                </div>
                <Link to="/admin/publications">
                  <Button variant="cyan" size="sm">Review</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Candidate Applications Queue */}
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recent Candidate Applications</h3>
              <Badge variant="cyan">{mockApplications.length} Candidates</Badge>
            </div>
            <Link to="/admin/applications" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
              View Kanban
            </Link>
          </div>

          <div className="space-y-3">
            {mockApplications.slice(0, 3).map(app => (
              <div key={app.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{app.applicantName}</span>
                    <Badge variant={app.status === 'Accepted' ? 'success' : app.status === 'Interview' ? 'purple' : 'cyan'}>
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{app.opportunityTitle}</p>
                </div>
                <Link to="/admin/applications">
                  <Button variant="outline" size="sm">Dossier</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};