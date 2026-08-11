# CMRL Research Portal

A centralized digital infrastructure and research management platform for the **Computational Materials Research Lab (CMRL)** at the **Department of Physics, Pabna University of Science and Technology (PUST)**.

---

## 🔬 About CMRL

The **Computational Materials Research Lab (CMRL)** focuses on computational physics, Density Functional Theory (DFT), first-principles calculations, molecular dynamics, and materials modeling (e.g., hydrogen storage hydrides, optoelectronics, multi-principal element alloys).

The portal provides secure role-based identity management, student registration approval workflows, persistent laboratory notifications, administrative audit logging, and supervisor-student research infrastructure.

---

## ✨ Key Features

- **Role-Based Security & Governance**: Granular permissions across `STUDENT`, `SUPERVISOR`, and `ADMIN` roles.
- **Firebase & MongoDB Hybrid Authentication**: Cryptographically verified Firebase ID token authentication synchronized with authoritative MongoDB user profiles.
- **Academic Registration & Approval Workflow**: Structured student onboarding requiring supervisor/admin review before account activation (`PENDING` → `ACTIVE`).
- **Academic Supervisor & Student Infrastructure**: Dedicated Supervisor Profile (`/people/dr-lokman-ali`) for Dr. Md. Lokman Ali (Associate Professor & Director of RTTC, PUST) and student supervision tracking.
- **Persistent Notification Center**: Bell indicator, unread counter, role-targeted notification delivery (`NEW_REGISTRATION`, `ACCOUNT_APPROVED`), and activity tracking.
- **Administrative Audit Logging**: Track administrative state transitions (`USER_APPROVED`, `USER_ROLE_CHANGED`, `USER_RANK_CHANGED`) for transparency and auditability.

---

## 🛠️ Technology Stack

### Frontend (`apps/web`)
- **Core**: React 18, TypeScript, Vite
- **Routing & State**: React Router 6, Auth Context, Notification Context, Toast Context
- **Styling & UI**: Tailwind CSS, Lucide Icons

### Backend (`apps/api`)
- **Core**: Node.js, Express, TypeScript
- **Database & Auth**: MongoDB (Mongoose ORM), Firebase Admin SDK
- **Utilities**: Zod Schema Validation, Pino Logger

---

## 📁 Project Structure

This monorepo is managed using `pnpm` workspaces:

```text
CMRL-Research-Portal/
├── apps/
│   ├── api/             # Express REST API & Firebase Admin Service
│   └── web/             # React + Vite Frontend Application
├── packages/
│   └── shared/          # Shared TypeScript interfaces & validation schemas
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.x
- pnpm >= 9.x
- MongoDB Instance
- Firebase Project Credentials

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abir-exe/CMRL-Research-Portal.git
   cd CMRL-Research-Portal
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:

   Create `apps/api/.env`:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/cmrl
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account-email
   FIREBASE_PRIVATE_KEY="your-private-key"
   ```

   Create `apps/web/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api/v1
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```

4. **Run Development Servers**:
   ```bash
   # Run Backend API (http://localhost:3001)
   pnpm --filter api run dev

   # Run Frontend App (http://localhost:5173)
   pnpm --filter web run dev
   ```

---

## 🧪 Verification & Quality Control

Ensure type safety, code formatting, and successful compilation before committing:

```bash
pnpm run typecheck   # Run TypeScript type check across monorepo
pnpm run lint        # Check code quality with ESLint
pnpm run build       # Build production web bundle and API compilation
```

---

## 👨‍💻 Creator & Academic Context

- **Academic Unit**: Computational Materials Research Lab (CMRL), Department of Physics, Pabna University of Science and Technology (PUST)
- **Faculty Supervisor**: Dr. Md. Lokman Ali (Associate Professor & Director of RTTC, PUST)
- **Developer**: Abir Mahmud (Department of Physics, PUST · Session 2020–21)
