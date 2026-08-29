import { Opportunity } from '../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-postdoc-neurosym',
    slug: 'postdoctoral-fellowship-neurosymbolic-ai-safety',
    title: 'Postdoctoral Research Fellowship: Neuro-Symbolic AI & Verifiable Safety',
    type: 'Fellowship',
    researchAreaId: 'ai-core',
    supervisorId: 'dr-sarah-lin',
    location: 'AIRC Main Campus (Cambridge / Boston)',
    duration: '2 Years (Renewable up to 3 Years)',
    stipend: '$85,000 – $95,000 / year + Full Benefits & Compute Allocation',
    deadline: '2026-10-31',
    status: 'Open',
    overview: 'The AIRC AI Foundations Lab is inviting applications for a fully-funded Postdoctoral Research Fellow to investigate differentiable formal methods, certified bounds in large foundation models, and verifiable agentic decision making under the direction of Prof. Sarah Lin.',
    eligibility: [
      'Ph.D. in Computer Science, Applied Mathematics, Computational Linguistics, or related field earned within the last 3 years.',
      'Demonstrated first-author publication track record at top-tier venues (NeurIPS, ICML, ICLR, AAAI, IJCAI, CAV, POPL).',
      'Strong mathematical background in automated reasoning, SAT/SMT solvers, or theoretical machine learning.',
      'Proficiency in Python, PyTorch, JAX, and CUDA GPU acceleration.'
    ],
    requirements: [
      'Curriculum Vitae including complete publication list and Google Scholar link.',
      '2-page Research Statement detailing alignment with AIRC Neuro-Symbolic objectives.',
      '3 Letters of Recommendation submitted directly by referees.',
      'Up to 3 representative published papers.'
    ],
    responsibilities: [
      'Lead fundamental research projects on differentiable SMT integration and neural circuit verification.',
      'Mentor doctoral and undergraduate researchers in the lab.',
      'Co-author high-impact research papers and open-source software libraries.',
      'Present research findings at premier international academic conferences.'
    ],
    applicationProcess: [
      'Submit the initial online application form with research statement and CV.',
      'Initial portfolio and publication screening by the faculty hiring committee (2 weeks).',
      'Virtual technical colloquium and deep-dive interview with laboratory team members.',
      'Final selection and formal fellowship offer letter issuance.'
    ],
    featured: true,
    postedDate: '2026-07-15'
  },
  {
    id: 'opp-phd-surgical-vision',
    slug: 'graduate-research-assistantship-surgical-3d-vision',
    title: 'Ph.D. Graduate Research Assistantship: 3D Spatial Intelligence & Medical AI',
    type: 'Graduate Research',
    researchAreaId: 'computer-vision',
    supervisorId: 'dr-marcus-vance',
    location: 'AIRC Main Campus & University Hospital Surgical Center',
    duration: '4-5 Years (Full Tuition Waiver + Living Stipend)',
    stipend: '$44,000 / year + Full Tuition Coverage & Health Insurance',
    deadline: '2026-11-15',
    status: 'Open',
    overview: 'Join the Visual Intelligence Laboratory to pioneer real-time dynamic 3D Gaussian Splatting and multimodal neural fields for intraoperative microsurgery under Dr. Marcus Vance.',
    eligibility: [
      'B.S. or M.S. in Computer Science, Electrical Engineering, Biomedical Engineering, or related disciplines.',
      'Strong programming skills in C++, Python, and PyTorch.',
      'Prior coursework or project experience in Computer Vision, 3D Geometry, or Computer Graphics.'
    ],
    requirements: [
      'Academic transcripts.',
      'Statement of Purpose.',
      'Resume/CV with GitHub project links.',
      '3 academic recommendations.'
    ],
    responsibilities: [
      'Develop real-time volumetric reconstruction algorithms.',
      'Conduct ex-vivo and clinical surgical imaging experiments.',
      'Publish at CVPR, ICCV, ECCV, and MICCAI.'
    ],
    applicationProcess: [
      'Submit AIRC graduate assistantship application.',
      'Faculty interview with Dr. Marcus Vance.',
      'Coding assessment and research presentation.'
    ],
    featured: true,
    postedDate: '2026-08-01'
  },
  {
    id: 'opp-intern-robotics-swarm',
    slug: 'summer-research-internship-swarm-robotics',
    title: 'Summer Research Internship: Autonomous Drone Swarm Coordination',
    type: 'Internship',
    researchAreaId: 'robotics-autonomous',
    supervisorId: 'dr-kenji-takahashi',
    location: 'AIRC Robotics Pavilion',
    duration: '12 Weeks (Summer 2027)',
    stipend: '$9,000 / month + Housing Allowance',
    deadline: '2026-12-01',
    status: 'Open',
    overview: 'Exciting 12-week hands-on internship for undergraduate and Master’s students to implement distributed SLAM and multi-agent reinforcement learning on physical quadrotor swarms.',
    eligibility: [
      'Enrolled in an accredited undergraduate or Master’s program in Robotics, CS, or ME.',
      'Hands-on experience with ROS2, C++, or Python.',
      'Passion for physical robotics experiments.'
    ],
    requirements: [
      'Resume / CV.',
      'GitHub repository links showing robotics/control projects.',
      'Unofficial transcripts.'
    ],
    responsibilities: [
      'Deploy autonomous flocking algorithms on physical micro-drones.',
      'Assist with subterranean field testing exercises.',
      'Prepare a final project symposium presentation.'
    ],
    applicationProcess: [
      'Online application.',
      'Technical screening interview with senior robotics postdocs.',
      'Offer decisions communicated by January 15.'
    ],
    featured: true,
    postedDate: '2026-08-10'
  },
  {
    id: 'opp-ra-cyber-trust',
    slug: 'undergraduate-research-assistant-cybersecurity-ai',
    title: 'Undergraduate Research Assistant: Autonomous Binary Fuzzing & Model Red-Teaming',
    type: 'Undergraduate Research',
    researchAreaId: 'cybersecurity-ai',
    supervisorId: 'dr-alexander-weiss',
    location: 'AIRC Cyber Wing (Hybrid)',
    duration: 'Academic Year 2026-2027 (15 hrs/week)',
    stipend: '$24.00 / hour',
    deadline: '2026-09-15',
    status: 'Open',
    overview: 'Undergraduate students are invited to join Dr. Alexander Weiss in developing automated red-teaming benchmarks and testing neural decompilers against binary exploits.',
    eligibility: [
      'Current undergraduate student with strong interest in systems security and machine learning.',
      'Comfortable with Linux, Python, C/C++, and assembly fundamentals.'
    ],
    requirements: [
      'Resume.',
      'Brief 1-paragraph statement of interest.',
      'Links to relevant CTF participation or GitHub repositories.'
    ],
    responsibilities: [
      'Run automated fuzzing benchmarks and curate binary vulnerability datasets.',
      'Contribute to our open-source ShieldAI security framework.'
    ],
    applicationProcess: [
      'Direct online submission through the AIRC Opportunities portal.'
    ],
    featured: false,
    postedDate: '2026-08-18'
  }
];
