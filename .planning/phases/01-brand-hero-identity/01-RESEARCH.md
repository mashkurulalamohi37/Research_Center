# Phase 1: Brand & Hero Identity Architecture — Research & Design

**Phase:** 01-brand-hero-identity  
**Created:** 2026-11-13  
**Status:** Complete  

---

## 1. Domain & Codebase Analysis

### Current State
1. **Logo & Identity:**
   - `src/components/ui/Logo.tsx` displays "IRICC" / "International Research & Innovation Center" with a badge "RESEARCH".
   - `src/App.tsx` PageLoader displays "Loading IRICC…".
   - `index.html` title is "IRICC — Intelligent Research, Innovation & Commercialization Center".
2. **Top Header:**
   - No top institution meta-bar exists above the navbar.
   - `src/components/layout/Navbar.tsx` is fixed at `top-0` with height around 64px (`pt-20` on `<main>`).
3. **Hero Section:**
   - In `src/pages/public/Home.tsx`, the hero displays:
     - Heading: "IRICC" / "Intelligent Research, Innovation & Commercialization Center"
     - Subheading: "A world-leading center uniting multidisciplinary scientific discovery..."
   - No 4 Core Pillars Bar exists.
4. **Theme & CSS Tokens:**
   - `src/index.css` defines base CSS variables and utilities: `.scientific-grid`, `.glow-cyan`, `.glow-blue`, etc.
   - Tailwind config has custom colors (`navy-900`, `navy-950`, `cyan-*`, etc.).

---

## 2. Target Design & Implementation Requirements

### Requirement BRAND-01: Top Header Bar
- **Text:** `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`
- **Location:** At the absolute top of the viewport as part of the header stack.
- **Styling:**
  - High-density institutional typography (uppercase tracking-widest, monospace or refined sans, font-bold, text-xs).
  - Subtle borders (`border-b border-slate-200 dark:border-slate-800/80`).
  - Dark mode: deep navy background `#070c18` with glowing cyan/amber dot indicator.
  - Light mode: crisp slate/off-white background `#f8fafc` with deep navy text.
  - Quick action links: Academic Calendar, Portal Switcher, Search trigger (`Ctrl+K`), Global Contact.

### Requirement BRAND-02: Hero Title & Subtitle
- **Title:** `Transforming Ideas into Real-World Impact`
  - Render with high-impact typography (`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight`).
  - Gradient or accented text styling with cyan/blue highlights.
- **Subtitle:** `Intelligent Research • Innovation • Commercialization`
  - Positioned prominently below the main headline (`text-xl sm:text-2xl font-semibold tracking-wide text-cyan-700 dark:text-cyan-400`).
- **Institutional Description:** Supporting paragraph detailing the multidisciplinary research mandate, technology commercialization, and deep-tech innovation.

### Requirement BRAND-03: 4 Core Pillars Bar
- **The 4 Pillars:**
  1. `Research Excellence` (links to `/research`)
  2. `Intelligent Technology` (links to `/technology`)
  3. `Entrepreneurial Innovation` (links to `/innovation`)
  4. `Sustainable Development` (links to `/commercialization` or `/about#sustainability`)
- **Visual Design:**
  - Floating or docked card strip beneath the hero CTAs or integrated as an anchor banner.
  - Interactive hover state: subtle border glow (`group-hover:border-cyan-500/50`), chevron/arrow indicator, micro-icon per pillar.
  - Responsive flex/grid (4 columns on `lg:`, 2 on `sm:`, 1 on `xs`).

### Requirement BRAND-04: Global Theme & Logo Identity
- Update `src/components/ui/Logo.tsx`:
  - Primary text: `AIRIC`
  - Badge: `INSTITUTE`
  - Subtitle: `Advanced Intelligence Research, Innovation & Commercialization Institute`
- Update `src/App.tsx` PageLoader to "Loading AIRIC…".
- Update `index.html` `<title>` to:
  `AIRIC Institute — Advanced Intelligence Research, Innovation & Commercialization Institute`
- Meta description and OpenGraph tags to match AIRIC.

---

## 3. Files Impacted

| File | Change |
|---|---|
| `src/components/layout/TopHeaderBar.tsx` | **Create** Top institutional identity header bar. |
| `src/components/layout/Navbar.tsx` | Integrate `TopHeaderBar`, adjust sticky/fixed offsets. |
| `src/components/layout/Layout.tsx` | Adjust padding-top (`pt-28` to `pt-32`) to accommodate dual header bar. |
| `src/components/ui/Logo.tsx` | Rebrand to AIRIC with updated badges and subtitles. |
| `src/components/home/PillarsBar.tsx` | **Create** 4 Core Pillars Bar component with active links. |
| `src/pages/public/Home.tsx` | Update Hero Title, Subtitle, description, and embed `PillarsBar`. |
| `src/App.tsx` | Update loader text and title. |
| `index.html` | Update page title and meta description. |
| `src/index.css` | Verify and fine-tune navy and cyan CSS tokens. |

---

## 4. Verification Plan

1. **Visual & Content Inspection:**
   - Verify top header displays: `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`.
   - Verify hero headline is: `Transforming Ideas into Real-World Impact`.
   - Verify hero subtitle is: `Intelligent Research • Innovation • Commercialization`.
   - Verify 4 pillars render: `Research Excellence`, `Intelligent Technology`, `Entrepreneurial Innovation`, `Sustainable Development`.
2. **Interactive & Responsive Verification:**
   - Click each pillar and confirm it navigates without reloading or breaking.
   - Verify mobile viewport: Top header shrinks gracefully, hamburger menu works without overlapping top banner.
3. **Type-Check & Build:**
   - Execute `tsc --noEmit` and confirm 0 errors.
   - Execute `npm run build` or `npx vite build` to confirm clean compilation.
