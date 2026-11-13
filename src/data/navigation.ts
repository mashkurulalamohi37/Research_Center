export interface NavSubItem {
  name: string;
  path: string;
  badge?: string;
  desc?: string;
}

export interface NavSection {
  title: string;
  items: NavSubItem[];
}

export interface NavCategory {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  path: string;
  tagline: string;
  iconName: string;
  sections: NavSection[];
}

export const navigationCategories: NavCategory[] = [
  {
    id: 'about',
    number: '01',
    title: 'About IRICC / AIRIC',
    shortTitle: 'About',
    path: '/about',
    tagline: 'Institutional vision, governance, advisory council, and research personnel',
    iconName: 'Building2',
    sections: [
      {
        title: 'Core Institutional Pillars',
        items: [
          { name: 'Vision, Mission & Objectives', path: '/about#vision-mission', desc: 'Core academic and commercial mandates' },
          { name: 'Leadership & Governance', path: '/about#governance', desc: 'Executive board and senate structure' },
          { name: 'Research Team Members', path: '/researchers', desc: 'Faculty, postdocs, and research fellows' },
          { name: 'Young Scientist Programme', path: '/young-scientists', badge: 'Active Cohort', desc: 'Next-generation talent accelerator' },
        ],
      },
      {
        title: 'Leadership Roles',
        items: [
          { name: 'Founder and Chairman', path: '/about#founder', desc: 'Institutional visionary leadership' },
          { name: 'Advisors & Advisory Board', path: '/about#advisors', desc: 'Global academic and industrial counselors' },
          { name: 'Scientist / Innovator / Researcher', path: '/experts?role=scientist', desc: 'Principal investigators and lab heads' },
          { name: 'Consultant & Domain Specialists', path: '/experts?role=consultant', desc: 'Strategic technical consultants' },
          { name: 'AI Engineer / Developer / Analyst', path: '/experts?role=engineer', desc: 'Systems and model architects' },
        ],
      },
      {
        title: 'Resource Persons Directory (12 Domains)',
        items: [
          { name: 'AI & Emerging Technology', path: '/experts?domain=ai' },
          { name: 'Quantum Computing', path: '/experts?domain=quantum' },
          { name: 'Cybersecurity & Defenses', path: '/experts?domain=cybersecurity' },
          { name: 'Data Science & Analytics', path: '/experts?domain=data-science' },
          { name: 'Healthcare & Medical Systems', path: '/experts?domain=healthcare' },
          { name: 'Scientific Research', path: '/experts?domain=scientific-research' },
          { name: 'Innovation & Startup Incubation', path: '/experts?domain=innovation' },
          { name: 'Education & Training', path: '/experts?domain=education' },
          { name: 'Industry & Engineering', path: '/experts?domain=engineering' },
          { name: 'International Experts', path: '/experts?domain=international' },
          { name: 'Agriculture & Environment', path: '/experts?domain=agriculture' },
          { name: 'Mental Wellbeing & Support', path: '/experts?domain=wellbeing' },
        ],
      },
    ],
  },
  {
    id: 'research',
    number: '02',
    title: 'Research & Publications',
    shortTitle: 'Research',
    path: '/research',
    tagline: 'Scientific breakthroughs, peer-reviewed journals, and dataset centers',
    iconName: 'BookOpen',
    sections: [
      {
        title: 'Research Dispatches',
        items: [
          { name: 'Published Research', path: '/publications', desc: 'Peer-reviewed articles, DOI indexed' },
          { name: 'Present Research', path: '/research#current', desc: 'Active clinical & computational studies' },
          { name: 'Research Presentations', path: '/research#presentations', desc: 'Keynotes, symposiums, and slides' },
          { name: 'Completed Projects', path: '/projects?status=completed', desc: 'Validated research outcomes' },
          { name: 'Ongoing Scientific Projects', path: '/projects?status=ongoing', badge: 'Funded', desc: 'Active laboratory investigations' },
        ],
      },
      {
        title: 'Academic Journals & Data',
        items: [
          { name: 'Journal of Advanced Intelligent Research (JAIR)', path: '/journals/jair', badge: 'ISSN Online', desc: 'Leading journal for AI & computational theory' },
          { name: 'Journal of Advanced Intelligence Research Innovation & Commercialization (JAIRIC)', path: '/journals/jairic', badge: 'New Vol', desc: 'Focusing on deep-tech translation & patents' },
          { name: 'Dataset & Data Center', path: '/datasets', badge: 'Access Controlled', desc: 'Curated scientific benchmark data repositories' },
        ],
      },
    ],
  },
  {
    id: 'innovation',
    number: '03',
    title: 'Innovation & Entrepreneurship Center',
    shortTitle: 'Innovation',
    path: '/innovation',
    tagline: 'Prototyping, startup incubation, and young innovator ventures',
    iconName: 'Rocket',
    sections: [
      {
        title: 'Venture & Prototyping Programs',
        items: [
          { name: 'Innovation Projects', path: '/innovation/projects', desc: 'Proof-of-concept builds and lab experiments' },
          { name: 'Entrepreneurship Development', path: '/innovation/entrepreneurship', desc: 'Founder coaching, business models, and grants' },
          { name: 'Startup Incubation', path: '/innovation/incubation', badge: 'Cohort 2026', desc: 'Seed financing, wet labs, and computing compute' },
          { name: 'Young Innovators Hub', path: '/innovation/young-innovators', desc: 'Under-25 collegiate invention sandbox' },
          { name: 'Product Development Lab', path: '/innovation/product-dev', desc: 'Hardware-software embedded prototyping' },
          { name: 'Technology Transfer Office', path: '/innovation/tech-transfer', desc: 'Translating inventions into enterprise licenses' },
        ],
      },
    ],
  },
  {
    id: 'commercialization',
    number: '04',
    title: 'Commercialization Center',
    shortTitle: 'Commercialization',
    path: '/commercialization',
    tagline: 'Intellectual property, corporate licensing, and investment vehicles',
    iconName: 'TrendingUp',
    sections: [
      {
        title: 'Market & IP Architecture',
        items: [
          { name: 'Business & Market Analysis', path: '/commercialization/market', desc: 'Commercial feasibility and product-market fit' },
          { name: 'Fund & Collaboration Opportunities', path: '/commercialization/funding', badge: 'Grants Open', desc: 'Co-funding matching with state & industry' },
          { name: 'Industry Partnerships', path: '/commercialization/partnerships', desc: 'Enterprise sponsored research alliances' },
          { name: 'Intellectual Property & Patents', path: '/commercialization/ip-patents', desc: 'Patent filing, copyrights, and trade secrets' },
          { name: 'Research Commercialization Pipeline', path: '/commercialization/pipeline', desc: 'Stage-gate validation from TRL 1 to TRL 9' },
          { name: 'Investment Opportunities', path: '/commercialization/investments', desc: 'Syndicate investments in AIRIC spinouts' },
        ],
      },
    ],
  },
  {
    id: 'technology',
    number: '05',
    title: 'Technology & Advanced Computing',
    shortTitle: 'Technology',
    path: '/technology',
    tagline: 'Frontier AI, quantum circuits, cyberdefense, and software engineering',
    iconName: 'Cpu',
    sections: [
      {
        title: 'Advanced Computing Disciplines',
        items: [
          { name: 'Artificial Intelligence Lab', path: '/technology/ai', desc: 'LLMs, multi-agent frameworks, computer vision' },
          { name: 'Quantum Computing Initiative', path: '/technology/quantum', desc: 'Qiskit simulation, quantum crypto & qubits' },
          { name: 'AI Cybersecurity Research', path: '/technology/ai-cybersecurity', badge: 'High Impact', desc: 'Adversarial robustness & LLM safety guardrails' },
          { name: 'Cybersecurity Engineering Projects', path: '/technology/cybersecurity-projects', desc: 'Zero-trust networks and offensive testing' },
          { name: 'Data Science & Analytics Core', path: '/technology/data-science', desc: 'Large scale neural data lakes & modeling' },
          { name: 'Software Engineering Group', path: '/technology/software-engineering', desc: 'Distributed cloud, microservices & telemetry' },
          { name: 'Dedicated Applications Portfolio', path: '/apps', badge: '10 Apps', desc: 'Showcase of all 10 AIRIC proprietary applications' },
        ],
      },
    ],
  },
  {
    id: 'education',
    number: '06',
    title: 'Education & Training',
    shortTitle: 'Education',
    path: '/education',
    tagline: 'Professional certifications, technical bootcamps, and doctoral courses',
    iconName: 'GraduationCap',
    sections: [
      {
        title: 'Curriculum & Workshops',
        items: [
          { name: 'Professional Training Programs', path: '/education/professional', desc: 'Executive certifications in AI and data systems' },
          { name: 'AI & Programming Courses', path: '/education/ai-programming', badge: 'Enrolling', desc: 'Python, PyTorch, modern TypeScript & Rust' },
          { name: 'Research Methodology Workshops', path: '/education/research-methodology', desc: 'Scientific publication, LaTeX, and peer review' },
          { name: 'Cybersecurity Training Academy', path: '/education/cybersecurity', desc: 'Hands-on CTF, threat modeling, and SOC triage' },
          { name: 'Healthcare Technology Training', path: '/education/healthcare-tech', desc: 'Biomedical informatics, DICOM, and telehealth' },
          { name: 'Young Scientist Development', path: '/education/young-scientists', desc: 'Undergraduate research apprenticeship' },
        ],
      },
    ],
  },
  {
    id: 'experts',
    number: '07',
    title: 'Professional & Expert Network',
    shortTitle: 'Experts Network',
    path: '/experts',
    tagline: 'World-renowned engineers, scientists, physicians, and consultants',
    iconName: 'Users',
    sections: [
      {
        title: 'Specialist Directory By Role',
        items: [
          { name: 'AI Engineers & Model Architects', path: '/experts?role=ai-engineer', desc: 'Deep learning practitioners and MLOps leads' },
          { name: 'Cybersecurity Engineers', path: '/experts?role=cybersecurity-engineer', desc: 'Security operations and penetration testers' },
          { name: 'AI Cybersecurity Researchers', path: '/experts?role=ai-cybersecurity-researcher', desc: 'Model red-teaming and safety researchers' },
          { name: 'Data Analysts & Data Scientists', path: '/experts?role=data-analyst', desc: 'Statistical modeling and pipeline architects' },
          { name: 'Healthcare Engineers & Bio-informaticians', path: '/experts?role=healthcare-expert', desc: 'Biomedical instrumentation and clinical AI' },
          { name: 'Doctors & Medical Consultants', path: '/experts?role=medical-consultant', desc: 'Specialist physicians guiding clinical validations' },
        ],
      },
    ],
  },
  {
    id: 'health-wellbeing',
    number: '08',
    title: 'Health & Wellbeing',
    shortTitle: 'Health & Wellbeing',
    path: '/health-wellbeing',
    tagline: 'Digital diagnostics, telemedicine, clinical trials, and psychological care',
    iconName: 'HeartPulse',
    sections: [
      {
        title: 'Clinical & Wellness Initiatives',
        items: [
          { name: 'Digital Healthcare Systems', path: '/health-wellbeing/digital-health', desc: 'AI-assisted medical record and telemetry solutions' },
          { name: 'Medical Consultation & Telemedicine', path: '/health-wellbeing/consultation', badge: 'Active Clinic', desc: 'Specialist remote second opinions' },
          { name: 'Mental Wellbeing & Psychological Support', path: '/health-wellbeing/mental-health', desc: 'Cognitive health research and counseling protocols' },
          { name: 'Health Research & Clinical Innovation', path: '/health-wellbeing/research', desc: 'Translational biomedical laboratory studies' },
        ],
      },
    ],
  },
  {
    id: 'collaboration',
    number: '09',
    title: 'Contact & Collaboration',
    shortTitle: 'Collaboration',
    path: '/collaborate',
    tagline: 'Institutional partnerships, researcher fellowships, and campus liaison',
    iconName: 'Handshake',
    sections: [
      {
        title: 'Engagement Portals',
        items: [
          { name: 'Become a Researcher', path: '/collaborate#researcher', desc: 'Faculty, postdoc, and visiting scholar application' },
          { name: 'Become a Member / Fellow', path: '/collaborate#membership', desc: 'Global research fellow association' },
          { name: 'Submit a Research Proposal', path: '/collaborate#proposal', badge: 'Fast Track', desc: 'Propose joint grants and laboratory studies' },
          { name: 'Industry Collaboration Portal', path: '/collaborate#industry', desc: 'Corporate co-investment and licensing' },
          { name: 'Contact AIRIC Main Campus', path: '/contact', desc: 'Campus addresses, phone, and leadership inquiry' },
        ],
      },
    ],
  },
  {
    id: 'automation',
    number: '10',
    title: 'Automation Center',
    shortTitle: 'Automation',
    path: '/automation',
    tagline: 'Automated research tools, scientific CI/CD pipelines, and cloud APIs',
    iconName: 'Bot',
    sections: [
      {
        title: 'Autonomous Systems & Operations',
        items: [
          { name: 'AI Research Automation Workflows', path: '/automation#workflows', desc: 'Automated literature synthesis and hypothesis checks' },
          { name: 'Data Pipeline & Benchmark Tools', path: '/automation#pipeline', desc: 'Automated data ingestion and sanitization' },
          { name: 'Administration & Grants Operations', path: '/automation#operations', desc: 'Grant monitoring and automated compliance logs' },
          { name: 'AIRIC Cloud API Gateway Hub', path: '/automation#api', badge: 'REST / GraphQL', desc: 'Developer access to trained inference models' },
        ],
      },
    ],
  },
];
