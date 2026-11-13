export interface GrantOpportunity {
  id: string;
  title: string;
  grantCode: string;
  fundingBody: string;
  totalPool: string;
  maxPerAward: string;
  duration: string;
  status: 'Open For Proposals' | 'Under Review' | 'Active Cohort' | 'Upcoming';
  deadline: string;
  category: 'Seed Research' | 'Commercialization Voucher' | 'Young Scientist Fellowship' | 'Industry Co-Investment';
  eligibleDisciplines: string[];
  description: string;
  requirements: string[];
  contactEmail: string;
}

export const mockGrants: GrantOpportunity[] = [
  {
    id: 'g-1',
    title: 'AIRIC Deep-Tech Commercialization Translation Grant (Cohort 2026)',
    grantCode: 'AIRIC-CTG-2026-B',
    fundingBody: 'AIRIC Commercialization Center & Ministry of Science',
    totalPool: '$500,000 USD',
    maxPerAward: '$75,000 USD',
    duration: '18 Months',
    status: 'Open For Proposals',
    deadline: 'December 31, 2026',
    category: 'Commercialization Voucher',
    eligibleDisciplines: ['Artificial Intelligence', 'Agricultural Robotics', 'Digital Health', 'Cybersecurity'],
    description: 'Direct equity-free capital awarded to university laboratory teams transitioning TRL 4 working prototypes to TRL 7 pilot field deployments with corporate partners.',
    requirements: [
      'Proof-of-concept prototype demonstrated in laboratory setting (TRL 4+)',
      'At least one AIRIC faculty member or registered research fellow as Principal Investigator',
      'Preliminary intellectual property disclosure filed with the Office of Technology Licensing',
    ],
    contactEmail: 'grants@airic.research.edu',
  },
  {
    id: 'g-2',
    title: 'Pioneering Quantum & Foundation Models Exploratory Seed Fund',
    grantCode: 'AIRIC-SEED-Q2-2026',
    fundingBody: 'AIRIC Strategic Research Endowment',
    totalPool: '$350,000 USD',
    maxPerAward: '$50,000 USD + Cloud Supercompute',
    duration: '12 Months',
    status: 'Open For Proposals',
    deadline: 'January 15, 2027',
    category: 'Seed Research',
    eligibleDisciplines: ['Quantum Computing', 'Neural Differential Equations', 'Multimodal LLMs', 'Post-Quantum Crypto'],
    description: 'High-risk, high-reward basic science grant providing seed capital, access to high-density GPU supercomputing clusters, and quantum simulator credits.',
    requirements: [
      'Original mathematical or algorithmic formulation addressing core computational complexity',
      'Commitment to open-access publication in JAIR or peer-reviewed indexed venue',
      'Clear reproducibility benchmark and dataset release protocol',
    ],
    contactEmail: 'seed-research@airic.research.edu',
  },
  {
    id: 'g-3',
    title: 'Young Scientist Innovation Fellowship Grant',
    grantCode: 'AIRIC-YSF-2026-F',
    fundingBody: 'Global STEM Alliance & AIRIC Education Division',
    totalPool: '$180,000 USD',
    maxPerAward: '$12,000 USD Stipend + Equipment Voucher',
    duration: '12 Months',
    status: 'Open For Proposals',
    deadline: 'Rolling Intake',
    category: 'Young Scientist Fellowship',
    eligibleDisciplines: ['Computer Science', 'Biomedical Engineering', 'Applied Physics', 'Data Science'],
    description: 'Merit-based research fellowship funding undergraduate and early postgraduate researchers working under senior AIRIC Principal Investigators.',
    requirements: [
      'Enrolled university student or recent graduate within 2 years of degree conferral',
      'Proposal endorsed by an AIRIC Resource Person or affiliated faculty mentor',
      'Participation in monthly Young Scientist research colloquiums and JAIR submissions',
    ],
    contactEmail: 'young-scientists@airic.research.edu',
  },
  {
    id: 'g-4',
    title: 'Smart Agriculture & Food Security Industry Match Challenge',
    grantCode: 'AIRIC-AGRI-2026-IND',
    fundingBody: 'South Asian Agritech Consortium & Corporate Partners',
    totalPool: '$420,000 USD (50% Corporate Matched)',
    maxPerAward: '$60,000 USD',
    duration: '24 Months',
    status: 'Open For Proposals',
    deadline: 'February 28, 2027',
    category: 'Industry Co-Investment',
    eligibleDisciplines: ['Phytopathology AI', 'Autonomous Drone Telemetry', 'Soil Nutrient Sensor Arrays'],
    description: 'Collaborative funding mechanism where AIRIC matches private sector contributions 1:1 for field deployment of flower and crop diagnostics.',
    requirements: [
      'Signed Memorandum of Understanding with an industrial agricultural enterprise',
      'Field testing protocol involving at least 500 regional agricultural growers',
      'Integration compatibility with FlowerDoctorBD data standard',
    ],
    contactEmail: 'industry-grants@airic.research.edu',
  },
];
