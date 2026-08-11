# CMRL Research Portal
## Implementation Plan

**Project:** CMRL Research Portal  
**Laboratory:** CMRL — Crystalline Material Research Lab  
**Version:** 1.0  
**Frontend:** React + Vite + TypeScript  
**Backend:** Node.js + Express + TypeScript  
**Database:** MongoDB + Mongoose  
**Authentication:** Firebase Authentication  
**Styling:** Tailwind CSS  
**Architecture:** REST API + Modular Monolith

---

# 1. Implementation Objective

The goal is to build a production-quality research portal for CMRL that allows the laboratory to:

- Maintain a centralized material database.
- Prevent duplicate material assignments.
- Track DFT research progress.
- Track material properties.
- Manage students and research groups.
- Manage projects.
- Store research files and metadata.
- Track publications.
- Facilitate student collaboration.
- Provide a research forum.
- Maintain institutional research history.
- Provide dashboards for students, supervisors, and administrators.

The implementation must prioritize:

> **Research data integrity over feature quantity.**

---

# 2. Development Philosophy

Do not attempt to build the entire platform simultaneously.

The recommended sequence is:

```text
Foundation
    ↓
Authentication
    ↓
Users
    ↓
Materials
    ↓
Properties
    ↓
Reservations
    ↓
Projects
    ↓
Files
    ↓
Publications
    ↓
Dashboards
    ↓
Notifications
    ↓
Collaboration
    ↓
Forum
    ↓
Admin
    ↓
Advanced Research Features
```

---

# 3. MVP Definition

The first usable version should contain:

```text
✓ Public laboratory website
✓ Firebase authentication
✓ Student accounts
✓ Admin accounts
✓ Student profiles
✓ Material database
✓ Material status
✓ Material reservation
✓ DFT property tracking
✓ Research projects
✓ Project membership
✓ Research files
✓ Publications
✓ Notifications
✓ Student dashboard
✓ Supervisor dashboard
✓ Admin dashboard
```

The MVP does **not** need:

```text
✗ 3D crystal viewer
✗ Advanced scientific plotting
✗ Full Stack Overflow-style forum
✗ Complex recommendation engine
✗ External research APIs
✗ Advanced analytics
✗ Real-time chat
```

These should come later.

---

# 4. Recommended Repository Structure

Use a monorepo.

```text
cmrl-research-portal/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared/
│   └── config/
│
├── docs/
│
├── scripts/
│
├── .github/
│
├── .gitignore
├── README.md
├── package.json
└── pnpm-workspace.yaml
```

Recommended package manager:

> **pnpm**

npm can also be used if preferred.

---

# 5. Frontend Structure

```text
apps/web/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

# 6. Backend Structure

```text
apps/api/
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── researchAreas/
│   │   ├── materials/
│   │   ├── materialProperties/
│   │   ├── reservations/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── researchIdeas/
│   │   ├── collaborations/
│   │   ├── forum/
│   │   ├── notifications/
│   │   ├── files/
│   │   ├── resources/
│   │   ├── announcements/
│   │   ├── achievements/
│   │   └── admin/
│   │
│   ├── routes/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
├── tests/
├── tsconfig.json
└── package.json
```

---

# 7. Module Structure

Each backend module should preferably follow:

```text
materials/
├── material.model.ts
├── material.types.ts
├── material.validation.ts
├── material.repository.ts
├── material.service.ts
├── material.controller.ts
├── material.routes.ts
└── index.ts
```

Responsibilities:

### Model

MongoDB schema.

### Types

TypeScript types/interfaces.

### Validation

Request validation.

### Repository

Database access.

### Service

Business logic.

### Controller

HTTP request/response handling.

### Routes

Endpoint definitions.

---

# 8. Initial Technology Installation

Frontend:

```text
React
Vite
TypeScript
Tailwind CSS
React Router
Axios
Firebase
TanStack Query
Zod
React Hook Form
Lucide React
```

Backend:

```text
Node.js
Express
TypeScript
Mongoose
Firebase Admin
Zod
Helmet
CORS
Rate Limiter
Pino/Winston
```

Testing:

```text
Vitest
React Testing Library
Supertest
```

---

# 9. Frontend State Management

Do not introduce Redux immediately.

Use:

```text
React state
+
TanStack Query
+
Context where appropriate
```

Use TanStack Query for:

- API data
- Caching
- Refetching
- Loading states
- Mutations

Use React Context only for genuinely global client state such as:

- Theme
- Authentication context where appropriate

---

# 10. Backend Architecture

Use:

```text
Route
 ↓
Middleware
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
MongoDB
```

Avoid putting business logic directly inside route handlers.

---

# 11. Environment Variables

Frontend:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_API_BASE_URL
```

Backend:

```text
PORT
NODE_ENV
MONGODB_URI
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
CORS_ORIGIN
JWT/SESSION configuration if later required
FILE_STORAGE configuration
```

Never commit secrets.

---

# 12. Environment Files

Use:

```text
.env
.env.example
```

