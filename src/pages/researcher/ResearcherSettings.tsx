import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Save } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const ResearcherSettings: React.FC = () => {
  const { success } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Account and notification preferences updated.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Account & Portal Preferences
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Manage institutional single sign-on, API access tokens, and notification subscriptions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" /> AIRC API Access Token
          </h3>
          <p className="text-xs text-slate-400">
            Use this token to programmatically submit papers, upload dataset artifacts, and query the knowledge graph.
          </p>
          <div className="flex gap-2">
            <Input readOnly value="airc_sec_token_991823908129482914801" className="font-mono text-xs" />
            <Button variant="secondary" size="sm" type="button" onClick={() => success('Copied Token', 'API access token copied to clipboard.')}>
              Copy
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" /> Dispatch Preferences
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-cyan-500" />
              <span>Email me immediately when a paper review decision is published</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-cyan-500" />
              <span>Notify me when a new candidate applies for my open fellowship track</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900 text-cyan-500" />
              <span>Send monthly institutional citation and h-index digest</span>
            </label>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="cyan" size="md" type="submit">
            <Save className="w-4 h-4 mr-1.5" /> Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
