# Advanced Intelligent Research Center (AIRC)

## Frontend Development Guide for Lovable

**Purpose:** Build the complete AIRC frontend/UI using Lovable.

**Important:** This document is ONLY for frontend development. Backend APIs, PostgreSQL, FastAPI, authentication server logic, Docker infrastructure, and microservices should NOT be implemented in this phase.

---

# 1. Project Vision

Build a premium, modern, responsive academic research-center website for:

> **Advanced Intelligent Research Center (AIRC)**

The website should communicate:

- Artificial Intelligence
- Advanced research
- Academic excellence
- Innovation
- Collaboration
- Publications
- Research projects
- Researchers
- Research opportunities

The visual quality should feel comparable to a modern international AI research institute, university research center, or technology research laboratory.

Do NOT make it look like a generic corporate template.

---

# 2. Frontend Technology

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query architecture prepared for future API integration
- React Hook Form
- Zod
- Framer Motion
- Recharts where required

Do NOT introduce Vue or Quasar.

The application should be structured so a FastAPI backend can be connected later without redesigning the frontend.

---

# 3. Design Direction

## Overall Style

Create a:

> **Premium + Scientific + Minimal + Futuristic + Academic**

visual language.

The website should look trustworthy and institutional rather than flashy.

Use:

- Clean layouts
- Large typography
- Generous whitespace
- High-quality cards
- Subtle gradients
- Glass effects only where appropriate
- Fine borders
- Soft shadows
- Research/technology imagery
- Elegant animations

Avoid:

- Excessive neon effects
- Excessive glassmorphism
- Cartoon-style AI illustrations
- Generic stock photos everywhere
- Excessive animations
- Cluttered layouts

---

# 4. Color System

Use a professional technology/research palette.

Primary direction:

- Deep navy
- Dark blue
- White
- Off-white
- Electric blue/cyan accent

Create CSS variables/design tokens so the colors can be changed globally later.

Example semantic tokens:

```text
--background
--foreground
--primary
--primary-foreground
--secondary
--muted
--border
--card
--accent
```

Do not hardcode colors throughout components.

---

# 5. Typography

Use a modern professional font such as:

- Inter
- Manrope
- Plus Jakarta Sans

Recommended hierarchy:

```text
Hero:
Very large

Section title:
Large

Card title:
Medium

Body:
Readable and comfortable

Metadata:
Small
```

Typography must be responsive.

---

# 6. Global Layout

Create:

```text
App
│
├── Header
├── Main Content
└── Footer
```

The header should support:

- Desktop navigation
- Mobile navigation
- Active route state
- CTA button
- Sticky behavior
- Transparent-to-solid transition when scrolling

---

# 7. Main Navigation

Navigation:

```text
Home
About
Research
Researchers
Projects
Publications
News
Events
Opportunities
Resources
Contact
```

Primary CTA:

> Collaborate With AIRC

Optional secondary:

> Research Portal

Mobile navigation should use a polished slide-down/side drawer.

---

# 8. Homepage

Create a premium homepage with the following sections.

## 8.1 Hero

Headline:

> Advanced Intelligent Research Center

Subheading:

> Advancing Intelligence. Enabling Innovation.

Description:

> A multidisciplinary research center dedicated to advancing intelligent technologies through cutting-edge research, innovation, and collaboration.

Buttons:

- Explore Research
- Collaborate With AIRC

Visual:

Use an abstract AI/research visualization.

Possible elements:

- Connected nodes
- Scientific network
- Data visualization
- AI particles
- Abstract neural network

The hero must look impressive without becoming visually noisy.

---

# 9. Homepage — Research Statistics

Create animated counters.

Example:

```text
150+
Publications

30+
Research Projects

25+
Researchers

10+
Research Areas

20+
Collaborations
```

Use Framer Motion for subtle count-up animation.

Statistics should later be replaceable with API data.

---

# 10. Homepage — About AIRC

Create a concise introduction.

Layout:

```text
Text              Visual
```

Content:

- Who AIRC is
- What AIRC does
- Research philosophy
- Impact

CTA:

> Discover AIRC

---

# 11. Homepage — Research Areas

Create a premium grid.

Example cards:

```text
Artificial Intelligence
Machine Learning
Computer Vision
Natural Language Processing
Generative AI
Data Science
IoT & Edge AI
Cybersecurity
Healthcare AI
Robotics
```

Each card should contain:

- Icon
- Title
- Short description
- Research count
- Arrow

Hover:

