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
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const citationImpactData = [
  { year: '2021', citations: 4200, hIndex: 28 },
  { year: '2022', citations: 8900, hIndex: 32 },
  { year: '2023', citations: 16500, hIndex: 36 },
  { year: '2024', citations: 29400, hIndex: 41 },
  { year: '2025', citations: 48000, hIndex: 48 },
];

export const AdminAnalytics: React.FC = () => {
  useDocumentTitle('Research Analytics & Impact — Admin');
  const { success } = useToast();

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Institutional Research Analytics & Impact Metrics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Cross-discipline citation velocity, international collaborations, and grant throughput.
          </p>
        </div>

        <Button variant="cyan" size="sm" onClick={() => success('Report Exported', 'Annual IRICC Research Impact Report (PDF) prepared.')}>
          <Download className="w-3.5 h-3.5 mr-1" /> Export Annual Report
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Global Citations</span>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono mt-1">48,000+</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-1 block font-medium">+63% YoY Growth</span>
        </Card>
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Institute h-index Average</span>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">48</div>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-1 block font-medium">Top 1% Worldwide</span>
        </Card>
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Active Grant Portfolio</span>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">$18.25M</div>
          <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-1 block font-medium">85% Federal & Consortium</span>
        </Card>
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Commercialized Patents</span>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">14</div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-1 block font-medium">4 in Clinical Trials</span>
        </Card>
      </div>

      {/* Citation Growth Chart */}
      <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Longitudinal Citation Trajectory (2021 – 2025)</h3>
          <Badge variant="cyan">Indexed Citations</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={citationImpactData}>
              <defs>
                <linearGradient id="analyticsCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area type="monotone" dataKey="citations" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#analyticsCyan)" name="Citations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};