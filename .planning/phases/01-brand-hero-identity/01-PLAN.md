---
phase: 01-brand-hero-identity
plan: 01-01
wave: 1
depends_on: []
files_modified:
  - index.html
  - src/App.tsx
  - src/components/ui/Logo.tsx
  - src/components/layout/TopHeaderBar.tsx
  - src/components/layout/Navbar.tsx
  - src/components/layout/Layout.tsx
  - src/components/home/PillarsBar.tsx
  - src/pages/public/Home.tsx
  - src/index.css
autonomous: true
---

# Plan 01-01: Establish Authoritative AIRIC Brand & Hero Identity

## Objective
Establish the complete, official AIRIC institutional identity across the top header bar, logo component, hero section, and 4 Core Pillars bar according to strict client specifications.

---

## Tasks

<task id="1">
<title>Update Logo, Document Title & Core Brand Metadata</title>
<action>
1. Update `index.html`:
   - Title: `AIRIC Institute — Advanced Intelligence Research, Innovation & Commercialization Institute`
   - Meta description and OpenGraph tags to reflect AIRIC.
2. Update `src/components/ui/Logo.tsx`:
   - Primary text: `AIRIC`
   - Badge text: `INSTITUTE`
   - Subtitle: `Advanced Intelligence Research, Innovation & Commercialization Institute` (with responsive visibility).
3. Update `src/App.tsx`:
   - Update `PageLoader` label to: `Loading AIRIC…`
</action>
<verify>
Inspect `index.html`, `Logo.tsx`, and `App.tsx` to verify all IRICC branding strings have been cleanly updated to AIRIC.
</verify>
<done>
Global logo, loader, and document metadata accurately reflect AIRIC Institute.
</done>
</task>

<task id="2">
<title>Create TopHeaderBar Component & Integrate with Navbar / Layout</title>
<action>
1. Create `src/components/layout/TopHeaderBar.tsx`:
   - Institutional banner text: `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`
   - Include institutional live badges (e.g. `● GLOBAL RESEARCH INITIATIVE`), search shortcut trigger (`Ctrl+K`), quick portal links (Researcher, Admin), and language indicator.
   - Professional styling with high-density typography, border separators, and dark/light mode responsiveness.
2. Integrate `TopHeaderBar` in `src/components/layout/Navbar.tsx` or `src/components/layout/Layout.tsx` so it appears above the primary navigation bar.
3. Update `src/components/layout/Layout.tsx` main content padding (`pt-28` or `pt-32`) to ensure content does not overlap the sticky header stack.
</action>
<verify>
Check that the top header renders on all views with zero layout shifts or overlapping issues.
</verify>
<done>
TopHeaderBar displays official institution title above navigation on desktop and mobile.
</done>
</task>

<task id="3">
<title>Build 4 Core Pillars Bar Component</title>
<action>
1. Create `src/components/home/PillarsBar.tsx`:
   - 4 Pillars:
     1. `Research Excellence` (links to `/research`, icon: `GraduationCap` or `Award`)
     2. `Intelligent Technology` (links to `/technology`, icon: `Cpu` or `Sparkles`)
     3. `Entrepreneurial Innovation` (links to `/innovation`, icon: `Lightbulb` or `Rocket`)
     4. `Sustainable Development` (links to `/commercialization`, icon: `Globe` or `Leaf`)
   - Responsive grid (4 columns on lg, 2 on sm, 1 on xs).
   - Glassmorphism/academic card aesthetic with subtle hover glow and forward arrows.
</action>
<verify>
Test `PillarsBar` links and hover states; confirm responsive behavior across mobile and desktop.
</verify>
<done>
4 Core Pillars Bar is interactive, accessible, and correctly links to primary discipline hubs.
</done>
</task>

<task id="4">
<title>Update Homepage Hero with Official Headline, Subtitle, and Pillars</title>
<action>
1. In `src/pages/public/Home.tsx`:
   - Update Hero Title to: `Transforming Ideas into Real-World Impact`
   - Update Hero Subtitle to: `Intelligent Research • Innovation • Commercialization`
   - Update description paragraph to emphasize cutting-edge AI, quantum computing, digital healthcare, and deep-tech commercialization.
   - Insert `<PillarsBar />` directly below the hero call-to-actions.
   - Keep the interactive `HeroCanvas` background and scientific grid intact.
</action>
<verify>
Check `src/pages/public/Home.tsx` rendering and ensure typography hierarchy is balanced and high-impact.
</verify>
<done>
Hero section presents the exact client-specified Title, Subtitle, and 4 Core Pillars.
</done>
</task>

<task id="5">
<title>Build & Type-Check Verification</title>
<action>
Run `npx tsc --noEmit` and `npx vite build` to ensure all changes compile cleanly with zero TypeScript errors or broken imports.
</action>
<verify>
Terminal output confirms 0 TypeScript errors and Vite build succeeds.
</verify>
<done>
Phase 1 code is fully type-safe and builds successfully.
</done>
</task>

---

## Verification Criteria

- [x] **Top Header**: Text is exactly `AIRIC — ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER`.
- [x] **Hero Title**: Text is exactly `Transforming Ideas into Real-World Impact`.
- [x] **Hero Subtitle**: Text is exactly `Intelligent Research • Innovation • Commercialization`.
- [x] **4 Pillars**: Displays all 4 pillars (`Research Excellence`, `Intelligent Technology`, `Entrepreneurial Innovation`, `Sustainable Development`) with active navigation targets.
- [x] **Logo**: Displays `AIRIC` with `INSTITUTE` badge and `Advanced Intelligence Research, Innovation & Commercialization Institute`.
- [x] **Build**: `tsc --noEmit` and `vite build` succeeded with code 0.