`.env` must be ignored by Git.

`.env.example` should contain variable names without secrets.

---

# 13. Phase 0 — Project Foundation

### Objective

Create the initial development environment.

### Tasks

```text
[ ] Create Git repository
[ ] Initialize monorepo
[ ] Configure pnpm
[ ] Create Vite React app
[ ] Create Express API
[ ] Configure TypeScript
[ ] Configure ESLint
[ ] Configure Prettier
[ ] Configure Git hooks if desired
[ ] Create environment files
[ ] Create README
```

---

# 14. Phase 0 Definition of Done

The project should successfully run:

```text
Frontend → localhost
Backend → localhost
```

and:

```text
GET /api/v1/health
```

should return:

```json
{
  "success": true,
  "status": "healthy"
}
```

---

# 15. Phase 1 — Design System

Before building dozens of pages, implement the design foundation.

### Tasks

```text
[ ] Configure Tailwind
[ ] Define colors
[ ] Define typography
[ ] Define spacing
[ ] Define border radius
[ ] Define shadows
[ ] Configure dark mode
[ ] Add icon system
[ ] Create Button
[ ] Create Input
[ ] Create Select
[ ] Create Card
[ ] Create Badge
[ ] Create Modal
[ ] Create Table
[ ] Create Tabs
[ ] Create Toast
[ ] Create Skeleton
[ ] Create EmptyState
[ ] Create ErrorState
```

---

# 16. Phase 1 Definition of Done

All future pages should be able to use the same design components.

No page should require custom styling for basic UI elements unless genuinely necessary.

---

# 17. Phase 2 — Public Website

Build the public-facing website.

### Pages

```text
[ ] Home
[ ] About
[ ] Research
[ ] Research Areas
[ ] Publications
[ ] Projects
[ ] People
[ ] Supervisor
[ ] Achievements
[ ] Alumni
[ ] Resources
[ ] Contact
```

---

# 18. Homepage Implementation

Build in this order:

```text
[ ] Header
[ ] Hero
[ ] Research areas
[ ] Supervisor
[ ] Research statistics
[ ] Featured projects
[ ] Publications
[ ] Achievements
[ ] CTA
[ ] Footer
```

Use mock data initially.

Do not wait for every backend feature before making the public site.

---

# 19. Phase 3 — Firebase Authentication

Implement Firebase Authentication.

Required:

```text
[ ] Email/password login
[ ] Google login
[ ] Registration
[ ] Email verification
[ ] Password reset
[ ] Logout
[ ] Auth state listener
[ ] Firebase custom claims: set role claim on user sync and on role change
[ ] Custom claims role values: STUDENT, SUPERVISOR, ADMIN
```

---

# 20. Backend Firebase Verification

Implement:

```text
Firebase Admin SDK
```

Create authentication middleware:

```text
requireAuth
```

Flow:

```text
Firebase token
      ↓
Firebase Admin SDK (verify token)
      ↓
Extract UID + custom claims (role)
      ↓
Find MongoDB user by Firebase UID
      ↓
Check accountStatus (must be ACTIVE)
      ↓
Attach user context to request
      ↓
Continue
```

If `accountStatus` is `PENDING` or `SUSPENDED`, return `403 Forbidden`.

When a user's role changes in MongoDB, the backend must call the Firebase Admin SDK to update the user's custom claims accordingly. MongoDB is the source of truth for role data.

---

# 21. First Login Synchronization

After successful Firebase authentication:

```text
Firebase User
      ↓
POST /auth/sync
      ↓
MongoDB User
```

If new user:

```text
role = STUDENT
rank = NEWBIE
accountStatus = PENDING
```

New accounts always start as `PENDING`. A Supervisor or Admin must approve the account before it becomes `ACTIVE`. A `PENDING` user can authenticate but cannot access protected research functionality.

After MongoDB user creation, set Firebase custom claims:

```text
{ role: "STUDENT" }
```

After activation by a Supervisor or Admin:

```text
accountStatus = ACTIVE
```

---

# 22. Phase 4 — User System

Implement user model and APIs.

### Backend

```text
[ ] User model
[ ] User service
[ ] User controller
[ ] User routes
[ ] Profile validation
[ ] Privacy validation
```

### Frontend

```text
[ ] Profile
[ ] Edit profile
[ ] Profile photo
[ ] Academic information
[ ] Research interests
[ ] External profiles
[ ] Privacy settings
```

---

# 23. Profile Fields

Implement:

```text
Full Name
Photo
Date of Birth
Gender
Batch
Email
Mobile
Research Interests
Skills
Software
LinkedIn
GitHub
ORCID
ResearchGate
```

Privacy-sensitive fields must have visibility controls.

---

# 24. Phase 5 — Research Areas

Implement research areas before materials.

Example:

```text
DFT
Computational Materials
Hydrogen Storage
Crystal Structures
Energy Materials
```

Backend:

```text
[ ] CRUD
[ ] Validation
[ ] Admin management
```

Frontend:

