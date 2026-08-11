# CMRL Research Portal
## UI/UX Specification

**Project:** CMRL Research Portal  
**Laboratory:** CMRL — Crystalline Material Research Lab  
**UI/UX Version:** 1.0  
**Frontend:** React + Vite + TypeScript  
**Styling:** Tailwind CSS  
**Design Direction:** Scientific / Crystalline / Modern Academic  
**Based On:** `PRD.md`, `ARCHITECTURE.md`, `DATABASE_SCHEMA.md`, `API_SPEC.md`

---

# 1. UI/UX Vision

The CMRL website should feel like a combination of:

- A professional university research laboratory website
- A scientific research database
- A student research workspace
- A lightweight academic community
- A research collaboration platform

The design must avoid looking like:

- A generic corporate website
- A gaming dashboard
- A social media clone
- An overly decorative science website

The visual language should communicate:

> **Precision + Crystallography + Computational Research + Academic Excellence**

---

# 2. Primary Design Concept

The visual identity should be inspired by:

- Crystal lattices
- Unit cells
- Atomic structures
- Molecular geometry
- Computational grids
- Scientific data visualization

The website should use subtle geometric elements rather than excessive scientific illustrations.

---

# 3. Visual Identity

## Primary Theme

Recommended direction:

```text
Scientific
Minimal
Geometric
Precise
Modern
Academic
```

---

# 4. Color Strategy

Use a restrained scientific palette.

Recommended primary colors:

```text
Primary:
Deep crystalline blue

Secondary:
Teal / cyan

Accent:
Energy violet or electric blue

Background:
White / very light cool gray

Dark mode:
Deep navy / charcoal
```

Avoid using too many saturated colors.

---

# 5. Semantic Colors

Certain colors should have functional meaning.

### Research Status

```text
Green → Studied / Completed / Available

Blue → In Progress

Yellow → Under Review / Pending

Red → Failed / Blacklisted / Unstable

Gray → Archived / Inactive
```

These colors should be supplemented with text/icons so color is never the only indicator.

---

# 6. Typography

Recommended font strategy:

### Primary UI

Use a modern sans-serif such as:

```text
Inter
```

or:

```text
Manrope
```

### Scientific / Technical elements

A monospace font may be used selectively for:

- Material IDs
- Chemical formulas
- Calculation parameters
- File names
- Code
- Numerical datasets

Example:

```text
CMRL-MAT-001
LiTeH3
PBE
500 eV
8×8×8
```

Do not use monospace for the entire website.

---

# 7. Logo Concept

The CMRL logo should ideally combine:

```text
Crystal lattice
+
CMRL initials
```

Possible concept:

A minimal hexagonal/cubic crystal structure surrounding or intersecting the letters:

> CMRL

Full name:

> Crystalline Material Research Lab

The logo should work in:

- Full-color
- Monochrome
- Dark background
- Light background
- Favicon

---

# 8. General Layout

Desktop layout:

```text
┌───────────────────────────────────────────────────────────────┐
│ Logo       Research  Materials  Projects  People   Login    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│                         PAGE CONTENT                           │
│                                                               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Authenticated layout:

```text
┌───────────────┬───────────────────────────────────────────────┐
│               │ Header                                        │
│   Sidebar     ├───────────────────────────────────────────────┤
│               │                                               │
│ Dashboard     │                                               │
│ Materials     │                 Main Content                  │
│ Projects      │                                               │
│ Forum         │                                               │
│ Collaborate   │                                               │
│ Files         │                                               │
│ Notifications │                                               │
│               │                                               │
│ Profile       │                                               │
└───────────────┴───────────────────────────────────────────────┘
```

---

# 9. Responsive Design

The application must support:

- Desktop
- Laptop
- Tablet
- Mobile

Breakpoints should be based on content requirements rather than specific device models.

---

# 10. Mobile Navigation

On mobile:

```text
Desktop Sidebar
      ↓
Bottom navigation / hamburger menu
```

Important actions should remain easy to reach.

Potential mobile bottom navigation:

```text
Home | Materials | Projects | Forum | Profile
```

Notifications should remain accessible from the top bar.

---

# 11. Public Website Navigation

Recommended navigation:

```text
Home
Research
Materials
Projects
Publications
People
Achievements
Resources
Forum
About
Contact
```

Not every item needs to appear in the top navigation simultaneously.

Use grouped navigation where appropriate.

---

# 12. Public Header

Header should contain:

```text
CMRL Logo
Research
Materials
Projects
Publications
People
More
```

Right side:

```text
Search
Login
```

On smaller screens:

```text
Logo
Search
Menu
```

---

# 13. Homepage

Route:

```text
/
```

The homepage should immediately communicate:

1. What CMRL is.
2. What the lab researches.
3. Who leads the lab.
4. What the lab has accomplished.
5. How visitors can explore research.

---

# 14. Homepage Hero

Suggested structure:

```text
┌─────────────────────────────────────────────────────┐
│                                                     │
│       CRYSTALLINE MATERIAL RESEARCH LAB             │
│                                                     │
│       Exploring materials through                   │
│       computation, structure and theory.             │
│                                                     │
│       [Explore Research] [Material Database]        │
│                                                     │
│                       Crystal visualization          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The hero should use a subtle crystal/unit-cell visual.

