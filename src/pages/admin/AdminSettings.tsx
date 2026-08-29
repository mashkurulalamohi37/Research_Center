import React from 'react';
import { Settings, ShieldCheck, Database, Server, Save } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminSettings: React.FC = () => {
  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Institutional Configuration Saved', 'System parameters updated.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Institute Infrastructure & System Settings
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Global research portal parameters, DOI prefix, SSO provider, and API endpoints.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" /> Academic Portal Identification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Institute Display Name</label>
              <Input defaultValue="Advanced Intelligent Research Center (AIRC)" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Official DOI CrossRef Prefix</label>
              <Input defaultValue="10.1145/airc" font-mono />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Future FastAPI Backend Configuration
          </h3>
          <p className="text-xs text-slate-400">
            Prepared service abstraction endpoint for Phase 2 FastAPI and PostgreSQL deployment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">FastAPI Backend Endpoint</label>
              <Input defaultValue="https://api.airc.research.edu/v1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Environment Mode</label>
              <Select defaultValue="mock">
                <option value="mock">Active Frontend Mock Layer (Phase 1)</option>
                <option value="fastapi">Live FastAPI Backend (Phase 2)</option>
              </Select>
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="cyan" size="md" type="submit">
            <Save className="w-4 h-4 mr-1.5" /> Save Global Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};
