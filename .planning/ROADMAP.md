# Roadmap: AIRIC Web Platform

## Milestone 1: AIRIC Full-Viewport Single-Page Experience (Completed)
- [x] Phase 1: Header Brand Refinement & Full Navigation Bar
- [x] Phase 2: 10-Division Left Navigation Rail with Subtitles & Hover Flyouts
- [x] Phase 3: Central Hero Stage with Full Institutional Typography
- [x] Phase 4: Bottom-Right Studio Video Carousel Module
- [x] Phase 5: Full-Viewport Integration, Zero-Scroll Shell & Verification

---

## Milestone 2: Navbar Non-Blocking & Hero Viewport Alignment (Completed)
- [x] Phase 6: Navbar Flow Architecture & Logo Brand Cleanliness
- [x] Phase 7: Hero & Studio Video Carousel Viewport Proportions Tuning
- [x] Phase 8: Verification & Visual Polish

---

## Milestone 3: Mobile & Multi-Device Fluency (Completed)

### Phase 9: Unified Mobile Navigation & Touch Drawer
- [x] Integrate the 10-division navigation and institutional hubs into a unified, touch-optimized `MobileNavDrawer.tsx`. Ensure the top header bar on small devices has balanced spacing (Logo, Search, Theme toggle, Portal switch, Hamburger) with zero wrapping or touch conflicts.
- **Requirements**: REQ-MOB-01, REQ-MOB-02, REQ-MOB-03, REQ-MOB-04

### Phase 10: Responsive Home Stage & Fluid Scroll Architecture
- [x] Update `Layout.tsx`, `Home.tsx`, and `CenterHeroStage.tsx` so that `< 1024px` transitions to a natural vertical scroll layout with optimized typography and telemetry cards, while `>= 1024px` desktop maintains the pristine `100vh` zero-scroll dashboard.
- **Requirements**: REQ-LAY-01, REQ-LAY-02, REQ-LAY-03, REQ-PRF-02

### Phase 11: Video Carousel Mobile Adaptations & Touch Controls
- [x] Ensure `VideoCarousel.tsx` displays crisply on mobile screens with responsive height, touch-friendly play/pause/prev/next controls, legible badges, and lightweight performance without layout shifts.
- **Requirements**: REQ-PRF-01, REQ-PRF-03

### Phase 12: Multi-Device Systematic Verification & Build Validation
- [x] Systematically verify and test the UI across 5 device viewports (320px, 375px/390px, 412px, 768px, 1024px) using Chrome DevTools/DOM checks and execute `npm run build` with zero errors.
- **Requirements**: REQ-DEV-01, REQ-DEV-02, REQ-DEV-03, REQ-DEV-04, REQ-DEV-05, REQ-DEV-06