Avoid an enormous generic stock image.

---

# 15. Homepage Research Areas

Display research areas as cards.

Example:

```text
┌────────────────┐
│ DFT            │
│                │
│ First-principles
│ material study │
└────────────────┘
```

Potential areas:

- Density Functional Theory
- Computational Materials Science
- Hydrogen Storage
- Crystal Structure
- Electronic Properties
- Mechanical Properties
- Energy Materials

---

# 16. Homepage Supervisor Section

Feature the supervisor prominently.

Structure:

```text
┌─────────────────────────────────────────────────────┐
│ Research Leadership                                 │
│                                                     │
│        [Supervisor Photo]                           │
│                                                     │
│        Prof. Dr. XXXXX                              │
│        Supervisor / Lab Director                    │
│                                                     │
│        Research interests...                        │
│                                                     │
│        [View Full Profile]                           │
└─────────────────────────────────────────────────────┘
```

---

# 17. Supervisor Page

Route:

```text
/supervisor
```

Sections:

1. Profile
2. Academic background
3. Research interests
4. Research areas
5. Publications
6. Achievements
7. Awards
8. Academic positions
9. Professional memberships
10. Contact information where appropriate

---

# 18. Research Page

Route:

```text
/research
```

Purpose:

Give visitors a high-level understanding of what CMRL does.

Sections:

```text
Research Overview
Research Areas
Current Research
Completed Research
Research Methodologies
Selected Publications
```

---

# 19. Research Area Page

Route:

```text
/research-areas/:slug
```

Example:

```text
/research-areas/hydrogen-storage
```

Display:

- Description
- Research objectives
- Current projects
- Materials
- Publications
- Researchers

---

# 20. Material Database

Route:

```text
/materials
```

This is one of the most important pages in the entire application.

It should feel like a scientific database rather than a normal website page.

---

# 21. Material Database Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Material Database                                           │
│                                                             │
│ Search materials...                         [+ Add Material] │
│                                                             │
├─────────────┬───────────────────────────────────────────────┤
│ Filters     │ Materials                                     │
│             │                                               │
│ Status      │ CMRL-MAT-001   LiTeH3       Studying         │
│ Category    │ CMRL-MAT-002   MgH2         Completed        │
│ Crystal     │ CMRL-MAT-003   ...          Available        │
│ Research    │                                               │
│ Area        │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

---

# 22. Material Search

Search should support:

- Material name
- Chemical formula
- Material ID
- Element
- Research area
- Project
- Researcher

Example:

```text
LiTeH3
```

should potentially return:

```text
CMRL-MAT-001
```

---

# 23. Material Filters

Filters should include:

```text
Status
Research Area
Material Category
Crystal System
Space Group
Project
Researcher
Publication Status
```

Potential advanced filters:

```text
Element
Band Gap
Hydrogen Capacity
Formation Energy
```

These should only be implemented once the corresponding properties are standardized.

---

# 24. Material Table

Desktop table:

```text
ID
Formula
Name
Crystal System
Space Group
Research Area
Status
Group Head
Properties
```

Example:

```text
CMRL-MAT-001
LiTeH3
Lithium Tellurium Hydride
Cubic
...
Hydrogen Storage
STUDYING
Student Name
13/25
```

---

# 25. Material Status Badge

Example:

```text
● Studied
● Studying
● Available
● Reserved
● Blacklisted
```

Badges should include text.

Do not use only:

```text
🟢
🔴
```

because the meaning would be ambiguous.

---

# 26. Material Detail Page

Route:

```text
/materials/:materialId
```

This should be one of the richest pages in the application.

---

# 27. Material Detail Header

```text
CMRL-MAT-001

LiTeH3

Lithium Tellurium Hydride

[STUDYING]

Research Area:
Hydrogen Storage

[Reserve Material]
```

---

# 28. Material Summary

Display:

```text
Formula
Elements
Material Category
Crystal System
Space Group
Project
Group Head
Researchers
Research Status
Progress
```

---

# 29. Crystal Structure Section

Display:

```text
Crystal System
Space Group
Lattice Parameters
Unit Cell Volume
Density
```

Future:

```text
[Open 3D Crystal Viewer]
```

---

# 30. DFT Property Dashboard

Properties should be displayed as a matrix.

Example:

| Property | Status | Value |
|---|---|---|
| Band Gap | ✓ Studied | 1.82 eV |
| DOS | ✓ Studied | Available |
| PDOS | ✓ Studied | Available |
| Phonon | In Progress | — |
| Bulk Modulus | Not Studied | — |
| Optical Properties | Not Studied | — |
| Hydrogen Capacity | Planned | — |

---

# 31. Property Status UI

Use:

```text
✓ Studied
◐ In Progress
○ Not Studied
! Failed
```

But always accompany icons with text.

---

# 32. Property Categories

Use tabs:

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

This prevents one giant table.

---

# 33. Computational Methodology

A material property should allow users to view:

```text
DFT Code
Functional
Pseudopotential
Cutoff Energy
K-point Mesh
SOC
Spin Polarization
Hubbard U
Convergence Criteria
```

This is especially useful for future researchers.

---

# 34. Research Files Section

Material page:

```text
Research Files

CIF
POSCAR
Input Files
Output Files
Figures
Reports

[Upload File]
```

Private files should show access indicators.

