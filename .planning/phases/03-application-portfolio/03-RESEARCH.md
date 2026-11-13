# Phase 3: Dedicated Application Portfolio — Research & Design

**Phase:** 03-application-portfolio  
**Created:** 2026-11-14  
**Status:** In Progress  

---

## 1. Requirement & Portfolio Analysis

The client specifications require a dedicated application catalog (`/apps`) and individual dynamic product pages (`/apps/:slug`) for all 10 proprietary applications with custom vector icons:

1. **BChat** — *Intelligent Communication Platform* (`/apps/bchat`)
   - Category: `Enterprise AI & Communication`
   - Status: `Production`
   - Mandate: Real-time encrypted messaging, automated research meeting transcripts, LLM multi-party summarization.
2. **MyHealth** — *Digital Health Management* (`/apps/myhealth`)
   - Category: `Digital Healthcare`
   - Status: `Production`
   - Mandate: Patient electronic health records, ambulatory vitals tracking, AI clinical triage.
3. **BSMART** — *Smart Digital Services* (`/apps/bsmart`)
   - Category: `Smart Infrastructure & IoT`
   - Status: `Beta`
   - Mandate: Smart campus facilities, microgrid telemetry, automated energy efficiency monitoring.
4. **MyMedicine** — *Medicine Information & Management* (`/apps/mymedicine`)
   - Category: `Digital Healthcare`
   - Status: `Production`
   - Mandate: Pharmacological drug-interaction intelligence, dosage schedules, digital prescriptions.
5. **ExamScriptAI** — *AI-Powered Examination Assessment* (`/apps/examscriptai`)
   - Category: `Education & Academic AI`
   - Status: `Production`
   - Mandate: Automated grading of handwritten and digital exam scripts, rubric verification.
6. **BAUSTAI** — *AI-Powered Academic Assistance* (`/apps/baustai`)
   - Category: `Education & Academic AI`
   - Status: `Beta`
   - Mandate: Higher-education AI student tutor, syllabus guidance, paper citation assistant.
7. **MyHeart** — *Intelligent Cardiac Health* (`/apps/myheart`)
   - Category: `Digital Healthcare`
   - Status: `Clinical Trial`
   - Mandate: Ambulatory 12-lead ECG waveform telemetry, real-time arrhythmia risk prediction.
8. **FlowerDoctor** — *Flower Health Assistance* (`/apps/flowerdoctor`)
   - Category: `Agricultural AI`
   - Status: `Production`
   - Mandate: Botanical pathology diagnosis, soil nutritional plans, plant healthcare regimens.
9. **FlowerDoctorAI** — *AI-Based Flower Diagnosis* (`/apps/flowerdoctorai`)
   - Category: `Agricultural AI`
   - Status: `Beta`
   - Mandate: Computer vision convolutional neural network for instantaneous petal/leaf diagnosis.
10. **FlowerDoctorBD** — *Bangladesh Flower Intelligence* (`/apps/flowerdoctorbd`)
    - Category: `Agricultural AI`
    - Status: `Production`
    - Mandate: Specialized floriculture database and climate intelligence for Bangladeshi growers.

---

## 2. Technical Architecture

### Data Layer (`src/data/instituteApps.ts`)
- Decoupled from applicant tracking `mockApplications: Application[]`.
- Exports `export interface InstituteApp` and `export const instituteApps: InstituteApp[]`.
- Fully typed data for all 10 applications with detailed feature lists, architecture specs, target users, and release notes.

### Bespoke Vector Graphics (`src/components/apps/AppVectorIcon.tsx`)
- High-resolution SVG vector glyphs crafted specifically for each of the 10 applications.
- Supports customizable sizes (`sm`, `md`, `lg`, `xl`) and theme-aware gradients and glowing strokes.

### User Interface Views
- **Catalog View (`src/pages/public/Apps.tsx`):**
  - High-density bento cards.
  - Filter pills by category.
  - Search bar.
  - Direct links to `/apps/:slug`.
- **Product Detail View (`src/pages/public/AppDetail.tsx`):**
  - Rich dynamic page for any valid slug.
  - Feature highlights, interactive tester simulation, architecture breakdown, and cross-navigation.

---

## 3. Plan Decomposition

- **Plan 03-01: Applications Data Model & Bespoke Vector Graphics**
  - Create `src/data/instituteApps.ts` with all 10 applications.
  - Create `src/components/apps/AppVectorIcon.tsx` with bespoke SVG vector graphics for all 10 apps.
- **Plan 03-02: Applications Catalog, Product Detail Pages & Router Integration**
  - Build `src/pages/public/Apps.tsx`.
  - Build `src/pages/public/AppDetail.tsx`.
  - Register `/apps` and `/apps/:slug` in `src/App.tsx`.
  - Verify build with `tsc && vite build`.
