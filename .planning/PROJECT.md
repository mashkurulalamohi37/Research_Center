# AIRIC Institute (Advanced Intelligence Research, Innovation & Commercialization Institute)

## What This Is

The **AIRIC Institute** platform is a comprehensive, modern academic research center web platform and portal. It refactors and expands the existing IRICC web codebase into an institutional digital presence representing advanced scientific research, cutting-edge AI, quantum computing, digital healthcare, innovation prototyping, technology commercialization, and educational programs according to strict client specifications.

## Core Value

Deliver a complete, production-grade, zero-dead-link research and commercialization platform with unified institutional branding, a 10-category multi-level navigation system, a 10-application dedicated showcase portfolio, an organizational ecosystem of 10 divisions, and comprehensive academic publication/dataset repositories.

## Business Context

- **Customer/Audience**: Global researchers, faculty, young scientists, students, industry partners, investors, healthcare professionals, and academic collaborators.
- **Mission Model**: Academic excellence, intellectual property generation, venture incubation, research commercialization, and open scientific publication.
- **Success Metric**: 100% route coverage across the 10 navigation pillars with zero dead `#` links, full 10-division organizational representation, 10 dedicated application showcases (`/apps` and `/apps/[slug]`), and high-fidelity institutional aesthetics matching client documentation.
- **Strategy Notes**: Grounded in client documentation `Advanced Intelligent Research Center (AIRC).md` and `AIRC Frontend Development Guide — Lovable.md`.

## Requirements

### Validated

- Existing baseline React 18 + Vite 6 + Tailwind CSS + Framer Motion structure with public and researcher/admin portals.
- Working theme context (Dark/Light mode) and client-side routing architecture.

### Active

- [ ] **Brand & Hero Identity**: Full rebranding to "AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER", Hero title "Transforming Ideas into Real-World Impact", subtitle "Intelligent Research • Innovation • Commercialization", and the 4 Core Pillars Bar.
- [ ] **10-Category Navigation Architecture**: Implement comprehensive mega-menus and mobile navigation covering all 10 categories and sub-levels with zero dead `#` links.
- [ ] **Dedicated Application Portfolio (`/apps` & `/apps/:slug`)**: Complete interactive showcase and dynamic detail routes for all 10 institutional applications with custom vector icons.
- [ ] **Organizational Ecosystem Matrix (10 Divisions)**: Interactive grid and dedicated views for Research, Innovation, Entrepreneurship, Commercialization, AI & Quantum, Cybersecurity, Data & Analytics, Healthcare, Education, and Wellbeing Divisions.
- [ ] **Comprehensive Academic Homepage Sections**: Featured Research, Our Applications, Meet Our Experts, Young Scientist Programme, Innovation Showcase, Research Funding, Dataset Repository with access-control badges, and Journals (JAIR & JAIRIC).
- [ ] **Resource Persons Directory & Expert Network**: Full directory filtering across 12 domain disciplines and 6 professional roles.
- [ ] **Centralized Data Stores & Services**: Normalized mock databases and service layer covering publications, projects, apps, datasets, team members, and events.

### Out of Scope (for current Frontend Refactoring Phase)

- Direct backend database connections (PostgreSQL/Supabase) and real FastAPI endpoints (frontend is structured for API integration via typed service adapters).
- Production payment gateway processing (UI/form submission workflows provided).
- External single sign-on / OAuth provider production credentials.

## Context

- **Predecessor codebase**: `IRICC` codebase built on React 18, Vite 6, Tailwind CSS 3.4, Lucide React, Framer Motion, and TanStack Query.
- **Client documentation**:
  - `Advanced Intelligent Research Center (AIRC).md` (comprehensive platform spec)
  - `AIRC Frontend Development Guide — Lovable.md` (detailed visual and technical guidance)
- **Target Aesthetic**: "Premium + Scientific + Minimal + Futuristic + Academic" — deep navy, crisp electric blue/cyan accents, elegant whitespace, sharp typography, and subtle micro-interactions without gaudy slop.

## Constraints

- **Tech Stack**: React 18, TypeScript, Vite 6, Tailwind CSS 3.4, React Router 6, Framer Motion 11, Lucide React icons.
- **Navigation Quality Bar**: Strict zero-dead-link policy; every navigation node must map to an active functional view, filter, or anchor.
- **Visual Design**: Strict adherence to client design rules: no cartoonish AI graphics, no broken layouts, proper dark/light mode parity.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Retain and extend React 18 + Vite SPA architecture | Proven fast dev cycle and clean route separation compatible with future FastAPI backend | ✓ Good |
| Modular data layer in `src/data/` | Decouples mock repositories from UI components for trivial migration to REST/GraphQL APIs | ✓ Good |
| Dedicated `/apps` and `/apps/:slug` routes | Ensures all 10 proprietary applications have dedicated landing pages, feature breakdowns, and metadata | ✓ Good |
| Multi-level Category-based Navigation Component | Handles the comprehensive 10-category system cleanly without UI clutter or mobile breakage | ✓ Good |

---
*Last updated: 2026-11-13 during /gsd-new-project initialization*
