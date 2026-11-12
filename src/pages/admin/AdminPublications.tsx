import React, { useState } from 'react';
import { 
  BookOpen, Search, Check, X, Trash2, 
  Clock, CheckCircle2, AlertCircle, Sparkles 
} from 'lucide-react';
import { mockPublications } from '../../data/publications';
import { Publication, PublicationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const AdminPublications: React.FC = () => {
  useDocumentTitle('Publications Review Board — Admin');
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { success } = useToast();

  const filteredPubs = publications.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.venue.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: PublicationStatus) => {
    setPublications(prev =>
      prev.map(p => (p.id === id ? { ...p, status } : p))
    );
    success(
      status === 'Published' ? 'Publication Approved & Live' : 'Publication Status Updated',
      `Paper ${id} marked as ${status}.`
    );
  };

  const handleDelete = (id: string) => {
    setPublications(prev => prev.filter(p => p.id !== id));
    success('Publication Removed', 'Manuscript entry purged from institutional indexing.');
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Publications Review & Indexing Board
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Approve submitted manuscripts, verify DOI allocations, and publish papers to the public portal.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or venue..."
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-500 shadow-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-cyan-500 w-full sm:w-auto shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Published">Published (Approved)</option>
          <option value="Draft">Draft</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Publications Review Table */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Publication Title & Venue</th>
                <th className="p-4">Authors</th>
                <th className="p-4">Type / Year</th>
                <th className="p-4">Review Status</th>
                <th className="p-4 text-right">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredPubs.map(pub => (
                <tr key={pub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-sm">
                    <div className="font-bold text-slate-900 dark:text-slate-200 line-clamp-2 leading-snug">{pub.title}</div>
                    <div className="text-cyan-700 dark:text-cyan-400 text-[11px] font-mono mt-0.5">{pub.venue}</div>
                  </td>
                  <td className="p-4 font-mono text-slate-700 dark:text-slate-300">
                    {pub.authors.join(', ')}
                  </td>
                  <td className="p-4 font-mono">
                    <Badge variant="cyan">{pub.type}</Badge>
                    <span className="text-slate-500 dark:text-slate-400 ml-2">{pub.year}</span>
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
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                        >
                          <Check className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(pub.id, 'Rejected')}
                          className="text-red-500 border-red-300 dark:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10"
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
                      className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
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