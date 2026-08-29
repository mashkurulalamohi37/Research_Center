import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Brain, Users, FolderGit2, BookOpen, Newspaper, Calendar, Sparkles, X, ArrowRight } from 'lucide-react';
import { mockResearchAreas } from '../../data/researchAreas';
import { mockResearchers } from '../../data/researchers';
import { mockProjects } from '../../data/projects';
import { mockPublications } from '../../data/publications';
import { mockNews } from '../../data/news';
import { mockEvents } from '../../data/events';
import { mockOpportunities } from '../../data/opportunities';
import { Badge } from '../ui/Badge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedAreas = mockResearchAreas.filter(
    a => a.title.toLowerCase().includes(q) || a.shortDescription.toLowerCase().includes(q)
  );
  const matchedResearchers = mockResearchers.filter(
    r => r.name.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.expertise.some(e => e.toLowerCase().includes(q))
  );
  const matchedProjects = mockProjects.filter(
    p => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
  );
  const matchedPublications = mockPublications.filter(
    pub => pub.title.toLowerCase().includes(q) || pub.authors.some(a => a.toLowerCase().includes(q))
  );
  const matchedNews = mockNews.filter(
    n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)
  );
  const matchedEvents = mockEvents.filter(
    e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  );
  const matchedOpportunities = mockOpportunities.filter(
    o => o.title.toLowerCase().includes(q) || o.overview.toLowerCase().includes(q)
  );

  const hasResults =
    q &&
    (matchedAreas.length > 0 ||
      matchedResearchers.length > 0 ||
      matchedProjects.length > 0 ||
      matchedPublications.length > 0 ||
      matchedNews.length > 0 ||
      matchedEvents.length > 0 ||
      matchedOpportunities.length > 0);

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-navy-950/80 backdrop-blur-md transition-opacity" />

      {/* Search Dialog */}
      <div className="relative w-full max-w-3xl z-10 rounded-2xl border border-slate-700 bg-slate-900/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search researchers, publications, projects, labs, news..."
            className="w-full h-14 bg-transparent text-slate-100 placeholder:text-slate-500 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-md font-mono border border-slate-700">ESC</span>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {!q && (
            <div className="py-8 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-cyan-400/60 mx-auto mb-3 animate-pulse-slow" />
              <p className="text-sm font-medium text-slate-300">Search the complete AIRC Institute Knowledge Graph</p>
              <p className="text-xs text-slate-500 mt-1">Try "Neuro-Symbolic", "Sarah Lin", "Surgical Vision", "Quantum", "Fellowship"</p>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm font-medium text-slate-300">No matching records found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try broader terms or verify spelling</p>
            </div>
          )}

          {/* Research Areas */}
          {matchedAreas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <Brain className="w-4 h-4" /> Research Disciplines ({matchedAreas.length})
              </div>
              <div className="space-y-1">
                {matchedAreas.slice(0, 3).map(area => (
                  <button
                    key={area.id}
                    onClick={() => handleSelect(`/research/${area.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{area.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{area.shortDescription}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Researchers */}
          {matchedResearchers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" /> Faculty & Investigators ({matchedResearchers.length})
              </div>
              <div className="space-y-1">
                {matchedResearchers.slice(0, 3).map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(`/researchers/${r.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-cyan-500/30" />
                      <div>
                        <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.title}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{r.category}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {matchedPublications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" /> Publications ({matchedPublications.length})
              </div>
              <div className="space-y-1">
                {matchedPublications.slice(0, 3).map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/publications/${p.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div className="flex-1 pr-4">
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">{p.title}</div>
                      <div className="text-xs text-slate-400">{p.authors.join(', ')} • {p.venue} ({p.year})</div>
                    </div>
                    <Badge variant="cyan">{p.type}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {matchedProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <FolderGit2 className="w-4 h-4" /> Research Projects ({matchedProjects.length})
              </div>
              <div className="space-y-1">
                {matchedProjects.slice(0, 3).map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelect(`/projects/${proj.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{proj.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{proj.shortDescription}</div>
                    </div>
                    <Badge variant={proj.status === 'Ongoing' ? 'success' : 'secondary'}>{proj.status}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News & Events */}
          {(matchedNews.length > 0 || matchedEvents.length > 0) && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                <Newspaper className="w-4 h-4" /> News & Events
              </div>
              <div className="space-y-1">
                {matchedNews.slice(0, 2).map(n => (
                  <button
                    key={n.id}
                    onClick={() => handleSelect(`/news/${n.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">{n.title}</div>
                      <div className="text-xs text-slate-400">{n.publishDate} • {n.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
                {matchedEvents.slice(0, 2).map(e => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect(`/events/${e.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">{e.title}</div>
                      <div className="text-xs text-slate-400">{e.date} • {e.location}</div>
                    </div>
                    <Badge variant="purple">{e.type}</Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Navigate with click</span>
            <span>•</span>
            <span>Real-time graph indexing</span>
          </div>
          <span className="text-cyan-400 font-medium">AIRC Quantum Index v1.0</span>
        </div>
      </div>
    </div>
  );
};
