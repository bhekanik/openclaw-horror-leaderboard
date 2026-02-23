# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Community-driven leaderboard of OpenClaw AI horror stories. Users submit stories with evidence ("receipts"), community votes, and a scoring algorithm (Horror Score) ranks worst incidents. Think Reddit meets AI Incident Database for OpenClaw disasters.

## Commands

```bash
bun run dev          # Next.js dev server (Turbopack)
bun run build        # Production build
bun run test         # Vitest run (single pass)
bun run test:watch   # Vitest watch mode
bun run lint         # Biome check
bun run lint:fix     # Biome check + auto-fix
bun run format       # Biome format

# Convex backend
bunx convex dev      # Start Convex dev server (must run alongside Next.js dev)
bunx convex deploy   # Deploy Convex to production

# Single test file
bunx vitest run path/to/file.test.tsx
```

**Always use `bun`/`bunx`, never `npm`/`npx`.**

## Architecture

### Stack
- **Frontend:** Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui
- **Backend:** Convex (database, real-time subscriptions, server functions, file storage, auth)
- **Auth:** Convex Auth with GitHub OAuth + email/password (`@convex-dev/auth`)
- **Linting:** Biome (not ESLint/Prettier) — tabs, double quotes, semicolons
- **Testing:** Vitest + Testing Library + MSW (jsdom environment)
- **Deployment:** Vercel (frontend) + Convex Cloud (backend)

### Data Flow
All data flows through Convex. No REST API layer — the frontend calls Convex `query` (reactive reads) and `mutation` (writes) functions directly via the Convex React client. Real-time updates happen automatically through Convex subscriptions.

Provider chain: `ConvexAuthProvider` → `ThemeProvider` → app (see `app/layout.tsx`).

### Key Directories

- **`convex/`** — All backend logic. Schema, auth, server functions (queries/mutations). `convex/_generated/` is auto-generated — never edit it.
- **`convex/lib/scoring.ts`** — Horror Score algorithm (Wilson score + authenticity + freshness + severity).
- **`app/`** — Next.js App Router pages. Routes: `/`, `/story/[id]`, `/submit`, `/category/[slug]`, `/user/[username]`, `/auth/*`, `/admin`.
- **`components/`** — React components organized by domain: `stories/`, `comments/`, `leaderboard/`, `auth/`, `admin/`, `moderation/`, `profile/`, `layout/`, `ui/`.
- **`components/ui/`** — shadcn/ui primitives. Auto-generated — avoid manual edits.
- **`lib/utils.ts`** — `cn()` utility for Tailwind class merging.

### Convex Patterns
- `query` for reads (reactive/real-time), `mutation` for writes, `action` for external API calls
- Auth check: `const userId = await getAuthUserId(ctx);`
- Schema: `convex/schema.ts` — includes `...authTables` spread for Convex Auth tables
- Users table has optional app-specific fields (karma, badges, etc.) initialized in `auth.ts` `afterUserCreatedOrUpdated` callback
- Vote changes trigger Horror Score recalculation inline (see `convex/votes.ts:updateStoryVoteCounts`)
- `convex/http.ts` exposes auth HTTP routes via `auth.addHttpRoutes(http)`

### Horror Score Formula
```
HorrorScore = WilsonLower(upvotes+rip, total) * Authenticity * Freshness * Severity
```
Components in `convex/lib/scoring.ts`. Score is recalculated on every vote change and stored denormalized on the story document.

### Path Aliases
`@/*` maps to project root (e.g., `@/components/ui/button`).

## Biome Config Notes
- Excludes: `node_modules`, `.next`, `convex/_generated`, `components/ui`
- Indent: tabs. Line width: 100. Double quotes. Semicolons always.

## Story Categories
`rogue`, `cost_money`, `scared_me`, `security`, `epic_fail`, `identity_crisis`, `almost_catastrophic`

## Vote Types
`upvote`, `downvote`, `fake`, `verified`, `rip` — one vote per user per story, togglable/changeable.

## Environment Variables
- `CONVEX_DEPLOYMENT` / `NEXT_PUBLIC_CONVEX_URL` — in `.env.local`
- `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_SECRET` — set as Convex env vars (not in `.env.local`)
