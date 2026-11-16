# Requirements: Mobile & Multi-Device Fluency (Milestone 3)

## Active Milestone Objective
Transform the AIRIC web platform into a fluid, fast, and accessible multi-device experience across all phone and tablet form factors without breaking the pristine `100vh` desktop zero-scroll dashboard. Move the left 10-division navigation into an intuitive, high-performance mobile drawer; adapt the homepage layout to a natural vertical card flow on smaller screens; optimize touch targets and lightweight rendering; and systematically verify UI on all target screen sizes.

---

## Active Requirements (Milestone 3)

### 1. Unified Mobile Navigation & Drawer (`MOB_NAV`)
- **REQ-MOB-01**: On screens `< 1024px` (tablets and phones), the pinned left `DivisionsNavRail` is hidden from the main view and accessible through the top hamburger menu.
- **REQ-MOB-02**: The `MobileNavDrawer` provides a clean tabbed or segmented structure allowing mobile users to effortlessly switch between **"10 Divisions"** and **"Institute Hubs & Pages"**.
- **REQ-MOB-03**: Division items in the mobile drawer display titles, subtitles, and touch-expandable sub-disciplines/capabilities, eliminating any hover dependency.
- **REQ-MOB-04**: The top navbar on mobile and tablet retains the AIRIC seal logo, quick search button, theme toggle, and hamburger button cleanly in one row without wrapping or collision.

### 2. Responsive Homepage Layout Flow (`RESP_LAYOUT`)
- **REQ-LAY-01**: On desktop (`>= 1024px`), the homepage maintains its zero-scroll `100vh` layout with the left rail, center hero, and bottom-right video carousel intact.
- **REQ-LAY-02**: On mobile & tablet (`< 1024px`), the homepage transitions seamlessly into a smooth natural vertical scroll layout (`overflow-y-auto min-h-screen`) where users scroll down naturally through:
  1. Center Hero Stage (hero title, pillar chips, CTAs, telemetry counters).
  2. Featured Video Carousel (touch-swipeable / button controllable, properly aspect-ratio scaled).
  3. Quick-access Division badges/cards.
- **REQ-LAY-03**: The outer container strictly enforces `overflow-x: hidden` to eliminate horizontal scrollbars on all mobile viewports.

### 3. Typography, Touch Targets & Lightweight Performance (`TOUCH_PERF`)
- **REQ-PRF-01**: All interactive buttons, tabs, accordions, and links meet WCAG touch target standards (minimum `44x44px` or comfortably padded hit areas).
- **REQ-PRF-02**: Hero typography and telemetry badges scale responsively (`text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px]`) so text never clips or overflows viewport boundaries.
- **REQ-PRF-03**: Animations, backdrop blurs, and re-renders are optimized for mobile GPUs, ensuring fast initial load and 60fps scrolling.

### 4. Device-by-Device UI Verification (`DEVICE_VERIFY`)
- **REQ-DEV-01**: Verify UI on **320px** (Compact Mobile / iPhone SE 1st gen).
- **REQ-DEV-02**: Verify UI on **375px & 390px** (Standard Mobile / iPhone 12/13/14/15).
- **REQ-DEV-03**: Verify UI on **412px** (Modern Android Flagships / Pixel & Galaxy).
- **REQ-DEV-04**: Verify UI on **768px** (Tablet Portrait / iPad Mini / Air).
- **REQ-DEV-05**: Verify UI on **1024px** (Tablet Landscape & Compact Laptops).
- **REQ-DEV-06**: Verify complete TypeScript and Vite build passes with zero errors (`npm run build`).
