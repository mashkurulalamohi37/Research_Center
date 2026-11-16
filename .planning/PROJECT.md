# Project: AIRIC Web Platform

## Vision & Objective
Build a world-class, single-page, full-viewport (`100vh`) dashboard web interface for AIRIC (Advanced Intelligence Research, Innovation & Commercialization Institute) with zero outer vertical scrolling on desktop, featuring:
1. Fixed/structured top navigation bar displaying ONLY the circular logo and text acronym `AIRIC` (no long full name).
2. 10-division left navigation rail with subtitles, chevrons, and 250ms hover flyout app menus.
3. Central hero stage prominently displaying "Advanced Intelligence Research, Innovation & Commercialization Institute" starting cleanly from the navbar.
4. Bottom-right interactive studio video carousel module with scene switching and timeline controls.

---

## Active Milestone: Navbar Non-Blocking & Hero Viewport Alignment

### Milestone Objective
Eliminate navbar overlap and blocking of the hero section and left navigation rail. Ensure the hero section and left rail start directly from the bottom edge of the navbar in natural flex flow. Remove the extra `INSTITUTE` badge from the header logo. Calibrate vertical proportions across the hero stage and the bottom-right studio video carousel so that all content (including the telemetry strip and the carousel timeline) fits seamlessly within `100vh` without clipping or scrollbars.

### Core Problems Addressed (from User Feedback & Screenshot `media_1794796094756_fb1121cf.jpg`)
1. **Navbar Blocking Hero & Rail**: Fixed header with hardcoded `pt-[88px]` was shorter than actual header height (~104px), causing the top of the left sidebar (`10 DIVISIONS`) and the hero section to be partially hidden under the navbar.
2. **Hero Start Position**: The hero section must start directly from the bottom edge of the navbar with zero overlap.
3. **Header Logo Text**: In `Logo.tsx`, an `INSTITUTE` badge was displaying next to `AIRIC`, violating the strict rule to show only the logo graphic and acronym `AIRIC`.
4. **Vertical Viewport Sizing**: The telemetry strip and the studio video carousel timeline were partially clipped at the bottom due to excessive vertical margins.

---

## Completed Milestones
1. **AIRIC Full-Viewport Single-Page Experience** (Phases 1-5 completed 2026-11-16).
