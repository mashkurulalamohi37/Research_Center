import React, { useState } from 'react';
import { Newspaper, Plus, Edit3, Trash2, CheckCircle2, Search } from 'lucide-react';
import { mockNews } from '../../data/news';
import { NewsArticle, NewsCategory } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

export const AdminNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(mockNews);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<NewsArticle | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    category: 'Research' as NewsCategory,
    excerpt: '',
    content: '',
    author: 'AIRC Newsroom',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  });

  const { success } = useToast();

  const handleOpenAdd = () => {
    setIsEditing(null);
    setFormState({
      title: '',
      category: 'Research',
      excerpt: '',
      content: '',
      author: 'AIRC Newsroom',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    });
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setArticles(prev =>
        prev.map(a => (a.id === isEditing.id ? { ...a, ...formState } : a))
      );
      success('Article Published', 'News article updated on the public pressroom.');
    } else {
      const newArticle: NewsArticle = {
        id: `news-${Date.now()}`,
        slug: formState.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        ...formState,
        publishDate: new Date().toISOString().split('T')[0],
        featured: false,
        status: 'Published',
        tags: ['AIRC', formState.category],
      };
      setArticles(prev => [newArticle, ...prev]);
      success('Article Dispatched', 'New press release is now live.');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            News & Press Releases CMS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Publish research breakthroughs, awards, symposium announcements, and press dispatches.
          </p>
        </div>
        <Button variant="cyan" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" /> Compose Press Release
        </Button>
      </div>

      <Card className="border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Article Headline</th>
                <th className="p-4">Category</th>
                <th className="p-4">Publish Date</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {articles.map(n => (
                <tr key={n.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 max-w-md font-bold text-slate-200">{n.title}</td>
                  <td className="p-4"><Badge variant="cyan">{n.category}</Badge></td>
                  <td className="p-4 font-mono text-slate-400">{n.publishDate}</td>
                  <td className="p-4 text-slate-300">{n.author}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => { setIsEditing(n); setFormState(n as any); setModalOpen(true); }}>
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setArticles(prev => prev.filter(x => x.id !== n.id))} className="text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Editor Modal */}
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Article' : 'Compose News Article'}
        description="Publish article to the public AIRC newsroom."
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Headline *</label>
            <Input
              required
              value={formState.title}
              onChange={e => setFormState({ ...formState, title: e.target.value })}
              placeholder="e.g. AIRC Researchers Win Best Paper at CVPR 2025"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <Select
                value={formState.category}
                onChange={e => setFormState({ ...formState, category: e.target.value as NewsCategory })}
              >
                <option value="Research">Research</option>
                <option value="Award">Award</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Announcement">Announcement</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Author / Byline</label>
              <Input
                value={formState.author}
                onChange={e => setFormState({ ...formState, author: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Lead Excerpt</label>
            <Input
              value={formState.excerpt}
              onChange={e => setFormState({ ...formState, excerpt: e.target.value })}
              placeholder="Short 1-sentence synopsis for card preview..."
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Article Body (Markdown)</label>
            <Textarea
              rows={6}
              value={formState.content}
              onChange={e => setFormState({ ...formState, content: e.target.value })}
              placeholder="Write the full press dispatch here..."
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" size="sm" type="submit">
              {isEditing ? 'Save Changes' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