---

# 35. Publication Section

Display:

```text
Publications involving this material
```

Each publication card:

```text
Title
Authors
Journal
Year
DOI
```

---

# 36. Research History

Show a timeline:

```text
2026-08
Research Started

2026-09
Structural Optimization Completed

2026-10
Electronic Properties Completed

2026-11
Phonon Calculation

2027-01
Publication
```

This should use real audit/project events rather than manually duplicated text where possible.

---

# 37. Blacklisted Material Page

Blacklisted materials should be visually distinct.

Display:

```text
STRUCTURALLY UNSTABLE

This material was investigated by CMRL
but was determined to be unsuitable for
the intended research pathway.

Reason:
Imaginary phonon modes / structural instability

Evidence:
[View Research Evidence]
```

Do not simply hide failed materials.

Failed research is valuable institutional knowledge.

---

# 38. Student Dashboard

Route:

```text
/dashboard
```

---

# 39. Dashboard Header

```text
Good morning, Abir

Rank:
# Beginner

Research activity:
Active
```

Avoid gamifying the academic environment excessively.

Ranks should remain secondary to actual research progress.

---

# 40. Student Dashboard Cards

Top cards:

```text
My Projects
Active Materials
Completed Properties
Publications
Unread Notifications
```

---

# 41. Student Research Overview

Display:

```text
Project Progress
Material Progress
Recent Research Activity
Upcoming Deadlines
```

---

# 42. My Materials

Show:

```text
Material
Status
Progress
Project
Next Action
```

Example:

```text
LiTeH3
Studying
65%
Hydrogen Storage
Complete phonon calculation
```

---

# 43. Quick Actions

Student dashboard:

```text
+ Propose Material
+ Create Research Idea
+ Ask Forum Question
+ Upload Research File
+ Update Project Progress
```

Only show actions the user is authorized to perform.

---

# 44. Supervisor Dashboard

Supervisor dashboard should focus on research management.

Cards:

```text
Active Students
Active Projects
Materials Under Study
Pending Reservations
Pending Property Verification
Publications
```

---

# 45. Supervisor Dashboard Table

Example:

```text
Student
Project
Material
Progress
Last Activity
Action
```

This gives the supervisor an immediate research overview.

---

# 46. Admin Dashboard

Admin dashboard should focus on system management.

Cards:

```text
Total Students
Active Students
Total Materials
Active Projects
Publications
Pending Accounts
Forum Reports
System Alerts
```

---

# 47. Admin Dashboard Sections

```text
User Management
Material Management
Project Management
Forum Moderation
Announcements
Resources
Audit Logs
System Settings
```

---

# 48. Student Directory

Route:

```text
/people
```

Display student cards:

```text
[Photo]

Name
Rank
Batch
Research Areas
Projects

LinkedIn | GitHub | ORCID | ResearchGate
```

---

# 49. Student Profile

Route:

```text
/people/:userId
```

Public profile should show:

- Photo
- Name
- Batch
- Research interests
- Skills
- Projects
- Publications
- Achievements
- External profiles

Private information should respect privacy settings.

---

# 50. Own Profile

Route:

```text
/profile
```

Sections:

```text
Personal Information
Academic Information
Research Profile
External Profiles
Privacy
Account
```

---

# 51. Profile Editing

Use a multi-section form rather than one giant form.

```text
Personal
Academic
Research
Social / Academic Profiles
Privacy
```

Include:

```text
Save Changes
Cancel
```

Show unsaved-change warnings when appropriate.

---

# 52. Research Projects Page

Route:

```text
/projects
```

Cards should show:

```text
Project Title
Research Area
Supervisor
Group Head
Students
Materials
Progress
Status
```

---

# 53. Project Detail Page

Route:

```text
/projects/:projectId
```

Tabs:

```text
Overview
Researchers
Materials
Progress
Publications
Files
Activity
```

---

# 54. Project Progress UI

Use:

```text
Overall Progress
████████████░░░░ 75%
```

Also show milestone breakdown:

```text
Structure Optimization      ✓
Electronic Properties       ✓
Mechanical Properties       ◐
Phonon                      ○
Publication                 ○
```

---

# 55. Publications Page

Route:

```text
/publications
```

Display:

- Publication title
- Authors
- Journal
- Year
- Research area
- Materials
- DOI

Filters:

```text
Year
Research Area
Author
Project
```

---

# 56. Achievements Page

Route:

```text
/achievements
```

Categories:

```text
Publications
Awards
Scholarships
Conference
Higher Studies
Research Milestones
```

Use a timeline or card-based layout.

---

# 57. Alumni Page

Route:

```text
/alumni
```

Display former students and their achievements.

Example:

```text
[Photo]

Name
CMRL Batch
Research Area
Current Institution
Current Position
```

This can become a major credibility feature for the laboratory.

---

# 58. Research Collaboration Hub

Route:

```text
/collaborate
```

Layout:

```text
Research Ideas
     │
     ├── Open
     ├── Under Review
     └── Closed
```

---

# 59. Research Idea Card

```text
Study of Novel Hydride Materials

Research Area:
Hydrogen Storage

Skills Needed:
DFT
CASTEP
Python

Collaborators Needed:
2

Deadline:
30 September

[View Opportunity]
```

---

# 60. Research Idea Detail

Display:

