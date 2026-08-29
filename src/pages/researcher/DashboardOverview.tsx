import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, FolderGit2, Users, Award, TrendingUp, 
  Plus, CheckCircle2, Clock, ArrowRight, ExternalLink, Sparkles 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell 
} from 'recharts';
import { mockPublications } from '../../data/publications';
import { mockProjects } from '../../data/projects';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

const pubTrendsData = [
  { year: '2021', papers: 3, citations: 280 },
  { year: '2022', papers: 5, citations: 640 },
  { year: '2023', papers: 7, citations: 1420 },
  { year: '2024', papers: 9, citations: 2980 },
  { year: '2025', papers: 12, citations: 4850 },
  { year: '2026', papers: 4, citations: 1240 },
];

const projectStatusData = [
  { name: 'Ongoing', value: 4, color: '#00e5ff' },
  { name: 'Completed', value: 3, color: '#10b981' },
  { name: 'Under Review', value: 2, color: '#f59e0b' },
];

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Researcher Lab Console
            </h1>
            <Badge variant="cyan">Dr. Marcus Vance</Badge>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Visual Intelligence Laboratory • Department of Electrical & Computer Engineering
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/publications">
            <Button variant="cyan" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Publication
            </Button>
          </Link>
          <Link to="/dashboard/projects">
            <Button variant="secondary" size="sm">
              <Plus className="w-3.5 h-3.5 mr-1" /> New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Authored Papers</span>
            <div className="text-3xl font-black text-slate-100 font-mono mt-1">38</div>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +3 this cycle
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Total Citations</span>
            <div className="text-3xl font-black text-slate-100 font-mono mt-1">9,800</div>
            <span className="text-[11px] text-cyan-400 font-mono block mt-1">h-index: 39</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Award className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Active Grants</span>
            <div className="text-3xl font-black text-slate-100 font-mono mt-1">7</div>
            <span className="text-[11px] text-emerald-400 font-mono block mt-1">$3.2M Active NIH Funding</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-mono block">Advisees & Fellows</span>
            <div className="text-3xl font-black text-slate-100 font-mono mt-1">6</div>
            <span className="text-[11px] text-slate-400 font-mono block mt-1">4 Ph.D. • 2 Postdocs</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Publication & Citation Growth Chart */}
        <Card className="lg:col-span-8 p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Annual Citations & Publication Velocity</h3>
              <p className="text-xs text-slate-400">Peer-reviewed output indexed in Google Scholar & Scopus</p>
            </div>
            <Badge variant="cyan">2021 – 2026</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pubTrendsData}>
                <defs>
                  <linearGradient id="citationGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a1428',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="citations" stroke="#00e5ff" strokeWidth={2} fillOpacity={1} fill="url(#citationGlow)" name="Citations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Project Portfolio Distribution */}
        <Card className="lg:col-span-4 p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Project Grants Breakdown</h3>
            <p className="text-xs text-slate-400">Distribution across grant status</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={projectStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4}>
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a1428',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {projectStatusData.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <strong className="text-slate-100">{item.value} Projects</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity Feed & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Notifications / Activity Feed */}
        <Card className="lg:col-span-6 p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">Laboratory Activity Stream</h3>
            <Link to="/dashboard/notifications" className="text-xs text-cyan-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Publication Approved</p>
                <p className="text-slate-400 mt-0.5">"Sub-Millimeter 3D Neural Splatting" approved for CVPR 2025 Oral Presentation.</p>
                <span className="text-[10px] text-slate-500 font-mono">Yesterday at 4:30 PM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-3">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Grant Milestone Submitted</p>
                <p className="text-slate-400 mt-0.5">NIH R01 LaproSplat Year 2 progress report submitted to Director's Office.</p>
                <span className="text-[10px] text-slate-500 font-mono">2 days ago</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">New Collaboration Intake</p>
                <p className="text-slate-400 mt-0.5">Siemens Healthineers proposed technology transfer evaluation.</p>
                <span className="text-[10px] text-slate-500 font-mono">Aug 24, 2026</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Supervised Projects */}
        <Card className="lg:col-span-6 p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100">My Active Funded Projects</h3>
            <Link to="/dashboard/projects" className="text-xs text-cyan-400 hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3">
            {mockProjects.slice(0, 2).map(proj => (
              <div key={proj.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'}>{proj.status}</Badge>
                    <span className="text-[11px] font-mono text-cyan-400">{proj.fundingAmount}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 mt-1 truncate">{proj.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{proj.fundingBody}</p>
                </div>
                <Link to={`/projects/${proj.slug}`}>
                  <Button variant="outline" size="sm">Details</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
