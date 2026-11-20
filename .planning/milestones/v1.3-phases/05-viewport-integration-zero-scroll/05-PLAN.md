# Phase 5 Plan: Full-Viewport Integration, Zero-Scroll Shell & Verification

## Phase Goal
Integrate the 10-Division Left Rail (`DivisionsNavRail.tsx`), Central Hero Stage (`CenterHeroStage.tsx`), and Studio Video Carousel (`StudioVideoCarousel.tsx`) into `Home.tsx` and configure `Layout.tsx` for zero outer vertical scrolling (`100vh` / `overflow-hidden`) on desktop, suppressing outer footers on the home route, verifying exact visual alignment with the user wireframe, and confirming production build pass.

## Requirements Addressed
- **REQ-WS-01**: Single-page, full-viewport (`100vh` / `h-screen`) web interface with strictly zero outer vertical scrolling on desktop (`overflow-hidden`).
- **REQ-WS-02**: Modern dashboard grid layout dividing space into fixed top bar, left navigation rail, central hero stage, and bottom-right media module.
- **REQ-HDR-01 / REQ-HDR-02 / REQ-HDR-03**: Retain clean header with logo graphic and acronym `AIRIC` only, full top navigation links, and zero full org name text in the header.
- **REQ-SB-01 through REQ-SB-05**: 10 divisions in exact order with subtitles, chevrons, and 250ms hover bridge flyouts.
- **REQ-CTR-01 through REQ-CTR-03**: Prominent full organization name in center stage.
- **REQ-VID-01 through REQ-VID-03**: Compact, interactive video carousel in bottom-right quadrant.

---

## Tasks

### Task 1: Update `Layout.tsx` for Full-Viewport Home Containment
- **File**: `src/components/layout/Layout.tsx`
- **Action**:
  - Detect `location.pathname === '/'`.
  - When on the home page:
    - Apply `h-screen max-h-screen overflow-hidden flex flex-col` to root container.
    - Set `<main>` to `flex-1 min-h-0 pt-[88px] overflow-hidden flex flex-col`.
    - Omit `<Footer />` so it does not inject vertical scroll onto the desktop dashboard.
  - When on other routes:
    - Retain standard flexible layout with `<Footer />` and normal scrolling.
- **Verification**: On `/`, no scrollbars appear on desktop `100vh`.

### Task 2: Update `Home.tsx` with Dashboard Grid Architecture
- **File**: `src/pages/public/Home.tsx`
- **Action**:
  - Assemble:
    - Left column: `<DivisionsNavRail />` (`w-64` to `w-72`, fixed/fitted full height).
    - Right workspace area: `flex-1 min-w-0 h-full flex flex-col justify-between p-3 sm:p-5 overflow-hidden`.
      - Upper/Center: `<CenterHeroStage />`.
      - Bottom-Right: `<StudioVideoCarousel />` anchored to the right quadrant.
- **Verification**: Clean visual hierarchy, exact match with wireframe `media_1794782204305_f46bdcba.jpg`.

### Task 3: Production Build & Localhost Verification
- **Command**: `npm run build` (`tsc && vite build`)
- **Action**: Confirm zero TypeScript errors and successful production build.
- **Verification**: Build exits with code 0; dev server runs without errors.

---

## Verification Criteria
- [ ] On desktop (`lg+`), the home page fills `100vh` without outer page scrollbars.
- [ ] Top header has circular logo + `AIRIC` text only, keeping all navigation links intact.
- [ ] Left sidebar lists all 10 divisions with title + subtitle + chevron.
- [ ] Hovering over a division opens the app flyout panel with 250ms hover tolerance.
- [ ] Central stage prominently displays "Advanced Intelligence Research, Innovation & Commercialization Institute".
- [ ] Bottom-right quadrant houses the interactive `StudioVideoCarousel`.
- [ ] `npm run build` passes with zero errors.
