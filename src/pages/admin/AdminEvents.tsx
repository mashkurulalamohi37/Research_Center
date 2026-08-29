import React, { useState } from 'react';
import { Calendar, Plus, Edit3, Trash2, Users, MapPin } from 'lucide-react';
import { mockEvents } from '../../data/events';
import { EventItem, EventType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(mockEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('Symposium');
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('10:00 AM – 04:00 PM EST');
  const [location, setLocation] = useState('Turing Hall Auditorium');
  const [speakerName, setSpeakerName] = useState('');
  const { success } = useToast();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: EventItem = {
      id: `event-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title,
      description: 'Institutional symposium on cutting-edge research.',
      type,
      speaker: { name: speakerName || 'Distinguished Keynote', title: 'Speaker', affiliation: 'AIRC' },
      organizer: 'AIRC Directorate',
      date,
      time,
      location,
      isVirtual: true,
      registrationOpen: true,
      capacity: 300,
      registeredCount: 0,
      featured: true,
    };
    setEvents(prev => [newEvent, ...prev]);
    success('Event Scheduled', `"${title}" has been published to the academic calendar.`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Events & Symposium Management
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Schedule international workshops, track RSVP quotas, and manage lecture livestreams.
          </p>
        </div>
        <Button variant="cyan" size="md" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Schedule Event
        </Button>
      </div>

      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Event Title</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Type</th>
                <th className="p-4">Speaker</th>
                <th className="p-4">Registrations</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map(e => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-sm font-bold text-slate-200">{e.title}</td>
                  <td className="p-4 font-mono text-slate-400">{e.date} • {e.time}</td>
                  <td className="p-4"><Badge variant="purple">{e.type}</Badge></td>
                  <td className="p-4 text-slate-300">{e.speaker.name}</td>
                  <td className="p-4 font-mono text-emerald-400">{e.registeredCount} / {e.capacity}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setEvents(prev => prev.filter(x => x.id !== e.id))} className="text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule Academic Event"
        description="Configure event date, keynote speaker, and registration parameters."
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Event Title *</label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Annual AI Safety Symposium" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Type</label>
              <Select value={type} onChange={e => setType(e.target.value as EventType)}>
                <option value="Symposium">Symposium</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Hackathon">Hackathon</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Keynote Speaker</label>
              <Input value={speakerName} onChange={e => setSpeakerName(e.target.value)} placeholder="Prof. Jane Doe" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Location / Venue</label>
              <Input value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="cyan" size="sm" type="submit">Publish Event</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