```text
[ ] Research area list
[ ] Research area detail
[ ] Related materials
[ ] Related projects
```

---

# 25. Phase 6 — Material Database

This is the most important implementation phase.

---

# 26. Material Database Backend

Implement:

```text
[ ] Material model
[ ] Material validation
[ ] Material repository
[ ] Material service
[ ] Material controller
[ ] Material routes
[ ] Search
[ ] Filtering
[ ] Sorting
[ ] Pagination
[ ] Duplicate detection
```

---

# 27. Material Creation Workflow

```text
Student/Admin
      ↓
Add Material
      ↓
Validate Formula
      ↓
Check Existing Materials
      ↓
Potential Duplicate?
      ↓
┌─────┴─────┐
Yes         No
 ↓           ↓
Warn       Create
 ↓           ↓
Review     Material
```

---

# 28. Material Status System

Implement standardized status values.

Canonical enum:

```text
PROPOSED
UNDER_REVIEW
AVAILABLE
RESERVED
STUDYING
COMPLETED
PUBLISHED
REJECTED
STRUCTURALLY_UNSTABLE
BLACKLISTED
ARCHIVED
```

Do not allow arbitrary status strings.

- `REJECTED`: A proposed material was rejected during Supervisor or Admin review.
- `STRUCTURALLY_UNSTABLE`: Calculation revealed structural instability. The material record and research history are preserved for future reference.

---

# 29. Material Status Transition Service

Create:

```text
materialStatus.service.ts
```

It should define valid transitions.

Example:

```text
AVAILABLE → RESERVED
RESERVED → STUDYING
STUDYING → COMPLETED
STUDYING → BLACKLISTED
COMPLETED → PUBLISHED
```

---

# 30. Material Dashboard Frontend

Build:

```text
[ ] Search bar
[ ] Filter panel
[ ] Status filter
[ ] Research area filter
[ ] Crystal system filter
[ ] Pagination
[ ] Material table
[ ] Mobile material cards
```

---

# 31. Phase 7 — Material Properties

Implement property architecture.

---

# 32. Property Categories

Start with:

```text
Structural
Electronic
Mechanical
Thermodynamic
Optical
Magnetic
Hydrogen Storage
Other
```

---

# 33. Initial DFT Properties

Do not attempt to implement every imaginable property.

Start with the properties CMRL actually uses.

Possible initial properties:

```text
Lattice Parameters
Unit Cell Volume
Density
Formation Energy
Band Gap
DOS
PDOS
Bulk Modulus
Young's Modulus
Shear Modulus
Poisson Ratio
Phonon
Optical Properties
Magnetic Properties
Hydrogen Storage Capacity
```

More can be added later.

---

# 34. Property Status

Each property should support:

```text
NOT_STUDIED
PLANNED
IN_PROGRESS
COMPLETED
VERIFIED
PUBLISHED
FAILED
```

This is better than simply:

```text
studied = true/false
```

because research is a process.

- `VERIFIED`: The property value has been reviewed and confirmed by the Supervisor.
- `PUBLISHED`: The property result has been included in a published paper.
- `VERIFIED` and `PUBLISHED` are distinct states. A completed property is not automatically verified, and a verified property is not automatically published.

---

# 35. Property UI

Build:

```text
[ ] Property matrix
[ ] Property categories
[ ] Status badges
[ ] Value display
[ ] Unit display
[ ] Methodology
[ ] Verification state
```

---

# 36. Property Verification

Supervisor:

```text
Open Material
 ↓
Open Property
 ↓
Review Result
 ↓
Verify
```

After verification:

```text
status = VERIFIED
verifiedBy = supervisor
verifiedAt = date
```

---

# 37. Phase 8 — Material Reservation

Implement the anti-duplication workflow.

Student:

```text
Available Material
 ↓
View Material
 ↓
Reserve
 ↓
Submit Purpose
 ↓
Submit Request
```

Supervisor:

```text
Review
 ↓
Approve / Reject
```

---

# 38. Reservation Conflict Prevention

This is a critical backend feature.

Before approving:

```text
Check active reservation
Check project assignment
Check current material status
```

The database should enforce appropriate uniqueness constraints where possible.

---

# 39. Reservation UI

Material page should dynamically show:

```text
AVAILABLE
→ [Reserve]

RESERVED
→ Assigned to another project

STUDYING
→ Currently under study

COMPLETED
→ Research completed

BLACKLISTED
→ Not available for research
```

---

# 40. Phase 9 — Research Projects

Implement:

```text
[ ] Project model
[ ] Project creation
[ ] Project membership
[ ] Material assignment
[ ] Project status
[ ] Project progress
[ ] Project timeline
```

---

# 41. Project Workflow

```text
Supervisor
 ↓
Create Project
 ↓
Add Research Area
 ↓
Add Students
 ↓
Assign Materials
 ↓
Track Progress
 ↓
Verify Results
 ↓
Publication
```

---

# 42. Project Dashboard

Display:

```text
Project Progress
Students
Materials
Properties
Files
Publications
Timeline
Recent Activity
```

