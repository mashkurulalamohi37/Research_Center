# Requirements: Appoint MD. Ahnaf Shahryar Nayem as Software Engineer (Milestone 7 / v1.7)

## Active Milestone Objective
Appoint MD. Ahnaf Shahryar Nayem as a Software Engineer in the AIRIC faculty and Experts network directory (`/experts`), featuring his contact details, portrait, and specialization in Full-Stack Web Platforms and Distributed Systems.

---

## Active Requirements (Milestone 7)

### 1. Personnel Data & Portrait Asset Integration (`PROFILE`)
- [x] **REQ-SWE-01**: Copy the uploaded portrait image to `public/ahnaf-shahryar-nayem.jpg` and `src/assets/ahnaf-shahryar-nayem.jpg`.
- [x] **REQ-SWE-02**: Add MD. Ahnaf Shahryar Nayem into `src/data/researchers.ts` with:
  - `id`: `ahnaf-shahryar-nayem`
  - `slug`: `ahnaf-shahryar-nayem`
  - `name`: `MD. Ahnaf Shahryar Nayem`
  - `title`: `Software Engineer (Full-Stack Platforms & Distributed Runtimes)`
  - `category`: `faculty`
  - `expertCategory`: `Software Engineer`
  - `department`: `Software Engineering & Production Systems Lab`
  - `email`: `asnayem1122@gmail.com`
  - `phone`: `+880 17038957`
  - `office`: `Engineering Pavilion, Room 208`
  - `avatar`: `/ahnaf-shahryar-nayem.jpg`
  - `expertise`: Full-Stack Software Engineering, Distributed Systems, TypeScript & React Architecture, High-Performance APIs, Cloud Runtimes & CI/CD

### 2. Experts Directory UI Presentation (`UI_PRESENTATION`)
- [x] **REQ-SWE-03**: Ensure the `/experts` directory page reflects 5 appointed specialists (Prof. Dr. Hu Guoqing, Lt Col Md Shameem Reza, Mashkurul Alam Ohi, Mehadi Talha, and MD. Ahnaf Shahryar Nayem).
- [x] **REQ-SWE-04**: Under Section 1 (Leadership & Research Faculty), render MD. Ahnaf Shahryar Nayem's card with the Software Engineer badge, ribbon label `SOFTWARE ENGINEER`, contact details (email and direct phone link), and bio.
- [x] **REQ-SWE-05**: Ensure the 'Software Engineer' category filter pill shows a count of 1 and displays his card directly when clicked.

### 3. Verification & Build (`VERIFY`)
- [x] **REQ-SWE-06**: Execute `npm run build` and ensure zero TypeScript errors or broken routes.

---

## Traceability Matrix

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-SWE-01  | Phase 19 | Completed |
| REQ-SWE-02  | Phase 19 | Completed |
| REQ-SWE-03  | Phase 20 | Completed |
| REQ-SWE-04  | Phase 20 | Completed |
| REQ-SWE-05  | Phase 20 | Completed |
| REQ-SWE-06  | Phase 20 | Completed |
