# Phase 2 Plan: 10-Division Left Navigation Rail with Subtitles & Hover Flyouts

## Phase Goal
Construct the vertical navigation sidebar on the left containing all 10 divisions with bold titles, descriptive subtitles (e.g. `Research Division / Scientific Research`), and chevron indicators (`v`) as shown in the wireframe, along with a floating glassmorphism app/tool flyout panel with a 250ms hover bridge delay.

## Requirements Addressed
- **REQ-SB-01**: Vertical navigation sidebar containing the exact 10 divisions in order.
- **REQ-SB-02**: Each division item displays its bold title, descriptive subtitle, and chevron indicator (`v`).
- **REQ-SB-03**: Hovering over any division smoothly opens a floating flyout panel displaying relevant apps and tools for that division.
- **REQ-SB-04**: 250ms hover bridge delay so the flyout remains open while the user moves their mouse into the dropdown panel.
- **REQ-SB-05**: Flyout items display app icon (`AppVectorIcon`), name, status badge, short description, and direct link to `/apps/:slug`, plus a link to `/divisions`.

---

## Tasks

### Task 1: Create `DivisionFlyout.tsx` Component
- **File**: `src/components/home/DivisionFlyout.tsx`
- **Action**:
  - Accept props: `division: DivisionItem | null`, `anchorTop: number`, `onMouseEnter: () => void`, `onMouseLeave: () => void`.
  - Dynamically resolve `division.associatedApps` against `instituteApps` from `src/data/instituteApps.ts`.
  - Top header: Division number, title, category pill badge, and concise mandate statement.
  - Apps list: Render clickable cards with:
    - Bespoke vector icon via `<AppVectorIcon iconKey={app.iconKey} size="sm" accentColor={app.accentColor} />`
    - App title, status badge (`Production`, `Beta`, etc.)
    - Concise 1-line description
    - Direct link to `/apps/${app.slug}`
  - Footer link: "Explore Division Portal →" linking to `/divisions`.
  - Floating glassmorphism styling (`w-[360px]`-`w-[380px] bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/35 rounded-2xl shadow-2xl p-4 z-50 absolute left-[calc(100%+0.75rem)]`).
- **Verification**: Verify flyout renders cleanly with app cards and working links.

### Task 2: Build `DivisionsNavRail.tsx` Matching the Wireframe
- **File**: `src/components/home/DivisionsNavRail.tsx`
- **Action**:
  - Render the 10 official divisions with title, subtitle, and chevron:
    1. `Research Division` — *Scientific Research*
    2. `Innovation Division` — *Inventions & Rapid Prototyping*
    3. `Entrepreneurship Division` — *Startups & Venture Incubation*
    4. `Commercial Division` — *Technology Transfer & IP Licensing*
    5. `AI & Quantum Division` — *Artificial Intelligence & Quantum Systems*
    6. `Cybersecurity Division` — *Cyber Defense & Post-Quantum Cryptography*
    7. `Data and Analytics Division` — *Big Data & Analytical Intelligence*
    8. `Healthcare Division` — *Clinical AI & Digital Health Diagnostics*
    9. `Education Division` — *Academic Fellowships & AI Bootcamps*
    10. `Wellbeing Division` — *Mind Sciences & Cognitive Resilience*
  - Style each item as an editorial row with title on top, subtitle beneath, and `ChevronDown` on the right matching wireframe `media_1794782204305_f46bdcba.jpg`.
  - Implement active hover state and relative vertical anchor calculation.
  - Implement 250ms hover bridge debounce timer to prevent closing when moving the cursor across the gap into the flyout.
  - Render `<DivisionFlyout />` positioned adjacent to the active item.
- **Verification**: Test hover transitions; confirm 250ms delay keeps menu open during mouse movement.

### Task 3: Build Integrity & Type Safety Verification
- **Command**: `npm run build` (`tsc && vite build`)
- **Action**: Run TypeScript check and production build to confirm zero errors and clean bundling.
- **Verification**: Zero TypeScript diagnostics; production bundle generated cleanly.

---

## Verification Criteria
- [ ] 10 divisions render in the left navigation rail in specified order.
- [ ] Each division item features bold title, descriptive subtitle, and chevron indicator.
- [ ] Hovering opens the floating flyout panel immediately to the right.
- [ ] Flyout showcases associated apps with `AppVectorIcon`, status, description, and link to `/apps/:slug`.
- [ ] 250ms hover bridge prevents accidental closure when moving mouse to flyout.
- [ ] `npm run build` succeeds with zero errors.
