````markdown
<div align="center">

# 🔬 CMRL Research Portal

### Computational Materials Research Lab
### Department of Physics · Pabna University of Science and Technology

<br>

<p>
  <strong>A secure, role-based academic and research management platform for CMRL.</strong>
</p>

<br>

![Status](https://img.shields.io/badge/Status-Active%20Development-0f766e?style=for-the-badge)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strongly%20Typed-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

</div>

---

# 📖 Table of Contents

- [About CMRL](#-about-cmrl)
- [About the Portal](#-about-the-portal)
- [Objectives](#-objectives)
- [Core Features](#-core-features)
- [User Roles](#-user-roles)
- [Authentication System](#-authentication-system)
- [Registration Workflow](#-registration-workflow)
- [User Profile System](#-user-profile-system)
- [Student Dashboard](#-student-dashboard)
- [Supervisor Dashboard](#-supervisor-dashboard)
- [Administrator Dashboard](#-administrator-dashboard)
- [Notification Center](#-notification-center)
- [Audit System](#-audit-system)
- [Supervisor–Student Management](#-supervisorstudent-management)
- [CMRL Supervisor](#-cmrl-supervisor)
- [Research-Oriented Architecture](#-research-oriented-architecture)
- [Technology Stack](#-technology-stack)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Authentication & Security Architecture](#-authentication--security-architecture)
- [Database Architecture](#-database-architecture)
- [API Architecture](#-api-architecture)
- [Project Structure](#-project-structure)
- [Application Routes](#-application-routes)
- [Environment Configuration](#-environment-configuration)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Verification](#-verification)
- [User Manual](#-user-manual)
- [Development Guidelines](#-development-guidelines)
- [Future Development](#-future-development)
- [Security](#-security)
- [Creator](#-creator)
- [Academic Context](#-academic-context)
- [License](#-license)

---

# 🔬 About CMRL

The **Computational Materials Research Lab (CMRL)** is a research laboratory associated with the **Department of Physics, Pabna University of Science and Technology (PUST)**.

The laboratory focuses on computational and theoretical approaches to materials research, including areas such as:

- Computational Materials Science
- Density Functional Theory
- First-Principles Calculations
- Molecular Dynamics
- Materials Modeling
- Computational Mechanics
- Electronic and structural properties of materials
- Hydrogen-storage-related materials research
- Sustainable and functional materials
- Materials simulation and characterization

The CMRL Research Portal is intended to provide a dedicated digital environment for managing the laboratory's members, research activities, academic information, and administrative workflow.

---

# 🌐 About the Portal

The **CMRL Research Portal** is a full-stack web application designed specifically for the operational and academic requirements of a computational materials research laboratory.

The platform combines:

```text
Authentication
      │
      ▼
User Management
      │
      ├──────────────► Academic Profiles
      │
      ├──────────────► Research Profiles
      │
      ├──────────────► Supervisor Management
      │
      ├──────────────► Notifications
      │
      ├──────────────► Administrative Controls
      │
      └──────────────► Audit & Accountability
````

The architecture is intentionally modular so that research-specific functionality can be added without rebuilding the authentication, authorization, profile, and administrative foundations.

---

# 🎯 Objectives

The portal is designed to:

* Centralize CMRL member information
* Provide secure authentication
* Establish controlled member registration
* Allow supervisors to review student registrations
* Provide administrators with system-wide control
* Maintain academic and research profiles
* Establish student–supervisor relationships
* Provide persistent laboratory notifications
* Maintain administrative audit records
* Prepare the platform for future research-project management
* Provide a professional digital identity for the laboratory

---

# ✨ Core Features

## 🔐 Authentication

* Email/password authentication
* Google authentication
* Firebase Authentication
* Firebase ID token verification
* MongoDB account synchronization
* Secure logout
* Protected routes
* Account-status enforcement
* Password update functionality
* Friendly authentication error messages

## 👤 User Management

* Student registration
* Supervisor management
* Administrator management
* Account approval
* Account rejection
* Account suspension
* Account reactivation
* Member rank management
* Role management
* Academic profile management
* Research profile management

## 🔔 Notifications

* Persistent notifications
* Notification bell
* Unread notification count
* Notification dropdown
* Full notification history
* Mark as read
* Mark all as read
* Role-specific notification delivery
* Context-aware notification links

## 📊 Dashboards

* Student Dashboard
* Supervisor Dashboard
* Administrator Dashboard

## 📝 Administrative Accountability

* Administrative audit logs
* User action tracking
* Role-change records
* Rank-change records
* Approval/rejection records
* Suspension/reactivation records

---

# 👥 User Roles

The system currently uses three primary authorization roles.

| Capability                       | 👨‍🎓 Student | 🧑‍🏫 Supervisor | 🛡️ Administrator |
| -------------------------------- | :-----------: | :--------------: | :---------------: |
| Personal Dashboard               |       ✅       |         ✅        |         ✅         |
| Profile                          |       ✅       |         ✅        |         ✅         |
| Research Profile                 |       ✅       |         ✅        |         ✅         |
| Notifications                    |       ✅       |         ✅        |         ✅         |
| View Members                     |    Limited    |         ✅        |         ✅         |
| Review Registrations             |       ❌       |         ✅        |         ✅         |
| Approve Students                 |       ❌       |         ✅        |         ✅         |
| Reject Students                  |       ❌       |         ✅        |         ✅         |
| Suspend Members                  |       ❌       |         ✅        |         ✅         |
| Reactivate Members               |       ❌       |         ✅        |         ✅         |
| Change Member Rank               |       ❌       |         ✅        |         ✅         |
| Change Authorization Role        |       ❌       |         ❌        |         ✅         |
| Audit Logs                       |       ❌       |         ❌        |         ✅         |
| System Overview                  |       ❌       |         ❌        |         ✅         |
| Administrative Security Controls |       ❌       |         ❌        |         ✅         |

---

# 🔑 Authorization Model

Authorization is **backend authoritative**.

The frontend provides route protection and user-interface restrictions, but the backend independently verifies:

```text
Firebase Identity
       ↓
MongoDB User
       ↓
Account Status
       ↓
Authorization Role
       ↓
Requested Operation
```

A user cannot gain privileges simply by modifying frontend requests or manually navigating to a protected URL.

---

# 🔐 Authentication System

Authentication is handled through **Firebase Authentication**.

Supported authentication methods:

### Email & Password

Users register using CMRL's academic registration form.

### Google

Users may authenticate using their Google account.

For a first-time Google registration:

```text
Google Authentication
        ↓
Firebase User
        ↓
CMRL Registration Completion
        ↓
Required Academic Information
        ↓
MongoDB Account
        ↓
PENDING
        ↓
Supervisor / Administrator Review
```

---

# 📝 Registration Workflow

## Email Registration

The registration form collects:

* Full Name
* University Roll
* Email
* Password
* Gender
* Mobile Number
* University
* Department

Default academic selections:

```text
University:
Pabna University of Science and Technology

Department:
Department of Physics
```

### University Roll

The roll number is stored as a string so that leading zeros can be preserved.

Only numeric characters are accepted.

### Bangladeshi Mobile Number

Bangladeshi mobile numbers are validated according to the expected local format and normalized to international format:

```text
+8801XXXXXXXXX
```

### Password

Password validation requires a sufficiently strong password containing:

* Uppercase character
* Lowercase character
* Number
* Special character
* Minimum required length

---

# 🔵 Google Registration

For a new Google user, information available from Google is automatically populated where appropriate.

This may include:

* Name
* Email
* Profile photograph

The user is then asked to complete the remaining CMRL-specific registration information.

Existing Google users are synchronized with their existing MongoDB account without resetting their:

* Role
* Account status
* Rank
* Research information
* Profile information

---

# ⏳ Account Approval

New accounts enter the system as:

```text
Role:
STUDENT

Status:
PENDING

Rank:
NEWBIE
```

The user cannot access active member functionality until approval.

Authorized Supervisors and Administrators receive a:

```text
NEW_REGISTRATION
```

notification.

After approval:

```text
PENDING
   ↓
ACTIVE
```

The student receives an:

```text
ACCOUNT_APPROVED
```

notification.

---

# ❌ Registration Rejection

A Supervisor or Administrator may reject a pending registration.

The account becomes:

```text
REJECTED
```

The account is not silently deleted, preserving administrative traceability.

The student receives an:

```text
ACCOUNT_REJECTED
```

notification.

---

# 👤 User Profile System

Every authenticated user has a profile.

## Personal Information

* Full Name
* Gender
* Mobile Number
* Profile Photograph

## Academic Information

* University
* Department
* University Roll

## Research Information

* Research Biography
* Research Interests
* Current Research Information
* Academic profile links

## External Academic Profiles

The architecture supports external academic identifiers and links such as:

* Google Scholar
* ResearchGate
* ORCID
* Personal academic websites

---

# 🖼️ Profile Photographs

Users may upload a profile photograph.

Google-authenticated users may initially use their Google profile photograph.

The profile system supports:

* Avatar preview
* Image upload
* Image replacement
* Google-photo restoration where applicable
* Image-size validation
* Fallback avatars

The system distinguishes between user-controlled photographs and canonical institutional profile photographs where necessary.

---

# 📊 Profile Completion

The portal provides profile-completion feedback.

A user can see:

```text
Profile Completion
████████████████░░░░ 85%
```

The system can identify incomplete profile information and provide a direct route to the profile editor.

---

# 🎓 Student Dashboard

The Student Dashboard provides the student's primary CMRL workspace.

It includes:

* Account status
* Member rank
* Profile completion
* Research profile
* Research interests
* Assigned supervisor
* Notifications
* Quick actions
* Academic information

Example:

```text
┌─────────────────────────────────────┐
│          Student Dashboard          │
├─────────────────────────────────────┤
│ Rank: NEWBIE                        │
│ Status: ACTIVE                      │
│                                     │
│ Supervisor: Dr. Md. Lokman Ali      │
│                                     │
│ Research Interests                  │
│ • Hydrogen Storage                  │
│ • Computational Materials Science   │
│                                     │
│ Profile Completion: 85%             │
└─────────────────────────────────────┘
```

---

# 🧑‍🏫 Supervisor Dashboard

Supervisors have operational control over laboratory membership.

A Supervisor can:

* View pending registrations
* Approve registrations
* Reject registrations
* View members
* View member profiles
* Suspend members
* Reactivate members
* Change member rank
* Review research information
* View assigned research students
* Receive registration notifications

A Supervisor cannot change authorization roles.

---

# 🛡️ Administrator Dashboard

The Administrator Dashboard is the highest application-level management interface.

Administrators can:

* View system overview
* Manage users
* Approve registrations
* Reject registrations
* Suspend members
* Reactivate members
* Change ranks
* Change authorization roles
* Manage Supervisors
* Review audit logs
* Review system metrics
* Manage administrative functions

The Administrator role is protected by backend authorization.

---

# 🔔 Notification Center

CMRL separates **temporary UI feedback** from **persistent notifications**.

## Toast Notifications

Toast messages provide immediate feedback for user actions.

Examples:

```text
✓ Profile updated successfully
✓ Account approved successfully
✓ Signed out successfully
✕ Invalid credentials
✕ Unable to update profile
```

## Persistent Notifications

Persistent notifications are stored in MongoDB.

Supported events include:

| Event               | Recipient                    |
| ------------------- | ---------------------------- |
| New Registration    | Supervisors + Administrators |
| Account Approved    | Target Student               |
| Account Rejected    | Target Student               |
| Account Suspended   | Target User                  |
| Account Reactivated | Target User                  |
| Role Updated        | Target User                  |
| Rank Updated        | Target User                  |
| System Notice       | Relevant Users               |
| Announcement        | Active Users                 |

---

# 🔔 Notification Interface

Authenticated users receive a notification bell in the application header.

The notification interface provides:

* Unread count
* Recent notifications
* Read/unread indicators
* Mark as read
* Mark all as read
* Full notification history
* Contextual navigation links

Example:

```text
🔔 3
```

Only the authenticated user's notifications can be retrieved or modified.

---

# 🧾 Audit System

Administrative actions are recorded through the audit system.

Tracked actions include:

```text
USER_APPROVED
USER_REJECTED
USER_SUSPENDED
USER_REACTIVATED
USER_ROLE_CHANGED
USER_RANK_CHANGED
```

An audit record contains information such as:

```text
Actor
Actor Role
Action
Target User
Metadata
Timestamp
```

Audit records provide accountability and help prevent silent administrative changes.

---

# 🔗 Supervisor–Student Management

The system contains infrastructure for assigning students to supervisors.

The relationship is represented through a user reference:

```text
assignedSupervisorUserId
```

Conceptually:

```text
Student
   │
   ▼
Assigned Supervisor
   │
   ▼
Research Work
   │
   ├── Projects
   ├── Progress
   ├── Publications
   └── Reports
```

This relationship forms the foundation for future research supervision functionality.

---

# 👨‍🔬 CMRL Supervisor

## Dr. Md. Lokman Ali

**Associate Professor**
Department of Physics
Pabna University of Science and Technology

**Director, Research and Technology Transfer Cell, PUST**

**Supervisor — Computational Materials Research Lab**

### Education

* B.Sc. (Hons.) in Physics — University of Chittagong
* M.S. in Physics — University of Chittagong
* Ph.D. in Engineering — Osaka University, Japan

### Research Areas

* Computational Materials Science
* Density Functional Theory
* First-Principles Calculations
* Molecular Dynamics
* Computational Mechanics
* Multiscale Materials Modeling
* Materials Synthesis
* Optoelectronic Materials
* Sustainable Materials
* Lead-Free Materials
* Multi-Principal-Element Alloys
* High-Entropy Materials

### Computational Methods & Software

* DFT
* First-Principles Calculations
* Molecular Dynamics
* CASTEP
* VASP
* LAMMPS
* SCAPS-1D

### Current Research

**Chemical short-range order (CSRO) formation on the grain boundary in multi-principal element alloys**

### Academic Profiles

* PUST Faculty Profile
* Google Scholar
* ResearchGate
* ORCID

### CMRL Account

```text
Role:
SUPERVISOR

Status:
ACTIVE

Rank:
SENIOR_MEMBER
```

The account is provisioned separately from normal student registration.

---

# 🧪 Research-Oriented Architecture

The portal is intentionally designed beyond simple user administration.

Future research modules can integrate directly with the existing user and supervisor architecture.

A potential research workflow is:

```text
Student
   │
   ▼
Supervisor
   │
   ▼
Research Project
   │
   ├───────────────┐
   ▼               ▼
Material         Calculation
   │               │
   ▼               ▼
Structure        Parameters
   │               │
   └───────┬───────┘
           ▼
        Results
           │
           ▼
      Research Report
           │
           ▼
       Publication
```

This architecture is suitable for future integration of computational materials research workflows.

---

# 💻 Technology Stack

## Frontend

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| React            | Component-based user interface             |
| TypeScript       | Static typing and application contracts    |
| Vite             | Development server and production bundling |
| React Router     | Client-side routing and protected routes   |
| Axios            | HTTP communication with backend            |
| Firebase Web SDK | Client-side authentication                 |
| Tailwind CSS     | Responsive interface styling               |
| CSS              | Custom presentation and interface behavior |

### Frontend Responsibilities

The frontend handles:

* User interface
* Authentication state
* Registration forms
* Profile management
* Dashboards
* Notifications
* Protected navigation
* Role-aware presentation
* Toast feedback
* Academic profile pages

The frontend does **not** serve as the final authorization authority.

---

# ⚙️ Backend Technology Stack

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| Node.js            | Server-side runtime                     |
| Express            | REST API framework                      |
| TypeScript         | Backend type safety                     |
| Mongoose           | MongoDB object modeling                 |
| MongoDB            | Primary application database            |
| Firebase Admin SDK | Server-side authentication verification |
| Zod                | Request/data validation                 |
| Pino               | Structured server logging               |

### Backend Responsibilities

The backend handles:

* Authentication verification
* User synchronization
* Authorization
* Account lifecycle
* Registration approval
* Member management
* Role management
* Rank management
* Notifications
* Audit logging
* Database operations
* Business rules

---

# 🔐 Authentication & Security Technology

## Firebase Authentication

Firebase provides the identity layer.

Supported authentication:

```text
Email / Password
Google
```

## Firebase Admin SDK

The backend verifies Firebase ID tokens before granting access to protected APIs.

## MongoDB Authorization State

MongoDB remains authoritative for:

```text
role
accountStatus
rank
profile
researchProfile
```

Firebase Custom Claims are limited to the high-level authorization role.

Example:

```json
{
  "role": "STUDENT"
}
```

---

# 🍃 Database Architecture

The database is MongoDB.

Mongoose models currently include:

```text
User
AuditLog
Notification
```

## User

The User model stores:

```text
firebaseUid
userId
role
accountStatus
rank

profile
researchProfile
externalProfiles
privacy

assignedSupervisorUserId

createdAt
updatedAt
```

## AuditLog

Stores administrative actions.

## Notification

Stores persistent user notifications.

---

# 🔌 API Architecture

The backend follows a versioned REST architecture.

Base path:

```text
/api/v1
```

---

## Authentication API

```http
POST /api/v1/auth/sync
GET  /api/v1/auth/me
```

### `POST /auth/sync`

Synchronizes a verified Firebase identity with the CMRL MongoDB account.

### `GET /auth/me`

Returns the current authenticated CMRL user context.

---

# 👤 User API

```http
PATCH /api/v1/users/profile
```

Updates the authenticated user's permitted profile information.

---

# 🔔 Notification API

```http
GET   /api/v1/notifications
GET   /api/v1/notifications/unread-count
PATCH /api/v1/notifications/:id/read
PATCH /api/v1/notifications/read-all
```

All notification operations enforce ownership at the backend level.

---

# 🛡️ Administration API

```http
GET   /api/v1/admin/users
GET   /api/v1/admin/users/pending
GET   /api/v1/admin/users/:userId

PATCH /api/v1/admin/users/:userId/approve
PATCH /api/v1/admin/users/:userId/reject
PATCH /api/v1/admin/users/:userId/suspend
PATCH /api/v1/admin/users/:userId/reactivate
PATCH /api/v1/admin/users/:userId/rank
PATCH /api/v1/admin/users/:userId/role

GET /api/v1/admin/audit-logs
GET /api/v1/admin/system/overview
```

Access is controlled by backend role middleware.

---

# ❤️ Health API

```http
GET /api/v1/health
```

Returns the health state of the API.

Example:

```json
{
  "success": true,
  "status": "healthy"
}
```

---

# 🏗️ Frontend Architecture

The frontend is organized into reusable application layers.

```text
apps/web/src/
│
├── components/
│   ├── auth/
│   └── layout/
│
├── context/
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   └── ToastContext.tsx
│
├── lib/
│   ├── firebase.ts
│   └── errorHandler.ts
│
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   ├── StudentDashboardPage.tsx
│   ├── SupervisorDashboardPage.tsx
│   ├── AdminDashboardPage.tsx
│   ├── NotificationsPage.tsx
│   ├── PeoplePage.tsx
│   └── SupervisorProfilePage.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
└── App.tsx
```

---

# 🧱 Backend Architecture

```text
apps/api/src/
│
├── config/
│   ├── db.ts
│   └── firebaseAdmin.ts
│
├── middleware/
│   └── auth.middleware.ts
│
├── models/
│   ├── User.ts
│   ├── AuditLog.ts
│   └── Notification.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   ├── admin.routes.ts
│   ├── notification.routes.ts
│   └── health.routes.ts
│
├── scripts/
│   └── seedSupervisor.ts
│
└── server.ts
```

---

# 📁 Complete Project Structure

```text
CMRL-Research-Portal/
│
├── apps/
│   │
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── db.ts
│   │   │   │   └── firebaseAdmin.ts
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   └── auth.middleware.ts
│   │   │   │
│   │   │   ├── models/
│   │   │   │   ├── User.ts
│   │   │   │   ├── AuditLog.ts
│   │   │   │   └── Notification.ts
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── admin.routes.ts
│   │   │   │   ├── notification.routes.ts
│   │   │   │   └── health.routes.ts
│   │   │   │
│   │   │   ├── scripts/
│   │   │   │   └── seedSupervisor.ts
│   │   │   │
│   │   │   └── server.ts
│   │   │
│   │   └── package.json
│   │
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── lib/
│       │   ├── pages/
│       │   ├── routes/
│       │   └── App.tsx
│       │
│       └── package.json
│
├── packages/
│   └── shared/
│       └── src/
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

---

# 🗺️ Application Routes

## Public

```text
/
 /people
 /people/dr-lokman-ali
 /login
 /register
```

## Authenticated

```text
/dashboard
/profile
/notifications
```

## Supervisor

```text
/supervisor
```

## Administrator

```text
/admin
```

---

# 🔧 Environment Configuration

The project uses environment variables for sensitive configuration.

## Backend

Create:

```text
apps/api/.env
```

Example:

```env
MONGODB_URI=mongodb://localhost:27017/cmrl

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="your-private-key"
```

## Frontend

Create:

```text
apps/web/.env
```

and provide the required Firebase client configuration.

### ⚠️ Never commit

```text
.env
.env.local
Firebase service-account credentials
Private keys
Database credentials
Authentication secrets
API secrets
```

Only `.env.example` files containing non-sensitive placeholders should be committed.

---

# 📦 Installation

## Requirements

Install:

* Node.js
* pnpm
* MongoDB
* Firebase project

Verify:

```bash
node --version
pnpm --version
```

---

## Clone Repository

```bash
git clone <repository-url>
cd CMRL-Research-Portal
```

---

## Install Dependencies

```bash
pnpm install
```

---

# ▶️ Running the Application

## Backend

Open a terminal:

```bash
pnpm --filter api dev
```

The development API runs on:

```text
http://localhost:3001
```

Health check:

```text
http://localhost:3001/api/v1/health
```

---

## Frontend

Open another terminal:

```bash
pnpm --filter web dev
```

The development frontend runs on:

```text
http://localhost:5173
```

---

# 🧪 Verification

Before committing significant changes, run:

```bash
pnpm run typecheck
pnpm run lint
pnpm run build
```

## Typecheck

Validates TypeScript correctness across the workspace.

## Lint

Checks code quality and consistency.

## Build

Creates the production frontend bundle and compiles the backend.

---

# 📘 User Manual

## 👨‍🎓 Student

### Register

1. Open the CMRL Portal.
2. Select **Register**.
3. Enter the required personal and academic information.
4. Submit the registration.
5. Wait for Supervisor/Administrator approval.

Alternatively:

1. Select **Register with Google**.
2. Authenticate with Google.
3. Complete the required CMRL information.
4. Submit the registration.

---

## ⏳ Waiting for Approval

After registration, the account remains:

```text
PENDING
```

The student cannot use active-member functionality until approval.

Authorized Supervisors and Administrators receive a registration notification.

---

## ✅ After Approval

The account becomes:

```text
ACTIVE
```

The student receives a notification and can access the Student Dashboard.

---

## 🔑 Sign In

Users can sign in using:

* Email and password
* Google authentication

Successful authentication takes the user to the appropriate workspace.

---

## 🚪 Sign Out

Use the **Sign Out** control in the application header.

The system clears the active authentication state and returns the user to the login page.

---

## 👤 Update Profile

Open:

```text
My Profile
```

Users can update permitted:

* Personal information
* Academic information
* Profile photograph
* Research information

---

## 🔔 Notifications

Click the notification bell.

Users can:

* Read recent notifications
* Open notification details
* Mark notifications as read
* Mark all notifications as read
* Open complete notification history

---

## 🧑‍🏫 Supervisor

Supervisors open:

```text
Supervisor Dashboard
```

They can review pending students and perform permitted member-management operations.

---

## 🛡️ Administrator

Administrators open:

```text
Admin Dashboard
```

They have access to system-level management functionality.

---

# 🔒 Security Architecture

The application uses layered security.

```text
┌─────────────────────────────┐
│ Firebase Authentication     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Firebase ID Token           │
│ Verification                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ MongoDB User Lookup         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Account Status Validation   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Role Authorization          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Protected API Operation     │
└─────────────────────────────┘
```

### Important Principles

* Authentication is handled by Firebase.
* Authentication tokens are verified by the backend.
* Authorization is enforced by the backend.
* MongoDB stores the authoritative CMRL account state.
* Students cannot assign themselves privileged roles.
* Administrative endpoints require appropriate roles.
* Notification ownership is enforced server-side.
* Administrative actions can be audited.
* Sensitive credentials are stored outside source control.

---

# 🔐 Pre-Provisioned Supervisor Accounts

Certain institutional accounts may be provisioned by CMRL administrators rather than created through ordinary student registration.

The provisioning mechanism supports:

```text
Pre-provisioned account
        ↓
Verified Firebase identity
        ↓
Controlled account linking
        ↓
Existing role preserved
        ↓
Authenticated Supervisor
```

Once linked, the Firebase UID becomes the primary identity reference.

This prevents ordinary registration from being used to obtain privileged authorization roles.

---

# 🧭 Development Guidelines

When extending the project:

### Authentication

Do not place authorization decisions solely in frontend code.

### Authorization

Always enforce privileged operations in backend middleware.

### Database

Do not expose MongoDB credentials in source code.

### Firebase

Never commit Firebase Admin private keys.

### Profiles

Preserve existing user data during authentication synchronization.

### Notifications

Ensure notifications are delivered only to their intended recipients.

### Administrative Actions

Important account changes should generate audit records.

### API

Maintain the `/api/v1` versioned API structure.

### Frontend

Prefer reusable components and contexts rather than duplicating application-wide state logic.

---

# 🚀 Future Development

The current system provides the foundation for a broader CMRL research-management platform.

## 🔬 Research Projects

Potential functionality:

* Project creation
* Project assignment
* Research objectives
* Research milestones
* Project status
* Supervisor review
* Student participation

---

## 🧮 Computational Materials

Potential future modules:

* Material database
* Crystal structures
* CIF file management
* DFT calculation records
* Calculation parameters
* Cut-off energies
* K-point configurations
* Exchange-correlation functionals
* Pseudopotentials
* Geometry optimization
* Phonon calculations
* Electronic structure
* Band structure
* Density of States
* Optical properties
* Thermodynamic properties
* Mechanical properties

---

## 💾 Research Data

Future support may include:

* CIF files
* Input files
* Output files
* Computational datasets
* Figures
* Tables
* Research reports
* Supplementary materials

---

## 📚 Publications

Potential functionality:

* Publication records
* DOI management
* Author lists
* Student publications
* Supervisor publications
* Journal information
* Citation information

---

## 📈 Research Progress

Future functionality may include:

* Student progress reports
* Research milestones
* Supervisor feedback
* Meeting records
* Research activity tracking
* Project timelines

---

## 🖥️ Computational Resources

Future modules may support:

* Computational resource management
* Server/workstation inventory
* Job submission records
* Calculation status
* Resource allocation
* Storage management

---

## 🧪 Laboratory Management

Potential future capabilities:

* Equipment inventory
* Laboratory resources
* Software inventory
* Resource requests
* Laboratory announcements
* Internal documentation

---

# 🧱 Design Philosophy

The CMRL Research Portal follows several principles.

### Research First

The portal is designed around the needs of an academic research laboratory rather than a generic membership website.

### Security First

Authorization decisions are enforced on the backend.

### Modular Architecture

Research functionality can be added independently.

### Academic Identity

Profiles are designed to represent real academic and research identities.

### Accountability

Administrative actions are recorded through audit logs.

### Extensibility

The existing architecture is designed to support future research-management modules.

---

# 📊 Current System Capabilities

| System                            |   Status   |
| --------------------------------- | :--------: |
| Firebase Authentication           |      ✅     |
| Email Registration                |      ✅     |
| Google Authentication             |      ✅     |
| MongoDB Synchronization           |      ✅     |
| Student Accounts                  |      ✅     |
| Supervisor Accounts               |      ✅     |
| Administrator Accounts            |      ✅     |
| Registration Approval             |      ✅     |
| Registration Rejection            |      ✅     |
| Account Suspension                |      ✅     |
| Account Reactivation              |      ✅     |
| Rank Management                   |      ✅     |
| Role Management                   |      ✅     |
| Student Dashboard                 |      ✅     |
| Supervisor Dashboard              |      ✅     |
| Administrator Dashboard           |      ✅     |
| Profile Management                |      ✅     |
| Profile Pictures                  |      ✅     |
| Persistent Notifications          |      ✅     |
| Toast Feedback                    |      ✅     |
| Audit Logs                        |      ✅     |
| Supervisor Profile                |      ✅     |
| Supervisor–Student Infrastructure |      ✅     |
| Research Project Management       | 🔄 Planned |
| Material Database                 | 🔄 Planned |
| DFT Dataset Management            | 🔄 Planned |
| Publication Management            | 🔄 Planned |
| Computational Resource Management | 🔄 Planned |

---

# 📜 Academic Context

The CMRL Research Portal is developed as a dedicated digital infrastructure project for the:

**Computational Materials Research Lab (CMRL)**
**Department of Physics**
**Pabna University of Science and Technology**

The platform is intended to support the laboratory's transition toward a centralized digital research environment where academic identities, research activities, supervision, computational materials data, and laboratory administration can eventually coexist within one system.

---

# 👨‍💻 Creator

<div align="center">

## Abir Mahmud

### Creator & Developer — CMRL Research Portal

**Department of Physics**
**Pabna University of Science and Technology**

**Session: 2020–21**

<br>

> Designed and developed for the Computational Materials Research Lab
> Department of Physics · Pabna University of Science and Technology

</div>

---

# 🏛️ Institutional Identity

<div align="center">

**Computational Materials Research Lab**

**Department of Physics**

**Pabna University of Science and Technology**

<br>

Research · Computation · Materials Science · Collaboration

</div>

---

# 📄 License

This repository is intended for the development and operation of the CMRL Research Portal.

The licensing and redistribution policy should be determined according to the ownership and institutional requirements of CMRL and Pabna University of Science and Technology.

---

<div align="center">

## 🔬 CMRL Research Portal

### Computational Materials Research Lab

**Department of Physics · Pabna University of Science and Technology**

<br>

**Created by Abir Mahmud**
*Department of Physics · Session 2020–21*

<br>

---

<sub>
A research-oriented digital platform built to support the people, research, and future of CMRL.
</sub>

</div>
```
