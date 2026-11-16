# Mobile & Multi-Device Fluency Design Specification

## Problem Statement
How might we transform the AIRIC platform into a fast, intuitive, and fluid multi-device experience across all screen sizes (phones 320px–480px, tablets 768px–1024px, and desktops >= 1024px) by collapsing the left division navigation into a unified touch drawer, adopting natural vertical flow on small screens while preserving zero-scroll on desktop, and systematically verifying each device viewport?

## Recommended Direction

### 1. Navigation Architecture (Unified Mobile Drawer)
- **Breakpoints**: 
  - `< 1024px (Mobile & Tablet)`: Hide pinned `DivisionsNavRail` on the page. In `Navbar.tsx`, the hamburger icon toggles `MobileNavDrawer.tsx`.
  - `MobileNavDrawer.tsx` includes an intuitive top segmented tab control:
    - **Tab 1: 10 Divisions** — lists all 10 divisions with numbered badges, titles, subtitles, and an expandable sub-discipline list with touch links.
    - **Tab 2: Institute Hubs & Pages** — includes primary links, 10 institutional hubs, portal switch, search button, and theme toggle.
  - `>= 1024px (Desktop)`: Pinned left rail remains active, full mega menu and explore dropdowns function as designed.

### 2. Homepage Flow & Layout (`Layout.tsx` & `Home.tsx`)
- On `< 1024px`:
  - The page switches from fixed `h-screen overflow-hidden` to `min-h-screen overflow-y-auto overflow-x-hidden`.
  - Content flows naturally:
    1. Top Header (`Navbar.tsx`) sticky/clean.
    2. Center Hero Stage (`CenterHeroStage.tsx`): scaled typography (`text-xl sm:text-2xl md:text-3xl lg:text-[34px]`), responsive pillar chips, CTA buttons, and responsive 2x2 or 4-column telemetry strip.
    3. Featured Video Carousel (`VideoCarousel.tsx`): responsive aspect ratio/height (`h-[220px] sm:h-[260px] md:h-[300px]`), thumb-friendly controls.
    4. Quick-access Division pill banner to easily open the division drawer or explore all divisions.
- On `>= 1024px`:
  - Strictly preserves desktop single-page `100vh` zero-scroll dashboard.

### 3. Touch Targets & Performance
- All interactive tap targets padded to $\ge 44\times 44\text{px}$.
- No hover bridge delay on mobile (immediate tap response).
- CSS hardware acceleration (`transform: translateZ(0)`) and reduced blur filter costs on low-power devices.
- `overflow-x: hidden` enforced on HTML/body and root containers.

### 4. Verification Viewport Matrix
1. **320px** — Ultra-compact (iPhone SE 1st gen / tiny fold)
2. **375px & 390px** — Standard modern iPhone (iPhone 13/14/15)
3. **412px** — Android flagship standard (Google Pixel / Samsung Galaxy)
4. **768px** — Tablet portrait (iPad Mini / iPad Air)
5. **1024px** — Tablet landscape / small laptop breakpoint transition
6. **Zero-error build** — `npm run build` verification
