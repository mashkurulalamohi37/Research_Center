# Roadmap: AIRIC Web Platform

## Milestone 1: AIRIC Full-Viewport Single-Page Experience (Completed)
- [x] Phase 1: Header Brand Refinement & Full Navigation Bar
- [x] Phase 2: 10-Division Left Navigation Rail with Subtitles & Hover Flyouts
- [x] Phase 3: Central Hero Stage with Full Institutional Typography
- [x] Phase 4: Bottom-Right Studio Video Carousel Module
- [x] Phase 5: Full-Viewport Integration, Zero-Scroll Shell & Verification

---

## Milestone 2: Navbar Non-Blocking & Hero Viewport Alignment (Active)

### Phase 6: Navbar Flow Architecture & Logo Brand Cleanliness
**Goal**: Eliminate the navbar overlap on the home dashboard by transitioning to a natural flex flow header (`shrink-0` without hardcoded `pt-[...]` magic numbers), ensuring the hero section and left rail start directly at the navbar's bottom edge. Remove the `INSTITUTE` badge from `Logo.tsx`.  
**Requirements**: REQ-NAV-01, REQ-NAV-02, REQ-NAV-03  
**Success Criteria**:
1. Nav bar does not overlap or block any part of the left rail (`10 DIVISIONS`) or the center hero stage.
2. The hero section begins cleanly right from the bottom edge of the navbar.
3. Top-left logo shows circular seal and acronym `AIRIC` only (no `INSTITUTE` badge).

### Phase 7: Hero & Studio Video Carousel Viewport Proportions Tuning
**Goal**: Calibrate vertical spacing and heights across `CenterHeroStage.tsx`, `StudioVideoCarousel.tsx`, and `Home.tsx` so that all elements (including telemetry strip and timeline scrubber) are 100% visible within `100vh` without clipping or outer scrolling.  
**Requirements**: REQ-HERO-01, REQ-HERO-02, REQ-CAR-01, REQ-CAR-02  
**Success Criteria**:
1. `CenterHeroStage` fits comfortably in the upper section with all 4 pillars, CTAs, and telemetry strip fully visible.
2. `StudioVideoCarousel` is anchored in the bottom-right with its timeline bar fully visible above the bottom edge.
3. Desktop layout has zero outer vertical scrollbars and zero clipping.

### Phase 8: Verification & Visual Polish
**Goal**: Execute `npm run build` to verify zero TypeScript or packaging issues, check HMR on localhost:5173, and verify visual alignment with wireframe requirements.  
**Requirements**: REQ-VER-01, REQ-VER-02  
**Success Criteria**:
1. `npm run build` succeeds with zero errors.
2. Visual inspection confirms navbar non-blocking and seamless viewport fit.
