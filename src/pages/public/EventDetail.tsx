import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, Video, 
  ArrowLeft, CheckCircle2, Share2, Sparkles, ExternalLink 
} from 'lucide-react';
import { mockEvents } from '../../data/events';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { success } = useToast();

  const event = mockEvents.find(e => e.slug === slug || e.id === slug) || mockEvents[0];
  useDocumentTitle(`${event.title} — Events & Symposia`);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegisterOpen(false);
      success('Registration Confirmed', `Your virtual / on-campus pass for "${event.title}" has been issued to ${email}.`);
      setName('');
      setEmail('');
      setInstitution('');
    }, 600);
  };

  return (
    <div className="py-10 space-y-12">
      {/* Top Back Nav */}
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link to="/events" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Academic Calendar
        </Link>
      </div>

      {/* Main Event Header */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="purple">{event.type}</Badge>
            {event.isVirtual && <Badge variant="cyan">Virtual Stream Available</Badge>}
            <span className="text-xs text-slate-400 font-mono">Organized by {event.organizer}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-snug">
            {event.title}
          </h1>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Date</span>
                <strong className="text-slate-100">{event.date}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Time</span>
                <strong className="text-slate-100">{event.time}</strong>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-slate-500 block">Location</span>
                <strong className="text-slate-100">{event.location}</strong>
              </div>
            </div>
          </div>

          {/* Speaker Bio Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-base shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">Keynote Speaker</span>
              <h4 className="text-base font-bold text-slate-100">{event.speaker.name}</h4>
              <p className="text-xs text-slate-400">{event.speaker.title} • {event.speaker.affiliation}</p>
            </div>
          </div>

          {/* CTA Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-mono">
              Seats: <strong className="text-emerald-400">{event.registeredCount} / {event.capacity} Registered</strong>
            </span>
            <Button variant="cyan" size="lg" onClick={() => setRegisterOpen(true)}>
              Register for Event Pass
            </Button>
          </div>
        </div>
      </section>

      {/* Description & Agenda */}
      <section className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-8">
        <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">Event Overview & Learning Objectives</h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {event.description}
          </p>
        </Card>

        {event.agenda && event.agenda.length > 0 && (
          <Card className="p-8 sm:p-10 border-slate-800 bg-slate-900/60 space-y-6">
            <h3 className="text-lg font-bold text-slate-100">Official Schedule & Agenda</h3>
            <div className="space-y-4">
              {event.agenda.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
                      {item.time}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{item.activity}</span>
                  </div>
                  {item.speaker && (
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      {item.speaker}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
      </section>

      {/* Registration Modal Dialog */}
      <Dialog
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Event Registration"
        description={`Secure your attendee credentials for "${event.title}".`}
      >
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name *</label>
            <Input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Dr. Alex Morgan"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Academic / Institutional Email *</label>
            <Input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="alex.morgan@university.edu"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Institution or Organization</label>
            <Input
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              placeholder="e.g. Stanford University / Google"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setRegisterOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit" isLoading={isSubmitting}>
              Confirm Registration
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