---

# 43. Phase 10 — Research Files

Storage architecture:

```text
MongoDB
→ file metadata, storage references, access control, versioning

Firebase Storage
→ actual file content (binary)
```

Firebase Storage is the chosen file storage provider. Do not store large research files directly inside MongoDB documents.

The backend must generate short-lived signed URLs for accessing non-public files. Direct public Firebase Storage URLs must not be exposed for restricted research files.

---

# 44. File Types

Initial support:

```text
.cif
.cell
.param
.in
.out
.dat
.csv
.txt
.pdf
.png
.jpg
.zip
```

The exact allowed extensions should be configurable.

---

# 45. File Access Levels

Implement:

```text
PUBLIC
CMRL_MEMBERS
PROJECT_MEMBERS
SUPERVISOR_ONLY
ADMIN_ONLY
```

---

# 46. File Versioning

Research files should support:

```text
v1
v2
v3
...
```

Do not overwrite important research data without preserving history.

---

# 47. Phase 11 — Publications

Implement:

```text
[ ] Publication model
[ ] Authors
[ ] Project relationship
[ ] Material relationship
[ ] DOI
[ ] Journal
[ ] Year
[ ] Publication status
```

---

# 48. Publication Workflow

```text
Research Completed
 ↓
Manuscript
 ↓
Submitted
 ↓
Under Review
 ↓
Accepted
 ↓
Published
```

---

# 49. Phase 12 — Notifications

Implement notifications after the main business workflows exist.

Notification triggers:

```text
Reservation approved
Reservation rejected
Research idea application
Application accepted
Application rejected
Forum reply
Property verification
Project assignment
Announcement
```

---

# 50. Notification Architecture

Use:

```text
Business Event
      ↓
Notification Service
      ↓
Notification Document
      ↓
Frontend
```

Later:

```text
Notification Service
      ↓
Email / Push / In-app
```

---

# 51. Phase 13 — Dashboards

Now build dashboards using real API data.

---

# 52. Student Dashboard

Implement:

```text
[ ] Statistics
[ ] Active materials
[ ] Projects
[ ] Progress
[ ] Notifications
[ ] Recent activity
[ ] Quick actions
```

---

# 53. Supervisor Dashboard

Implement:

```text
[ ] Students
[ ] Projects
[ ] Material assignments
[ ] Pending reservations
[ ] Pending verification
[ ] Publication tracking
```

---

# 54. Admin Dashboard

Implement:

```text
[ ] User statistics
[ ] Material statistics
[ ] Project statistics
[ ] Pending approvals
[ ] Forum reports
[ ] Recent activity
```

---

# 55. Phase 14 — Research Opportunity System

Once the material/property database is stable, implement research opportunity discovery.

The system should identify:

```text
Material
+
Completed properties
+
Missing properties
=
Potential Research Opportunity
```

Example:

```text
LiTeH3

Completed:
✓ Structure
✓ Band Gap
✓ DOS

Missing:
○ Phonon
○ Mechanical
○ Optical
```

---

# 56. Opportunity UI

Show:

```text
Potential Research Opportunity
```

with:

```text
Material
Missing properties
Current researcher
Related project
```

Then:

```text
[Propose Research]
```

---

# 57. Phase 15 — Research Collaboration

Implement:

```text
[ ] Research ideas
[ ] Required skills
[ ] Collaborator applications
[ ] Application status
[ ] Accept/reject
[ ] Notifications
```

---

# 58. Collaboration Workflow

```text
Student A
 ↓
Create Research Idea
 ↓
Student B
 ↓
Apply
 ↓
Student A
 ↓
Review
 ↓
Accept
 ↓
Project/Collaboration
```

---

# 59. Phase 16 — Forum

Build the forum after the research platform is stable.

MVP forum features:

```text
[ ] Questions
[ ] Answers
[ ] Comments
[ ] Tags
[ ] Voting
[ ] Accepted answers
[ ] Search
[ ] Reports
```

Avoid implementing:

```text
✗ Chat
✗ Private messaging
✗ Complex reputation
```

during the first version.

---

# 60. Forum Integration

Connect forum posts with:

```text
Materials
Projects
Research Areas
```

Example:

```text
Question
 ↓
Related Material
 ↓
LiTeH3
```

---

# 61. Phase 17 — Resources

Implement:

```text
[ ] Resource categories
[ ] PDF/document links
[ ] Software tutorials
[ ] Research guides
[ ] DFT tutorials
[ ] Crystallography resources
```

Resources can initially be simple links rather than a sophisticated document management system.

---

# 62. Phase 18 — Announcements

Implement:

```text
[ ] Create announcement
[ ] Publish
[ ] Schedule if needed
[ ] Archive
```

Public announcements:

```text
Seminars
Workshops
Research milestones
Lab events
```

---

# 63. Phase 19 — Achievements and Alumni

Implement:

```text
[ ] Student achievements
[ ] Publications
[ ] Awards
[ ] Scholarships
[ ] Higher studies
[ ] Alumni profiles
```

