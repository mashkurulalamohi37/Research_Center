import React, { useState } from 'react';
import { Handshake, UserCheck, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { mockCollaborations } from '../../data/applications';
import { mockResearchers } from '../../data/researchers';
import { Collaboration, CollaborationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminCollaborations: React.FC = () => {
  const [collaborations, setCollaborations] = useState<Collaboration[]>(mockCollaborations);
  const [selectedCollab, setSelectedCollab] = useState<Collaboration | null>(null);
  const [assigneeId, setAssigneeId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { success } = useToast();

  const handleOpenAssign = (collab: Collaboration) => {
    setSelectedCollab(collab);
    setAssigneeId(collab.assignedResearcherId || mockResearchers[0].id);
    setModalOpen(true);
  };

  const handleSaveAssign = () => {
    if (!selectedCollab) return;
    setCollaborations(prev =>
      prev.map(c =>
        c.id === selectedCollab.id
          ? { ...c, assignedResearcherId: assigneeId, status: 'In Discussion' }
          : c
      )
    );
    const researcher = mockResearchers.find(r => r.id === assigneeId);
    success('Investigator Assigned', `${researcher?.name} designated as primary liaison for ${selectedCollab.organization}.`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
          Strategic Industrial & Academic Collaborations
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-0.5">
          Process inbound institutional partnership proposals and assign faculty lead investigators.
        </p>
      </div>

      <div className="space-y-4">
        {collaborations.map(c => {
          const assigned = mockResearchers.find(r => r.id === c.assignedResearcherId);
          return (
            <Card key={c.id} className="p-6 border-slate-800 bg-slate-900/60 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={c.status === 'Approved' ? 'success' : 'cyan'}>{c.status}</Badge>
                    <Badge variant="outline">{c.collaborationType}</Badge>
                    <span className="text-xs font-mono text-slate-500">{c.submittedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-1">{c.organization}</h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono block">Point of Contact</span>
                  <span className="text-xs font-bold text-slate-200">{c.contactPerson} ({c.email})</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {c.proposalSummary}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs font-mono">
                <span className="text-slate-400">
                  Lead Liaison: <strong className="text-cyan-400">{assigned ? assigned.name : 'Unassigned'}</strong>
                </span>
                <Button variant="cyan" size="sm" onClick={() => handleOpenAssign(c)}>
                  Assign Faculty Lead
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Assignment Modal */}
      {selectedCollab && (
        <Dialog
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Assign Lead for ${selectedCollab.organization}`}
          description="Designate a Principal Investigator to evaluate and negotiate this research partnership."
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Designate Principal Investigator</label>
              <Select value={assigneeId} onChange={e => setAssigneeId(e.target.value)}>
                {mockResearchers.map(r => (
                  <option key={r.id} value={r.id}>{r.name} — {r.title}</option>
                ))}
              </Select>
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="cyan" size="sm" onClick={handleSaveAssign}>Save Assignment</Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
