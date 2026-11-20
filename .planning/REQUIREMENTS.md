# Requirements: Experts Directory Roster Alignment (Milestone 4)

## Active Milestone Objective
Remove all demo accounts and unconfirmed personnel from the Experts tab (`/experts`), remove Prof. Dr. S.M. Jahangir Alam and Dr. Engr. Mohammed Sowket Ali, and align the Experts network page around verified leadership (Prof. Dr. Hu Guoqing and Lt Col Md Shameem Reza, PhD (retd)), while ensuring graceful UI states and zero application breakage.

---

## Active Requirements (Milestone 4)

### 1. Personnel Roster & Data Cleanup (`DATA_CLEANUP`)
- [ ] **REQ-EXP-01**: Remove all 16 demo accounts from the active experts directory (`src/data/researchers.ts`), ensuring placeholder names and stock profile cards (Sarah Lin, Marcus Vance, Elena Rostova, Alexander Weiss, etc.) are eliminated from the active directory.
- [ ] **REQ-EXP-02**: Remove Prof. Dr. S.M. Jahangir Alam and Dr. Engr. Mohammed Sowket Ali from the directory and resolve or gracefully safeguard any downstream relations (projects, publications, research areas).
- [ ] **REQ-EXP-03**: Retain verified leadership appointments: Prof. Dr. Hu Guoqing (Chief Advisor) and Lt Col Md Shameem Reza, PhD (retd) (Executive Advisor) with complete institutional bios, credentials, and contact cards.

### 2. Experts Page UI & Category Presentation (`UI_PRESENTATION`)
- [ ] **REQ-EXP-04**: Update the `/experts` directory header statistics, category counts, and section tallies to reflect the verified active specialists count rather than placeholder totals.
- [ ] **REQ-EXP-05**: For categories and sections currently without active appointees (e.g. disciplines with upcoming appointments), display an elegant, clean status badge / recruitment note instead of broken cards or raw empty screens.
- [ ] **REQ-EXP-06**: Ensure all category filters, search input, and section tabs function smoothly with zero runtime errors.

### 3. Cross-Platform Integrity & Build Verification (`VERIFY`)
- [ ] **REQ-EXP-07**: Ensure Home showcase (`ExpertsShowcase.tsx`), Global Search, Research Areas, and profile routes resolve cleanly without null dereferences.
- [ ] **REQ-EXP-08**: Pass full TypeScript compilation and Vite production build (`npm run build`) with zero errors.

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-EXP-01  | Phase 13 | Pending |
| REQ-EXP-02  | Phase 13 | Pending |
| REQ-EXP-03  | Phase 13 | Pending |
| REQ-EXP-04  | Phase 14 | Pending |
| REQ-EXP-05  | Phase 14 | Pending |
| REQ-EXP-06  | Phase 14 | Pending |
| REQ-EXP-07  | Phase 14 | Pending |
| REQ-EXP-08  | Phase 14 | Pending |