This section becomes particularly valuable for demonstrating the lab's research track record.

---

# 64. Phase 20 — Admin Panel

Admin functionality:

```text
[ ] Users
[ ] Roles
[ ] Ranks
[ ] Materials
[ ] Projects
[ ] Publications
[ ] Forum moderation
[ ] Resources
[ ] Announcements
[ ] Achievements
[ ] Audit logs
```

---

# 65. Role System

MVP roles:

```text
STUDENT
SUPERVISOR
ADMIN
```

Do not create too many roles initially. The `ALUMNI` role is deferred to post-MVP.

Permissions should be granular enough that a supervisor does not automatically gain every administrative capability.

Firebase custom claims must carry the user's current role. When a role is changed in MongoDB, the backend must update the Firebase custom claims via the Admin SDK. This ensures that the role reflected in issued tokens stays synchronized with MongoDB.

---

# 66. Rank System

Implement:

```text
NEWBIE
BEGINNER
INTERMEDIATE
ADVANCED
EXPERT
LEGEND
```

Rank should be separate from role.

Example:

```text
Role:
STUDENT

Rank:
EXPERT
```

A student can be an Expert without becoming an Admin.

---

# 67. Rank Promotion

Admin should be able to manually promote/demote students.

Future enhancement:

Rank can be based partly on:

```text
Research contributions
Publications
Projects
Forum contributions
Mentorship
```

But do not automate this initially.

---

# 68. Audit Logging

Important operations should generate audit logs.

Examples:

```text
User promoted
Material created
Material blacklisted
Reservation approved
Property verified
Publication edited
File deleted
Account suspended
```

---

# 69. Phase 21 — Security

Security should be implemented throughout development, not at the end.

Required:

```text
[ ] Firebase token verification
[ ] Role authorization
[ ] Ownership checks
[ ] Input validation
[ ] Rate limiting
[ ] CORS
[ ] Helmet
[ ] File validation
[ ] File access control
[ ] Audit logging
[ ] Secure headers
[ ] Secret management
```

---

# 70. Security Rule

Never trust:

```text
userId
role
rank
createdBy
verifiedBy
```

provided by the frontend.

Derive sensitive identity information from the authenticated request.

---

# 71. Phase 22 — Testing

Testing should occur continuously.

---

# 72. Backend Unit Tests

Test:

```text
Material status transitions
Reservation conflicts
Permission checks
Property validation
Project membership
Notification generation
```

---

# 73. Backend Integration Tests

Test:

```text
POST /materials
GET /materials
POST /reservations
PATCH /reservations/:id/approve
POST /projects
POST /properties
```

---

# 74. Frontend Tests

Test:

```text
Login
Profile editing
Material search
Material filtering
Reservation
Dashboard
Notifications
Forum
```

---

# 75. Critical End-to-End Tests

The following workflows must work:

### E2E 1

```text
Register
→ Login
→ Complete Profile
→ Dashboard
```

### E2E 2

```text
Search Material
→ View Material
→ Reserve
→ Supervisor Approves
→ Notification
```

### E2E 3

```text
Project
→ Material
→ Property
→ Upload File
→ Complete Research
```

### E2E 4

```text
Research Idea
→ Apply
→ Accept
→ Notification
```

---

# 76. Phase 23 — Performance

Optimize only after measuring.

Important areas:

```text
Material search
Material filtering
Dashboard aggregation
Forum pagination
File listing
Public pages
```

---

# 77. Database Indexing

Add indexes for common queries.

Important candidates:

```text
formula
materialId
status
researchAreas
project
researchers
createdAt
publicationYear
```

Indexes should be based on actual query patterns.

---

# 78. Material Search Performance

If the database becomes large:

```text
MongoDB text indexes
```

or eventually:

```text
Dedicated search engine
```

may be considered.

Do not introduce Elasticsearch/OpenSearch during MVP unless there is a real need.

---

# 79. Phase 24 — Accessibility

Verify:

```text
[ ] Keyboard navigation
[ ] Focus states
[ ] Contrast
[ ] Labels
[ ] Screen reader compatibility
[ ] Accessible modals
[ ] Accessible tables
[ ] Reduced motion
```

---

# 80. Phase 25 — SEO

Optimize public pages:

```text
[ ] Titles
[ ] Meta descriptions
[ ] Open Graph
[ ] Sitemap
[ ] robots.txt
[ ] Semantic HTML
```

Authenticated pages do not need SEO optimization.

---

# 81. Phase 26 — Deployment

Recommended architecture:

```text
Frontend
→ Vercel / similar hosting

Backend
→ Render / Railway / VPS / similar

Database
→ MongoDB Atlas

Authentication
→ Firebase

File Storage
→ Cloud storage provider
```

The exact providers can be changed later.

---

# 82. Production Architecture

