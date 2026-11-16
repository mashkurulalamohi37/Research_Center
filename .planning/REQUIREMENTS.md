# Requirements: Navbar Non-Blocking & Hero Viewport Alignment

## Active Milestone Objective
Resolve the navbar blocking issue on the home dashboard by establishing a seamless non-overlapping flex layout where the hero section and left rail start directly below the navbar; remove the `INSTITUTE` badge next to `AIRIC` in the header; and calibrate the vertical proportions of `CenterHeroStage` and `StudioVideoCarousel` so that all content (telemetry strip and timeline scrubber) fits completely within `100vh` without clipping or outer scrolling.

---

## Active Requirements (Milestone 2)

### 1. Navbar Flow & Non-Blocking Architecture (`NAV_FLOW`)
- **REQ-NAV-01**: The navbar must NOT block or cover any part of the hero section or the left division navigation rail.
- **REQ-NAV-02**: On the home dashboard, the content stage must start directly from the bottom edge of the navbar using a native flex flow (e.g. `shrink-0` header + `flex-1 min-h-0` main) instead of fragile hardcoded padding-top offsets.
- **REQ-NAV-03**: In `Logo.tsx` (and header context), display ONLY the circular AIRIC seal and the acronym `AIRIC`. Remove the `INSTITUTE` badge and any full-name subtitles from the header.

### 2. Hero Section Alignment & Vertical Budgeting (`HERO_ALIGN`)
- **REQ-HERO-01**: The hero section starts cleanly directly below the navbar with appropriate breathing room and zero occlusion.
- **REQ-HERO-02**: Tune vertical margins and font scale in `CenterHeroStage.tsx` (`text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px]`) so that:
  - Official ecosystem beacon badge is visible.
  - Organization title is prominent and focal.
  - Mission tagline is visible.
  - 4 core pillar chips are visible.
  - Action button cluster is visible.
  - Institutional telemetry counter strip is fully visible and NOT cut off.

### 3. Studio Video Carousel Containment (`CAROUSEL_FIT`)
- **REQ-CAR-01**: `StudioVideoCarousel.tsx` fits cleanly in the bottom-right quadrant with an optimized responsive height (`h-[270px]` to `h-[320px]`).
- **REQ-CAR-02**: The bottom timeline track (`Timeline`, `+ Add Scene`, scene tracks, and scrubber) must remain 100% visible above the bottom edge of the viewport with zero clipping.

### 4. Build & Runtime Integrity (`VERIFICATION`)
- **REQ-VER-01**: TypeScript and Vite build passes with zero errors (`npm run build`).
- **REQ-VER-02**: Desktop view on localhost has strictly zero outer vertical scrollbars and zero clipped elements.

---

## Previous Completed Milestone Requirements
*(See git history and .planning/phases/01-05 for completed Phase 1 through Phase 5 requirements)*
