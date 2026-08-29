import { ResearchArea } from '../types';

export const mockResearchAreas: ResearchArea[] = [
  {
    id: 'ai-core',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence & Foundations',
    shortDescription: 'Theoretical foundations, probabilistic reasoning, neuro-symbolic AI, and autonomous decision systems.',
    description: 'Our AI Foundations group explores the fundamental mathematics, architectures, and theoretical bounds of artificial intelligence. We focus on bridging deep learning with formal logic, explainable reasoning models, and verifiable algorithmic alignment for safety-critical applications.',
    iconName: 'Brain',
    leadResearcherId: 'dr-sarah-lin',
    publicationCount: 42,
    projectCount: 8,
    technologies: ['Neuro-Symbolic Reasoning', 'Causal AI', 'Reinforcement Learning', 'Automated Theorem Proving'],
    objectives: [
      'Establish provably robust neural architectures resistant to adversarial perturbations.',
      'Unify symbolic knowledge graphs with dense transformer representations.',
      'Formulate rigorous safety benchmarks for general-purpose autonomous agents.'
    ],
    achievements: [
      'Published 12 papers at NeurIPS, ICML, and ICLR in the last 24 months.',
      'Won Best Paper Award at International Joint Conference on AI (IJCAI 2025).',
      'Developed OpenLogic-AI: A framework adopted by 40+ research laboratories.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'computer-vision',
    slug: 'computer-vision',
    title: 'Computer Vision & Visual Intelligence',
    shortDescription: '3D neural reconstruction, medical image perception, multimodal scene understanding, and edge video analytics.',
    description: 'We advance visual perception from 2D pixel analysis to deep 3D spatial intelligence, real-time dynamic scene comprehension, and multimodal spatial computing for surgical navigation and robotics.',
    iconName: 'Eye',
    leadResearcherId: 'dr-marcus-vance',
    publicationCount: 38,
    projectCount: 7,
    technologies: ['Neural Radiance Fields (NeRF)', '3D Gaussian Splatting', 'Diffusion Vision Backbones', 'Surgical Video Understanding'],
    objectives: [
      'Achieve sub-millimeter 3D spatial reconstruction in complex lighting and occlusion.',
      'Pioneer zero-shot clinical pathology and diagnostic imaging classification.',
      'Build ultra-low latency real-time optical flow trackers for micro-aerial vehicles.'
    ],
    achievements: [
      'Ranked #1 in CVPR 2025 Autonomous 3D Scene Reconstruction Challenge.',
      'FDA clinical trial clearance for our collaborative AI Breast Pathology Screener.',
      '5 international patents granted in multi-spectral spatial sensing.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'nlp-genai',
    slug: 'natural-language-processing',
    title: 'Natural Language Processing & Generative AI',
    shortDescription: 'Large language models, multimodal alignment, multilingual reasoning, and factual hallucination mitigation.',
    description: 'Dedicated to the frontiers of human-machine communication, scientific literature synthesis, and factual reliability in generative foundation models across over 100 low-resource languages.',
    iconName: 'MessageSquareText',
    leadResearcherId: 'dr-elena-rostova',
    publicationCount: 35,
    projectCount: 6,
    technologies: ['Mechanistic Interpretability', 'Direct Preference Optimization (DPO)', 'Retrieval Augmented Generation (RAG)', 'Sparse Mixture of Experts'],
    objectives: [
      'Eliminate hallucination in high-stakes scientific and biomedical text generation.',
      'Create efficient 1-bit quantized LLMs runnable on localized edge devices.',
      'Democratize multilingual linguistic preservation for endangered languages.'
    ],
    achievements: [
      'Created "SciSynth-14B", an open scientific reasoning model with 500k+ downloads.',
      'Keynote presentation at ACL 2025 on Mechanistic Transformer Circuit Analysis.',
      'Collaborative grant with UNESCO for preservation of indigenous African and Asian dialects.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'robotics-autonomous',
    slug: 'robotics-autonomous-systems',
    title: 'Robotics & Autonomous Systems',
    shortDescription: 'Embodied AI, robot manipulation foundation models, swarm intelligence, and human-robot teaming.',
    description: 'We bring intelligence into the physical realm. From dexterous robotic hands capable of surgical precision to autonomous terrestrial and aerial exploration swarms in hazardous environments.',
    iconName: 'Bot',
    leadResearcherId: 'dr-kenji-takahashi',
    publicationCount: 29,
    projectCount: 5,
    technologies: ['Vision-Language-Action Models (VLA)', 'Sim-to-Real Transfer', 'Model Predictive Control', 'Swarm Consensus Protocols'],
    objectives: [
      'Develop generalist physical manipulation models across novel object physics.',
      'Ensure sub-millisecond fail-safe human-robot collaborative workcells.',
      'Deploy autonomous exploration swarms for subterranean and disaster response.'
    ],
    achievements: [
      'Deployed robotic disaster inspection system in 3 major national civil defense exercises.',
      'Winner of IEEE ICRA Autonomous Manipulation benchmark 2024 & 2025.',
      '$3.2M DARPA Subterranean Challenge finalist partnership.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'healthcare-biomedical',
    slug: 'healthcare-ai',
    title: 'Healthcare AI & Precision Medicine',
    shortDescription: 'AI for genomics, protein folding dynamics, digital pathology, and clinical decision support systems.',
    description: 'Collaborating directly with premier academic medical hospitals, we design clinically validated AI models that predict disease trajectories, discover novel therapeutics, and democratize diagnostic healthcare access.',
    iconName: 'Activity',
    leadResearcherId: 'dr-ananya-patel',
    publicationCount: 31,
    projectCount: 6,
    technologies: ['Graph Neural Networks for Drug Discovery', 'Multi-Omics Integration', 'Federated Medical Learning', 'Electronic Health Record Predictive Modeling'],
    objectives: [
      'Accelerate hit-to-lead molecular candidate discovery from years to weeks.',
      'Deliver privacy-preserving federated diagnostics across 20+ hospital networks.',
      'Build real-time ICU patient deterioration early-warning alarms.'
    ],
    achievements: [
      'Identified 2 novel kinase inhibitor candidates currently in preclinical trials.',
      'Nature Medicine publication on early onset sepsis detection in neonatal care.',
      'Federated learning network deployed across 15 international teaching hospitals.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cybersecurity-ai',
    slug: 'cybersecurity-trustworthy-ai',
    title: 'Cybersecurity & Trustworthy AI',
    shortDescription: 'Adversarial defense, automated binary vulnerability discovery, privacy-preserving crypto-AI, and red-teaming.',
    description: 'We develop defensive AI frameworks capable of analyzing millions of instructions per second to detect zero-day exploits, secure critical national cyber infrastructure, and audit neural models against backdoors.',
    iconName: 'ShieldCheck',
    leadResearcherId: 'dr-alexander-weiss',
    publicationCount: 26,
    projectCount: 4,
    technologies: ['Differential Privacy', 'Zero-Knowledge Proofs for ML', 'Autonomous Cyber Reasoning Systems (CRS)', 'Adversarial Red Teaming'],
    objectives: [
      'Create self-healing software frameworks capable of automated vulnerability patching.',
      'Formulate provable guarantees for confidential neural network inference.',
      'Detect AI-generated deepfakes and coordinated social information operations.'
    ],
    achievements: [
      'Top 3 in DEF CON AI Cyber Challenge (AIxCC).',
      'Open-source tool "ShieldAI" protecting 200+ academic repositories.',
      'Direct policy advisory contributor to the Global Frontier AI Safety Standards.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'iot-edge-ai',
    slug: 'iot-edge-ai',
    title: 'Edge AI & Intelligent IoT',
    shortDescription: 'Ultra-low power neural inference, neuromorphic computing, TinyML, and decentralized smart sensor fabrics.',
    description: 'Bringing intelligence to milliwatt-scale sensors and edge nodes for environmental monitoring, smart grid optimization, and space-grade satellite computation without cloud reliance.',
    iconName: 'Cpu',
    leadResearcherId: 'dr-wei-zhang',
    publicationCount: 22,
    projectCount: 4,
    technologies: ['TinyML & Microcontrollers', 'Spiking Neural Networks (SNN)', 'Pruning & Knowledge Distillation', 'Energy-Harvesting Sensors'],
    objectives: [
      'Run deep convolutional networks under 5mW power budgets.',
      'Deploy self-powered environmental sensor meshes for wildfire prediction.',
      'Enable onboard satellite edge payload classification.'
    ],
    achievements: [
      'IEEE Micro Top Picks 2025 for sub-milliwatt neuromorphic acoustic sensor.',
      'Deployed 500-node sensor network in the Pacific Northwest rainforest.',
      'Joint technology transfer with leading semiconductor manufacturers.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'data-science',
    slug: 'data-science-complex-systems',
    title: 'Data Science & Complex Systems',
    shortDescription: 'High-dimensional graph mining, climate modeling, topological data analysis, and economic networks.',
    description: 'Transforming vast global datasets into predictive understanding. We investigate complex dynamic systems spanning planetary climate flows, epidemic contagion dynamics, and global supply resilience.',
    iconName: 'Network',
    leadResearcherId: 'dr-sarah-lin',
    publicationCount: 24,
    projectCount: 3,
    technologies: ['Topological Data Analysis (TDA)', 'Spatiotemporal Graph Neural Networks', 'Bayesian Nonparametrics', 'Climate Foundation Models'],
    objectives: [
      'Predict extreme weather anomaly events with 14-day lead times.',
      'Map global financial systemic contagion cascading vulnerabilities.',
      'Model multi-species biodiversity migration patterns.'
    ],
    achievements: [
      'Global Climate AI Challenge laureate in partnership with NOAA data.',
      'Developed open graph benchmarking suite GraphScale-10B.',
      'Featured in Science for breakthrough in turbulent ocean current modeling.'
    ],
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  }
];
