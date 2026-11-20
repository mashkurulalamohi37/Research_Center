# Phase 1 Plan: Header Brand Refinement & Full Navigation Bar

## Phase Goal
Refine the header and navbar to display ONLY the circular AIRIC seal graphic and the text acronym `AIRIC` on the top left, strictly omitting the full organization name anywhere in the header/navbar, while preserving the complete top navigation links (`Home`, `10 Institute Hubs`, `Research`, `Applications`, `Publications`, `Projects`, `Experts`, `Explore`, `Search`, `Theme`, `Portal`, `Collaborate`) as shown in the user's wireframe.

## Requirements Addressed
- **REQ-HDR-01**: Display ONLY the AIRIC logo graphic and the text acronym `AIRIC` on the top left.
- **REQ-HDR-02**: STRICT RULE: Do NOT write out the full organization name anywhere in the header or navbar.
- **REQ-HDR-03**: Retain complete top navigation links (`Home`, `10 Institute Hubs`, `Research`, `Applications`, `Publications`, `Projects`, `Experts`, `Explore`, `Search`, `Theme`, `Portal`, `Collaborate`).

---

## Tasks

### Task 1: Enforce Strict Logo Graphic & Acronym in `Logo.tsx`
- **File**: `src/components/ui/Logo.tsx`
- **Action**:
  - Update `LogoProps` so `showSubtitle` defaults to `false`.
  - When `showSubtitle` is false, strictly omit the long string `"Advanced Intelligence Research, Innovation & Commercialization Institute"`.
  - Display the circular seal graphic (`/AIRIC-logo.jpg`), the bold acronym **`AIRIC`**, and the monospace `"INSTITUTE"` pill badge.
- **Verification**: Inspect navbar; ensure only the circular logo and `AIRIC` text render without subtitle.

### Task 2: Refactor `TopHeaderBar.tsx` to Exclude Full Organization Name
- **File**: `src/components/layout/TopHeaderBar.tsx`
- **Action**:
  - Replace the text `"ADVANCED INTELLIGENT RESEARCH • INNOVATION • COMMERCIALIZATION CENTER"` with official institutional metadata:
    `AIRIC • OFFICIAL RESEARCH & INNOVATION ECOSYSTEM`.
  - Retain the pulsing live beacon, quick hub links (`Research`, `Applications`, `10 Divisions`), quick search trigger, and role indicator.
  - Verify that the full organization name is not written out in the top bar.
- **Verification**: Confirm no spelled-out full name appears in `TopHeaderBar`.

### Task 3: Verify & Fine-Tune `Navbar.tsx` for Complete Navigation Bar
- **File**: `src/components/layout/Navbar.tsx`
- **Action**:
  - Ensure `<Logo size="md" showSubtitle={false} />` is rendered on the left.
  - Ensure all navigation links (`Home`, `10 Institute Hubs` mega-menu, `Research`, `Applications`, `Publications`, `Projects`, `Experts`, `Explore`, `Search`, `Theme`, `Portal`, `Collaborate`) render with proper spacing and alignment matching the user's wireframe.
  - Retain responsive mobile navigation drawer.
- **Verification**: Header matches top section of wireframe `media_1794782204305_f46bdcba.jpg`.

### Task 4: Build Integrity & Type Safety Verification
- **Command**: `npm run build` (`tsc && vite build`)
- **Action**: Run TypeScript compiler and production Vite build to ensure zero errors and clean bundling.
- **Verification**: Zero TypeScript diagnostics; production bundle generated successfully.

---

## Verification Criteria
- [ ] Top-left of header displays ONLY circular seal and acronym `AIRIC`.
- [ ] Full organization name is absent from top header and navbar.
- [ ] All top navigation links (`Home`, `10 Institute Hubs`, `Research`, `Applications`, `Publications`, `Projects`, `Experts`, `Explore`, `Search`, `Theme`, `Portal`, `Collaborate`) are functional.
- [ ] TypeScript check (`tsc --noEmit`) passes with zero errors.
