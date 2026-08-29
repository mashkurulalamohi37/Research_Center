import { NewsArticle } from '../types';

export const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'airc-unveils-neurologic-v2-neurips',
    title: 'AIRC Unveils NeuroLogic-v2 at NeurIPS 2025: Eliminating Hallucinations with Formal Proofs',
    excerpt: 'The breakthrough architecture guarantees zero theoretical hallucination in deductive reasoning tasks, winning international acclaim from research institutions.',
    content: `
# AIRC Unveils NeuroLogic-v2 at NeurIPS 2025

The **Advanced Intelligent Research Center (AIRC)** today announced the public release of **NeuroLogic-v2**, an open foundation architecture that marries deep transformer representation capacity with rigorous first-order logic solver constraints.

Led by Founding Director **Prof. Dr. Sarah Lin** and Senior Ph.D. Candidate **James K. Chen**, the research team demonstrated that NeuroLogic-v2 solves one of artificial intelligence's most vexing challenges: uncontrollable hallucinations during multi-step reasoning.

### Key Milestones
- **100% Formal Soundness:** In 10 standard deductive reasoning benchmarks, the model produced zero counter-axiomatic assertions.
- **Open-Source Weight Release:** All model weights (7B, 14B, and 70B parameter models) along with the differentiable SMT kernel have been open-sourced on GitHub and HuggingFace.
- **Industrial Partnerships:** Five major aerospace and biomedical institutions have initiated pilot deployments to verify critical flight checklists and clinical drug dosage formulas.

> "Our aim was not just to make language models slightly more accurate, but to give them mathematical invariants that cannot be violated," said Prof. Lin during her plenary address in Vancouver.

The complete paper and benchmark reproduction code are available in the AIRC Publications and Resources portals.
    `,
    category: 'Research',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    author: 'AIRC Communications Office',
    authorRole: 'Press & Media Relations',
    publishDate: '2025-12-14',
    featured: true,
    status: 'Published',
    tags: ['AI Safety', 'NeurIPS', 'Neuro-Symbolic', 'Open Source'],
    relatedProjectIds: ['proj-neurosym-core'],
    relatedResearcherIds: ['dr-sarah-lin', 'james-chen'],
  },
  {
    id: 'news-2',
    slug: 'laprosplat-surgical-vision-fda-clinical-trial',
    title: 'AIRC LaproSplat 3D Intraoperative System Enters Multi-Center Hospital Clinical Trials',
    excerpt: 'Our sub-millimeter dynamic Gaussian Splatting system is now being evaluated across three major surgical operating rooms.',
    content: `
# LaproSplat System Enters Multi-Center Clinical Trials

The **Visual Intelligence Group** at AIRC, under the direction of **Dr. Marcus Vance**, in collaboration with **Dr. Ananya Patel**, has achieved a critical translational milestone. The center's proprietary **LaproSplat** intraoperative navigation platform has begun multi-center clinical trials for minimally invasive microsurgery.

### Transforming Intraoperative Surgical Perception
Laparoscopic and robotic surgeons often face severe visual limitations due to soft tissue occlusion and deformation. LaproSplat processes real-time stereoscopic camera feeds at **120 frames per second**, rendering augmented 3D subsurface vascular maps with **0.38mm spatial accuracy**.

The trial will monitor 120 laparoscopic procedures over the next nine months to quantify operative time reduction and patient safety margins.
    `,
    category: 'Collaboration',
    coverImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    author: 'Marcus Vance, Ph.D.',
    authorRole: 'Lead, Visual Intelligence',
    publishDate: '2025-11-20',
    featured: true,
    status: 'Published',
    tags: ['Computer Vision', 'Healthcare AI', 'Clinical Trials', '3D Gaussian Splatting'],
    relatedProjectIds: ['proj-surgical-vision-3d'],
    relatedResearcherIds: ['dr-marcus-vance', 'dr-ananya-patel'],
  },
  {
    id: 'news-3',
    slug: 'dr-elena-rostova-awarded-acl-best-paper',
    title: 'Dr. Elena Rostova Receives ACL 2025 Outstanding Paper Award for Mechanistic MoE Analysis',
    excerpt: 'The research provides groundbreaking insights into how 100B+ sparse mixture of experts models allocate computational sub-circuits.',
    content: `
# ACL 2025 Honors AIRC NLP Group with Outstanding Paper Award

We are proud to share that **Dr. Elena Rostova** and Ph.D. Candidate **James Chen** have been awarded the prestigious **Outstanding Paper Award** at the 63rd Annual Meeting of the Association for Computational Linguistics (ACL 2025).

Their research paper, titled *"Mechanistic Circuit Tracing and Routing Dynamics in 100B+ Sparse Mixture of Experts Models"*, presents the first comprehensive map of how specialized sub-networks within MoE foundation models coordinate complex linguistic functions.
    `,
    category: 'Award',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    author: 'AIRC Newsroom',
    authorRole: 'Editorial Team',
    publishDate: '2025-08-28',
    featured: false,
    status: 'Published',
    tags: ['Awards', 'NLP', 'Mechanistic Interpretability', 'ACL 2025'],
    relatedResearcherIds: ['dr-elena-rostova', 'james-chen'],
  },
  {
    id: 'news-4',
    slug: 'airc-secures-12m-research-endowment',
    title: 'AIRC Secures $12M International Research Endowment for Autonomous AI Safety',
    excerpt: 'The landmark endowment will fund 8 new doctoral fellowships, a state-of-the-art compute cluster, and global safety summits.',
    content: `
# $12M International Research Endowment Announced

AIRC is delighted to announce a **$12 Million multi-year research endowment** established by an international consortium of academic research foundations and technology partners.

The endowment will specifically support:
1. **The AIRC Frontier Fellowship Program:** 8 fully-funded 4-year doctoral and postdoctoral fellowships.
2. **Next-Gen Compute Infrastructure:** An expansion of 128 additional high-bandwidth accelerator nodes for AI safety experiments.
3. **The Annual Global AI Verification Summit:** Hosted on campus starting Autumn 2026.
    `,
    category: 'Announcement',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    author: 'Board of Governors',
    publishDate: '2025-10-05',
    featured: false,
    status: 'Published',
    tags: ['Endowment', 'Fellowships', 'AI Safety', 'Infrastructure'],
  }
];
