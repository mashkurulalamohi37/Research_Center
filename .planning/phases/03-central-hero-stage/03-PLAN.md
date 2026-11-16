# Phase 3 Plan: Central Hero Stage with Full Institutional Typography

## Phase Goal
Construct the central hero stage component prominently featuring the full organization name "Advanced Intelligence Research Innovation Commercialization Institute" with clean, high-contrast modern typography as the primary focal point matching the user wireframe, complemented by institutional mission badges, 4 core pillars, action CTAs, and telemetry metrics.

## Requirements Addressed
- **REQ-CTR-01**: Prominently display the full organization name in the center stage: **"Advanced Intelligence Research Innovation Commercialization Institute"**.
- **REQ-CTR-02**: Style as the primary focal point with clean, high-contrast modern typography, subtle gradient/glow highlights, and institutional tagline.
- **REQ-CTR-03**: Include primary action buttons (`Explore 10 Divisions`, `Proprietary Applications`, `Scientific Research`).

---

## Tasks

### Task 1: Build `CenterHeroStage.tsx` Component
- **File**: `src/components/home/CenterHeroStage.tsx`
- **Action**:
  - Implement prominent institutional heading:
    `"Advanced Intelligence Research Innovation Commercialization Institute"`
    matching the wireframe focal position with high-contrast typography, electric cyan/sky accents, and crisp font hierarchy.
  - Add official status pill:
    `OFFICIAL RESEARCH & COMMERCIALIZATION ECOSYSTEM` with pulsing cyan beacon.
  - Add institutional tagline:
    `"Bridging fundamental scientific breakthroughs, high-dimensional neural computing, and translational commercial enterprise to transform bold theoretical ideas into real-world impact."`
  - Add 4 Core Pillars micro-chips:
    `Research Excellence`, `Intelligent Technology`, `Entrepreneurial Innovation`, `Sustainable Impact`.
  - Add primary action button cluster:
    - `Explore 10 Divisions` (`/divisions`, cyan primary button)
    - `Proprietary Applications` (`/apps`, outline button)
    - `Scientific Research` (`/research`, ghost button)
  - Add compact institutional telemetry counter strip (`10 Divisions`, `10 Applications`, `280+ Publications`, `$4.2M Capital`).
- **Verification**: Confirm typography is high-contrast, perfectly legible, and prominent without spilling out of view.

### Task 2: Build Integrity & Type Safety Verification
- **Command**: `npm run build` (`tsc && vite build`)
- **Action**: Run TypeScript check and production build to confirm zero errors and clean bundling.
- **Verification**: Zero TypeScript diagnostics; production bundle generated cleanly.

---

## Verification Criteria
- [ ] Full organization name "Advanced Intelligence Research Innovation Commercialization Institute" is prominently displayed as the hero headline.
- [ ] Clean high-contrast typography matching the wireframe's central focal placement.
- [ ] 4 Core Pillars and telemetry badges render cleanly.
- [ ] CTAs navigate to `/divisions`, `/apps`, and `/research`.
- [ ] `npm run build` succeeds with zero errors.
