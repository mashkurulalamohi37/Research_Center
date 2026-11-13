export interface JournalArticle {
  title: string;
  authors: string;
  doi: string;
  pages: string;
  volume: string;
  date: string;
}

export interface JournalInfo {
  id: string;
  code: string;
  name: string;
  tagline: string;
  issn: string;
  frequency: string;
  impactMetric: string;
  acceptanceRate: string;
  indexing: string[];
  scope: string[];
  aims: string;
  editorInChief: string;
  managingEditor: string;
  submissionEmail: string;
  latestIssue: string;
  articles: JournalArticle[];
}

export const journalData: Record<string, JournalInfo> = {
  jair: {
    id: 'jair',
    code: 'JAIR',
    name: 'Journal of Advanced Intelligent Research',
    tagline: 'Leading peer-reviewed international journal for theoretical and foundational artificial intelligence',
    issn: 'ISSN 2984-7128 (Online)',
    frequency: 'Quarterly (4 issues/year)',
    impactMetric: 'CiteScore 5.8 • Index Copernicus 94.2',
    acceptanceRate: '16.4%',
    indexing: ['Scopus (Evaluation)', 'DOAJ', 'Google Scholar', 'Crossref DOI', 'DBLP', 'Dimensions'],
    scope: [
      'Multi-Agent Coordination & Autonomous Reasoning',
      'Quantum Neural Architectures & Error Mitigation',
      'Neural-Symbolic AI & Knowledge Graphs',
      'Adversarial Machine Learning & Security Guardrails',
      'High-Performance Deep Learning Compilers',
      'Mathematical Foundations of Multimodal Learning',
    ],
    aims: 'The Journal of Advanced Intelligent Research (JAIR) publishes high-impact, rigorous theoretical, algorithmic, and experimental research bridging foundational artificial intelligence, computational neuroscience, and quantum algorithmic computing.',
    editorInChief: 'Prof. Dr. Sarah Lin, Ph.D. (Director of AI & Neural Systems)',
    managingEditor: 'Dr. Marcus Vance, Ph.D. (Lead AI Architect)',
    submissionEmail: 'jair-submissions@airic.research.edu',
    latestIssue: 'Volume 4, Issue 3 (Fall 2026)',
    articles: [
      {
        title: 'Asymptotic Error Bounds in Parameterized Quantum Annealing for NP-Hard Graph Partitions',
        authors: 'Farhana Yasmin, Alan Turing Lab Fellows',
        doi: '10.5281/jair.2026.4031',
        pages: 'pp. 142–165',
        volume: 'Vol. 4, No. 3',
        date: 'October 2026',
      },
      {
        title: 'Sub-linear Latency Inference in BengaLLM Foundation Architecture',
        authors: 'Rezwana Karim, Tanvir Hossain',
        doi: '10.5281/jair.2026.4032',
        pages: 'pp. 166–188',
        volume: 'Vol. 4, No. 3',
        date: 'October 2026',
      },
      {
        title: 'Formal Verification of Post-Quantum Cryptographic Key Encapsulation in Edge Telemetry',
        authors: 'Tanvir Hossain, Marcus Vance',
        doi: '10.5281/jair.2026.4033',
        pages: 'pp. 189–210',
        volume: 'Vol. 4, No. 3',
        date: 'September 2026',
      },
    ],
  },
  jairic: {
    id: 'jairic',
    code: 'JAIRIC',
    name: 'Journal of Advanced Intelligence Research Innovation & Commercialization',
    tagline: 'Translational engineering, patent disclosures, and technology commercialization pipelines',
    issn: 'ISSN 3006-8910 (Online)',
    frequency: 'Biannual (2 issues/year)',
    impactMetric: 'Tech Transfer Index 9.2 • 28 Disclosed Patents',
    acceptanceRate: '21.0%',
    indexing: ['Crossref DOI', 'Google Scholar', 'WorldCat', 'IEEE Xplore Partner Network', 'Lens.org'],
    scope: [
      'Translational Deep-Tech Engineering & Bench Prototyping',
      'University-to-Industry Technology Transfer Case Studies',
      'Clinical Validation Protocols for Medical AI Devices',
      'Agricultural Computer Vision in Emerging Geographies',
      'Patent Portfolio Structuring & IP Valuation Frameworks',
      'Socioeconomic Impact of Autonomous Public Infrastructure',
    ],
    aims: 'JAIRIC bridges the critical chasm between laboratory discovery and industrial commercialization. It showcases peer-reviewed prototypes, technology readiness transitions (TRL 4 to 9), licensing legal frameworks, and validated socio-economic deployment studies.',
    editorInChief: 'Engr. Mahfuzur Rahman, LL.M. / M.Sc. (Chief Commercialization Officer)',
    managingEditor: 'Dr. Shahriar Chowdhury, Ph.D. (Director of Rapid Prototyping)',
    submissionEmail: 'jairic-submissions@airic.research.edu',
    latestIssue: 'Volume 2, Issue 2 (Winter 2026)',
    articles: [
      {
        title: 'Commercial Scale-Up of FlowerDoctorBD: 40,000 Smallholder Farmers Field Study',
        authors: 'Mahfuzur Rahman, Agricultural Telemetry Consortium',
        doi: '10.5281/jairic.2026.2021',
        pages: 'pp. 55–79',
        volume: 'Vol. 2, No. 2',
        date: 'November 2026',
      },
      {
        title: 'Zero-Leakage Tele-Medicine Architecture: Compliance with ISO 27799 and GDPR in South Asia',
        authors: 'Prof. Dr. Anisur Rahman, Sabrina Nazneen',
        doi: '10.5281/jairic.2026.2022',
        pages: 'pp. 80–104',
        volume: 'Vol. 2, No. 2',
        date: 'October 2026',
      },
      {
        title: 'Automated Academic Script Evaluation: ExamScriptAI Deployment in 14 Higher-Education Institutions',
        authors: 'Rezwana Karim, AIRIC Education Labs',
        doi: '10.5281/jairic.2026.2023',
        pages: 'pp. 105–130',
        volume: 'Vol. 2, No. 2',
        date: 'September 2026',
      },
    ],
  },
};
