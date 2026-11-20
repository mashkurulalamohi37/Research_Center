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
- [x] Phase 9: Unified Mobile Navigation & Touch Drawer
- [x] Phase 10: Responsive Home Stage & Fluid Scroll Architecture
- [x] Phase 11: Video Carousel Mobile Adaptations & Touch Controls
- [x] Phase 12: Multi-Device Systematic Verification & Build Validation

---

## Milestone 4: Experts Directory Roster Alignment (Completed)

### Phase 13: Experts Directory Data & Personnel Alignment
- [x] Remove all 16 demo accounts from `src/data/researchers.ts`.
- [x] Remove Prof. Dr. S.M. Jahangir Alam and Dr. Engr. Mohammed Sowket Ali from `src/data/researchers.ts` and safeguard references in projects and publications.
- [x] Retain and configure verified appointments: Prof. Dr. Hu Guoqing (Chief Advisor) and Lt Col Md Shameem Reza, PhD (retd) (Executive Advisor).
- **Requirements**: REQ-EXP-01, REQ-EXP-02, REQ-EXP-03

### Phase 14: Experts Page UI Refinement & System Verification
- [x] Update `/experts` page UI headers, total specialists counters, and section statistics to match the live verified roster.
- [x] Provide elegant open-appointment / nomination notices for categories without active appointees.
- [x] Safeguard Home Showcase, search modals, and related components against missing researcher IDs.
- [x] Verify complete project build via `npm run build` with zero errors.
- **Requirements**: REQ-EXP-04, REQ-EXP-05, REQ-EXP-06, REQ-EXP-07, REQ-EXP-08
