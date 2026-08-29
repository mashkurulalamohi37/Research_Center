import React, { useState } from 'react';
import { Image, Upload, Copy, Check, Trash2, Plus } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const AdminMedia: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { success } = useToast();

  const mediaFiles = [
    {
      id: 'med-1',
      title: 'AIRC High-Bay Autonomous Robotics Facility',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      size: '2.4 MB',
      format: 'JPEG / 4K',
      date: '2026-01-10',
    },
    {
      id: 'med-2',
      title: 'NeuroLogic-v2 Mathematical Model Architecture Diagram',
      url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
      size: '1.8 MB',
      format: 'PNG / Vector',
      date: '2025-12-14',
    },
    {
      id: 'med-3',
      title: 'SurgiSplat 3D Intraoperative Micro-Navigation Render',
      url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
      size: '4.1 MB',
      format: 'JPEG / UHD',
      date: '2025-11-20',
    }
  ];

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    success('Asset Reference Copied', 'CDN URL is on your clipboard.');
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Institutional Media & Asset Library
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage high-resolution imagery, paper diagrams, laboratory photography, and press kits.
          </p>
        </div>
        <Button variant="cyan" size="sm" onClick={() => success('Upload Asset', 'Opened media asset uploader.')}>
          <Upload className="w-3.5 h-3.5 mr-1" /> Upload Assets
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaFiles.map(file => (
          <Card key={file.id} className="overflow-hidden border-slate-800 bg-slate-900/60 shadow-xl group">
            <div className="relative h-44 overflow-hidden bg-slate-950">
              <img
                src={file.url}
                alt={file.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="cyan">{file.format}</Badge>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{file.title}</h4>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyUrl(file.id, file.url)}
                className="text-xs gap-1"
              >
                {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === file.id ? 'Copied' : 'Copy CDN Link'}
              </Button>
              <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
