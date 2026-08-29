import React from 'react';
import { BarChart3, TrendingUp, Download, Award, Globe, Users } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

const citationImpactData = [
  { year: '2021', citations: 4200, hIndex: 28 },
  { year: '2022', citations: 8900, hIndex: 32 },
  { year: '2023', citations: 16500, hIndex: 36 },
  { year: '2024', citations: 29400, hIndex: 41 },
  { year: '2025', citations: 48000, hIndex: 48 },
];

export const AdminAnalytics: React.FC = () => {
  const { success } = useToast();

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Institutional Research Analytics & Impact Metrics
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Cross-discipline citation velocity, international collaborations, and NIH/NSF grant throughput.
          </p>
        </div>

        <Button variant="cyan" size="sm" onClick={() => success('Report Exported', 'Annual Institutional Research Report (PDF) prepared.')}>
          <Download className="w-3.5 h-3.5 mr-1" /> Export Annual Report
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-800 bg-slate-900/60">
          <span className="text-xs text-slate-400 font-mono">Global Citations</span>
          <div className="text-3xl font-black text-cyan-400 font-mono mt-1">48,000+</div>
          <span className="text-xs text-emerald-400 font-mono mt-1 block">+63% YoY Growth</span>
        </Card>
        <Card className="p-6 border-slate-800 bg-slate-900/60">
          <span className="text-xs text-slate-400 font-mono">Institute h-index Average</span>
          <div className="text-3xl font-black text-slate-100 font-mono mt-1">48</div>
          <span className="text-xs text-purple-400 font-mono mt-1 block">Top 1% Worldwide</span>
        </Card>
        <Card className="p-6 border-slate-800 bg-slate-900/60">
          <span className="text-xs text-slate-400 font-mono">Active Grant Portfolio</span>
          <div className="text-3xl font-black text-slate-100 font-mono mt-1">$18.25M</div>
          <span className="text-xs text-cyan-400 font-mono mt-1 block">85% Federal Funding</span>
        </Card>
        <Card className="p-6 border-slate-800 bg-slate-900/60">
          <span className="text-xs text-slate-400 font-mono">Licensed Patents</span>
          <div className="text-3xl font-black text-slate-100 font-mono mt-1">14</div>
          <span className="text-xs text-emerald-400 font-mono mt-1 block">4 in Clinical Trials</span>
        </Card>
      </div>

      {/* Citation Growth Chart */}
      <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100">Longitudinal Citation Trajectory (2021 – 2025)</h3>
          <Badge variant="cyan">Indexed Citations</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={citationImpactData}>
              <defs>
                <linearGradient id="analyticsCyan" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="citations" stroke="#00e5ff" strokeWidth={2} fillOpacity={1} fill="url(#analyticsCyan)" name="Citations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
