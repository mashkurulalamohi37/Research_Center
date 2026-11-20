# Phase 6 Plan: Navbar Flow Architecture & Logo Brand Cleanliness

## Phase Goal
Eliminate navbar overlap on the home dashboard by transitioning to a natural flex-flow header (`w-full shrink-0`) on `/` so the hero section and left rail start directly from the bottom edge of the navbar without hardcoded padding-top offsets. Update `Logo.tsx` to omit the `INSTITUTE` badge so the top-left displays only the circular seal graphic and `AIRIC`.

## Requirements Addressed
- **REQ-NAV-01**: Navbar must NOT block or cover any part of the hero section or the left navigation rail.
- **REQ-NAV-02**: On the home dashboard, content stage starts directly from the bottom edge of the navbar using native flex flow (`shrink-0` header + `flex-1 min-h-0` main) with zero `pt-[...]` magic numbers.
- **REQ-NAV-03**: `Logo.tsx` displays ONLY the circular AIRIC seal and the acronym `AIRIC` (removes `INSTITUTE` badge).

---

## Tasks

### Task 1: Update `Logo.tsx`
- **File**: `src/components/ui/Logo.tsx`
- **Action**: Add `showBadge?: boolean` (default `false`) and only show `INSTITUTE` when explicitly requested. By default, render only the circular seal and the acronym `AIRIC`.

### Task 2: Update `Navbar.tsx` for Context-Aware Positioning
- **File**: `src/components/layout/Navbar.tsx`
- **Action**:
  - Detect `location.pathname === '/'`.
  - When on the home page (`/`), render `<header className="w-full shrink-0 z-40 shadow-xs">` (natural flex flow item).
  - When on other routes, render `<header className="fixed top-0 left-0 right-0 z-40 shadow-xs">` (fixed navigation for scrolling pages).

### Task 3: Update `Layout.tsx` for Zero-Offset Main Container
- **File**: `src/components/layout/Layout.tsx`
- **Action**:
  - For `isHome`: Remove `pt-[82px] sm:pt-[88px]`. `<main>` becomes `<main className="flex-1 min-h-0 overflow-hidden flex flex-col">`.
  - Content now starts immediately from the bottom edge of the navbar.

---

## Verification Criteria
- [ ] Header logo displays ONLY circular seal and acronym `AIRIC` (no `INSTITUTE` badge).
- [ ] Left sidebar (`● 10 DIVISIONS ALL ->`) is 100% visible with zero top clipping.
- [ ] Center hero section starts directly from the bottom edge of the navbar with zero overlap.
- [ ] TypeScript check and Vite build succeed.
