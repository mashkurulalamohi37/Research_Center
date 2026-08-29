import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag, Sparkles } from 'lucide-react';
import { mockNews } from '../../data/news';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = mockNews.find(n => n.slug === slug || n.id === slug) || mockNews[0];
  useDocumentTitle(`${article.title} — Press & Newsroom`);
  const relatedNews = mockNews.filter(n => n.id !== article.id).slice(0, 2);

  return (
    <div className="py-10 space-y-12">
      {/* Top Back Nav */}
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <Link to="/news" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Newsroom
        </Link>
      </div>

      {/* Article Header */}
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono">
          <Badge variant="cyan">{article.category}</Badge>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {article.publishDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-cyan-400" /> Reported by {article.author} ({article.authorRole || 'Press'})
          </span>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans pt-4">
          <p className="text-lg text-slate-300 font-semibold leading-relaxed">
            {article.excerpt}
          </p>
          <div className="whitespace-pre-line text-slate-300 leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-cyan-400 mr-1" />
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 max-w-3xl pt-8 border-t border-slate-800">
          <h3 className="text-xl font-bold text-slate-100 mb-6">Related News & Dispatches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedNews.map(item => (
              <Link key={item.id} to={`/news/${item.slug}`} className="block group">
                <Card className="p-4 border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400">{item.publishDate}</span>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
