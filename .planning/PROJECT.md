# Project: AIRIC Web Platform

## Vision & Objective
Build a world-class, ultra-responsive web platform for AIRIC (Advanced Intelligence Research, Innovation & Commercialization Institute) that works fluently and flawlessly across desktop, tablet, and mobile devices:
1. **Desktop (>= 1024px)**: Single-page, full-viewport (`100vh`) dashboard with non-blocking navbar, 10-division left navigation rail, center hero stage, and interactive bottom-right video carousel with zero outer scroll.
2. **Mobile & Tablet (< 1024px)**: Clean, high-performance, fluid natural vertical scroll layout with unified hamburger navigation integrating the 10 Divisions and Institutional Hubs, zero UI breakage, touch-optimized ergonomics, and fast lightweight rendering.

---

## Current Milestone: v1.4 Experts Directory Roster Alignment

**Goal:** Remove all demo accounts and unconfirmed personnel from the Experts tab, and establish a verified directory highlighting authentic institute appointments.

**Target features:**
- Remove all 16 demo accounts from the Experts network directory (`src/data/researchers.ts` and `src/pages/public/Experts.tsx`).
- Remove Prof. Dr. S.M. Jahangir Alam and Dr. Engr. Mohammed Sowket Ali from the directory and related references.
- Present verified leadership appointments: Prof. Dr. Hu Guoqing (Chief Advisor) and Lt Col Md Shameem Reza, PhD (retd) (Executive Advisor).
- Update directory UI statistics, section categories, and graceful empty states for disciplines currently undergoing open appointments.

---

## Completed Milestones
1. **AIRIC Full-Viewport Single-Page Experience** (Phases 1-5 completed 2026-11-16).
2. **Navbar Non-Blocking & Hero Viewport Alignment** (Phases 6-8 completed 2026-11-16).
3. **Mobile & Multi-Device Fluency** (Phases 9-12 completed 2026-11-19).

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