- Slight elevation
- Border/accent animation
- Arrow movement

Click:

```text
/research/{slug}
```

---

# 12. Homepage — Featured Projects

Display 3–6 projects.

Each project card:

```text
Image
Project title
Research area
Short description
Status
View Project →
```

Status badges:

- Ongoing
- Completed
- Proposed

CTA:

> View All Projects

---

# 13. Homepage — Featured Publications

Display recent publications.

Each card:

```text
Publication title
Authors
Venue
Year
Publication type
```

Actions:

- View Details
- DOI
- PDF

CTA:

> Explore Publications

---

# 14. Homepage — Researchers

Create a horizontal/card layout.

Each researcher:

```text
Photo
Name
Position
Research Areas
```

CTA:

> View Profile

Include a View All Researchers button.

---

# 15. Homepage — News

Create a modern news section.

Each card:

```text
Image
Category
Date
Title
Short description
Read More
```

Featured article should be larger.

---

# 16. Homepage — Upcoming Events

Display:

- Event date
- Event title
- Speaker
- Location
- Event type

Create attractive date badges.

---

# 17. Homepage — Research Opportunities

Highlight available opportunities.

Example:

```text
Research Assistant
Computer Vision

Open

Apply →
```

CTA:

> View Opportunities

---

# 18. Homepage — Partners

Create a clean logo section.

Categories:

- Universities
- Research Institutions
- Industry
- Technology Partners

Use grayscale/neutral logo presentation where appropriate.

---

# 19. Homepage — Collaboration CTA

Large final CTA:

> Collaborate With AIRC

Text:

> Partner with us to create impactful research, develop intelligent technologies, and solve real-world challenges.

Buttons:

- Start a Collaboration
- Contact AIRC

---

# 20. Footer

Footer should contain:

```text
AIRC Logo

Short description

Research
Researchers
Projects
Publications

About
News
Events
Opportunities

Contact

Social Links

Privacy Policy
Terms
```

Include:

> © 2026 Advanced Intelligent Research Center. All rights reserved.

---

# 21. About Page

Route:

```text
/about
```

Sections:

- Hero
- About AIRC
- Vision
- Mission
- Objectives
- Research Philosophy
- Director's Message
- Organizational Structure
- Achievements
- Collaboration CTA

---

# 22. Director's Message

Create a professional section:

```text
Director photo
Name
Designation

Message
```

Use a premium academic layout.

---

# 23. Research Page

Route:

```text
/research
```

Show:

- Research overview
- Research areas
- Research map
- Research statistics
- Featured research
- Related projects

---

# 24. Research Area Page

Route:

```text
/research/:slug
```

Example:

```text
/research/artificial-intelligence
```

Sections:

```text
Hero
Overview
Research Objectives
Technologies
Researchers
Projects
Publications
Achievements
```

Use tabs where appropriate.

---

# 25. Interactive Research Map

Create a visually impressive interactive component.

Structure:

```text
                         AIRC
                          |
          +---------------+---------------+
          |               |               |
         AI              CV              NLP
          |               |               |
        ML/DL        Medical Vision      LLM
```

The frontend can use mock data.

Clicking a research area should navigate to its detail page.

Use subtle motion.

---

# 26. Researchers Page

Route:

```text
/researchers
```

Features:

- Search
- Position filter
- Research area filter
- Department/filter
- Grid/list toggle

Cards:

```text
Photo
Name
Position
Research interests
View Profile
```

---

# 27. Researcher Profile

Route:

```text
/researchers/:slug
```

Sections:

```text
Profile Header

Biography

Education

Research Interests

Expertise

Projects

Publications

Students

Awards

Research Activities
```

External links:

- Google Scholar
- ORCID
- LinkedIn
- ResearchGate

Use icon buttons.

---

# 28. Projects Page

Route:

```text
/projects
```

Features:

- Search
- Research area filter
- Status filter
- Year filter

Project card:

```text
Project image
Title
Research Area
PI
Status
Short description
View Project
```

---

# 29. Project Detail

Route:

```text
/projects/:slug
```

Sections:

```text
Project Hero
Overview
Problem Statement
Objectives
Methodology
Research Team
Technologies
Timeline
Outcomes
Publications
Resources
Partners
```

Create a visual timeline for project duration.

---

# 30. Publications Page

Route:

```text
/publications
```

This should be highly polished.

Features:

- Search
- Year filter
- Publication type
- Research area
- Author
- Venue
- Pagination

Publication types:

