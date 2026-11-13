# Roadmap: AIRIC Institute Platform Refactor

## Overview

This roadmap orchestrates the end-to-end refactoring and expansion of the IRICC website into the complete **AIRIC Institute (Advanced Intelligence Research, Innovation & Commercialization Institute)** platform. The implementation is broken into 6 cohesive, verifiable phases executing in strict sequence from institutional branding and 10-category zero-dead-link navigation to the 10-application portfolio, 10-division organizational matrix, rich academic homepage modules, and rigorous verification.

---

## Phases

- [x] **Phase 1: Brand & Hero Identity Architecture** — Rebranding, institutional top header, hero banner, 4 Core Pillars bar, and design tokens.
- [x] **Phase 2: Complete 10-Category Navigation System (Zero Dead '#' Links)** — Mega-menus, multi-level dropdowns, mobile navigation drawer, and full routing coverage for all 10 categories.
- [x] **Phase 3: Dedicated Application Portfolio (`/apps` & `/apps/:slug`)** — Product catalog, individual deep-dive pages for all 10 applications with custom vector icons and technical specifications.
- [ ] **Phase 4: Organizational Ecosystem Matrix (10 Divisions)** — Institutional ecosystem grid, interactive division explorer, and operational mandate documentation.
- [ ] **Phase 5: Academic Repositories & Advanced Homepage Sections** — Featured Research, Meet Our Experts (12 disciplines), Young Scientist Programme, Innovation Showcase (TRL), Research Funding, Dataset Repository (access badges), and Academic Journals (JAIR & JAIRIC).
- [ ] **Phase 6: Verification, Type-Safety & Build Integrity** — Link audit across all 10 navigation pillars, responsiveness testing, zero TypeScript errors (`tsc --noEmit`), and Vite production build.

---

## Phase Details

### Phase 1: Brand & Hero Identity Architecture
**Goal**: Establish authoritative AIRIC institutional identity across headers, hero banner, core pillars, and theme tokens.  
**Depends on**: Nothing (Initial Phase)  
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04  
**Success Criteria**:
  1. Top Header displays `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER` with official metadata styling.
  2. Hero section displays Title `Transforming Ideas into Real-World Impact` and Subtitle `Intelligent Research • Innovation • Commercialization`.
  3. 4 Core Pillars Bar renders prominently with active navigation: `Research Excellence | Intelligent Technology | Entrepreneurial Innovation | Sustainable Development`.
  4. Brand color tokens (deep navy, crisp slate, electric cyan) applied consistently with zero visual regressions.
**Plans**: 1 plan

Plans:
- [ ] 01-01: Update global branding, TopHeaderBar, HeroSection with 4 Pillars bar, and CSS variables.

---

### Phase 2: Complete 10-Category Navigation System (Zero Dead '#' Links)
**Goal**: Implement comprehensive desktop mega-menus and mobile navigation covering all 10 categories and sub-levels with verified active routing.  
**Depends on**: Phase 1  
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, NAV-07, NAV-08, NAV-09, NAV-10, NAV-11  
**Success Criteria**:
  1. Category 01 through Category 10 are fully navigable from desktop mega-menu dropdowns and mobile navigation drawer.
  2. Zero dead `#` links exist; every link targets a valid route, subpage, or anchored section.
  3. RICC Resource Persons Directory supports filtering across all 12 defined domains (AI, Quantum, Cyber, Data, Healthcare, etc.).
  4. Mobile drawer allows expanding sub-categories without overflow clipping or broken layouts.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Define unified navigation schema in `src/data/navigation.ts` and build desktop mega-menu component.
- [ ] 02-02: Implement mobile multi-level drawer and connect all routes/anchors in `src/App.tsx`.

---