```text
Research Objective
Why It Matters
Expected Methodology
Materials
Required Skills
Required Software
Expected Duration
Supervisor
Proposer
```

CTA:

```text
[Apply to Collaborate]
```

---

# 61. Collaboration Application UI

Application form:

```text
Why do you want to join?
Relevant skills
Previous experience
Available time
Additional message

[Submit Application]
```

---

# 62. Collaboration Management

Proposer sees:

```text
Applicant
Skills
Message
Date
Status

[View]
[Accept]
[Reject]
```

Applicant sees:

```text
Research Idea
Application Status
Last Update
```

---

# 63. Notification System

Notifications should be accessible globally.

Header:

```text
🔔 4
```

Clicking opens:

```text
Notifications

● Your collaboration application was accepted.
● LiTeH3 reservation approved.
● Someone answered your forum question.
○ New lab announcement.
```

---

# 64. Notification Detail

Notifications should link directly to the relevant entity.

Example:

```text
Your material reservation was approved.

[View Material]
```

---

# 65. Forum

Route:

```text
/forum
```

The forum should borrow useful concepts from Stack Overflow while remaining much simpler.

---

# 66. Forum Homepage

Layout:

```text
Questions
Discussions
Tags

[Ask Question]

Search...

Latest
Unanswered
Popular
```

---

# 67. Forum Question Card

```text
12 votes
3 answers
1.2k views

Why am I getting imaginary phonon modes?

DFT
Phonon
CASTEP

Asked by Student Name
2 hours ago
```

---

# 68. Forum Question Page

Sections:

```text
Question
Answers
Comments
Related Materials
Related Projects
```

Allow:

```text
Upvote
Downvote
Answer
Comment
Report
Accept Answer
```

---

# 69. Forum Tags

Potential initial tags:

```text
DFT
CASTEP
VASP
Quantum-Espresso
Phonon
Band-Gap
DOS
PDOS
Optimization
Convergence
Linux
Python
Origin
Crystallography
```

Tags should be searchable.

---

# 70. Forum Moderation

Moderators/Admins should be able to:

- Remove posts
- Lock posts
- Review reports
- Suspend abusive users

---

# 71. Resources Page

Route:

```text
/resources
```

Categories:

```text
DFT
Software
Crystallography
Programming
Linux
Research Methodology
Scientific Writing
Papers
Tutorials
```

---

# 72. Resource Card

```text
CASTEP Beginner Guide

Category:
DFT

Type:
PDF

Uploaded by:
Student Name

[Open Resource]
```

---

# 73. Research File Repository

File UI should resemble a research document manager.

```text
Research Files

Material/
 ├── CIF/
 ├── POSCAR/
 ├── Input/
 ├── Output/
 ├── Figures/
 └── Reports/
```

---

# 74. File Metadata

Each file should display:

```text
Name
Type
Size
Version
Uploader
Uploaded
Access Level
```

---

# 75. File Upload UI

Use drag-and-drop:

```text
┌────────────────────────────────────┐
│                                    │
│   Drag files here                  │
│          or                        │
│   [Browse Files]                   │
│                                    │
└────────────────────────────────────┘
```

Show upload progress.

---

# 76. Search

Global search should eventually search:

```text
Materials
Projects
Publications
Students
Forum
Resources
```

Search results should be grouped by type.

---

# 77. Search Result Example

```text
Search: LiTeH3

Materials
 └── LiTeH3 — CMRL-MAT-001

Projects
 └── First-Principles Study of Hydrides

Publications
 └── ...

Forum
 └── ...
```

---

# 78. Contact Page

Route:

```text
/contact
```

Include:

- Laboratory location
- University
- Email
- Supervisor contact
- Map
- Social/professional links
- Contact form

The contact form should be protected against spam.

---

# 79. About Page

Route:

```text
/about
```

Sections:

```text
About CMRL
Mission
Research Philosophy
Research Areas
Laboratory History
Research Environment
Supervisor
Students
Achievements
```

---

# 80. Login Page

Route:

```text
/login
```

Design:

```text
CMRL Logo

Welcome back

Email
Password

[Login]

──────── OR ────────

[Continue with Google]

Forgot password?
Don't have an account? Register
```

---

# 81. Registration Page

Route:

```text
/register
```

Initial fields:

```text
Name
Email
Password
Confirm Password
```

Additional academic information can be collected after registration.

This keeps registration simple.

---

# 82. First Login Experience

After first login:

```text
Firebase Authentication
       ↓
Application Profile Created
       ↓
Rank = #Newbie
       ↓
Profile Setup
       ↓
Dashboard
```

Show:

```text
Welcome to CMRL!

Complete your research profile.
```

---

# 83. Profile Completion Indicator

Example:

```text
Profile Completion

██████████████░░ 85%

Add ORCID
Add research interests
Add GitHub
```

This is more useful than forcing all fields during registration.

---

# 84. Admin User Promotion UI

Admin can open:

```text
Student Profile
```

and select:

```text
Rank

# Newbie
# Beginner
# Intermediate
# Advanced
# Expert
# Legend
```

The interface should display a warning that rank is an internal recognition level and not an academic qualification.

---

# 85. Rank Design

Ranks should be visually subtle.

Recommended:

```text
#Newbie
#Beginner
#Intermediate
#Advanced
#Expert
#Legend
```