```text
Journal
Conference
Book Chapter
Workshop
Preprint
Technical Report
```

---

# 31. Publication Card

Display:

```text
Title
Authors
Venue
Year
Type
Research Area
```

Actions:

```text
View Details
DOI
PDF
```

---

# 32. Publication Detail

Route:

```text
/publications/:slug
```

Show:

- Title
- Authors
- Abstract
- Keywords
- Venue
- Publisher
- Year
- DOI
- Citation
- PDF
- External links

Create a clean academic reading layout.

---

# 33. News Page

Route:

```text
/news
```

Features:

- Featured news
- Search
- Category filter
- Date filter

Categories:

```text
Research
Publication
Award
Conference
Workshop
Seminar
Collaboration
Announcement
```

---

# 34. News Detail

Route:

```text
/news/:slug
```

Show:

- Cover image
- Title
- Category
- Date
- Author
- Article body
- Related news
- Related projects/researchers

---

# 35. Events Page

Route:

```text
/events
```

Features:

- Upcoming events
- Past events
- Event type filter
- Date filter

Event card:

```text
Date
Title
Speaker
Location
Type
View Event
```

---

# 36. Event Detail

Route:

```text
/events/:slug
```

Show:

- Event title
- Date
- Time
- Location
- Speaker
- Organizer
- Description
- Registration
- Poster
- Related events

---

# 37. Opportunities Page

Route:

```text
/opportunities
```

Categories:

```text
Research Assistant
Internship
Undergraduate Research
Graduate Research
Thesis
Fellowship
Visiting Researcher
```

Opportunity cards:

```text
Title
Position
Research Area
Location
Deadline
Status
Apply
```

---

# 38. Opportunity Detail

Route:

```text
/opportunities/:slug
```

Sections:

```text
Overview
Eligibility
Requirements
Responsibilities
Duration
Supervisor
Deadline
Application Process
Apply Now
```

---

# 39. Resources Page

Route:

```text
/resources
```

Resource categories:

```text
Research Papers
Datasets
Code
Models
Tutorials
Research Guidelines
Reports
Presentations
```

Features:

- Search
- Category filter
- Research area filter
- Resource type filter

---

# 40. Partners Page

Route:

```text
/partners
```

Show:

- Partner organizations
- Logos
- Organization type
- Collaboration area
- Joint projects

---

# 41. Contact Page

Route:

```text
/contact
```

Sections:

- Contact information
- Address
- Email
- Phone
- Map
- Contact form

Form:

```text
Name
Email
Subject
Message
Attachment
Submit
```

Frontend validation using Zod.

---

# 42. Collaboration Page

Route:

```text
/collaborate
```

Hero:

> Collaborate With AIRC

Show collaboration types:

```text
Joint Research
Industry Collaboration
Sponsored Research
Dataset Collaboration
Technology Transfer
Student Research
Academic Collaboration
```

Form:

```text
Name
Organization
Email
Organization Type
Research Area
Collaboration Type
Proposal
Attachment
Submit
```

Use mock submission behavior for now.

The API integration will be added later.

---

# 43. Authentication UI

Create frontend screens only.

Routes:

```text
/login
/forgot-password
/reset-password
```

Do not implement real authentication yet.

Use mock authentication state if necessary.

Login UI:

```text
Email
Password
Remember Me
Login
Forgot Password
```

---

# 44. Researcher Portal UI

Create frontend dashboard screens.

Route:

```text
/dashboard
```

Layout:

```text
Sidebar
Header
Main Content
```

Sidebar:

```text
Dashboard
My Profile
My Publications
My Projects
My Students
Research Activities
Resources
Notifications
Settings
Logout
```

---

# 45. Researcher Dashboard

Show:

```text
Publications
Projects
Students
Research Activities
```

Recent activity:

```text
Publication approved
Project updated
New collaboration request
```

Charts:

- Publications by year.
- Projects by status.
- Research activity.

Use mock data.

---

# 46. Researcher Profile Management

Page:

```text
/dashboard/profile
```

Fields:

```text
Name
Profile Photo
Designation
Biography
Education
Research Interests
Expertise
Email
ORCID
Google Scholar
LinkedIn
ResearchGate
```

Actions:

```text
Save Changes
Cancel
```

---

# 47. My Publications

Route:

```text
/dashboard/publications
```

Features:

- List publications.
- Search.
- Filter.
- Add publication.
- Edit.
- Delete.
- Submit for review.

Create modal/page for:

```text
Title
Authors
Abstract
Type
Venue
Year
DOI
PDF
Research Area
```

