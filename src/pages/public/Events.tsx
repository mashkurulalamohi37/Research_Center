import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Video, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { mockEvents } from '../../data/events';
import { EventType } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const Events: React.FC = () => {
  useDocumentTitle('Symposiums & Events');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(e => {
    const matchesType = selectedType === 'all' || e.type === selectedType;
    return matchesType;
  });

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Events & Symposiums', count: filteredEvents.length },
    { id: 'past', label: 'Past Academic Recordings', count: 12 },
  ];

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Academic Calendar
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Symposiums, Seminars & Workshops
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Participate in international AI symposiums, distinguished keynote lectures, hands-on masterclasses, and student research hackathons hosted by IRICC.
        </p>

        {/* Filter Bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <select
            aria-label="Filter by event type"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="w-full h-11 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
          >
            <option value="all">All Event Types</option>
            <option value="Symposium">Symposiums</option>
            <option value="Workshop">Workshops</option>
            <option value="Seminar">Distinguished Seminars</option>
            <option value="Hackathon">Hackathons</option>
          </select>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={tab => setActiveTab(tab as any)} className="mb-8" />

        {activeTab === 'upcoming' ? (
          <div className="space-y-6">
            {filteredEvents.map(event => (
              <Card
                key={event.id}
                className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-slate-900/90 transition-all duration-300 p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    {/* Date Badge */}
                    <div className="p-4 rounded-2xl bg-sky-50 dark:bg-cyan-500/10 border border-sky-200 dark:border-cyan-500/30 text-center shrink-0 w-20">
                      <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono uppercase">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {new Date(event.date).getFullYear()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="purple">{event.type}</Badge>
                        {event.isVirtual && (
                          <Badge variant="default">
                            <Video className="w-3 h-3 mr-1" /> Virtual Stream
                          </Badge>
                        )}
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{event.time}</span>
                      </div>

                      <Link to={`/events/${event.slug}`}>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors leading-snug">
                          {event.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Users className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          Speaker: <strong>{event.speaker.name}</strong> ({event.speaker.affiliation})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-3">
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {event.registeredCount} / {event.capacity} Registered
                    </span>
                    <Link to={`/events/${event.slug}`} className="w-full md:w-auto">
                      <Button variant="cyan" size="sm" className="w-full">
                        View & Register <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
            <p className="text-base font-semibold text-slate-800 dark:text-slate-200">IRICC Video Lecture Archive</p>
            <p className="text-xs text-slate-500">Over 40+ keynote recordings from past NeurIPS, CVPR, and ICRA preparatory workshops.</p>
          </div>
        )}
      </section>
    </div>
  );
};