```text
                  Internet
                     │
                     ▼
             ┌───────────────┐
             │ React / Vite  │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │ Express API   │
             └───┬─────┬─────┘
                 │     │
        ┌────────┘     └─────────┐
        ▼                        ▼
 Firebase                  MongoDB Atlas
 Auth                         │
                              ▼
                         Object Storage
```

---

# 83. CI/CD

Use GitHub Actions.

Pipeline:

```text
Push
 ↓
Install
 ↓
Lint
 ↓
Type Check
 ↓
Test
 ↓
Build
 ↓
Deploy
```

---

# 84. Git Branch Strategy

Recommended:

```text
main
develop
feature/*
fix/*
```

Example:

```text
feature/material-database
feature/firebase-auth
fix/reservation-conflict
```

---

# 85. Commit Convention

Use clear commits.

Examples:

```text
feat: add material search API
feat: implement Firebase authentication
fix: prevent duplicate reservations
refactor: separate material service
docs: update API specification
test: add reservation conflict tests
```

---

# 86. Pull Request Requirements

Before merging:

```text
[ ] Build passes
[ ] Type check passes
[ ] Tests pass
[ ] No secrets committed
[ ] API changes documented
[ ] Database changes documented
[ ] UI tested
```

---

# 87. Database Migration / Seed Strategy

Create seed scripts for:

```text
Research Areas
Admin Account
Supervisor Account
Sample Materials
Property Definitions
```

Never hard-code seed data into application startup.

Use explicit scripts.

---

# 88. Development Seed Data

Create example records:

```text
CMRL-MAT-001
CMRL-MAT-002
CMRL-MAT-003
```

with fictional/sample research data.

Clearly mark them as development data.

Do not publish fake scientific results as real CMRL results.

---

# 89. Production Data Import

Before launch:

```text
Existing CMRL material records
Existing projects
Existing publications
Existing students
Existing achievements
```

must be carefully reviewed and imported.

Scientific data should not be bulk imported without validation.

---

# 90. Research Data Integrity

The system should preserve:

```text
Who created the record
Who modified it
When it was modified
Who verified it
Previous status
Previous property values where required
```

This is more important than ordinary CRUD behavior.

---

# 91. Versioning Research Data

For important scientific properties, consider storing versions.

Example:

```text
Band Gap

v1:
1.72 eV

v2:
1.81 eV

v3:
1.82 eV
```

This prevents accidental loss of previous results.

---

# 92. Backup Strategy

Production database should have automated backups.

At minimum:

```text
Daily database backups
```

File storage should also have appropriate redundancy/versioning.

---

# 93. Disaster Recovery

Document:

```text
How to restore MongoDB
How to restore research files
How to recover Firebase configuration
How to redeploy frontend
How to redeploy backend
```

---

# 94. Monitoring

Production should monitor:

```text
API errors
Database errors
Authentication failures
File upload failures
Server uptime
Response time
```

---

# 95. Logging

Backend logs should include:

```text
timestamp
request ID
user ID where appropriate
endpoint
status code
execution time
error information
```

Do not log:

```text
passwords
Firebase tokens
private file URLs
sensitive profile data
```

---

# 96. Phase 27 — Advanced Material Features

After MVP:

```text
[ ] Material comparison
[ ] Advanced scientific plots
[ ] 3D crystal viewer
[ ] CIF preview
[ ] Band structure viewer
[ ] DOS viewer
[ ] Phonon viewer
```

---

# 97. Phase 28 — Research Intelligence

Future system could identify:

```text
Under-studied materials
Missing DFT properties
Potential research opportunities
Duplicate material candidates
Research area gaps
```

Example:

```text
Material A
↓
Only structural + electronic properties studied
↓
Mechanical + phonon + optical properties missing
↓
Research Opportunity Score
```

This should be treated as an advisory system, not an automated scientific decision-maker.

---

# 98. Phase 29 — External Integrations

Possible future integrations:

```text
ORCID
Crossref
DOI metadata
Google Scholar links
GitHub
ResearchGate
```

Do not build these until the internal database is stable.

---

# 99. Phase 30 — Advanced Collaboration

Future features:

```text
Research teams
Private project spaces
Mentorship
Task assignment
Research calendars
Shared notes
Discussion threads
```

Avoid real-time chat until there is a demonstrated need.

---

# 100. Phase 31 — Analytics

Possible research analytics:

```text
Materials studied per year
Properties completed
Projects by research area
Publication count
Student research activity
Research progress
Material coverage
```

Do not expose sensitive student performance statistics publicly.

---

# 101. Development Milestones

## Milestone 1

```text
Project foundation complete
```

---

## Milestone 2

```text
Authentication complete
```

---

## Milestone 3

```text
User/profile system complete
```

---

## Milestone 4

```text
Material database operational
```

---

## Milestone 5

```text
Material property tracking operational
```

---

## Milestone 6

```text
Reservation system operational
```

---

## Milestone 7

```text
Project management operational
```

---

## Milestone 8

```text
Research file system operational
```

---

## Milestone 9

```text
Publication system operational
```

---

## Milestone 10

```text
Dashboards operational
```

---

## Milestone 11