---

# 48. My Projects

Route:

```text
/dashboard/projects
```

Features:

- View projects.
- Create project.
- Edit project.
- Project status.
- Add team members.
- Add updates.

---

# 49. Admin Portal

Create a separate admin UI.

Route:

```text
/admin
```

Admin sidebar:

```text
Dashboard

Users
Researchers
Students
Research Assistants

Research
Research Areas
Projects
Publications
Research Groups
Research Activities

Content
Pages
News
Events
Announcements
Media

Opportunities
Applications

Resources
Partners
Collaborations

Analytics
Notifications
Audit Logs

Settings
```

---

# 50. Admin Dashboard

Display:

```text
Total Researchers
Total Projects
Total Publications
Active Opportunities
Pending Applications
Collaboration Requests
```

Charts:

```text
Publications by Year
Projects by Status
Research Areas
Applications
```

Use Recharts.

All charts should use mock data initially.

---

# 51. Admin Researchers

Route:

```text
/admin/researchers
```

Features:

- Search.
- Filter.
- Add researcher.
- Edit.
- View.
- Activate/deactivate.
- Delete.

Table columns:

```text
Photo
Name
Position
Research Areas
Status
Actions
```

---

# 52. Admin Publications

Features:

- View all.
- Search.
- Filter.
- Review.
- Approve.
- Request changes.
- Reject.
- Edit.
- Delete.

Status:

```text
Draft
Pending Review
Approved
Published
Rejected
```

---

# 53. Admin Projects

Features:

- Create.
- Edit.
- Review.
- Approve.
- Archive.
- Manage researchers.
- Manage status.

---

# 54. Admin News

CMS interface:

```text
Title
Slug
Category
Cover Image
Excerpt
Content
Author
Publish Date
Status
```

Statuses:

```text
Draft
Review
Published
Scheduled
Archived
```

Include rich-text editor UI.

---

# 55. Admin Events

Fields:

```text
Title
Description
Date
Time
Location
Speaker
Organizer
Poster
Registration Link
Status
```

---

# 56. Admin Opportunities

Fields:

```text
Title
Type
Research Area
Description
Eligibility
Requirements
Responsibilities
Duration
Supervisor
Deadline
Status
```

---

# 57. Admin Applications

Create application-management table.

Columns:

```text
Applicant
Opportunity
Research Area
Submitted Date
Status
Actions
```

Status:

```text
Submitted
Under Review
Shortlisted
Interview
Accepted
Rejected
```

---

# 58. Admin Collaborations

Table:

```text
Organization
Contact
Research Area
Collaboration Type
Submitted
Assigned Researcher
Status
```

Actions:

```text
View
Assign
Approve
Reject
```

---

# 59. Admin Resources

Features:

- Upload.
- Edit.
- Delete.
- Categorize.
- Publish.
- Restrict access.

---

# 60. Admin Media Library

Create a media manager.

Grid:

```text
Image/PDF
Filename
Type
Size
Uploaded
Actions
```

Actions:

- Upload.
- Preview.
- Copy reference.
- Delete.

---

# 61. Global Search UI

Create a global search interface.

Search:

```text
Researchers
Projects
Publications
News
Events
Resources
Research Areas
```

Search overlay should open from header.

Keyboard shortcut:

```text
Ctrl + K
```

Optional.

---

# 62. Loading States

Every data-driven component should have:

- Skeleton loader.
- Spinner where appropriate.
- Disabled buttons during submission.

Never show blank screens while data loads.

---

# 63. Empty States

Example:

```text
No publications found.

Try changing your filters or search query.
```

Include:

- Icon.
- Message.
- Optional CTA.

---

# 64. Error States

Create reusable components:

```text
ErrorState
NotFoundState
UnauthorizedState
EmptyState
LoadingState
```

---

# 65. 404 Page

Create a premium 404 page.

Message:

> Page Not Found

Buttons:

- Go Home
- Explore Research

---

# 66. Responsive Design

Everything must work on:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Mobile navigation must be completely redesigned rather than simply compressed.

Admin dashboard must also be responsive.

---

# 67. Component Architecture

Use reusable components.

```text
components/
│
├── layout/
├── navigation/
├── hero/
├── cards/
├── buttons/
├── forms/
├── tables/
├── filters/
├── modals/
├── charts/
├── research/
├── researchers/
├── publications/
├── projects/
├── news/
├── events/
├── opportunities/
└── shared/
```

---

# 68. Page Architecture

