# Requirements: Appoint Mashkurul Alam Ohi as Scientist (Milestone 5 / v1.5)

## Active Milestone Objective
Appoint Mashkurul Alam Ohi as a Scientist in the AIRIC faculty and Experts network directory (`/experts`), highlighting his specialization in Natural Language Processing, Transformer architectures, and Bengali computational linguistics.

---

## Active Requirements (Milestone 5)

### 1. Personnel Data & Profile Integration (`PROFILE`)
- [ ] **REQ-SCI-01**: Add Mashkurul Alam Ohi into `src/data/researchers.ts` with:
  - `id`: `mashkurul-alam-ohi`
  - `slug`: `mashkurul-alam-ohi`
  - `name`: `Mashkurul Alam Ohi`
  - `title`: `Research Scientist (Natural Language Processing & Computational Intelligence)`
  - `category`: `faculty`
  - `expertCategory`: `Scientist`
  - `department`: `Foundational AI & Natural Language Processing Lab`
  - `education`: B.Sc. in Computer Science & Engineering from Bangladesh Army University of Science and Technology (BAUST)
  - `expertise`: Deep Learning, Transformer Architectures, Natural Language Processing, Imbalanced Text Classification, Computational Intelligence
  - `github`: `https://github.com/mashkurulalamohi37`
- [ ] **REQ-SCI-02**: Add his ICCIT conference publication (*"Mental Health Sign Recognition in Bengali Text: An Optimized Deep Learning Transformer Model for Imbalanced Classification"*) to `src/data/publications.ts` with `authorIds: ['mashkurul-alam-ohi']`.

### 2. Experts Directory UI Presentation (`UI_PRESENTATION`)
- [ ] **REQ-SCI-03**: Ensure the `/experts` directory page reflects 3 appointed specialists (Prof. Dr. Hu Guoqing, Lt Col Md Shameem Reza, and Mashkurul Alam Ohi).
- [ ] **REQ-SCI-04**: Under Section 1 (Leadership & Research Faculty), render Mashkurul Alam Ohi's Scientist card with the emerald Scientist badge, specialization tags, and bio.
- [ ] **REQ-SCI-05**: Ensure the 'Scientist' category filter pill shows a count of 1 and displays his card directly when clicked.

### 3. Verification & Build (`VERIFY`)
- [ ] **REQ-SCI-06**: Execute `npm run build` and ensure zero TypeScript errors or broken routes.

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-SCI-01  | Phase 15 | Pending |
| REQ-SCI-02  | Phase 15 | Pending |
| REQ-SCI-03  | Phase 16 | Pending |
| REQ-SCI-04  | Phase 16 | Pending |
| REQ-SCI-05  | Phase 16 | Pending |
| REQ-SCI-06  | Phase 16 | Pending |
