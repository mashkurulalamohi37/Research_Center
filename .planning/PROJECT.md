# Project: AIRIC Web Platform

## Vision & Objective
Build a world-class, ultra-responsive web platform for AIRIC (Advanced Intelligence Research, Innovation & Commercialization Institute) that works fluently and flawlessly across desktop, tablet, and mobile devices:
1. **Desktop (>= 1024px)**: Single-page, full-viewport (`100vh`) dashboard with non-blocking navbar, 10-division left navigation rail, center hero stage, and interactive bottom-right video carousel with zero outer scroll.
2. **Mobile & Tablet (< 1024px)**: Clean, high-performance, fluid natural vertical scroll layout with unified hamburger navigation integrating the 10 Divisions and Institutional Hubs, zero UI breakage, touch-optimized ergonomics, and fast lightweight rendering.

---

## Active Milestone: Mobile & Multi-Device Fluency (Milestone 3)

### Milestone Objective
Make the AIRIC web platform completely suitable and fluent on mobile and tablet devices of all variations (from 320px compact screens to 1024px tablets). Integrate the left 10-division navigation into a unified, high-performance mobile hamburger drawer with tabs/accordions. Adapt the homepage on mobile/tablet to a natural vertical flow while preserving desktop `100vh` zero-scroll. Eliminate any layout breaks, horizontal overflows, or touch friction, and verify every device profile one by one.

### Core Problems Addressed
1. **Desktop-Only Viewport Constraints**: The fixed `100vh` and pinned left rail currently clip content or force awkward scrolling on small screens and tablets.
2. **Left Navigation Rail on Small Screens**: The 10-division rail takes up full horizontal and vertical space on mobile and relies on desktop hover events. It must be collapsed into the mobile hamburger menu drawer.
3. **Touch Targets & Typography Scaling**: On small screens, font sizes, badge paddings, and button clusters need responsive scaling without wrapping awkwardly or breaking layouts.
4. **Performance & Lightweight Touch UX**: Heavy hover bridges and redundant menu structures must be replaced by streamlined mobile touch accordions with instantaneous response.
5. **Systematic Multi-Device Verification**: Every device form factor (320px, 375px/390px, 412px, 768px, 1024px) must be systematically verified with zero horizontal overflow.

---

## Completed Milestones
1. **AIRIC Full-Viewport Single-Page Experience** (Phases 1-5 completed 2026-11-16).
2. **Navbar Non-Blocking & Hero Viewport Alignment** (Phases 6-8 completed 2026-11-16).