Avoid flashy gaming-style animations.

The system is academic.

---

# 86. Material Status Dashboard

The database dashboard should show:

```text
Total Materials: 128

Available       32
Reserved        8
Studying        24
Completed       42
Published       17
Blacklisted     5
```

Use charts.

---

# 87. Material Coverage Matrix

A very useful feature:

```text
                Structure   Band Gap   DOS   Phonon   Optical

LiTeH3             ✓          ✓         ✓      ◐         ○

MgH2               ✓          ✓         ○      ○         ○

Material 003       ✓          ○         ○      ○         ○
```

This directly solves the problem:

> "Has someone already studied this?"

---

# 88. Property Coverage Matrix

Allow users to filter:

```text
Show properties not yet studied
```

Then display:

```text
Material
Missing Properties
Potential Research Opportunity
```

This can become one of the most useful research-discovery features of the website.

---

# 89. Research Opportunity Indicator

Example:

```text
LiTeH3

Completed:
Structure
Band Gap
DOS

Potential opportunities:
Phonon
Mechanical
Optical
Hydrogen Storage
```

CTA:

```text
[Propose Research]
```

---

# 90. Material Comparison

Future feature:

```text
Compare Materials
```

Allow selecting 2–4 materials.

Compare:

```text
Formula
Crystal System
Space Group
Band Gap
Formation Energy
Bulk Modulus
Hydrogen Capacity
Research Status
```

This should be implemented after the property system is stable.

---

# 91. Scientific Data Visualization

Where numerical data exists, use appropriate charts.

Examples:

### Band structure

Future interactive plot.

### DOS

Line chart.

### Phonon dispersion

Scientific plot.

### Elastic properties

Comparison chart.

Do not represent scientific datasets with generic decorative charts.

---

# 92. Crystal Structure Visualization

Future material page:

```text
┌─────────────────────────────────────┐
│                                     │
│         3D CRYSTAL VIEWER           │
│                                     │
│       ●───●                         │
│      /   /│                         │
│     ●───● │                         │
│     │   │ ●                         │
│     │   │/                          │
│     ●───●                           │
│                                     │
└─────────────────────────────────────┘
```

Controls:

```text
Rotate
Zoom
Pan
Unit Cell
Atoms
Bonds
Labels
```

This is a Phase 2 feature.

---

# 93. Empty States

Every major page must have meaningful empty states.

Example:

```text
No research projects yet.

Once you join a project, it will appear here.

[Explore Research Projects]
```

Do not show blank pages.

---

# 94. Loading States

Use skeleton loading for:

- Cards
- Tables
- Dashboard statistics
- Profiles
- Material pages

Avoid showing a full-page spinner for every API request.

---

# 95. Error States

Example:

```text
Unable to load the material database.

Please try again.

[Retry]
```

Avoid exposing technical errors such as:

```text
MongoServerError...
```

to users.

---

# 96. Toast Notifications

Use toasts for short-lived feedback.

Examples:

```text
✓ Profile updated.

✓ Material reservation submitted.

✓ Application accepted.

✕ Unable to upload file.
```

Do not use toasts for important information that users need to read later.

That information belongs in notifications.

---

# 97. Confirmation Dialogs

Require confirmation for destructive actions:

```text
Delete Material?
```

or:

```text
Blacklist Material?
```

Show the consequence clearly.

For example:

> This will mark the material as unsuitable for future research. The research history will remain preserved.

---

# 98. Forms

Forms should:

- Use clear labels
- Display validation beside fields
- Preserve entered data after validation errors
- Disable submission while processing
- Show success state
- Handle API errors

---

# 99. Chemical Formula Input

Material forms should support chemical formulas.

Example:

```text
LiTeH3
```

The UI may automatically extract:

```text
Li
Te
H
```

But the backend remains responsible for validating the normalized formula.

---

# 100. Scientific Number Input

For scientific properties:

```text
Value
Unit
Uncertainty
```

Example:

```text
Band Gap
Value: 1.82
Unit: eV
Uncertainty: ±0.02
```

---

# 101. Methodology Form

Use expandable sections.

```text
Computational Methodology

▼ Basic
DFT Code
Functional

▼ Numerical
Cutoff Energy
K-point Mesh
Convergence

▼ Advanced
SOC
Spin Polarization
Hubbard U
```

This prevents overwhelming new students.

---

# 102. Student Experience Philosophy

The portal should answer these questions quickly:

> What am I working on?

> What material am I studying?

> What has already been studied?

> What should I do next?

> Who can help me?

> Where are my research files?

---

# 103. Supervisor Experience Philosophy

The supervisor should quickly understand:

> What are my students doing?

> Which materials are assigned?

> Which calculations are completed?

> Which results need verification?

> What has been published?

---

# 104. Admin Experience Philosophy

The administrator should quickly understand:

> Who has access?

> What is happening in the database?

> Are there duplicate assignments?

> Are there pending requests?

> Is the community functioning properly?

---

# 105. Public Visitor Experience

A visitor should quickly understand:

> What is CMRL?

> What does CMRL research?

> Who leads it?

> Who works here?

> What has the lab published?

> What has the lab achieved?

> How can I contact the lab?

---

# 106. Accessibility

The UI must support:

