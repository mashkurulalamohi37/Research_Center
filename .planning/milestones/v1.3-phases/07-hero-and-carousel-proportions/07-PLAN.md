# Phase 7 Plan: Hero & Studio Video Carousel Viewport Proportions Tuning

## Phase Goal
Calibrate the vertical layout and dimensions across `Home.tsx`, `CenterHeroStage.tsx`, and `StudioVideoCarousel.tsx` so the hero section starts directly from the nav bar at the top, and the bottom-right studio video carousel fits comfortably with its timeline scrubber 100% visible, ensuring zero clipping and zero outer scrolling.

## Requirements Addressed
- **REQ-HERO-01**: Hero section starts cleanly directly below the navbar (top-aligned, not vertically centered into the carousel).
- **REQ-HERO-02**: Compact refined margins in `CenterHeroStage.tsx` so all components (badge, heading, tagline, pillars, buttons, and telemetry strip) are fully visible.
- **REQ-CAR-01 / REQ-CAR-02**: `StudioVideoCarousel.tsx` height calibrated (`h-[260px]` to `h-[335px]`) so timeline and controls are 100% visible above the bottom edge.

---

## Tasks

### Task 1: Update `CenterHeroStage.tsx`
- **File**: `src/components/home/CenterHeroStage.tsx`
- **Action**:
  - Set container to `w-full flex flex-col justify-start px-2 sm:px-4 py-1`.
  - Tune headline to `text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] leading-[1.15] mb-2`.
  - Set compact margins on badge (`mb-2`), tagline (`mb-2.5`), pillars (`mb-2.5`), action buttons (`mb-2.5`), and telemetry (`pt-2`).

### Task 2: Update `StudioVideoCarousel.tsx` Sizing
- **File**: `src/components/home/StudioVideoCarousel.tsx`
- **Action**:
  - Ensure the internal canvas and stock clips drawer flex responsively within the height budget.
  - Keep transport and timeline controls always pinned and fully rendered.

### Task 3: Update `Home.tsx` Layout
- **File**: `src/pages/public/Home.tsx`
- **Action**:
  - Set hero container to `shrink-0 w-full pt-1 pb-2` starting directly from the nav bar.
  - Set carousel container to `w-full max-w-3xl xl:max-w-4xl ml-auto h-[260px] sm:h-[285px] md:h-[310px] xl:h-[335px] shrink-0 z-10`.

---

## Verification Criteria
- [ ] Hero section begins immediately at the top below the navbar.
- [ ] Institutional telemetry strip is 100% visible and not covered by carousel.
- [ ] Entire studio video carousel including timeline bar is 100% visible above screen bottom.
- [ ] Zero outer vertical scrollbars on desktop.
