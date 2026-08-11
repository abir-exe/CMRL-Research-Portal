# CMRL Research Portal — AI Development Rules

## Project

CMRL Research Portal for the Crystalline Material Research Lab (CMRL).

CMRL is a research laboratory focused on crystalline materials, computational materials science, DFT-based research, hydrogen storage materials, and related research areas.

---

## Source of Truth

Before implementing any major feature, read the relevant documentation in:

- PRD.md
- ARCHITECTURE.md
- DATABASE_SCHEMA.md
- API_SPEC.md
- UI_UX_SPEC.md
- IMPLEMENTATION_PLAN.md

These documents define the intended requirements, architecture, database design, API contracts, UI/UX, and implementation order.

Do not ignore or casually override them.

---

## Development Principles

1. Implement the project incrementally.
2. Follow IMPLEMENTATION_PLAN.md for the development sequence.
3. Do not implement the entire application at once.
4. Complete and test one feature before moving to unrelated features.
5. Prefer simple, maintainable solutions over unnecessary complexity.
6. Use reusable components and services.
7. Keep frontend and backend responsibilities clearly separated.
8. Use TypeScript throughout the application.
9. Keep scientific data and research history persistent and traceable.
10. Do not introduce major architectural changes without approval.

---

## Technology Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication

- Firebase Authentication
- Email/password authentication
- Google authentication
- Firebase Admin SDK for backend token verification

---

## Scientific Data Rules

1. Never invent real scientific results.
2. Never fabricate DFT values.
3. Never fabricate publications, awards, research achievements, or academic credentials.
4. Placeholder data must be clearly identified as placeholder/development data.
5. Preserve research history.
6. Do not silently overwrite important scientific results.
7. A completed property is not automatically a verified property.
8. Supervisor verification must remain distinct from student completion.
9. Blacklisted materials must remain in the database as historical research information.
10. Do not permanently delete important research records without an explicit approved workflow.

---

## Material Database Rules

1. Every material must have a unique CMRL material identifier.
2. Material records must use the defined status system.
3. Duplicate materials must not be silently created.
4. Potential duplicates should be detected and reported.
5. Blacklisted materials cannot be reserved.
6. Material ownership and research assignment must be unambiguous.
7. Material status and individual property status are separate concepts.
8. Research properties must support appropriate research states such as:
   - NOT_STUDIED
   - PLANNED
   - IN_PROGRESS
   - COMPLETED
   - VERIFIED
   - FAILED
9. Material research history must be preserved.
10. Do not change the scientific meaning of a material field without approval.

---

## Authentication and Authorization

1. Firebase Authentication is the identity provider.
2. Do not replace Firebase authentication with a custom authentication system unless explicitly approved.
3. The backend must verify Firebase ID tokens.
4. Never trust role, rank, user ID, or ownership information supplied by the frontend.
5. Authorization must be enforced on the backend.
6. Frontend route protection is not a replacement for backend authorization.
7. Roles and ranks are separate concepts.

### Roles

- STUDENT
- SUPERVISOR
- ADMIN

### Student Ranks

- NEWBIE
- BEGINNER
- INTERMEDIATE
- ADVANCED
- EXPERT
- LEGEND

Do not treat rank as an authorization mechanism.

---

## Security Rules

1. Never expose secrets in source code.
2. Never commit `.env` files containing secrets.
3. Never expose Firebase Admin credentials to the frontend.
4. Never expose database credentials to the frontend.
5. Validate all backend input.
6. Validate file uploads.
7. Enforce file access permissions on the backend.
8. Use appropriate CORS configuration.
9. Use secure HTTP headers.
10. Apply rate limiting to sensitive endpoints.
11. Never log passwords, tokens, private keys, or sensitive credentials.
12. Do not weaken security simply to make development easier.

---

## API Rules

1. Follow API_SPEC.md.
2. Maintain consistent API response structures.
3. Validate request parameters, body, and query parameters.
4. Keep controllers thin.
5. Put business logic in services.
6. Keep database access in repositories/data-access layers where defined.
7. Do not duplicate business logic across controllers.
8. Do not silently change an existing API contract.
9. If an API contract must change, explain why before changing it.

---

## Frontend Rules

1. Follow UI_UX_SPEC.md.
2. Use reusable components.
3. Maintain consistent spacing, typography, colors, and interaction patterns.
4. Design responsive layouts.
5. Support desktop and mobile.
6. Support light and dark modes where specified.
7. Use accessible semantic HTML.
8. Do not use excessive animations or decorative effects.
9. Scientific data should be prioritized over decorative UI.
10. Use loading, empty, and error states appropriately.

---

## Database Rules

1. Follow DATABASE_SCHEMA.md.
2. Do not modify schemas casually.
3. Add indexes based on actual query requirements.
4. Preserve important research history.
5. Use appropriate validation and constraints.
6. Avoid storing large files directly inside MongoDB documents.
7. Store file metadata in MongoDB and actual files in appropriate object storage.
8. Do not perform destructive database operations without explicit approval.

---

## Testing Rules

After implementing a significant feature:

1. Run TypeScript type checking.
2. Run linting.
3. Run relevant unit tests.
4. Run relevant integration tests.
5. Run the application.
6. Verify the feature in the browser when applicable.
7. Test important authorization boundaries.
8. Fix discovered problems before declaring the feature complete.

Do not claim a feature works without actually testing it.

---

## Git Rules

Before making major changes:

1. Check the current Git status.
2. Keep changes focused.
3. Do not modify unrelated files.
4. Do not delete user-created files without approval.
5. Do not rewrite Git history.
6. Do not force-push.
7. Do not commit secrets.

Use clear commit messages such as:

- feat: add material search
- feat: implement Firebase authentication
- fix: prevent duplicate material reservations
- refactor: simplify material service
- test: add reservation tests
- docs: update API specification

---

## AI Agent Behavior

The AI agent must:

1. Read relevant project documentation before implementation.
2. Explain major assumptions.
3. Ask for approval before making major architectural changes.
4. Avoid speculative features.
5. Avoid unrelated refactoring.
6. Avoid rewriting working systems unnecessarily.
7. Prefer incremental changes.
8. Report files changed.
9. Report tests performed.
10. Report known limitations or unresolved issues.

If project documentation contains a contradiction:

- Identify the contradiction.
- Explain the conflict.
- Recommend a solution.
- Ask for approval before changing the architecture.

---

## Feature Scope Rule

When asked to implement a feature:

1. Identify the relevant documentation.
2. Determine which existing modules are affected.
3. Implement the smallest complete version.
4. Test it.
5. Verify it in the browser if it affects UI.
6. Stop when the requested feature is complete.

Do not automatically continue implementing future features.

---

## Important Instruction

CMRL is a research system, not merely a portfolio website.

Research data integrity, traceability, authorization, and maintainability are more important than rapidly adding features.

When uncertain, prefer:

- correctness over speed
- explicitness over assumptions
- traceability over convenience
- maintainability over cleverness
- scientific integrity over fabricated completeness