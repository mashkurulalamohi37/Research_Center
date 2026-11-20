# Requirements: Appoint Mehadi Talha as AI Engineer (Milestone 6 / v1.6)

## Active Milestone Objective
Appoint Mehadi Talha as an AI Engineer in the AIRIC faculty and Experts network directory (`/experts`), featuring his contact details, portrait, and applied AI systems specialization.

---

## Active Requirements (Milestone 6)

### 1. Personnel Data & Portrait Asset Integration (`PROFILE`)
- [x] **REQ-ENG-01**: Copy the uploaded portrait image to `public/mehadi-talha.jpg` and `src/assets/mehadi-talha.jpg`.
- [x] **REQ-ENG-02**: Add Mehadi Talha into `src/data/researchers.ts` with:
  - `id`: `mehadi-talha`
  - `slug`: `mehadi-talha`
  - `name`: `Mehadi Talha`
  - `title`: `AI Engineer (Applied Deep Learning & Intelligent Systems)`
  - `category`: `faculty`
  - `expertCategory`: `AI Engineer`
  - `department`: `Applied AI Systems & Neural Engineering Lab`
  - `email`: `mehaditalha62@gmail.com`
  - `phone`: `+8801521745815`
  - `office`: `AI Systems Pavilion, Room 204`
  - `avatar`: `/mehadi-talha.jpg`
  - `expertise`: Deep Learning Systems, Neural Model Deployment, Inference Optimization, Full-Stack AI Engineering, Python & PyTorch

### 2. Experts Directory UI Presentation (`UI_PRESENTATION`)
- [x] **REQ-ENG-03**: Ensure the `/experts` directory page reflects 4 appointed specialists (Prof. Dr. Hu Guoqing, Lt Col Md Shameem Reza, Mashkurul Alam Ohi, and Mehadi Talha).
- [x] **REQ-ENG-04**: Under Section 1 (Leadership & Research Faculty), render Mehadi Talha's card with the cyan AI Engineer badge, contact details (email and direct phone link), and bio.
- [x] **REQ-ENG-05**: Ensure the 'AI Engineer' category filter pill shows a count of 1 and displays his card directly when clicked.

### 3. Verification & Build (`VERIFY`)
- [x] **REQ-ENG-06**: Execute `npm run build` and ensure zero TypeScript errors or broken routes.

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-ENG-01  | Phase 17 | Completed |
| REQ-ENG-02  | Phase 17 | Completed |
| REQ-ENG-03  | Phase 18 | Completed |
| REQ-ENG-04  | Phase 18 | Completed |
| REQ-ENG-05  | Phase 18 | Completed |
| REQ-ENG-06  | Phase 18 | Completed |