### Phase 3: Dedicated Application Portfolio (`/apps` & `/apps/:slug`)
**Goal**: Deliver a comprehensive interactive showcase and individual product pages for all 10 proprietary applications.  
**Depends on**: Phase 2  
**Requirements**: APPS-01, APPS-02, APPS-03  
**Success Criteria**:
  1. `/apps` catalog page lists all 10 applications with custom vector icons, category badges, and quick descriptions.
  2. All 10 individual product routes (`/apps/bchat`, `/apps/myhealth`, `/apps/bsmart`, `/apps/mymedicine`, `/apps/examscriptai`, `/apps/baustai`, `/apps/myheart`, `/apps/flowerdoctor`, `/apps/flowerdoctorai`, `/apps/flowerdoctorbd`) render dedicated pages with architecture specs, features, target users, and demo actions.
  3. Status badges (`Production`, `Beta`, `Clinical Trial`, `Research Prototype`) render accurately.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Build complete applications dataset in `src/data/applications.ts` and custom vector icons component.
- [ ] 03-02: Implement `/apps` catalog page and dynamic `/apps/:slug` product detail page component.

---

### Phase 4: Organizational Ecosystem Matrix (10 Divisions)
**Goal**: Build the 10-division organizational ecosystem grid and detailed division profiles.  
**Depends on**: Phase 3  
**Requirements**: DIV-01, DIV-02  
**Success Criteria**:
  1. Interactive 10-division grid displays on Homepage and dedicated `/divisions` page.
  2. All 10 divisions (Research, Innovation, Entrepreneurship, Commercialization, AI & Quantum, Cybersecurity, Data & Analytics, Healthcare, Education, Wellbeing) have complete profiles detailing mandate, projects, and leadership.
  3. Cross-linking between divisions, associated applications, and research projects is functional.
**Plans**: 1 plan

Plans:
- [x] 04-01: Create divisions dataset and build `EcosystemGrid` component and `/divisions` dedicated explorer page.

---

### Phase 5: Academic Repositories & Advanced Homepage Sections
**Goal**: Implement all requested academic research sections on the Homepage and dedicated repository views.  
**Depends on**: Phase 4  
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08  
**Success Criteria**:
  1. Homepage includes all 10 required academic sections: Hero, Ecosystem Grid, Featured Research, Applications Showcase, Meet Our Experts, Young Scientist Programme, Innovation Showcase, Research Funding, Dataset Repository, and Journals (JAIR & JAIRIC).
  2. Dataset Repository renders access-control badges (`Open Access`, `Academic License`, `Restricted Healthcare`) and download/request flows.
  3. Dedicated JAIR and JAIRIC journal views render editorial board, ISSN, indexing metrics, and call for papers.
  4. Meet Our Experts section allows filtering researchers by domain and role.
**Plans**: 2 plans

Plans:
- [x] 05-01: Build dataset, journal, and funding datasets and create homepage section components.
- [x] 05-02: Assemble all sections into `Home.tsx` and create dedicated subpages (`/datasets`, `/journals/jair`, `/journals/jairic`, `/young-scientists`).

---

### Phase 6: Verification, Type-Safety & Build Integrity
**Goal**: Perform exhaustive link audits, responsiveness testing, and verify production build pass.  
**Depends on**: Phase 5  
**Requirements**: SYS-01, SYS-02, SYS-03  
**Success Criteria**:
  1. `tsc --noEmit` passes with 0 errors.
  2. `vite build` completes successfully with optimized production bundles.
  3. Zero dead `#` links verified across all navigation dropdowns, footer links, and homepage buttons.
  4. Dark and light themes render with high contrast and zero unreadable text.
**Plans**: 1 plan

Plans:
- [x] 06-01: Audit all routes, verify TypeScript types, fix build warnings, and confirm zero-dead-link navigation.

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|---|---|---|---|
| 1. Brand & Hero Identity Architecture | 1/1 | Completed | 2026-11-13 |
| 2. 10-Category Navigation System | 2/2 | Completed | 2026-11-13 |
| 3. Dedicated Application Portfolio | 2/2 | Completed | 2026-11-14 |
| 4. Organizational Ecosystem Matrix | 1/1 | Completed | 2026-11-14 |
| 5. Academic Repositories & Homepage Modules | 2/2 | Completed | 2026-11-14 |
| 6. Verification & Build Integrity | 1/1 | Completed | 2026-11-14 |

---
*Roadmap completed: 2026-11-14 — 100% Verified*
