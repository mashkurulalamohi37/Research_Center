# Project: AIRIC Web Platform

## Vision & Objective
Build a world-class, ultra-responsive web platform for AIRIC (Advanced Intelligence Research, Innovation & Commercialization Institute) that works fluently and flawlessly across desktop, tablet, and mobile devices:
1. **Desktop (>= 1024px)**: Single-page, full-viewport (`100vh`) dashboard with non-blocking navbar, 10-division left navigation rail, center hero stage, and interactive bottom-right video carousel with zero outer scroll.
2. **Mobile & Tablet (< 1024px)**: Clean, high-performance, fluid natural vertical scroll layout with unified hamburger navigation integrating the 10 Divisions and Institutional Hubs, zero UI breakage, touch-optimized ergonomics, and fast lightweight rendering.

---

## Current Milestone: v1.5 Appoint Mashkurul Alam Ohi as Scientist

**Goal:** Appoint and integrate Mashkurul Alam Ohi as a Scientist in the AIRIC faculty and Experts network directory, featuring his background in Natural Language Processing, Transformer models, and deep learning research.

**Target features:**
- Profile Data: Add Mashkurul Alam Ohi into `src/data/researchers.ts` with complete academic bio, education (BAUST CSE), research areas (NLP, Deep Learning, Text Classification), and publications.
- Experts Directory: Appoint him under the 'Scientist' discipline on the `/experts` directory page within Leadership & Research Faculty.
- Category UI & Metrics: Update the Scientist filter pill and counts so the category displays active appointment rather than the empty recruitment state.

---

## Completed Milestones
1. **AIRIC Full-Viewport Single-Page Experience** (Phases 1-5 completed 2026-11-16).
2. **Navbar Non-Blocking & Hero Viewport Alignment** (Phases 6-8 completed 2026-11-16).
3. **Mobile & Multi-Device Fluency** (Phases 9-12 completed 2026-11-19).
4. **Experts Directory Roster Alignment** (Phases 13-14 completed 2026-11-20).

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