- Keyboard navigation
- Visible focus states
- Accessible labels
- Sufficient color contrast
- Semantic HTML
- Screen reader compatibility
- Accessible dialogs
- Accessible tables
- Alternative text for images

---

# 107. Responsive Tables

Scientific tables can become extremely wide.

On mobile:

Do not simply shrink the entire table.

Instead use:

```text
Horizontal scrolling
```

or:

```text
Card representation
```

depending on the table.

---

# 108. Mobile Material Database

On mobile:

```text
Material ID
Formula
Status
Progress
```

are shown first.

Additional properties are revealed by opening the material.

---

# 109. Dark Mode

Dark mode is recommended.

However, scientific figures and plots must remain readable in both themes.

Users should be able to select:

```text
Light
Dark
System
```

---

# 110. Dark Mode Considerations

Do not simply invert colors.

Ensure:

- Charts remain readable
- Crystal viewer remains readable
- Tables remain readable
- Status badges remain distinguishable
- Code/data remain readable

---

# 111. Component Design System

Create reusable components:

```text
Button
Input
Select
Textarea
Modal
Dialog
Badge
Card
Avatar
Table
Tabs
Dropdown
Tooltip
Toast
Alert
Progress
Skeleton
Pagination
SearchBar
FilterPanel
EmptyState
ErrorState
```

---

# 112. Research Components

Create:

```text
MaterialCard
MaterialStatusBadge
PropertyBadge
PropertyMatrix
ResearchProgress
ProjectCard
PublicationCard
ResearcherCard
ResearchAreaCard
ResearchTimeline
FileCard
```

---

# 113. Dashboard Components

Create:

```text
StatCard
ActivityFeed
ProgressCard
ResearchChart
RecentMaterials
UpcomingDeadlines
NotificationPanel
QuickActions
```

---

# 114. Navigation Components

Create:

```text
PublicNavbar
AuthenticatedSidebar
MobileNavigation
Breadcrumbs
UserMenu
NotificationBell
GlobalSearch
```

---

# 115. Page Hierarchy

The application should roughly follow:

```text
App
│
├── PublicLayout
│   ├── Home
│   ├── About
│   ├── Research
│   ├── Materials
│   ├── Projects
│   ├── Publications
│   ├── People
│   ├── Achievements
│   ├── Resources
│   ├── Forum
│   └── Contact
│
└── AppLayout
    ├── Dashboard
    ├── Materials
    ├── Projects
    ├── Reservations
    ├── Collaborations
    ├── Forum
    ├── Notifications
    ├── Files
    └── Profile

AdminLayout
    ├── Users
    ├── Materials
    ├── Projects
    ├── Moderation
    ├── Resources
    ├── Announcements
    └── Audit Logs
```

---

# 116. URL Design

URLs should be readable.

Good:

```text
/materials/CMRL-MAT-001
/projects/CMRL-PROJ-001
/people/CMRL-USER-001
/publications/CMRL-PUB-001
```

For public SEO pages, slugs may be added:

```text
/research-areas/hydrogen-storage
```

---

# 117. Breadcrumbs

Use breadcrumbs on deep research pages.

Example:

```text
Research
  >
Materials
  >
LiTeH3
```

Project:

```text
Projects
  >
Hydrogen Storage Project
  >
LiTeH3 Research
```

---

# 118. Research Context Navigation

A particularly useful feature is contextual navigation.

When viewing a material:

```text
Material
 ├── Project
 ├── Researchers
 ├── Properties
 ├── Files
 └── Publications
```

Every connected entity should be clickable.

This turns the database into a research graph rather than a collection of isolated pages.

---

# 119. Data Privacy UX

Private fields should show clear indicators.

Example:

```text
Mobile
🔒 Private
```

The profile owner can change visibility.

---

# 120. Profile Privacy Settings

Options:

```text
Show email publicly
Show mobile publicly
Show date of birth
Show gender
Show research files
```

Defaults should be privacy-conscious.

---

# 121. Research File Privacy

Before uploading a file, ask:

```text
Who can access this file?

○ Everyone
○ CMRL members
○ Project members
○ Supervisor only
○ Admin only
```

This prevents accidental exposure of unpublished work.

---

# 122. Admin UI Design

Admin interface should be functional rather than visually decorative.

Use:

- Tables
- Filters
- Bulk actions
- Search
- Confirmation dialogs
- Audit history

---

# 123. Bulk Material Management

Admin should eventually be able to:

```text
Select multiple materials

[Archive]
[Change Research Area]
[Export]
```

Bulk destructive actions must require confirmation.

---

# 124. Material Export

Future feature:

```text
Export Materials
```

Formats:

```text
CSV
JSON
```

Useful for research analysis and institutional reporting.

---

# 125. Research Dashboard Export

Future dashboard options:

```text
Export Statistics
Generate Report
```

Potential formats:

- CSV
- PDF

---

# 126. SEO

Public pages should be SEO-friendly.

Important pages:

```text
Home
Research
Research Areas
Supervisor
Publications
Achievements
Public Materials
```

Authenticated dashboards do not need SEO optimization.

---

# 127. Metadata

Public pages should have:

- Page title
- Description
- Open Graph metadata
- Canonical URL where appropriate

Example:

```text
CMRL — Crystalline Material Research Lab
```

---

# 128. Performance

Public pages should prioritize:

