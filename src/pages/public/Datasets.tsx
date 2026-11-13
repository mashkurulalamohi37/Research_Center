import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Search, Download, ShieldCheck, Lock, 
  FileText, ExternalLink, Filter, Layers, Sparkles 
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

interface DatasetItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  domain: string;
  records: string;
  fileSize: string;
  format: string;
  accessTier: 'Open Access' | 'Academic License' | 'Restricted Healthcare';
  license: string;
  downloads: number;
  lastUpdated: string;
  doi: string;
}

export const mockDatasets: DatasetItem[] = [
  {
    id: 'ds-1',
    title: 'AIRIC-NeuroVision: 100k Multi-Modal Brain MRI & EEG Correlative Corpus',
    slug: 'neurovision-corpus',
    description: 'High-resolution 3T MRI volumetric scans paired with 128-channel EEG recordings across neurological cohorts with validated ground-truth clinical annotations.',
    domain: 'Healthcare & AI',
    records: '104,200 subjects',
    fileSize: '42.8 GB',
    format: 'NIfTI, HDF5, CSV',
    accessTier: 'Restricted Healthcare',
    license: 'DUA / Institutional IRB Required',
    downloads: 1420,
    lastUpdated: 'October 2026',
    doi: '10.5281/zenodo.airic.neurovision.2026',
  },
  {
    id: 'ds-2',
    title: 'BanglaFlow: Comprehensive Agricultural Flora & Phytopathology Imagery',
    slug: 'banglaflow-phytopathology',
    description: 'Bespoke dataset of over 250,000 field images covering native Bangladeshi flowers and agricultural flora with annotated multi-label plant pathologies.',
    domain: 'Agriculture & Vision',
    records: '252,400 images',
    fileSize: '18.4 GB',
    format: 'JPEG, COCO JSON, YOLO',
    accessTier: 'Open Access',
    license: 'CC BY 4.0 Open Science',
    downloads: 4890,
    lastUpdated: 'November 2026',
    doi: '10.5281/zenodo.airic.banglaflow.2026',
  },
  {
    id: 'ds-3',
    title: 'QuantumSim-128: Qiskit Statevector & Quantum Error Mitigation Traces',
    slug: 'quantumsim-error-traces',
    description: 'Simulation telemetry and noise profiles from 128-qubit quantum circuits running surface codes and zero-noise extrapolation mitigation algorithms.',
    domain: 'Quantum Computing',
    records: '5,000,000 circuit shots',
    fileSize: '8.2 GB',
    format: 'Parquet, QASM, Arrow',
    accessTier: 'Academic License',
    license: 'Academic Research License (Non-Commercial)',
    downloads: 2310,
    lastUpdated: 'September 2026',
    doi: '10.5281/zenodo.airic.quantum.2026',
  },
  {
    id: 'ds-4',
    title: 'CyberShield-OT: Industrial SCADA & Microgrid Adversarial Network Packet Captures',
    slug: 'cybershield-ot-pcaps',
    description: 'Full PCAP dumps and Zeek logs capturing stealthy industrial protocol manipulation, multi-stage ransom injections, and defensive telemetry.',
    domain: 'Cybersecurity',
    records: '3.8 Billion packets',
    fileSize: '65.1 GB',
    format: 'PCAP, Zeek TSV, CSV',
    accessTier: 'Academic License',
    license: 'Restricted Defense & Academic MOU',
    downloads: 940,
    lastUpdated: 'August 2026',
    doi: '10.5281/zenodo.airic.cybershield.2026',
  },
  {
    id: 'ds-5',
    title: 'PulseTelemetry-ECG: Continuous 12-Lead Ambulatory Cardiac Signals',
    slug: 'pulsetelemetry-ecg',
    description: 'De-identified long-duration ambulatory ECG waveforms annotated by board-certified electrophysiologists for arrhythmia and micro-ischemia detection.',
    domain: 'Healthcare & Medical',
    records: '18,500 patient days',
    fileSize: '14.6 GB',
    format: 'WFDB, CSV, EDF',
    accessTier: 'Restricted Healthcare',
    license: 'Health Research Data Agreement',
    downloads: 1820,
    lastUpdated: 'October 2026',
    doi: '10.5281/zenodo.airic.ecg.2026',
  },
  {
    id: 'ds-6',
    title: 'AIRIC-ExamBench: AI Grading Rubrics & Academic Assessment Correlates',
    slug: 'exambench-grading',
    description: 'De-identified university exam answer scripts, structured marking rubrics, teacher grade distributions, and AI assessment alignment metrics.',
    domain: 'Education & AI',
    records: '45,000 scripts',
    fileSize: '5.1 GB',
    format: 'JSONL, PDF, Text',
    accessTier: 'Open Access',
    license: 'CC BY-NC 4.0',
    downloads: 3200,
    lastUpdated: 'November 2026',
    doi: '10.5281/zenodo.airic.exambench.2026',
  },
];

export const Datasets: React.FC = () => {
  useDocumentTitle('Dataset & Data Center | AIRIC Institute');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

  const domains = ['All', 'Healthcare & AI', 'Agriculture & Vision', 'Quantum Computing', 'Cybersecurity', 'Education & AI'];
  const tiers = ['All', 'Open Access', 'Academic License', 'Restricted Healthcare'];

  const filtered = mockDatasets.filter(ds => {
    const matchesSearch = ds.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ds.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || ds.domain === selectedDomain;
    const matchesTier = selectedTier === 'All' || ds.accessTier === selectedTier;
    return matchesSearch && matchesDomain && matchesTier;
  });

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Open Access':
        return <Badge variant="cyan" className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">● Open Access</Badge>;
      case 'Academic License':
        return <Badge variant="secondary" className="font-mono text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">Academic License</Badge>;
      case 'Restricted Healthcare':
        return <Badge variant="outline" className="font-mono text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">🔒 Restricted (IRB/DUA)</Badge>;
      default:
        return <Badge>{tier}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Database className="w-3.5 h-3.5" />
            <span>AIRIC DATA CENTER & SCIENTIFIC REPOSITORIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Dataset & Data Center
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Curated, benchmarked, and DOI-indexed scientific datasets powering advanced machine learning, quantum algorithm verification, and healthcare research.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search datasets, modalities, DOIs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Tier:
            </span>
            {tiers.map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Datasets Listing Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(ds => (
            <Card key={ds.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-cyan-500/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-400">
                    {ds.domain}
                  </span>
                  {getTierBadge(ds.accessTier)}
                </div>
                <CardTitle className="text-base sm:text-lg group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {ds.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                  {ds.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Records</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{ds.records}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Size</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{ds.fileSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase">Format</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{ds.format}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>DOI: {ds.doi}</span>
                  <span>{ds.downloads.toLocaleString()} Downloads</span>
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  {ds.license}
                </span>
                <Button variant="cyan" size="sm" className="shrink-0 text-xs">
                  {ds.accessTier === 'Open Access' ? (
                    <>
                      <Download className="w-3.5 h-3.5 mr-1" /> Download
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 mr-1" /> Request Access
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
