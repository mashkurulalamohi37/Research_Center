import React, { useState } from 'react';
import { 
  UserCheck, Search, Filter, CheckCircle2, 
  XCircle, Clock, FileText, Send, Sparkles, MessageSquare 
} from 'lucide-react';
import { mockApplications } from '../../data/applications';
import { Application, ApplicationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Textarea, Select, Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Submitted');
  const [reviewerNotes, setReviewerNotes] = useState('');

  const { success } = useToast();

  const handleOpenDossier = (app: Application) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setReviewerNotes(app.notes || '');
    setModalOpen(true);
  };

  const handleSaveStatus = () => {
    if (!selectedApp) return;

    setApplications(prev =>
      prev.map(a =>
        a.id === selectedApp.id
          ? { ...a, status: newStatus, notes: reviewerNotes }
          : a
      )
    );
    success('Candidate Status Updated', `${selectedApp.applicantName} status moved to "${newStatus}".`);
    setModalOpen(false);
  };

  const statuses: ApplicationStatus[] = ['Submitted', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'];

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Candidate Applications & Fellowship Admissions
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Evaluate prospective postdoctoral fellows, doctoral scholars, and graduate research assistants.
          </p>
        </div>
      </div>

      {/* Applications Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map(app => (
          <Card key={app.id} className="p-6 border-slate-800 bg-slate-900/60 flex flex-col justify-between shadow-xl space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    app.status === 'Accepted'
                      ? 'success'
                      : app.status === 'Interview'
                      ? 'purple'
                      : app.status === 'Shortlisted'
                      ? 'cyan'
                      : app.status === 'Rejected'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {app.status}
                </Badge>
                <span className="text-[11px] font-mono text-slate-500">{app.submittedDate}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{app.applicantName}</h3>
              <p className="text-xs text-cyan-400 font-mono">{app.degreeLevel} • {app.currentInstitution}</p>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-[10px] text-slate-500 block font-mono">Position</span>
                <strong className="text-slate-200">{app.opportunityTitle}</strong>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                "{app.statementOfPurpose}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">Ref: {app.id}</span>
              <Button variant="cyan" size="sm" onClick={() => handleOpenDossier(app)}>
                Review Dossier
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Candidate Review Dossier Modal */}
      {selectedApp && (
        <Dialog
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Candidate Dossier: ${selectedApp.applicantName}`}
          description={`Application for ${selectedApp.opportunityTitle}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Candidate Identity */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Email</span>
                <strong className="text-slate-200">{selectedApp.applicantEmail}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Current Institution</span>
                <strong className="text-slate-200">{selectedApp.currentInstitution}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Degree / GPA</span>
                <strong className="text-cyan-400">{selectedApp.degreeLevel} ({selectedApp.gpa || 'N/A'})</strong>
              </div>
            </div>

            {/* Statement of Purpose */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Statement of Purpose & Alignment
              </h4>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed max-h-48 overflow-y-auto">
                {selectedApp.statementOfPurpose}
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Admissions Status</label>
                <Select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as ApplicationStatus)}
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Review Committee Notes</label>
                <Input
                  value={reviewerNotes}
                  onChange={e => setReviewerNotes(e.target.value)}
                  placeholder="e.g. Schedule colloquium on Sept 5"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button variant="cyan" size="sm" onClick={handleSaveStatus}>
                Update Candidate Status
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