- Fast initial load
- Optimized images
- Lazy loading
- Code splitting

Heavy scientific visualization should not load on every page.

---

# 129. 3D Viewer Loading

The 3D crystal viewer should load only when requested.

Example:

```text
Material Page
       ↓
[View Crystal Structure]
       ↓
Load 3D Viewer
```

This prevents unnecessary JavaScript bundle size.

---

# 130. Scientific Figure Handling

Figures should support:

- Zoom
- Full-screen view
- Caption
- Methodology
- Download if authorized

Do not stretch figures unnaturally.

---

# 131. Research Timeline UI

Use chronological events:

```text
● 2026-08
Material Proposed

│

● 2026-08
Structure Optimized

│

● 2026-09
Electronic Properties

│

● 2026-10
Phonon Study

│

○ Future
Publication
```

Completed and future milestones should be visually distinguishable.

---

# 132. Material Opportunity UI

If properties remain unstudied:

```text
Research Opportunities

✓ Structural
✓ Electronic
◐ Mechanical
○ Optical
○ Phonon
○ Hydrogen Storage

Potential future studies: 3
```

CTA:

```text
[Create Research Idea]
```

---

# 133. Research Collision Prevention

When a student views a material:

```text
Current Researcher:
Student A

Project:
Hydrogen Storage Project

Status:
Studying
```

If the material is already reserved:

```text
⚠ Currently assigned

This material is being studied by another researcher.
```

Then show:

```text
[View Research]
```

rather than:

```text
[Reserve]
```

---

# 134. Material Database Warning

Before assigning a new material:

```text
Potential Research Conflict

This material is already:
Studied / Reserved / Under Investigation

Would you like to continue?

[View Existing Research]
[Cancel]
```

---

# 135. Forum-to-Material Integration

Forum questions may optionally reference a material.

Example:

```text
Question:
Why am I getting imaginary phonon modes?

Related material:
CMRL-MAT-001 — LiTeH3
```

The material page can show:

```text
Related Forum Discussions
```

This creates a useful research knowledge base.

---

# 136. Forum-to-Project Integration

A project page can show:

```text
Related Discussions
```

This prevents useful troubleshooting knowledge from disappearing into the forum.

---

# 137. Notification UX

Notifications should be categorized:

```text
All
Research
Collaboration
Forum
System
```

Unread notifications should be visually distinct.

---

# 138. Notification Preferences

Future profile setting:

```text
Email Notifications
Research Updates
Collaboration Updates
Forum Replies
Announcements
```

Allow users to control non-critical notification delivery.

Critical security/system notifications should not be disabled.

---

# 139. First-Time User Onboarding

After first login:

```text
Step 1
Complete profile

Step 2
Choose research interests

Step 3
Explore research areas

Step 4
Explore material database

Step 5
Join or create research project
```

Allow users to skip nonessential onboarding.

---

# 140. Student Research Journey

The UX should support:

```text
Register
 ↓
Complete Profile
 ↓
Explore Materials
 ↓
Find Available Material
 ↓
Reserve Material
 ↓
Join Project
 ↓
Perform Research
 ↓
Upload Results
 ↓
Complete Properties
 ↓
Supervisor Verification
 ↓
Publication
 ↓
Achievement / Alumni
```

This is one of the central user journeys of the entire system.

---

# 141. Supervisor Research Journey

```text
Login
 ↓
Dashboard
 ↓
Review Students
 ↓
Review Projects
 ↓
Review Material Progress
 ↓
Verify Results
 ↓
Review Publication
 ↓
Track Lab Performance
```

---

# 142. Admin Journey

```text
Login
 ↓
Admin Dashboard
 ↓
Manage Users
 ↓
Manage Materials
 ↓
Moderate Community
 ↓
Manage Resources
 ↓
Publish Announcements
 ↓
Review Audit Logs
```

---

# 143. Public Visitor Journey

```text
Home
 ↓
Research
 ↓
Research Area
 ↓
Materials
 ↓
Publications
 ↓
People
 ↓
Achievements
 ↓
Contact
```

---

# 144. Design Rule: Scientific Credibility

The website must visually communicate that the information is research data.

Avoid excessive:

- Gradients
- Glowing effects
- Animated backgrounds
- Huge rounded cards
- Game-like badges
- Decorative animations

Use animation primarily for:

- State transitions
- Loading
- Navigation
- Data visualization

---

# 145. Design Rule: Data Density

Research dashboards need higher information density than the public homepage.

Therefore:

```text
Public website
→ spacious

Research dashboard
→ information dense

Admin dashboard
→ highly functional
```

Do not use the same layout density everywhere.

---

# 146. Design Rule: Hierarchy

Important information should always be visually prioritized.

For materials:

```text
Formula
↓
Status
↓
Research Progress
↓
Key Properties
↓
Detailed Metadata
```

For students:

```text
Name
↓
Research Area
↓
Current Project
↓
Achievements
↓
External Profiles
```

---

# 147. Design Rule: Progressive Disclosure

Do not overwhelm new students with every DFT parameter immediately.

Show:

```text
Basic Information
```

then:

```text
Scientific Details
```

then:

```text
Computational Methodology
```

then:

```text
Raw Research Files
```

This is particularly important for beginners.

---

# 148. UX for Experts

