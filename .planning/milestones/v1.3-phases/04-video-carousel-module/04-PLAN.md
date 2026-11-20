# Phase 4 Plan: Bottom-Right Studio Video Carousel Module

## Phase Goal
Construct a compact, interactive studio video carousel component (`StudioVideoCarousel.tsx`) anchored in the bottom-right quadrant of the dashboard, featuring multi-scene navigation, video/canvas playback preview, aspect ratio selectors, playback controls (`Scene 01`, prev, play/pause, next), timeline scrubber, and studio tool rail matching the user wireframe.

## Requirements Addressed
- **REQ-VID-01**: Compact, interactive video carousel component anchored in the bottom-right quadrant of the screen.
- **REQ-VID-02**: Features multi-scene/slide interactive media showcase representing AIRIC breakthroughs.
- **REQ-VID-03**: Includes next/previous slide controls, scene/slide indicators (`Scene 01`, etc.), play/pause, time readout (`00:01.7 / 00:05.0`), and smooth video preview playback.
- **REQ-WS-01 / REQ-WS-02**: Sized to fit precisely within the full-viewport 100vh grid without creating outer overflow.

---

## Tasks

### Task 1: Create `StudioVideoCarousel.tsx`
- **File**: `src/components/home/StudioVideoCarousel.tsx`
- **Action**:
  - Implement full studio video interface matching the visual wireframe:
    - **Studio Toolbar**: Vertical or segmented tabs (`Templates`, `Media`, `Text`, `Video`, `Audio`, `Elements`).
    - **Aspect Ratio Selector**: `16:9`, `1:1`, `9:16`, `4:5`, `21:9`.
    - **Scene Carousel Grid**: Multi-scene cards (`Scene 01: Quantum AI Engine`, `Scene 02: Genomic Diagnostics`, `Scene 03: Autonomous Cyber Defense`, `Scene 04: Commercial Ventures`) with duration tags (`0:15`, `0:30`, etc.).
    - **Live Video Preview Canvas**: High-tech video playback with animated abstract backdrop, status indicators, and pause/play toggle.
    - **Editor Controls**: `Transform`, `Filter`, `Adjust`, `Animation`.
    - **Playback Transport Strip**:
      - Current scene pill (`Scene 01` / `Scene 02` / etc.)
      - Previous (`|<<`), Play/Pause, Next (`>>|`)
      - Volume/Mute toggle
      - Time counter: `00:02.4 / 00:08.0`
    - **Timeline Scrubber**: Visual timeline bar with `Timeline` label, `+ Add Scene`, and animated progress scrubber bar.
- **Verification**: Ensure interactive playback toggling, scene switching, aspect ratio switching, and responsive containment.

### Task 2: Build Verification
- **Command**: `npm run build` (`tsc && vite build`)
- **Action**: Validate zero TypeScript compilation issues and successful Vite packaging.

---

## Verification Criteria
- [ ] `StudioVideoCarousel.tsx` renders in the bottom-right quadrant.
- [ ] Features interactive scene carousel switching (`Scene 01`, `Scene 02`, etc.).
- [ ] Playback controls (prev, play/pause, next) and time scrub bar function smoothly.
- [ ] Aspect ratio selectors (`16:9`, `1:1`, etc.) switch preview format.
- [ ] `npm run build` passes with zero errors.
