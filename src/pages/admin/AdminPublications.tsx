import React, { useState } from 'react';
import { 
  BookOpen, Check, X, Edit3, Trash2, 
  Search, Filter, ExternalLink, Sparkles, AlertCircle 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { Publication, PublicationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const AdminPublications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { success, info } = useToast();

  const filteredPubs = publications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: PublicationStatus) => {
    setPublications(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
    success(`Publication Marked as ${newStatus}`, 'Director review decision recorded in audit ledger.');
  };

  const handleDelete = (id: string) => {
    setPublications(prev => prev.filter(p => p.id !== id));
    info('Publication Record Purged', 'Item removed from institutional index.');
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Publications Review & Indexing Board
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Approve submitted manuscripts, verify DOI allocations, and publish papers to the public portal.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or venue..."
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Published">Published (Approved)</option>
          <option value="Draft">Draft</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Publications Review Table */}
      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Publication Title & Venue</th>
                <th className="p-4">Authors</th>
                <th className="p-4">Type / Year</th>
                <th className="p-4">Review Status</th>
                <th className="p-4 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPubs.map(pub => (
                <tr key={pub.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-sm">
                    <div className="font-bold text-slate-200 line-clamp-2 leading-snug">{pub.title}</div>
                    <div className="text-cyan-400 text-[11px] font-mono mt-0.5">{pub.venue}</div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">
                    {pub.authors.join(', ')}
                  </td>
                  <td className="p-4 font-mono">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-slate-400 ml-2">{pub.year}</span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        pub.status === 'Published'
                          ? 'success'
                          : pub.status === 'Pending Review'
                          ? 'warning'
                          : pub.status === 'Rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {pub.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {pub.status === 'Pending Review' && (
                      <>
                        <Button
                          variant="cyan"
                          size="sm"
                          onClick={() => handleUpdateStatus(pub.id, 'Published')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(pub.id, 'Rejected')}
                          className="text-red-400 border-red-500/30 hover:bg-red-500/10"
                        >
                          <X className="w-3.5 h-3.5 mr-1" /> Reject
                        </Button>
                      </>
                    )}
                    {pub.status === 'Published' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(pub.id, 'Draft')}
                      >
                        Unpublish
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(pub.id)}
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
