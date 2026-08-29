import React from 'react';
import { FileText, Cpu, Database, HardDrive, Upload, Plus } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const LabResources: React.FC = () => {
  const { success } = useToast();

  const clusterNodes = [
    { name: 'GPU Cluster Node A (4x NVIDIA H100 80GB)', status: 'Active (82% Load)', job: 'LaproSplat-Deform-V4' },
    { name: 'GPU Cluster Node B (8x NVIDIA A100 80GB)', status: 'Queued (1 Job)', job: 'SurgiSplat-Pretraining' },
    { name: 'High-Throughput Storage Volume (250 TB NVMe)', status: 'Healthy (142 TB Free)', job: 'Shared Dataset Vault' },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Lab Infrastructure & Compute Allocation
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Supercomputing cluster nodes, training dataset repositories, and lab documentation.
          </p>
        </div>
        <Button variant="cyan" size="sm" onClick={() => success('Job Scheduler', 'Launched AIRC SLURM GPU job submission wizard.')}>
          <Plus className="w-3.5 h-3.5 mr-1" /> Allocate Compute
        </Button>
      </div>

      <div className="space-y-4">
        {clusterNodes.map((node, i) => (
          <Card key={i} className="p-6 border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{node.name}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Active Job: <strong className="text-cyan-300">{node.job}</strong></p>
              </div>
            </div>
            <Badge variant="cyan">{node.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};
