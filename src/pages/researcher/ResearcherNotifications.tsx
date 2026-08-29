import React from 'react';
import { Bell, CheckCircle2, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const ResearcherNotifications: React.FC = () => {
  const { success } = useToast();

  const notifications = [
    {
      id: 'notif-1',
      title: 'Peer Review Decision: CVPR 2025 Oral Presentation',
      message: 'Paper #1248 "Sub-Millimeter 3D Intraoperative Neural Splatting" officially accepted as Oral Presentation.',
      date: '2 hours ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Grant Compliance: Annual Report Due',
      message: 'NIH R01 LaproSplat Year 2 progress report requires Director signature by September 15.',
      date: '1 day ago',
      type: 'warning',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'New Fellowship Application Allocated',
      message: 'Sophia Meng submitted graduate research application for your review.',
      date: '3 days ago',
      type: 'info',
      read: true,
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            System alerts, paper reviews, grant reminders, and collaboration intakes.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => success('All Marked Read', 'Notifications cleared.')}>
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <Card key={n.id} className={`p-5 border-slate-800 bg-slate-900/60 flex items-start gap-4 shadow-xl ${!n.read ? 'border-cyan-500/30 bg-cyan-950/10' : ''}`}>
            <div className={`p-2 rounded-xl mt-0.5 ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-100">{n.title}</h4>
                <span className="text-[10px] font-mono text-slate-500">{n.date}</span>
              </div>
              <p className="text-xs text-slate-300">{n.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
