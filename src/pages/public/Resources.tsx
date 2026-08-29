import React, { useState } from 'react';
import { Search, Download, FileText, Database, Code, Cpu, Sparkles, Filter, ExternalLink } from 'lucide-react';
import { mockResources } from '../../data/resources';
import { ResourceCategory } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

export const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { success } = useToast();

  const filteredResources = mockResources.filter(r => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'Code': return <Code className="w-5 h-5 text-purple-400" />;
      case 'Datasets': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Models': return <Cpu className="w-5 h-5 text-emerald-400" />;
      default: return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleDownload = (item: typeof mockResources[0]) => {
    success('Resource Download Ready', `Accessing ${item.title} (${item.fileSize}) from AIRC artifact mirror.`);
  };

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <Badge variant="cyan" className="mb-4">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Open Science Repository
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
          AIRC Open Datasets, Models & Tools
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          We release open-weights models, 3D surgical perception datasets, formal verification solvers, and robotics packages for academic reproducibility.
        </p>

        {/* Filter Bar */}
        <div className="mt-8 max-w-lg mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search datasets, models, code..."
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Categories</option>
            <option value="Code">Code Repositories</option>
            <option value="Datasets">Benchmark Datasets</option>
            <option value="Models">Pretrained Models</option>
            <option value="Research Guidelines">Research Guidelines</option>
          </select>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(res => (
            <Card
              key={res.id}
              className="p-6 rounded-2xl border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                    {getCategoryIcon(res.category)}
                  </div>
                  <Badge variant="cyan">{res.accessLevel}</Badge>
                </div>

                <h3 className="text-base font-bold text-slate-100 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {res.description}
                </p>

                <div className="pt-2 text-[11px] font-mono text-slate-500 space-y-1">
                  <div>Format: <strong className="text-slate-300">{res.fileType}</strong></div>
                  <div>Size: <strong className="text-cyan-400">{res.fileSize}</strong> • Downloads: {res.downloadsCount.toLocaleString()}</div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">By {res.author}</span>
                <Button variant="cyan" size="sm" onClick={() => handleDownload(res)}>
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