```text
pages/
│
├── public/
│   ├── Home
│   ├── About
│   ├── Research
│   ├── Researchers
│   ├── Projects
│   ├── Publications
│   ├── News
│   ├── Events
│   ├── Opportunities
│   ├── Resources
│   ├── Partners
│   ├── Collaborate
│   └── Contact
│
├── auth/
│
├── researcher/
│
└── admin/
```

---

# 69. Mock Data Architecture

Since the backend is not being developed yet, create realistic mock data.

Create:

```text
src/data/
```

Files:

```text
researchers.ts
researchAreas.ts
projects.ts
publications.ts
news.ts
events.ts
opportunities.ts
resources.ts
partners.ts
statistics.ts
```

The UI should consume these through clean data interfaces.

Do NOT scatter mock data inside components.

---

# 70. Future API Integration

Create a service abstraction.

Example architecture:

```text
src/services/
│
├── api.ts
├── researchers.ts
├── publications.ts
├── projects.ts
├── news.ts
├── events.ts
├── opportunities.ts
└── collaborations.ts
```

Initially these services can return mock data.

Later replace the implementation with FastAPI API calls.

The UI components should not need major changes.

---

# 71. TypeScript Models

Create interfaces/types for:

```text
User
Researcher
Student
ResearchArea
Project
Publication
NewsArticle
Event
Opportunity
Application
Resource
Partner
Collaboration
Notification
```

Do not use `any` unless absolutely necessary.

---

# 72. Form Architecture

Use:

```text
React Hook Form
+
Zod
```

All forms should have:

- Client-side validation.
- Required fields.
- Error messages.
- Loading state.
- Success state.
- Disabled submission state.

---

# 73. Tables

Admin tables should support:

- Search.
- Sorting.
- Filtering.
- Pagination.
- Row actions.
- Responsive behavior.

Use shadcn/ui table components.

---

# 74. Modal System

Create reusable modal/dialog components for:

- Add researcher.
- Add publication.
- Add project.
- Confirm deletion.
- Application review.
- Collaboration assignment.

Destructive actions must have confirmation.

---

# 75. Toast Notifications

Use toast notifications for:

```text
Saved successfully
Deleted successfully
Submitted successfully
Error occurred
Changes saved
```

---

# 76. Accessibility

Follow WCAG principles.

Implement:

- Semantic HTML.
- Keyboard navigation.
- Proper focus states.
- Accessible labels.
- Alt text.
- ARIA only when needed.
- Good contrast.
- Reduced-motion support.

---

# 77. SEO

Create page-level:

- Title.
- Description.
- Open Graph metadata.
- Canonical URL structure.

Example:

```text
AIRC | Advanced Intelligent Research Center
AIRC Research Areas
AIRC Researchers
AIRC Publications
```

---

# 78. Performance

Implement:

- Lazy loading.
- Image optimization.
- Route-based code splitting.
- Efficient React rendering.
- Pagination.
- Skeleton loaders.

Avoid unnecessarily large libraries.

---

# 79. Animation Guidelines

Use Framer Motion.

Animations should be:

- Subtle.
- Fast.
- Professional.

Use for:

- Page entrance.
- Hero.
- Cards.
- Statistics.
- Research map.
- Modal transitions.

Do not animate every element.

---

# 80. Dark Mode

Prepare the UI for:

```text
Light
Dark
```

Use semantic design tokens.

Dark mode should not simply invert colors.

It should be intentionally designed.

---

# 81. Important Frontend Rules

Lovable MUST:

1. Build reusable components.
2. Use TypeScript.
3. Avoid duplicated components.
4. Avoid hardcoded repeated data.
5. Use mock data architecture.
6. Keep API integration replaceable.
7. Maintain responsive layouts.
8. Maintain accessibility.
9. Use consistent spacing.
10. Use consistent typography.
11. Use reusable forms.
12. Use reusable cards.
13. Use reusable filters.
14. Use reusable tables.
15. Use proper loading/empty/error states.

---

# 82. What Lovable Should NOT Build

Do NOT implement:

- PostgreSQL.
- FastAPI.
- Docker.
- Microservices.
- Production authentication backend.
- Real email service.
- Real file storage.
- Real payment system.
- Production AI API.
- Server-side business logic.

Those will be integrated later.

---

# 83. Backend Integration Preparation

The frontend should assume a future API such as:

```text
/api/v1/researchers
/api/v1/publications
/api/v1/projects
/api/v1/research-areas
/api/v1/news
/api/v1/events
/api/v1/opportunities
/api/v1/applications
/api/v1/resources
/api/v1/partners
/api/v1/collaborations
```

