## Status: COMPLETE

# Phase 2: Database Schema & Auth

## Dependencies
- Phase 1 complete (scaffold, Convex initialized)

## Tasks

- [x] Define full Convex schema (`convex/schema.ts`) with all tables and indexes:
  - [x] `users` table (with optional app-specific fields for auth compat)
  - [x] `stories` table
  - [x] `receipts` table
  - [x] `votes` table
  - [x] `comments` table
  - [x] `commentVotes` table
  - [x] `reports` table
- [x] Set up Convex Auth configuration (`convex/auth.ts`)
- [x] Configure email+password provider (Password)
- [x] Configure GitHub OAuth provider (GitHub from @auth/core)
- [x] Create `convex/http.ts` for auth HTTP routes
- [x] Create `convex/auth.config.ts` for provider config
- [x] Create `convex/users.ts` with currentUser query and setUsername mutation
- [x] Create username selection flow (UsernameForm component)
- [x] Build login page (`/auth/login`) with LoginForm component (shadcn Card, Input, Label, Button)
- [x] Build register page (`/auth/register`) with RegisterForm component
- [x] Add auth state to header (AuthButton with Authenticated/Unauthenticated/AuthLoading)
- [x] Create user menu dropdown component (UserMenu with profile link, sign out)
- [x] Add Sonner toaster to root layout for notifications
- [x] Write tests:
  - [x] Login form renders and validates inputs (7 tests)
  - [x] Register form renders, validates passwords, calls signIn (8 tests)
  - [x] Auth button shows login/user menu based on state (2 tests)
  - [x] User menu dropdown renders correct items (4 tests)
  - [x] Username form validates and submits (5 tests)
  - [x] Header renders with auth button (4 tests)
  - [x] Login/register pages render forms (2 tests)
- [x] All 40 tests pass green (12 test files)
- [x] Biome linting passes

## Acceptance Criteria
- [x] Schema defined with all tables, indexes, and auth integration
- [x] Auth configured with Password + GitHub providers
- [x] Login form with email+password + GitHub OAuth button
- [x] Register form with password confirmation + validation
- [x] Header shows auth state (login link / user menu)
- [x] Username selection form for new users
- [x] All 40 tests pass green
- [x] Biome passes