```text
Notifications operational
```

---

## Milestone 12

```text
Collaboration operational
```

---

## Milestone 13

```text
Forum operational
```

---

## Milestone 14

```text
Admin system operational
```

---

## Milestone 15

```text
Production launch
```

---

# 102. Recommended Build Order

The exact implementation sequence should be:

```text
01. Repository
02. Vite React
03. Express API
04. TypeScript
05. Tailwind
06. Design System
07. Firebase
08. Authentication
09. User Model
10. User Profile
11. Research Areas
12. Material Model
13. Material API
14. Material Dashboard
15. Material Properties
16. Reservation System
17. Projects
18. Files
19. Publications
20. Notifications
21. Student Dashboard
22. Supervisor Dashboard
23. Admin Dashboard
24. Research Opportunities
25. Collaboration
26. Forum
27. Resources
28. Announcements
29. Achievements
30. Alumni
31. Audit Logs
32. Testing
33. Security Review
34. Performance Review
35. Deployment
```

---

# 103. What NOT to Build First

Do not begin with:

```text
3D crystal visualization
```

Do not begin with:

```text
Forum
```

Do not begin with:

```text
Research collaboration
```

Do not begin with:

```text
Complex analytics
```

Do not begin with:

```text
AI research recommendations
```

Do not begin with:

```text
Real-time chat
```

These are attractive features but do not establish the core research infrastructure.

---

# 104. The Core Product

The actual heart of CMRL Portal is:

```text
Users
   +
Projects
   +
Materials
   +
Properties
   +
Research Files
   +
Publications
```

Everything else should connect to these.

---

# 105. Critical Feature: Material Ownership

Every active material should have a clear research relationship.

Example:

```text
Material
    ↓
Project
    ↓
Group Head
    ↓
Researchers
```

The system should make it difficult to accidentally create ambiguous ownership.

---

# 106. Critical Feature: Research Status

The material status and property status must be separate.

Example:

```text
Material:
STUDYING

Properties:
Structure → VERIFIED
Band Gap → VERIFIED
DOS → COMPLETED
Phonon → IN_PROGRESS
Optical → NOT_STUDIED
```

Do not reduce the entire research state to one boolean.

---

# 107. Critical Feature: Blacklist

A blacklisted material should not disappear.

Instead:

```text
Material
 ↓
BLACKLISTED
 ↓
Reason
 ↓
Evidence
 ↓
Research history
```

Students should be able to search it but should not accidentally reserve it.

---

# 108. Critical Feature: Duplicate Prevention

When adding a material:

```text
Formula
+
Composition
+
Crystal information
+
Existing database
```

should be used to identify potential duplicates.

The system should warn researchers before creating a new material.

---

# 109. Critical Feature: Research History

Do not overwrite important research information.

Prefer:

```text
Created
Updated
Verified
Archived
```

and versioned records where scientific results require historical preservation.

---

# 110. Critical Feature: Supervisor Verification

Not every result should automatically become:

```text
VERIFIED
```

A student may mark:

```text
COMPLETED
```

but the supervisor can mark:

```text
VERIFIED
```

This distinction is important for research credibility.

---

# 111. Definition of Done — Material Feature

The material feature is complete only when:

```text
[ ] Create material
[ ] View material
[ ] Search
[ ] Filter
[ ] Sort
[ ] Pagination
[ ] Duplicate detection
[ ] Status management
[ ] Property management
[ ] Researcher assignment
[ ] Project assignment
[ ] Reservation
[ ] Files
[ ] Publications
[ ] History
[ ] Authorization
[ ] Tests
```

---

# 112. Definition of Done — Student Feature

```text
[ ] Register
[ ] Login
[ ] Google login
[ ] Profile
[ ] Profile photo
[ ] Research interests
[ ] External profiles
[ ] Projects
[ ] Materials
[ ] Reservations
[ ] Notifications
[ ] Files
[ ] Collaboration
[ ] Forum
```

---

# 113. Definition of Done — Project Feature

```text
[ ] Create project
[ ] Add supervisor
[ ] Add students
[ ] Add materials
[ ] Track progress
[ ] Track milestones
[ ] Upload files
[ ] Link publications
[ ] Activity history
[ ] Permissions
```

---

# 114. Definition of Done — Production Launch

Before launch:

```text
[ ] Security audit
[ ] Authentication tested
[ ] Authorization tested
[ ] Database backup configured
[ ] File backup configured
[ ] Error handling complete
[ ] Rate limiting enabled
[ ] HTTPS enabled
[ ] Environment secrets secured
[ ] Production database verified
[ ] Production Firebase verified
[ ] Mobile UI tested
[ ] Accessibility tested
[ ] API tests passing
[ ] Frontend tests passing
[ ] E2E tests passing
[ ] Monitoring configured
[ ] Recovery procedure documented
```

---

# 115. Suggested Development Milestone Structure

Instead of thinking:

> "I need to build the entire website."

Think:

### Sprint 1

```text
Foundation
```

### Sprint 2

