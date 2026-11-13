export interface DatasetItem {
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
  benchmarkScore?: string;
  associatedDivision: string;
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
    benchmarkScore: '98.4% Dice Score on Cortex Segmentation',
    associatedDivision: 'Healthcare Division',
  },
  {
    id: 'ds-2',
    title: 'BanglaFlow: Comprehensive Agricultural Flora & Phytopathology Imagery',
    slug: 'banglaflow-phytopathology',
    description: 'Bespoke dataset of over 250,000 field images covering native Bangladeshi flowers and agricultural flora with annotated multi-label plant pathologies.',
    domain: 'Agriculture & Vision',
    records: '252,400 images',
    fileSize: '18.4 GB',
    format: 'JPEG, YOLO JSON, TFRecord',
    accessTier: 'Open Access',
    license: 'CC BY-NC 4.0',
    downloads: 4890,
    lastUpdated: 'November 2026',
    doi: '10.5281/zenodo.airic.banglaflow.2026',
    benchmarkScore: '94.2% mAP50 Pathology Detection',
    associatedDivision: 'Innovation Division',
  },
  {
    id: 'ds-3',
    title: 'Bengali-Instruct-LLM: Multi-Turn Synthesized Dialogue & Reasoning Benchmark',
    slug: 'bengali-instruct-corpus',
    description: '14 billion tokens of cleanly deduplicated Bengali conversational instruction pairs spanning law, clinical counseling, STEM pedagogy, and literature.',
    domain: 'NLP & Foundation Models',
    records: '4.8M dialogue turns',
    fileSize: '9.2 GB',
    format: 'JSONL, Parquet',
    accessTier: 'Open Access',
    license: 'MIT Open Science',
    downloads: 8750,
    lastUpdated: 'September 2026',
    doi: '10.5281/zenodo.airic.bengali.instruct.2026',
    benchmarkScore: '82.6% MMLU-Bengali Equivalent',
    associatedDivision: 'AI & Quantum Division',
  },
  {
    id: 'ds-4',
    title: 'CyberTelemetry-IoT: Multi-Vector Adversarial Intrusion Telemetry Logs',
    slug: 'cybertelemetry-iot',
    description: 'Packet-level network pcaps and honeypot intrusion telemetry capturing 48 hours of simulated nation-state DDoS, spoofing, and zero-day payload executions.',
    domain: 'Cybersecurity',
    records: '18.6M packet streams',
    fileSize: '31.5 GB',
    format: 'PCAP, CSV, Zeek Logs',
    accessTier: 'Academic License',
    license: 'AIRIC Academic Non-Commercial Agreement',
    downloads: 2180,
    lastUpdated: 'August 2026',
    doi: '10.5281/zenodo.airic.cybertelemetry.2026',
    benchmarkScore: '99.1% True Positive Attack Detection',
    associatedDivision: 'Cybersecurity Division',
  },
  {
    id: 'ds-5',
    title: 'CardioRhythm-ECG: Continuous 12-Lead Ambulatory Arrhythmia Telemetry',
    slug: 'cardiorhythm-ecg',
    description: 'Validated 12-lead and single-lead Holter telemetry monitoring 8,500 cardiac patients with physician-reviewed arrhythmia classifications.',
    domain: 'Biomedical Informatics',
    records: '8,500 patients (500k hrs)',
    fileSize: '14.1 GB',
    format: 'WFDB, CSV, EDF',
    accessTier: 'Restricted Healthcare',
    license: 'Clinical Data Sharing Agreement & HIPAA Compliance',
    downloads: 980,
    lastUpdated: 'November 2026',
    doi: '10.5281/zenodo.airic.cardiorhythm.2026',
    benchmarkScore: '0.982 AUC AFib Detection',
    associatedDivision: 'Healthcare Division',
  },
  {
    id: 'ds-6',
    title: 'QuantumAnneal-Logistics: Combinatorial Port Transit Benchmark Graphs',
    slug: 'quantumanneal-logistics',
    description: 'Graph optimization instances designed to benchmark quantum approximate optimization algorithms (QAOA) against classical simulated annealing.',
    domain: 'Quantum Computing',
    records: '12,000 graph topologies',
    fileSize: '1.4 GB',
    format: 'NetworkX GraphML, JSON',
    accessTier: 'Open Access',
    license: 'Apache 2.0',
    downloads: 3200,
    lastUpdated: 'October 2026',
    doi: '10.5281/zenodo.airic.quantum.graphs.2026',
    benchmarkScore: 'Standardized Ising Hamiltonian Benchmark',
    associatedDivision: 'AI & Quantum Division',
  },
];
