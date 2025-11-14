# Implementation Plan: Question-Based Discovery Engine

**Branch**: `001-question-discovery` | **Date**: 2025-11-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-question-discovery/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a question-based discovery engine to help users 60+ surface authentic life goals through thoughtful, age-appropriate prompts. The engine will present questions one at a time, organized by life categories (Reconnection, Learning, Creation, etc.), and generate personalized goal suggestions based on responses. Technical approach will prioritize accessibility, privacy, and patient user experience aligned with the platform's constitution.

## Technical Context

**Language/Version**: TypeScript (Next.js 14+ for frontend, Node.js for backend)
**Primary Dependencies**: React, Radix UI, Tailwind CSS, Express/Fastify, Supabase
**Storage**: PostgreSQL with Row-Level Security (via Supabase)
**Testing**: Vitest for unit tests, Playwright for E2E, axe-core for accessibility
**Target Platform**: Web application, responsive design for desktop/tablet/mobile
**Project Type**: web - frontend and backend separation
**Performance Goals**: <2s page load, <100ms question navigation, support 1000 concurrent users
**Constraints**: WCAG 2.1 AA compliance, 18px minimum font, 44x44px touch targets, no time pressure
**Scale/Scope**: Initial 100-150 questions, 6 categories, support for 10k users in first year

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [✅] **Dignity-First Design**: Does this feature honor user wisdom and autonomy?
  - Yes: Respectful language, skip any question, no patronizing assumptions
- [✅] **Question-Based Discovery**: Does this help users discover authentic desires?
  - Yes: This IS the core principle - progressive questioning, personalized suggestions
- [✅] **Privacy by Default**: Are all data and interactions private unless shared?
  - Yes: All sessions private, no mandatory sharing, data export capability planned
- [✅] **Empowerment Over Extraction**: Does this empower rather than extract?
  - Yes: No gamification, no social pressure, focused on meaningful reflection
- [✅] **Age-Appropriate Accessibility**: Is this comfortable for 60+ users?
  - Yes: Large text/targets, voice input planned, patient pacing, simple interface
- [✅] **Meaning Before Metrics**: Does this prioritize life improvement over engagement?
  - Yes: Success measured by goal relevance and life impact, not session length

**Gate Status**: ✅ PASSED - All principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-question-discovery/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   ├── question.py/ts
│   │   ├── response.py/ts
│   │   ├── discovery_session.py/ts
│   │   └── goal_suggestion.py/ts
│   ├── services/
│   │   ├── discovery_engine.py/ts
│   │   ├── question_selector.py/ts
│   │   ├── goal_generator.py/ts
│   │   └── session_manager.py/ts
│   └── api/
│       ├── discovery/
│       └── suggestions/
└── tests/
    ├── unit/
    ├── integration/
    └── contract/

frontend/
├── src/
│   ├── components/
│   │   ├── discovery/
│   │   │   ├── QuestionDisplay/
│   │   │   ├── CategorySelector/
│   │   │   └── ProgressIndicator/
│   │   └── accessibility/
│   │       ├── TextSizer/
│   │       └── VoiceInput/
│   ├── pages/
│   │   ├── discovery/
│   │   └── goals/
│   └── services/
│       ├── api/
│       └── state/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: Web application structure chosen for clear separation between frontend (user interface) and backend (business logic). This allows independent scaling and technology choices while maintaining clean boundaries.

## Complexity Tracking

> No violations - all constitution principles satisfied without compromise

## Phase 0: Research & Resolution ✅ COMPLETE

### Research Completed

All technical clarifications have been resolved through comprehensive research:

1. **Frontend Framework**: Next.js 14+ selected for superior accessibility tooling
2. **Component Library**: Radix UI + Tailwind CSS for full control with WCAG compliance
3. **Backend**: Node.js with TypeScript for consistency across stack
4. **Database**: PostgreSQL with Row-Level Security for privacy and flexibility
5. **Testing**: Vitest + Playwright + axe-core for comprehensive coverage

### Research Outputs

- ✅ `research.md` - Complete technology decisions and rationale
- ✅ All NEEDS CLARIFICATION items resolved
- ✅ Architecture patterns defined (graph-based flow, keyword matching for goals)
- ✅ Security strategy established (multi-layer encryption, RLS)

## Phase 1: Design & Contracts ✅ COMPLETE

### Design Artifacts Created

1. **Data Model** (`data-model.md`)
   - 10 core entities defined with full field specifications
   - Privacy-first architecture with RLS and encryption
   - GDPR compliance built into schema
   - Scalable to 100k+ users

2. **API Contracts** (`contracts/discovery-api.yaml`)
   - OpenAPI 3.0 specification
   - RESTful endpoints for discovery flow
   - Comprehensive error handling
   - JWT-based authentication

3. **Quickstart Guide** (`quickstart.md`)
   - Complete local setup instructions
   - Testing procedures
   - Common troubleshooting
   - Architecture overview

### Key Design Decisions

- **Question Flow**: Graph-based navigation with conditional branching
- **Goal Generation**: Keyword matching with weighted scoring (non-AI initially)
- **Privacy Pattern**: Application-layer encryption for sensitive responses
- **Accessibility**: Custom Tailwind config with senior-friendly defaults

## Phase 2: Implementation Planning

Ready for task generation via `/speckit.tasks` command. The design phase has produced all necessary artifacts for implementation to begin.