```text
Authentication + Profiles
```

### Sprint 3

```text
Material Database
```

### Sprint 4

```text
DFT Properties + Reservations
```

### Sprint 5

```text
Projects + Files
```

### Sprint 6

```text
Publications + Dashboards
```

### Sprint 7

```text
Notifications
```

### Sprint 8

```text
Collaboration
```

### Sprint 9

```text
Forum
```

### Sprint 10

```text
Admin + Audit
```

### Sprint 11

```text
Testing + Security
```

### Sprint 12

```text
Deployment + Launch
```

The actual duration of each sprint should depend on available development time.

---

# 116. Development Rule

At the end of every major phase:

```text
Build
 ↓
Test
 ↓
Fix
 ↓
Document
 ↓
Commit
 ↓
Continue
```

Do not accumulate large amounts of unfinished code.

---

# 117. Git Milestone Tags

Create tags such as:

```text
v0.1-foundation
v0.2-auth
v0.3-users
v0.4-materials
v0.5-properties
v0.6-projects
v0.7-publications
v0.8-dashboard
v0.9-community
v1.0-production
```

---

# 118. Recommended First Coding Session

The first implementation session should contain only:

```text
1. Create repository
2. Create monorepo
3. Create Vite React application
4. Create Express API
5. Configure TypeScript
6. Configure Tailwind
7. Configure ESLint/Prettier
8. Add health endpoint
9. Create basic homepage
10. Commit initial foundation
```

Do not start building the material database on the first day.

---

# 119. Recommended Second Stage

After the foundation:

```text
1. Firebase project
2. Firebase Authentication
3. Google authentication
4. Email/password authentication
5. Firebase Admin SDK
6. Auth middleware
7. User model
8. /auth/sync
9. Login page
10. Registration page
11. Protected routes
```

---

# 120. Recommended Third Stage

Then build the most important CMRL feature:

```text
Material Database
```

Start with:

```text
Material model
 ↓
Material API
 ↓
Material list
 ↓
Material detail
 ↓
Search
 ↓
Filters
 ↓
Status
```

Only after that:

```text
Properties
Reservations
Projects
```

---

# 121. Architectural Rule

When a feature is introduced, ask:

> Which existing entity does this feature belong to?

Examples:

```text
DFT Property
→ Material

Research File
→ Project / Material

Publication
→ Project / Material

Forum Question
→ Optional Material / Project

Collaboration
→ Research Idea / Project
```

This prevents disconnected features.

---

# 122. Final Implementation Architecture

```text
                       CMRL PORTAL
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
     PUBLIC              RESEARCH            COMMUNITY
        │                   │                   │
     Website            Materials            Forum
     Research            Properties           Collaboration
     People              Projects             Notifications
     Publications        Files                Resources
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                       USER SYSTEM
                            │
                    ┌───────┼────────┐
                    │       │        │
                 Student Supervisor Admin
                    │       │        │
                    └───────┼────────┘
                            │
                            ▼
                    RESEARCH DATABASE
                            │
                 ┌──────────┼──────────┐
                 │          │          │
              Materials  Projects  Publications
                 │
              Properties
                 │
               Files
```

---

# 123. Final Product Goal

The CMRL Research Portal should ultimately become more than a laboratory website.

It should become the laboratory's:

> **Research Information System**

where the complete research lifecycle can be represented:

```text
Idea
 ↓
Material
 ↓
Reservation
 ↓
Project
 ↓
DFT Calculation
 ↓
Property
 ↓
Verification
 ↓
Research File
 ↓
Publication
 ↓
Achievement
 ↓
Alumni
```

At the same time, the community layer should connect researchers:

```text
Student
 ↓
Question
 ↓
Discussion
 ↓
Research Idea
 ↓
Collaboration
 ↓
Project
```

---

# 124. Final Implementation Principle

The most important rule for the project is:

> **Build the research infrastructure first. Build the social features second. Build the advanced scientific visualization third.**

The material database, project system, property tracking, reservation system, and research history are the core intellectual infrastructure of CMRL.

If those are designed correctly, the forum, collaboration system, notifications, dashboards, analytics, and future scientific tools can all be built on top of the same foundation.

---

# 125. Documentation Sequence

The current project documentation should now contain:

```text
01. PRD.md
02. ARCHITECTURE.md
03. DATABASE_SCHEMA.md
04. API_SPEC.md
05. UI_UX_SPEC.md
06. IMPLEMENTATION_PLAN.md
```

The next useful document is:

# `SECURITY_SPEC.md`

It should define the security model in detail, including:

- Firebase authentication
- Role-based access control
- Permission matrix
- Student/supervisor/admin boundaries
- MongoDB security
- File security
- Research-data privacy
- API security
- Rate limiting
- Input validation
- XSS/CSRF considerations
- CORS
- Secret management
- Audit logging
- Account suspension
- Data deletion
- Backup/recovery
- Production security checklist

This should be completed **before implementing the sensitive parts of the backend**, especially user management, research files, and administrative functions.