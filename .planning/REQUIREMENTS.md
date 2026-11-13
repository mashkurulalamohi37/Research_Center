# Requirements: AIRIC Institute Platform Refactor

**Defined:** 2026-11-13  
**Core Value:** Production-grade research and commercialization platform with unified AIRIC branding, 10-category multi-level navigation system with zero dead '#' links, 10 dedicated application showcases, 10-division organizational matrix, and comprehensive academic publication/dataset repositories.

---

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Brand & Institutional Identity (BRAND)

- [ ] **BRAND-01**: Top Header displays institutional identity: `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER` with official branding styling, metadata typography, and quick links.
- [ ] **BRAND-02**: Hero Section renders official Hero Title: `Transforming Ideas into Real-World Impact` and Subtitle: `Intelligent Research • Innovation • Commercialization`.
- [ ] **BRAND-03**: 4 Core Pillars Bar renders prominently with links/anchors: `Research Excellence | Intelligent Technology | Entrepreneurial Innovation | Sustainable Development`.
- [ ] **BRAND-04**: Global theme tokens ensure professional dark/light palette with deep navy, electric blue/cyan accents, and zero generic AI slop.

### 10-Category Navigation Architecture (NAV)

- [ ] **NAV-01**: **Category 01 (About IRICC/AIRIC)** mega-menu and links covering Core (Vision, Mission, Leadership, Research Team, Young Scientists), Leadership Roles, and the 12 RICC Resource Persons Directory domains with zero dead `#` links.
- [ ] **NAV-02**: **Category 02 (Research & Publications)** mega-menu and links covering Published Research, Present Research, Research Presentations, Completed Projects, Ongoing Projects, Journals (JAIR & JAIRIC), and Dataset Center.
- [ ] **NAV-03**: **Category 03 (Innovation & Entrepreneurship Center)** navigation covering Innovation Projects, Entrepreneurship Development, Startup Incubation, Young Innovators, Product Development, and Technology Transfer.
- [ ] **NAV-04**: **Category 04 (Commercialization Center)** navigation covering Business & Market, Fund & Collaboration, Industry Partnership, Intellectual Property, Research Commercialization, and Investment Opportunities.
- [ ] **NAV-05**: **Category 05 (Technology & Advanced Computing)** navigation covering AI, Quantum Computing, AI Cybersecurity Research, Cybersecurity Projects, Data Science & Analytics, Software Engineering, and Apps Development.
- [ ] **NAV-06**: **Category 06 (Education & Training)** navigation covering Professional Training, AI & Programming Courses, Research Methodology, Cybersecurity Training, Healthcare Technology Training, and Young Scientist Development.
- [ ] **NAV-07**: **Category 07 (Professional & Expert Network)** navigation covering AI Engineers, Cybersecurity Engineers, AI Cybersecurity Researchers, Data Analysts, Healthcare Engineers, and Doctors & Medical Consultants.
- [ ] **NAV-08**: **Category 08 (Health & Wellbeing)** navigation covering Digital Healthcare, Medical Consultation, Mental Wellbeing & Support, and Health Research & Innovation.
- [ ] **NAV-09**: **Category 09 (Contact & Collaboration)** navigation covering Become a Researcher, Become a Member, Submit a Research Proposal, Industry Collaboration, and Contact IRICC.
- [ ] **NAV-10**: **Category 10 (Automation Center)** navigation covering AI Automation Tools, Research Workflows, and Services Hub.
- [ ] **NAV-11**: Mobile navigation menu mirrors all 10 categories with smooth accordion or drawer expanders, keyboard navigability, and responsive collapse.

### Dedicated Application Portfolio (APPS)

