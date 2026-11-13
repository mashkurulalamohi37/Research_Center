# AIRIC Institute Specification: Complete Platform Refactor & Expansion

**Version:** 1.0.0  
**Status:** LOCKED  
**Date:** 2026-11-13  
**Project:** AIRIC Institute (Advanced Intelligence Research, Innovation & Commercialization Institute)  
**Ambiguity Score:** 0.05 (Rigidly Defined)  

---

## 1. Goal

Refactor the existing IRICC website into the complete, production-ready "AIRIC Institute (Advanced Intelligence Research, Innovation & Commercialization Institute)" platform according to client documentation. Deliver an institutional digital presence featuring unified brand identity, a zero-dead-link 10-category navigation system, a dedicated 10-application product showcase portfolio (`/apps` and `/apps/:slug`), an organizational ecosystem matrix across 10 academic and commercial divisions, and comprehensive research homepage modules.

---

## 2. Locked Core Requirements

### Requirement 1: Brand & Hero Identity
- **Top Header Bar:**
  - Text: `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`
  - Style: Institutional top banner with subtle borders, metadata typography, and quick links (Portals, Language/Search).
- **Hero Title:** `Transforming Ideas into Real-World Impact`
- **Hero Subtitle:** `Intelligent Research • Innovation • Commercialization`
- **4 Core Pillars Bar:**
  - Pillar 1: `Research Excellence`
  - Pillar 2: `Intelligent Technology`
  - Pillar 3: `Entrepreneurial Innovation`
  - Pillar 4: `Sustainable Development`
