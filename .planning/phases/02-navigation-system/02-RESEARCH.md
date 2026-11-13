# Phase 2: Complete 10-Category Navigation System — Research & Design

**Phase:** 02-navigation-system  
**Created:** 2026-11-13  
**Status:** In Progress  

---

## 1. Requirement & Architecture Analysis

### The 10 Navigation Categories
The client specification and user requirements demand a zero-dead-link 10-category navigation structure:

1. **01. About IRICC / AIRIC (`/about`)**
   - Core:
     - Vision, Mission & Objectives (`/about#vision-mission`)
     - Leadership & Governance (`/about#governance`)
     - Research Team Members (`/researchers`)
     - Young Scientist (`/young-scientists`)
   - Leadership Roles:
     - Founder and Chairman (`/about#founder`)
     - Advisors (`/about#advisors`)
     - Scientist/Innovators/Researcher/Expert (`/researchers?role=scientist`)
     - Consultant (`/researchers?role=consultant`)
     - AI Engineer/Engineer/Developer/System Analyst (`/researchers?role=engineer`)
   - RICC Resource Persons Directory (12 Domains):
     - AI & Emerging Technology (`/experts?domain=ai`)
     - Quantum Computing (`/experts?domain=quantum`)
     - Cybersecurity (`/experts?domain=cybersecurity`)
     - Data Science & Analytics (`/experts?domain=data-science`)
     - Healthcare & Medical (`/experts?domain=healthcare`)
     - Scientific Research (`/experts?domain=scientific-research`)
     - Innovation & Startup (`/experts?domain=innovation`)
     - Education & Training (`/experts?domain=education`)
     - Industry & Engineering (`/experts?domain=engineering`)
     - International Experts (`/experts?domain=international`)
     - Agriculture & Environment (`/experts?domain=agriculture`)
     - Mental Wellbeing (`/experts?domain=wellbeing`)

2. **02. Research & Publications (`/research`, `/publications`)**
   - Published Research (`/publications`)
   - Present Research (`/research#current`)
   - Research Presentations (`/research/presentations`)
   - Completed Projects (`/projects?status=completed`)
   - Ongoing Scientific Research Projects (`/projects?status=ongoing`)
   - Academic Journals:
     - Journal of Advanced Intelligent Research (JAIR) (`/journals/jair`)
     - Journal of Advanced Intelligence Research Innovation & Commercialization (JAIRIC) (`/journals/jairic`)
   - Dataset & Data Center (`/datasets`)

3. **03. Innovation & Entrepreneurship Center (`/innovation`)**
   - Innovation Projects (`/innovation/projects`)
   - Entrepreneurship Development (`/innovation/entrepreneurship`)
   - Startup Incubation (`/innovation/incubation`)
   - Young Innovators (`/innovation/young-innovators`)
   - Product Development (`/innovation/product-dev`)
   - Technology Transfer (`/innovation/tech-transfer`)

4. **04. Commercialization Center (`/commercialization`)**
   - Business & Market (`/commercialization/market`)
   - Fund & Collaboration (`/commercialization/funding`)
   - Industry Partnership (`/commercialization/partnerships`)
   - Intellectual Property (`/commercialization/ip-patents`)
   - Research Commercialization (`/commercialization/pipeline`)
   - Investment Opportunities (`/commercialization/investments`)

5. **05. Technology & Advanced Computing (`/technology`)**
   - Artificial Intelligence (`/technology/ai`)
   - Quantum Computing (`/technology/quantum`)
   - AI Cybersecurity Research (`/technology/ai-cybersecurity`)
   - Cybersecurity Projects (`/technology/cybersecurity-projects`)
   - Data Science & Analytics (`/technology/data-science`)
   - Software Engineering (`/technology/software-engineering`)
   - Apps Development (`/apps`)

6. **06. Education & Training (`/education`)**
   - Professional Training (`/education/professional`)
   - AI & Programming Courses (`/education/ai-programming`)
   - Research Methodology (`/education/research-methodology`)
   - Cybersecurity Training (`/education/cybersecurity`)
   - Healthcare Technology Training (`/education/healthcare-tech`)
   - Young Scientist Development (`/education/young-scientists`)