Advanced researchers should still be able to quickly access:

- Numerical values
- Methodology
- Files
- Version history
- Research history
- Related publications

Use expandable sections rather than hiding scientific information permanently.

---

# 149. Design System Documentation

The implementation should eventually maintain:

```text
Design Tokens
Components
Spacing
Typography
Colors
Icons
Forms
Tables
Charts
States
```

This ensures all pages look like one coherent laboratory platform.

---

# 150. Iconography

Use one consistent icon library.

Possible choice:

```text
Lucide React
```

Icons should support the meaning of text rather than replace text.

---

# 151. Animation

Keep animations subtle.

Recommended:

```text
150–300ms
```

Use:

- Fade
- Slide
- Expand
- Skeleton shimmer

Avoid excessive motion.

Respect:

```text
prefers-reduced-motion
```

---

# 152. Mobile UX Priority

The most important mobile functions are:

1. View materials
2. Search
3. View notifications
4. View projects
5. Forum
6. Profile
7. Collaboration

Complex administration can remain desktop-first.

---

# 153. Final Page Inventory

## Public

```text
1. Home
2. About
3. Research
4. Research Areas
5. Materials
6. Material Detail
7. Projects
8. Project Detail
9. Publications
10. People
11. Student Profile
12. Supervisor
13. Achievements
14. Alumni
15. Resources
16. Forum
17. Contact
```

## Authentication

```text
18. Login
19. Register
20. Forgot Password
21. Email Verification
```

## Student / Member

```text
22. Dashboard
23. Profile
24. Edit Profile
25. My Materials
26. My Projects
27. Reservations
28. Collaboration Hub
29. My Applications
30. Notifications
31. Files
32. Forum
```

## Supervisor

```text
33. Supervisor Dashboard
34. Student Management
35. Project Management
36. Material Review
37. Property Verification
38. Publication Management
```

## Admin

```text
39. Admin Dashboard
40. User Management
41. Material Management
42. Project Management
43. Publication Management
44. Forum Moderation
45. Collaboration Management
46. Resource Management
47. Announcement Management
48. Achievement Management
49. Audit Logs
50. System Settings
```

---

# 154. MVP Page Priority

Not every page should be built simultaneously.

## Must Have

```text
Home
Login
Register
Dashboard
Profile
Materials
Material Detail
Projects
Project Detail
Reservations
Publications
Notifications
Admin Dashboard
User Management
```

## Phase 2

```text
Forum
Collaboration
Resources
Achievements
Alumni
Advanced Search
```

## Phase 3

```text
3D Crystal Viewer
Material Comparison
Scientific Visualization
External Research APIs
Advanced Analytics
```

---

# 155. MVP UX Priority

The first version should focus on three core workflows:

### Workflow 1

```text
Student
 ↓
Login
 ↓
Explore Material Database
 ↓
Find Available Material
 ↓
Reserve
 ↓
Research
```

### Workflow 2

```text
Student
 ↓
Create Project
 ↓
Add Material
 ↓
Track DFT Properties
 ↓
Upload Research Files
 ↓
Complete Research
```

### Workflow 3

```text
Supervisor
 ↓
Dashboard
 ↓
Review Research
 ↓
Verify Properties
 ↓
Track Publication
```

If these three workflows work extremely well, the core CMRL platform is already valuable.

---

# 156. Final UI/UX Principles

The CMRL interface must follow these principles:

1. Scientific before decorative.
2. Data before animation.
3. Research context should always be visible.
4. Important status must be obvious.
5. Failed research should be preserved.
6. Private research should be clearly protected.
7. New students should not feel overwhelmed.
8. Experienced researchers should have fast access to technical information.
9. Mobile users should still be able to access the research database.
10. Accessibility should be built into components.
11. Public pages should communicate laboratory credibility.
12. Dashboards should prioritize actionable information.
13. Every major entity should connect to related research.
14. The material database should be the central research hub.
15. The interface should feel like **CMRL**, not a generic admin template.

---

# 157. Final CMRL Experience

The completed system should feel like:

```text
                 CMRL RESEARCH PORTAL
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    RESEARCH          DATABASE         COMMUNITY
        │                │                │
        │                │                │
    Projects          Materials        Forum
    Students          Properties       Collaboration
    Publications      Reservations     Notifications
    Supervisor        Files            Resources
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  RESEARCH KNOWLEDGE
```

The ultimate UX goal is:

> **A CMRL student should be able to discover what has already been studied, identify what remains unexplored, organize their research, collaborate with other students, preserve their computational work, and eventually connect the research to publications—all from one platform.**

---

# 158. Next Documentation Stage

The next document should be:

# `IMPLEMENTATION_PLAN.md`

It should convert all previous documents into an actual development roadmap.

It should define:

- Project initialization
- Repository structure
- Dependencies
- Environment setup
- Firebase setup
- MongoDB setup
- Backend setup
- Frontend setup
- Authentication implementation
- Database implementation
- API implementation
- UI implementation
- Material database implementation
- Reservation system
- Project system
- Publication system
- Forum
- Collaboration
- Notification system
- File storage
- Admin panel
- Testing
- Security
- Deployment
- Git workflow
- Development milestones
- Definition of Done
- Recommended implementation order
- Which features should NOT be built initially

This should be the document you can practically follow while coding the CMRL portal.