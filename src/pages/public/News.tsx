import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Newspaper, Calendar, ArrowRight, Sparkles, User } from 'lucide-react';
import { mockNews } from '../../data/news';
import { NewsCategory } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNews = mockNews.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = mockNews.find(n => n.featured) || mockNews[0];

  return (
    <div className="py-12 space-y-14">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Newsroom & Press
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          AIRC News & Scientific Dispatches
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Read about scientific breakthroughs, awards, major grants, and institutional announcements.
        </p>

        {/* Filter Bar */}
        <div className="mt-8 max-w-lg mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search news & press..."
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Categories</option>
            <option value="Research">Research</option>
            <option value="Award">Awards</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Announcement">Announcements</option>
          </select>
        </div>
      </section>

      {/* Featured Big Article Showcase */}
      {selectedCategory === 'all' && !searchTerm && featuredArticle && (
        <section className="container mx-auto px-4 lg:px-8">
          <Link to={`/news/${featuredArticle.slug}`} className="group block">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-2xl p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="cyan">FEATURED DISPATCH</Badge>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredArticle.publishDate}</span>
                    <span>•</span>
                    <Badge variant="outline">{featuredArticle.category}</Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">By {featuredArticle.author}</span>
                    <Button variant="cyan" size="sm">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* News Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <Link key={item.id} to={`/news/${item.slug}`} className="group block">
              <Card className="overflow-hidden border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between h-full shadow-xl">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <span className="text-[11px] font-mono text-cyan-400 mb-1 block">{item.publishDate}</span>
                    <CardTitle className="text-base group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 mt-2 leading-relaxed">
                      {item.excerpt}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardFooter className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>By {item.author}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
