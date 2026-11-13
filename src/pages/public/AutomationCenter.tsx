import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, Terminal, Cpu, Network, Zap, CheckCircle2, 
  ArrowRight, Shield, Layers, FileCode, Sparkles 
} from 'lucide-react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';

const automationPipelines = [
  {
    id: 'lit-synth',
    name: 'Scientific Literature Autonomous Synthesis Pipeline',
    status: 'Production',
    description: 'Autonomous multi-agent crawler indexing ArXiv, PubMed, and IEEE Xplore nightly, executing causal hypothesis extraction and automated citation verification.',
    tech: 'Python, LangGraph, vLLM, Qdrant',
    metric: '42,000 papers/month',
  },
  {
    id: 'data-clean',
    name: 'Clinical & Sensor Waveform Sanitization Bot',
    status: 'Production',
    description: 'Automated de-identification, baseline drift cancellation, and format normalization for multi-modal ECG, EEG, and agricultural IoT sensor telemetry.',
    tech: 'PySpark, Polars, ONNX Runtime',
    metric: '99.98% de-id confidence',
  },
  {
    id: 'grant-audit',
    name: 'Grants & Regulatory Compliance Watchdog',
    status: 'Active',
    description: 'Automated monitoring of international funding bodies (NSF, Horizon Europe, GOB Grants), proposal eligibility verification, and budget ledger auditing.',
    tech: 'FastAPI, PostgREST, Zod Validator',
    metric: '18 Active Grant Consortia',
  },
  {
    id: 'api-gateway',
    name: 'AIRIC Cloud Inference API Gateway Hub',
    status: 'Beta',
    description: 'Unified high-throughput REST and gRPC gateway providing federated institutional access to fine-tuned neural models for health, vision, and NLP.',
    tech: 'Rust, Envoy, Kubernetes, Redis',
    metric: '< 15ms median latency',
  },
];

export const AutomationCenter: React.FC = () => {
  useDocumentTitle('Automation Center | AIRIC Institute');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header Banner */}
      <section className="relative py-16 bg-gradient-to-b from-slate-900 via-slate-900 to-navy-950 text-white border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>CATEGORY 10 • INSTITUTIONAL AUTOMATION HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Automation Center
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Autonomous scientific workflows, high-throughput computational pipelines, automated compliance telemetry, and cloud API services powering AIRIC research operations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automationPipelines.map(pipe => (
            <Card key={pipe.id} className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="cyan" className="font-mono text-[10px]">
                    {pipe.status}
                  </Badge>
                  <span className="font-mono text-xs text-slate-400">
                    {pipe.metric}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {pipe.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {pipe.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-cyan-700 dark:text-cyan-400">
                  Tech: {pipe.tech}
                </span>
                <Link to="/collaborate" className="text-slate-700 dark:text-slate-300 hover:text-cyan-600 flex items-center gap-1 font-medium">
                  Request API Access <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Cloud API Integration Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <Badge variant="outline" className="border-cyan-400 text-cyan-400 mb-3 font-mono text-[10px]">
              DEVELOPER HUB
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Access the AIRIC Cloud Research API
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Authenticate with your institutional token to run inference queries against our trained disease detection models, literature synthesis engines, and quantum state simulators.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/login">
                <Button variant="cyan" size="md">
                  Generate API Key <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="md" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Read API Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