7. **07. Professional & Expert Network (`/experts`)**
   - AI Engineers (`/experts?role=ai-engineer`)
   - Cybersecurity Engineers (`/experts?role=cybersecurity-engineer`)
   - AI Cybersecurity Researchers (`/experts?role=ai-cybersecurity-researcher`)
   - Data Analysts (`/experts?role=data-analyst`)
   - Healthcare Engineers & Experts (`/experts?role=healthcare-expert`)
   - Doctors & Medical Consultants (`/experts?role=medical-consultant`)

8. **08. Health & Wellbeing (`/health-wellbeing`)**
   - Digital Healthcare (`/health-wellbeing/digital-health`)
   - Medical Consultation (`/health-wellbeing/consultation`)
   - Mental Wellbeing & Support (`/health-wellbeing/mental-health`)
   - Health Research & Innovation (`/health-wellbeing/research`)

9. **09. Contact & Collaboration (`/collaborate`, `/contact`)**
   - Become a Researcher (`/collaborate#researcher`)
   - Become a Member (`/collaborate#membership`)
   - Submit a Research Proposal (`/collaborate#proposal`)
   - Industry Collaboration (`/collaborate#industry`)
   - Contact IRICC / AIRIC (`/contact`)

10. **10. Automation Center (`/automation`)**
    - Institutional Automation Workflows (`/automation#workflows`)
    - AI Research Pipeline Tools (`/automation#pipeline`)
    - Administration & Grants Operations (`/automation#operations`)
    - API Gateway Hub (`/automation#api`)

---

## 2. Technical Approach: Zero Dead '#' Links

### The Problem
If sub-links point to `#` or unimplemented routes, the user clicks and gets a 404 or nothing happens, violating strict client requirements.

### The Solution
1. **Single Source of Truth (`src/data/navigation.ts`):**
   A strongly typed hierarchical navigation schema where every entry has a guaranteed, valid route target.
2. **Category Hub Router (`CategoryHubPage.tsx`):**
   A dynamic, reusable academic hub view that renders the category overview, specific sub-tabs (e.g. `/innovation/incubation`), active initiatives, key leaders, and related resources when accessed.
3. **Dedicated Pages for Specific Verticals:**
   - `/apps` and `/apps/:slug` (Applications catalog & details)
   - `/experts` (Directory filterable by the 12 resource domains & 6 roles)
   - `/journals/:slug` (JAIR & JAIRIC editorial profiles)
   - `/datasets` (Dataset repository with access control badges)
   - `/young-scientists` (Young scientist fellowship hub)
   - `/automation` (Automation center dashboard & workflows)
4. **Desktop Mega-Menu Component (`DesktopMegaMenu.tsx`):**
   - Positioned in the navbar.
   - Clean top-level trigger bar: allows immediate access to primary categories while offering an expansive "10 Institute Hubs" mega-panel with category tabs, deep links, domain tags, and search.
5. **Mobile Navigation Accordion (`MobileNavDrawer.tsx`):**
   - Supports smooth nested accordions for all 10 categories without viewport clipping.

---

## 3. Plan Decomposition

- **Plan 02-01: Navigation Schema & Hub Routing Engine**
  - Create `src/data/navigation.ts` with all 10 categories, subsections, and validated paths.
  - Create `src/pages/public/CategoryHubPage.tsx` to handle category sub-routes.
  - Create dedicated placeholder/hub pages: `Datasets.tsx`, `Journals.tsx`, `YoungScientists.tsx`, `Experts.tsx`, `AutomationCenter.tsx`.
  - Wire all new routes in `src/App.tsx`.

- **Plan 02-02: Desktop Mega-Menu, Mobile Accordion & Zero-Dead-Link Verification**
  - Build `DesktopMegaMenu.tsx` with high-fidelity academic styling, active indicator, and keyboard accessibility.
  - Build `MobileNavDrawer.tsx` with collapsible category accordions.
  - Integrate both into `Navbar.tsx`.
  - Perform route audit and run `tsc --noEmit` & `vite build` verification.