- [ ] **APPS-01**: Dedicated Applications index page (`/apps`) featuring high-contrast interactive filterable cards for all 10 applications with custom vector icons.
- [ ] **APPS-02**: Dedicated dynamic product pages (`/apps/:slug`) with screenshots/mockups, architecture specs, technical capabilities, use cases, target users, and release notes for all 10 applications:
  - `bchat` (BChat)
  - `myhealth` (MyHealth)
  - `bsmart` (BSMART)
  - `mymedicine` (MyMedicine)
  - `examscriptai` (ExamScriptAI)
  - `baustai` (BAUSTAI)
  - `myheart` (MyHeart)
  - `flowerdoctor` (FlowerDoctor)
  - `flowerdoctorai` (FlowerDoctorAI)
  - `flowerdoctorbd` (FlowerDoctorBD)
- [ ] **APPS-03**: Application cards on Homepage and `/apps` show status badges (`Production`, `Beta`, `Clinical Trial`, `Research Prototype`) and category indicators.

### Organizational Ecosystem Matrix (DIV)

- [ ] **DIV-01**: Ecosystem overview component and dedicated views (`/divisions` or interactive modals/pages) detailing all 10 Divisions:
  1. Research Division
  2. Innovation Division
  3. Entrepreneurship Division
  4. Commercialization Division
  5. AI & Quantum Division
  6. Cybersecurity Division
  7. Data & Analytics Division
  8. Healthcare Division
  9. Education Division
  10. Wellbeing Division
- [ ] **DIV-02**: Each division profile outlines Mandate, Key Projects, Leadership, Associated Publications, and Active Initiatives.

### Academic Homepage Modules (HOME)

- [ ] **HOME-01**: Featured Research module with DOI links, citations count, publication date, and abstract expansion.
- [ ] **HOME-02**: Applications Showcase interactive previewing the 10 proprietary applications with direct links to `/apps/:slug`.
- [ ] **HOME-03**: Meet Our Experts & Resource Persons section highlighting leading faculty and domain researchers with discipline filtering.
- [ ] **HOME-04**: Young Scientist Programme showcase featuring student fellowship highlights, research achievements, and onboarding paths.
- [ ] **HOME-05**: Innovation & Incubation Showcase featuring Technology Readiness Levels (TRL) and prototype progress.
- [ ] **HOME-06**: Research Funding & Grants board displaying active grants, industry partners, and application deadlines.
- [ ] **HOME-07**: Dataset Repository preview with file size, license tier, domain tags, and access-control badges (`Open Access`, `Academic License`, `Restricted Healthcare`).
- [ ] **HOME-08**: Journals & Academic Publications spotlight featuring both JAIR and JAIRIC with ISSN, indexing info, and submission links.

### System, Responsive & Data Integrity (SYS)

- [ ] **SYS-01**: Complete type-safety across TypeScript models (`src/types/index.ts`) for all applications, divisions, journals, datasets, researchers, and publications.
- [ ] **SYS-02**: Zero broken route links or 404s across all navigation links, buttons, and card references.
- [ ] **SYS-03**: Clean build pass: `tsc --noEmit` and `vite build` complete without errors.

---

## v2 Requirements (Deferred to Future Milestones)

- **AUTH-PROD**: Live OAuth / SAML 2.0 integration for institutional single sign-on.
- **BACKEND-SYNC**: Active live WebSocket connection to FastAPI backend for real-time telemetry.
- **BILLING**: Live stripe/SSLCommerz payment gateway integration for course enrollments.

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| PostgreSQL database migrations | Current phase is dedicated strictly to client-facing frontend refactor and zero-dead-link platform implementation |
| Live SMS gateway for telemedicine | Form flows will be handled with simulated mock confirmations |
| Arbitrary third-party plugin integrations | Client requires self-contained, high-performance institutional portal |

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01, BRAND-02, BRAND-03, BRAND-04 | Phase 1 | Pending |
| NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, NAV-07, NAV-08, NAV-09, NAV-10, NAV-11 | Phase 2 | Pending |
| APPS-01, APPS-02, APPS-03 | Phase 3 | Pending |
| DIV-01, DIV-02 | Phase 4 | Pending |
| HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08 | Phase 5 | Pending |
| SYS-01, SYS-02, SYS-03 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0

---
*Requirements defined: 2026-11-13*  
*Last updated: 2026-11-13 after /gsd-new-project initialization*