- **Visual Tone & Theme:**
  - Deep Navy / Dark Blue (#0B132B, #1C2541, #0F172A)
  - Pure White & Soft Slate
  - Accent: Electric Blue / Cyan (#00E5FF / #38BDF8 / #0284C7)
  - Strict typography hierarchy: Display headings (Sans/Inter/Plus Jakarta Sans), monospace academic badges, clean card borders.

---

### Requirement 2: Complete 10-Category Navigation System (Zero Dead '#' Links)
Every item in the 10 navigation categories must link to an active route, tab, or filtered directory view. Zero placeholder `#` or `javascript:void(0)` links.

#### Category 01: About IRICC / AIRIC (`/about`)
- **Core Sections:**
  - Vision, Mission & Objectives (`/about#vision-mission`)
  - Leadership & Governance (`/about#governance` or `/leadership`)
  - Research Team Members (`/researchers`)
  - Young Scientist Programme (`/young-scientists` or `/about#young-scientists`)
- **Leadership Roles Directory:**
  - Founder and Chairman
  - Advisors & Advisory Board
  - Scientist / Innovators / Researcher / Expert
  - Consultant
  - AI Engineer / Engineer / Developer / System Analyst
- **RICC Resource Persons Directory (Filterable by Domain):**
  1. AI & Emerging Technology
  2. Quantum Computing
  3. Cybersecurity
  4. Data Science & Analytics
  5. Healthcare & Medical
  6. Scientific Research
  7. Innovation & Startup
  8. Education & Training
  9. Industry & Engineering
  10. International Experts
  11. Agriculture & Environment
  12. Mental Wellbeing

#### Category 02: Research & Publications (`/research`, `/publications`)
- Published Research (`/publications`)
- Present Research (`/research#current`)
- Research Presentations (`/research/presentations`)
- Completed Projects (`/projects?status=completed`)
- Ongoing Scientific Research Projects (`/projects?status=ongoing`)
- Academic Journals:
  - Journal of Advanced Intelligent Research (JAIR) (`/journals/jair`)
  - Journal of Advanced Intelligence Research Innovation & Commercialization (JAIRIC) (`/journals/jairic`)
- Dataset & Data Center (`/datasets` or `/data-center`)

#### Category 03: Innovation & Entrepreneurship Center (`/innovation`)
- Innovation Projects (`/innovation/projects`)
- Entrepreneurship Development (`/innovation/entrepreneurship`)
- Startup Incubation (`/innovation/incubation`)
- Young Innovators Hub (`/innovation/young-innovators`)
- Product Development Lab (`/innovation/product-dev`)
- Technology Transfer Office (`/innovation/tech-transfer`)

#### Category 04: Commercialization Center (`/commercialization`)
- Business & Market Development (`/commercialization/market`)
- Fund & Collaboration Opportunities (`/commercialization/funding`)
- Industry Partnership Framework (`/commercialization/partnerships`)
- Intellectual Property & Patents (`/commercialization/ip-patents`)
- Research Commercialization Pipeline (`/commercialization/pipeline`)
- Investment & Venture Opportunities (`/commercialization/investments`)

#### Category 05: Technology & Advanced Computing (`/technology`)
- Artificial Intelligence Lab (`/technology/ai`)
- Quantum Computing Initiative (`/technology/quantum`)
- AI Cybersecurity Research Group (`/technology/ai-cybersecurity`)
- Cybersecurity Projects (`/technology/cybersecurity-projects`)
- Data Science & Analytics Core (`/technology/data-science`)
- Software Engineering Group (`/technology/software-engineering`)
- Apps Development Showcase (`/apps`)

#### Category 06: Education & Training (`/education`)
- Professional Training Programs (`/education/professional`)
- AI & Programming Courses (`/education/ai-programming`)
- Research Methodology Workshops (`/education/research-methodology`)
- Cybersecurity Training Academy (`/education/cybersecurity`)
- Healthcare Technology Training (`/education/healthcare-tech`)
- Young Scientist Development Tracks (`/education/young-scientists`)

#### Category 07: Professional & Expert Network (`/network` or `/experts`)
- AI Engineers Network (`/experts?role=ai-engineer`)
- Cybersecurity Engineers (`/experts?role=cybersecurity-engineer`)
- AI Cybersecurity Researchers (`/experts?role=ai-cybersecurity-researcher`)
- Data Analysts & Data Scientists (`/experts?role=data-analyst`)
- Healthcare Engineers & Experts (`/experts?role=healthcare-expert`)
- Doctors & Medical Consultants (`/experts?role=medical-consultant`)

#### Category 08: Health & Wellbeing (`/health-wellbeing`)
- Digital Healthcare Technologies (`/health-wellbeing/digital-health`)
- Medical Consultation & Telemedicine (`/health-wellbeing/consultation`)
- Mental Wellbeing & Psychological Support (`/health-wellbeing/mental-health`)
- Health Research & Clinical Innovation (`/health-wellbeing/research`)

#### Category 09: Contact & Collaboration (`/collaborate`, `/contact`)
- Become a Researcher (`/collaborate#researcher`)
- Become a Member (`/collaborate#membership`)
- Submit a Research Proposal (`/collaborate#proposal`)
- Industry Collaboration Portal (`/collaborate#industry`)
- Contact IRICC / AIRIC Campus (`/contact`)

#### Category 10: Automation Center (`/automation`)
- Institutional Automation Workflows
- AI Research Automation & Pipeline Tools
- Research Administration & Grant Operations
- API Gateway & Automated Services Hub

---

### Requirement 3: Dedicated Application Portfolio (`/apps` and `/apps/:slug`)
A dedicated, responsive applications catalog (`/apps`) and individual product detail routes (`/apps/:slug`) with bespoke vector icons, feature lists, target user groups, tech stacks, live demo/status badges, and documentation links for all 10 applications:

1. **BChat** — *Intelligent Communication Platform*
   - Real-time encrypted messaging, AI summarization, research team collaboration channels, automated meeting transcripts.
   - Slug: `/apps/bchat`
2. **MyHealth** — *Digital Health Management*
   - Patient health record management, vital signs tracking, AI wellness diagnostics, and clinical appointment scheduling.
   - Slug: `/apps/myhealth`
3. **BSMART** — *Smart Digital Services*
   - Institutional IoT management, smart campus infrastructure, facility telemetry, automated energy monitoring.
   - Slug: `/apps/bsmart`
4. **MyMedicine** — *Medicine Information & Management*
   - Pharmacological intelligence, drug interaction checking, digital prescription tracker, dosage alarms.
   - Slug: `/apps/mymedicine`
5. **ExamScriptAI** — *AI-Powered Examination Assessment*
   - Automated grading of handwritten and digital exam scripts, rubric-based evaluation, grading consistency verification.
   - Slug: `/apps/examscriptai`
6. **BAUSTAI** — *AI-Powered Academic Assistance*
   - Higher-education student tutor, course syllabus assistant, research paper citation generator, laboratory guidance.
   - Slug: `/apps/baustai`
7. **MyHeart** — *Intelligent Cardiac Health*
   - Real-time ECG waveform telemetry analysis, arrhythmia risk prediction, cardiovascular health analytics.
   - Slug: `/apps/myheart`
8. **FlowerDoctor** — *Flower Health Assistance*
   - Botanical disease detection, floriculture treatment plans, soil nutrition recommendations, automated plant care.
   - Slug: `/apps/flowerdoctor`
9. **FlowerDoctorAI** — *AI-Based Flower Diagnosis*
   - Computer vision convolutional neural network for instantaneous petal and leaf pathology diagnosis.
   - Slug: `/apps/flowerdoctorai`
10. **FlowerDoctorBD** — *Bangladesh Flower Intelligence*
    - Specialized agricultural database and climate intelligence for Bangladeshi floriculture and commercial growers.
    - Slug: `/apps/flowerdoctorbd`

---

### Requirement 4: Organizational Ecosystem Matrix (10 Divisions)
A dedicated ecosystem overview section and interactive division explorer on both the Homepage and dedicated institute structure pages (`/divisions` or `/organization`):

| Division | Name | Core Mandate & Description |
|---|---|---|
| **01** | Research Division | Fundamental & applied scientific research, peer-reviewed publications, and discovery. |
| **02** | Innovation Division | New invention incubation, proof-of-concepts, prototype engineering, and lab builds. |
| **03** | Entrepreneurship Division | Venture creation, startup acceleration, business modeling, and founder mentorship. |
| **04** | Commercialization Division | Intellectual property protection, patent licensing, market adoption, and tech transfer. |
| **05** | AI & Quantum Division | Large language models, deep learning, quantum algorithms, and neural architectures. |
| **06** | Cybersecurity Division | Threat intelligence, cryptographic defenses, penetration testing, and AI security. |
| **07** | Data & Analytics Division | Open and restricted scientific dataset development, data pipelines, and intelligence. |
| **08** | Healthcare Division | Biomedical engineering, clinical software, medical consultation, and health tech. |
| **09** | Education Division | Academic training, AI/coding bootcamps, young scientist cohorts, and workshops. |
| **10** | Wellbeing Division | Community psychological support, workplace mental wellness, and resilience research. |

---

### Requirement 5: Additional Homepage Modules Required
The homepage (`/`) must feature the following cohesive academic sections:
1. **Hero Section:**
   - Identity: `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`
   - Title: `Transforming Ideas into Real-World Impact`
   - Subtitle: `Intelligent Research • Innovation • Commercialization`
   - 4 Pillars: Research Excellence | Intelligent Technology | Entrepreneurial Innovation | Sustainable Development
   - Interactive Visuals: Canvas particle network / AI graph visualizer.
2. **Organizational Ecosystem (10 Divisions Grid):**
   - Interactive high-contrast card grid showcasing all 10 divisions with direct drill-down links.
3. **Featured Research Highlights:**
   - Peer-reviewed research cards with DOI badges, citations, publication venues, and abstract previews.
4. **Our Applications Portfolio Showcase:**
   - Carousel or tabbed bento grid of all 10 apps with custom vector icons, category badges, and `/apps/:slug` links.
5. **Meet Our Experts & Resource Persons:**
   - Faculty and researcher cards with badges for AI, Quantum, Medical, and Cyber disciplines.
6. **Young Scientist Programme Highlight:**
   - Dedicated mentorship spotlight, student cohort achievements, fellowship applications call-to-action.
7. **Innovation & Incubation Showcase:**
   - Technology readiness levels (TRL 1–9) tracker for incubation prototypes and patents.
8. **Research Funding & Grants:**
   - Active seed funds, international grant opportunities, and corporate co-investment pipelines.
9. **Dataset Repository Preview:**
   - Structured dataset listings with access-control badges (`Open Access`, `Academic License`, `Restricted Healthcare`).
10. **Academic Journals & Publications:**
    - Dedicated spotlights for **JAIR** (Journal of Advanced Intelligent Research) and **JAIRIC** (Journal of Advanced Intelligence Research Innovation & Commercialization) with ISSN, impact metrics, and call for papers.

---

## 3. Architecture & Code Boundaries

### Component Architecture
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # 10-category multi-level mega-menu navigation (zero '#' links)
│   │   ├── TopHeaderBar.tsx       # Institutional branding & quick actions banner
│   │   ├── Footer.tsx             # Complete institutional footer with 10-division sitemap
│   │   └── Layout.tsx             # Shared root public layout
│   ├── home/
│   │   ├── HeroSection.tsx        # Hero with 4 pillars, canvas, and CTAs
│   │   ├── EcosystemGrid.tsx      # 10-division organizational matrix
│   │   ├── FeaturedResearch.tsx   # Publications & breakthroughs
│   │   ├── ApplicationsShowcase.tsx # 10-app interactive showcase
│   │   ├── ExpertsShowcase.tsx    # Resource persons preview
│   │   ├── YoungScientistBanner.tsx # Young scientist spotlight
│   │   ├── InnovationShowcase.tsx # Prototype & patent pipeline
│   │   ├── FundingSection.tsx     # Grants & research endowments
│   │   ├── DatasetRepository.tsx  # Datasets with access-control badges
│   │   └── JournalsShowcase.tsx   # JAIR & JAIRIC spotlights
│   ├── apps/
│   │   ├── AppCard.tsx            # Modular application card with vector icons
│   │   └── AppDetailView.tsx      # Rich application detail template
│   └── ui/                        # Reusable accessible components
├── data/
│   ├── applications.ts            # Complete data for all 10 applications
│   ├── divisions.ts               # Structured data for 10 organizational divisions
│   ├── journals.ts                # JAIR & JAIRIC editorial boards, issues, indexing
│   ├── datasets.ts                # Datasets with tags, size, and access tiers
│   ├── researchers.ts             # Researchers with 12 domain categories & roles
│   ├── publications.ts            # Published, ongoing, and presentation records
│   └── navigation.ts              # Single source of truth for the 10-category navigation
└── pages/
    └── public/
        ├── Home.tsx
        ├── Apps.tsx               # Application catalog
        ├── AppDetail.tsx          # Dynamic application detail (/apps/:slug)
        ├── Divisions.tsx          # 10-division overview & drilldowns
        ├── Journals.tsx           # JAIR and JAIRIC journal pages
        ├── Datasets.tsx           # Dataset repository with search & filtering
        ├── YoungScientists.tsx    # Young scientist program page
        ├── InnovationCenter.tsx   # Innovation & incubation center
        ├── Commercialization.tsx  # Commercialization & IP pipeline
        ├── TechnologyComputing.tsx # AI, Quantum, Cybersecurity computing
        ├── EducationTraining.tsx  # Courses, bootcamps, workshops
        ├── HealthWellbeing.tsx    # Digital healthcare & wellbeing
        └── AutomationCenter.tsx   # Automation workflows & tools
```

---

## 4. Acceptance Criteria

- [ ] **AC-01 (Branding)**: Header displays `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`, Hero title is `Transforming Ideas into Real-World Impact`, Hero subtitle is `Intelligent Research • Innovation • Commercialization`, and all 4 Core Pillars are rendered.
- [ ] **AC-02 (Navigation)**: All 10 navigation categories render with zero dead (`#`) links; every link leads to a valid routed page or anchor.
- [ ] **AC-03 (Applications)**: All 10 specified apps (`bchat`, `myhealth`, `bsmart`, `mymedicine`, `examscriptai`, `baustai`, `myheart`, `flowerdoctor`, `flowerdoctorai`, `flowerdoctorbd`) are accessible on `/apps` and possess dedicated deep-linkable detail pages at `/apps/:slug`.
- [ ] **AC-04 (10 Divisions)**: All 10 organizational divisions are featured in the ecosystem grid and dedicated division views with comprehensive operational descriptions.
- [ ] **AC-05 (Homepage Modules)**: The homepage includes all 10 requested academic sections: Hero, Ecosystem Grid, Featured Research, Applications Showcase, Meet Our Experts, Young Scientist Programme, Innovation Showcase, Research Funding, Dataset Repository, and Journals (JAIR & JAIRIC).
- [ ] **AC-06 (Data Center & Journals)**: Datasets render with clear access-control badges (`Open Access`, `Academic`, `Restricted`), and both JAIR and JAIRIC journals have dedicated editorial profiles.
- [ ] **AC-07 (Quality & Build)**: Project builds with zero TypeScript errors (`tsc --noEmit`), Vite builds without errors, and responsive layouts function on mobile, tablet, and desktop viewports.
