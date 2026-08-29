# Advanced Intelligent Research Center (AIRC) — Full-Stack Platform

[![React](https://img.shields.io/badge/Frontend-React_18_|_TypeScript_5-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_0.110-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy_2.0_Async-D71F00?logo=python&logoColor=white)](https://www.sqlalchemy.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Orchestration-Docker_Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **"Advancing Intelligence. Enabling Innovation."**  
> An enterprise-grade, multidisciplinary scientific web application and research management platform engineered for premier academic institutions, high-performance computing centers, and autonomous AI laboratories.

---

## 🔬 Institutional Architecture & Capabilities

The **AIRC Digital Platform** combines a public-facing academic portal with authenticated scientific lab management workspaces and an institute-wide Directorate CMS.

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AIRC DIGITAL ECOSYSTEM                             │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│    PUBLIC WEB PORTAL    │    RESEARCHER PORTAL    │   ADMIN DIRECTORATE CMS │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ • 13+ Specialized Pages │ • PI & Fellow Dashboard │ • Institutional Metrics │
│ • 6 Core Research Areas │ • Publication Pipeline  │ • Publication Approval  │
│ • Faculty & Researcher  │ • Grant & Project Mgmt  │ • Candidate Dossiers    │
│ • Funded Project Atlas  │ • Ph.D. Mentorship      │ • Partnership Leads     │
│ • Publications & BibTeX │ • Lab Equipment Booking │ • Audit Logging (SHA256)│
│ • Events & Fellowships  │ • Activity Telemetry    │ • CMS Content Modules   │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## ✨ Key Features & Technical Highlights

### 1. 🌐 Public Research Portal (13+ Interactive Routes)
- **Interactive Research Map**: Interactive discipline graph with cross-lab node exploration and telemetry.
- **Academic Catalog**: Multi-criteria filtering by publication venue, year, research domain, and type.
- **BibTeX Citation Engine**: Instant modal generation with one-click clipboard copying.
- **Global Search (`Ctrl + K`)**: Fuzzy indexing across faculty, publications, grants, press, and symposia.
- **Admissions & Fellowships**: Validated candidate application intake supporting `.pdf`/`.docx` CV parsing.

### 2. 🧪 Authenticated Researcher Portal (`/dashboard`)
- **Telemetry Overview**: Real-time citation tracking, h-index gauges, grant burn-down, and lab utilization.
- **Publication Pipeline**: Draft manuscript submission with automatic queueing for Directorate review.
- **Project & Grant Management**: Milestone tracking, deliverables, and team member management.
- **Supervised Students**: Doctoral and master's candidate milestone progress monitoring.
- **Lab Resource Booking**: Reservation scheduler for DGX H100 Superclusters and Surgical High-Bays.

### 3. 🏛️ Administrative Directorate CMS (`/admin`)
- **Review Queue**: Single-click approval/rejection of submitted publications and grant proposals.
- **Admissions Pipeline**: Multi-stage candidate dossier tracking (`Submitted` → `Review` → `Interview` → `Accepted`).
- **Partnership Alliances**: Corporate collaboration intake, investigator assignment, and status workflows.
- **Cryptographic Audit Logs**: Tamper-evident action logging with actor IP, module, and timestamp tracking.

### 4. ⚡ High-Performance Frontend Architecture
- **Lazy Code-Splitting**: Micro-modular chunks configured via `React.lazy()` and Rollup `manualChunks`.
- **Initial Load Optimization**: **88.2% reduction** in initial JavaScript bundle payload (**133 kB** initial load).
- **Accessibility Compliance**: Full **WCAG 2.1 AA** keyboard navigation, `Escape` key dialog traps, and semantic ARIA roles.
- **Dynamic SEO**: Contextual document titles via `useDocumentTitle` and comprehensive OpenGraph / Twitter Cards.

### 5. 🐍 High-Throughput FastAPI Backend
- **Async REST API**: Clean endpoints across all 12 institutional modules in `backend/app/api/v1/`.
- **JWT & RBAC Security**: Granular role enforcement (`guest`, `researcher`, `admin`, `super_admin`).
- **Database Seeder**: Complete synthetic dataset populating faculty, publications, projects, and events.
- **Automated Test Suite**: Pytest suite verifying auth guards, schema validation, and CRUD operations.

---

## 🏗️ Project Structure

```text
Research_Center/
├── backend/                        # Python FastAPI Backend
│   ├── app/
│   │   ├── api/v1/endpoints/       # Modular REST API endpoints (12 routers)
│   │   ├── core/                   # Security, JWT, hashing, config settings
│   │   ├── db/                     # Async engine, sessionmaker, seed script
│   │   ├── models/                 # SQLAlchemy 2.0 async ORM models
│   │   ├── schemas/                # Pydantic v2 validation DTOs
│   │   └── main.py                 # FastAPI application entry point
│   ├── tests/                      # Automated Pytest suite
│   ├── Dockerfile                  # Backend production container
│   └── requirements.txt            # Python dependencies
│
├── src/                            # React 18 + TypeScript Frontend
│   ├── components/
│   │   ├── auth/                   # ProtectedRoute, ResearcherRoute, AdminRoute
│   │   ├── layout/                 # Public Layout, ResearcherLayout, AdminLayout
│   │   ├── shared/                 # GlobalSearchModal, Header, Footer
│   │   └── ui/                     # Badge, Button, Card, Dialog, Input, Tabs
│   ├── context/                    # AuthContext, ThemeContext, ToastContext
│   ├── data/                       # Initial mock datasets (offline fallback)
│   ├── hooks/                      # useDocumentTitle and custom utilities
│   ├── pages/
│   │   ├── admin/                  # 14 Admin Directorate CMS views
│   │   ├── auth/                   # Login, ForgotPassword
│   │   ├── public/                 # 13+ Public institute catalog views
│   │   └── researcher/             # 9 Researcher portal workspace views
│   ├── services/                   # Unified API client with offline fallback
│   ├── types/                      # TypeScript domain interfaces
│   ├── App.tsx                     # Lazy-loaded router wiring
│   └── main.tsx                    # Application bootstrap
│
├── nginx/
│   └── default.conf                # Reverse proxy configuration
├── docker-compose.yml              # Multi-container orchestration
├── package.json                    # Frontend dependencies & scripts
├── vite.config.ts                  # Vite + Rollup manualChunks configuration
└── tailwind.config.js              # Theme tokens, fonts, and dark mode
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0+ / npm v9.0+
- **Python**: v3.10+ (for backend)
- **Docker & Docker Compose** (optional for containerized deployment)

---

### Option A: Running with Docker Compose (Recommended)

To launch the complete full-stack environment (Frontend + FastAPI + Nginx + PostgreSQL) with a single command:

```bash
docker-compose up --build
```

- **Public Website & Portals:** [http://localhost:80](http://localhost:80)
- **FastAPI Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc API Reference:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

### Option B: Local Development Setup

#### 1. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/mashkurulalamohi37/Research_Center.git
cd Research_Center

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*Frontend runs locally at [http://localhost:5173](http://localhost:5173).*

#### 2. Backend Setup (Optional)
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with sample data
python -m app.db.seed

# Run the FastAPI server
uvicorn app.main:app --reload --port 8000
```

---

## 🔑 Demo Access Accounts

The platform includes pre-configured demo presets for rapid evaluation:

| Role | Email | Password | Access Scope |
|---|---|---|---|
| **Institute Director (Admin)** | `sarah.lin@airc.research.edu` | `airc2026!` | Full Admin Directorate CMS (`/admin`), Review Queues, Audit Logs, Settings |
| **Principal Investigator (Researcher)** | `marcus@airc.research.edu` | `airc2026!` | Researcher Portal (`/dashboard`), Publication Pipeline, Project Grants, Lab Bookings |
| **Ph.D. Fellow (Researcher)** | `elena.rostova@airc.research.edu` | `airc2026!` | Research Workspace, Authored Papers, Student Tracking |
| **Public Visitor (Guest)** | *Unauthenticated* | *N/A* | Public Institute Catalog, Application Intake, BibTeX Generator |

*(You can also use the **Quick Demo Switcher** buttons on the `/login` page for instant role switching without typing credentials).*

---

## 🧪 Testing & Quality Assurance

### Frontend Testing & Verification
```bash
# Run TypeScript compilation and Vite build check
npm run build
```

### Backend Automated Test Suite
```bash
# Run backend Pytest suite
cd backend
pytest -v
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🏛️ Acknowledgments & Citation

If you utilize the AIRC platform or its research methodologies in your academic work, please cite:

```bibtex
@misc{airc2026platform,
  title={Advanced Intelligent Research Center (AIRC) Full-Stack Digital Platform},
  author={AIRC Directorate and Engineering Team},
  year={2026},
  publisher={GitHub},
  howpublished={\url{https://github.com/mashkurulalamohi37/Research_Center}}
}
```
