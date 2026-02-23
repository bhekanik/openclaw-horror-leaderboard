## Status: COMPLETE

# Phase 1: Project Scaffold

## Dependencies
None — this is the first phase.

## Tasks

- [x] Create Next.js app with TypeScript, Tailwind CSS, App Router
- [x] Install and configure Bun as package manager
- [x] Initialize Convex (`bunx convex dev` — skip if requires interactive setup, configure manually)
- [x] Set up shadcn/ui (`bunx shadcn@latest init`) with dark theme defaults
- [x] Configure Biome (`biome.json`) for linting/formatting (NOT eslint/prettier)
- [x] Configure Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) + MSW
- [x] Install all remaining dependencies (lucide-react, next-themes, etc.)
- [x] Set up Convex provider in root layout
- [x] Set up next-themes with dark mode as default
- [x] Create basic layout shell:
  - [x] Header component (logo, tagline, nav links, auth placeholder)
  - [x] Footer component (links, disclaimer)
  - [x] Root layout with providers
- [x] Create placeholder pages:
  - [x] `/` (home/leaderboard)
  - [x] `/about`
  - [x] `/submit`
  - [x] `/auth/login`
  - [x] `/auth/register`
- [x] Write smoke tests:
  - [x] Root layout renders
  - [x] Header renders with nav links
  - [x] Footer renders with disclaimer
  - [x] Placeholder pages render without crashing
- [x] Verify: `bun run dev` starts without errors
- [x] Verify: `bun run test` passes all tests (14/14 green)
- [x] Verify: `bunx @biomejs/biome check .` passes

## Acceptance Criteria
- [x] App runs locally with `bun run dev`
- [x] Dark mode is default theme (horror-themed: red accent primary, dark backgrounds)
- [x] All placeholder pages are accessible via navigation
- [x] Tests pass green (14 tests, 7 test files)
- [x] Biome linting passes
- [x] Convex provider wraps the app (gracefully handles missing URL)
