import React from 'react';
import { FileText, Shield, User, Clock, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const AdminAuditLogs: React.FC = () => {
  const logs = [
    {
      id: 'log-1',
      user: 'Prof. Dr. Sarah Lin (Director)',
      action: 'APPROVED_PUBLICATION',
      entity: 'NeuroLogic-v2 NeurIPS 2025 Paper',
      timestamp: '2026-08-28 16:42:10 UTC',
      ip: '192.168.10.42 (Internal Campus)',
    },
    {
      id: 'log-2',
      user: 'Dr. Marcus Vance (Faculty Lead)',
      action: 'UPDATE_PROJECT_MILESTONE',
      entity: 'LaproSplat Surgical Clinical Trial Year 2',
      timestamp: '2026-08-27 11:20:04 UTC',
      ip: '192.168.12.18',
    },
    {
      id: 'log-3',
      user: 'System Automated Ingestion',
      action: 'NEW_ADMISSIONS_APPLICATION',
      entity: 'Candidate: Sophia Meng (Ph.D. Surgical Vision)',
      timestamp: '2026-08-25 09:15:33 UTC',
      ip: 'Cloudflare Edge Proxy',
    },
    {
      id: 'log-4',
      user: 'Office of Sponsored Research',
      action: 'ASSIGN_COLLABORATION_PI',
      entity: 'Partner: Siemens Healthineers -> Dr. Marcus Vance',
      timestamp: '2026-08-22 14:02:19 UTC',
      ip: '192.168.10.12',
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          System Audit & Security Logs
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Immutable cryptographic ledger of administrative approvals, faculty appointments, and data modifications.
        </p>
      </div>

      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Operator</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-bold text-slate-100">{log.user}</td>
                  <td className="p-4"><Badge variant="purple">{log.action}</Badge></td>
                  <td className="p-4 text-cyan-400 max-w-xs truncate">{log.entity}</td>
                  <td className="p-4 text-slate-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