Do not hardcode these APIs yet.

Prepare service interfaces.

---

# 84. Authentication Preparation

Create an authentication context/provider interface.

Expected future methods:

```text
login()
logout()
refreshToken()
getCurrentUser()
```

For now use mock authentication.

Do not store real credentials.

---

# 85. Protected Routes

Prepare:

```text
ProtectedRoute
ResearcherRoute
AdminRoute
```

Example:

```text
/admin/*
```

requires admin role.

```text
/dashboard/*
```

requires authenticated user.

---

# 86. Final Frontend Route Map

```text
/
├── /about
├── /research
│   └── /research/:slug
├── /researchers
│   └── /researchers/:slug
├── /projects
│   └── /projects/:slug
├── /publications
│   └── /publications/:slug
├── /news
│   └── /news/:slug
├── /events
│   └── /events/:slug
├── /opportunities
│   └── /opportunities/:slug
├── /resources
├── /partners
├── /collaborate
├── /contact
│
├── /login
├── /forgot-password
│
├── /dashboard
│   ├── /profile
│   ├── /publications
│   ├── /projects
│   ├── /students
│   ├── /activities
│   ├── /resources
│   ├── /notifications
│   └── /settings
│
└── /admin
    ├── /users
    ├── /researchers
    ├── /students
    ├── /research-areas
    ├── /projects
    ├── /publications
    ├── /research-groups
    ├── /news
    ├── /events
    ├── /opportunities
    ├── /applications
    ├── /resources
    ├── /partners
    ├── /collaborations
    ├── /media
    ├── /analytics
    ├── /notifications
    ├── /audit-logs
    └── /settings
```

---

# 87. Final Lovable Implementation Instruction

Build the AIRC frontend as a **complete production-quality React application** based on this specification.

Start with the public website and then implement the researcher and admin interfaces.

Use realistic mock data.

All pages must be connected through React Router.

All cards, filters, buttons, forms, tables, dialogs, navigation elements, and dashboards must be functional at the frontend level.

The UI must be responsive.

The application must be accessible.

The architecture must be clean enough that a FastAPI/PostgreSQL backend can be integrated later without rebuilding the frontend.

Prioritize:

> **Professional design → UX → responsiveness → reusable components → clean architecture → API readiness.**

The final result should feel like the website of a serious international AI research institution.

---

# 88. Frontend Completion Checklist

Before considering the frontend complete, verify:

## Public

- [ ] Home
- [ ] About
- [ ] Research
- [ ] Research Area Details
- [ ] Researchers
- [ ] Researcher Details
- [ ] Projects
- [ ] Project Details
- [ ] Publications
- [ ] Publication Details
- [ ] News
- [ ] News Details
- [ ] Events
- [ ] Event Details
- [ ] Opportunities
- [ ] Opportunity Details
- [ ] Resources
- [ ] Partners
- [ ] Collaboration
- [ ] Contact

## Authentication

- [ ] Login
- [ ] Forgot Password
- [ ] Protected Routes
- [ ] Mock User State

## Researcher

- [ ] Dashboard
- [ ] Profile
- [ ] Publications
- [ ] Projects
- [ ] Students
- [ ] Activities
- [ ] Resources
- [ ] Notifications
- [ ] Settings

## Admin

- [ ] Dashboard
- [ ] Users
- [ ] Researchers
- [ ] Students
- [ ] Research Areas
- [ ] Projects
- [ ] Publications
- [ ] News
- [ ] Events
- [ ] Opportunities
- [ ] Applications
- [ ] Resources
- [ ] Partners
- [ ] Collaborations
- [ ] Media
- [ ] Analytics
- [ ] Notifications
- [ ] Audit Logs
- [ ] Settings

## Quality

- [ ] Responsive
- [ ] Accessible
- [ ] SEO-ready
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] 404 page
- [ ] Dark mode
- [ ] Smooth animations
- [ ] Reusable components
- [ ] TypeScript
- [ ] Mock API layer
- [ ] Clean folder structure
- [ ] No unnecessary dependencies

---

# 89. Final Deliverable

Lovable should produce:

```text
A complete AIRC React frontend
        +
Public Website
        +
Researcher Portal
        +
Admin Portal
        +
Mock Data
        +
Responsive Design
        +
Reusable Component System
        +
API-ready Architecture
```

The backend will be integrated in a separate development phase.

# END
