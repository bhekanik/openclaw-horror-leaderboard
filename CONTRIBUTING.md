# Contributing

Thanks for your interest in contributing to OpenClaw Horror Stories!

## Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/openclaw-horror-leaderboard.git
cd openclaw-horror-leaderboard

# 2. Install
bun install

# 3. Set up Convex (creates your own dev backend)
bunx convex dev

# 4. Seed sample data (optional, in a separate terminal)
bunx convex run seed:seedStories

# 5. Run Next.js (in a separate terminal)
bun run dev
```

You now have a full local environment at [http://localhost:3000](http://localhost:3000). Auth is optional for basic development — skip GitHub OAuth setup if you're just working on UI.

## What Can I Work On?

- **Good first issues** — labeled [`good first issue`](https://github.com/bhekanik/openclaw-horror-leaderboard/issues?q=label%3A%22good+first+issue%22)
- **Bug fixes** — check [open bugs](https://github.com/bhekanik/openclaw-horror-leaderboard/issues?q=label%3Abug)
- **Feature requests** — check [enhancements](https://github.com/bhekanik/openclaw-horror-leaderboard/issues?q=label%3Aenhancement)
- **Horror stories** — submit real incidents through the app UI

## Development Workflow

### Branching

1. Create a branch from `main`: `git checkout -b feat/my-feature`
2. Make your changes
3. Run checks: `bun run lint && bun run test`
4. Push and open a PR against `main`

Branch naming convention: `feat/`, `fix/`, `docs/`, `refactor/`, `test/`

### Two Servers

You always need two terminals running:

| Terminal | Command | Purpose |
|---|---|---|
| 1 | `bunx convex dev` | Watches `convex/` for changes, deploys to your dev backend |
| 2 | `bun run dev` | Next.js dev server with Turbopack |

The Convex dev server must be running for the app to work — it's the database and backend.

### Code Style

We use **Biome** (not ESLint/Prettier):

- **Tabs** for indentation
- **Double quotes**
- **Semicolons** always
- **Line width:** 100

```bash
bun run lint:fix    # Fix lint issues
bun run format      # Format code
```

Biome runs on `.ts`, `.tsx`, and `.json` files. It ignores `node_modules`, `.next`, `convex/_generated`, and `components/ui`.

### Commit Messages

Conventional format:

```
type: description

optional body
```

| Type | Use for |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no behavior change) |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Tooling, config, deps |

Examples:
```
feat: add comment threading
fix: prevent duplicate votes on rapid clicks
docs: add developer setup guide
```

## Architecture Overview

### No REST API

The frontend talks to Convex directly. No Express, no API routes. Convex handles real-time subscriptions, so when someone votes, all connected clients see it instantly.

```
Frontend (React) ←→ Convex Client ←→ Convex Cloud (DB + functions)
```

### Key Files to Know

| File | What it does |
|---|---|
| `convex/schema.ts` | Database schema — all tables and indexes |
| `convex/stories.ts` | Story CRUD — list, get, create, update |
| `convex/votes.ts` | Vote casting + score recalculation |
| `convex/lib/scoring.ts` | Horror Score algorithm |
| `convex/auth.ts` | Auth provider config + user initialization |
| `convex/seed.ts` | Sample data for dev |
| `app/page.tsx` | Homepage / leaderboard |
| `components/stories/vote-buttons.tsx` | Vote UI with optimistic updates |
| `components/layout/header.tsx` | Navigation header |

### Database Tables

| Table | Purpose |
|---|---|
| `stories` | Horror story submissions with denormalized vote counts and score |
| `votes` | One per user per story, tracks vote type |
| `comments` | Threaded comments on stories |
| `commentVotes` | Votes on comments |
| `receipts` | Evidence attached to stories (screenshots, links, transcripts) |
| `reports` | Content moderation reports |
| `users` | User profiles with karma, badges, admin status |

### Adding Backend Functions

**Query** (read, real-time):
```ts
export const myQuery = query({
  args: { id: v.id("stories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

**Mutation** (write):
```ts
export const myMutation = mutation({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(args.storyId, { /* changes */ });
  },
});
```

**Using in React:**
```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Read (auto-updates in real time)
const story = useQuery(api.stories.get, { id: storyId });

// Write
const vote = useMutation(api.votes.cast);
await vote({ storyId, type: "upvote" });
```

### Adding UI Components

We use [shadcn/ui](https://ui.shadcn.com/). To add a new primitive:

```bash
bunx shadcn@latest add dialog
```

This generates into `components/ui/`. Don't manually edit those files — they're meant to be managed by shadcn.

Custom components go in the appropriate domain folder under `components/` (e.g., `components/stories/`, `components/comments/`).

### Schema Changes

Edit `convex/schema.ts`. The Convex dev server picks up changes automatically. Additive changes (new optional fields, new tables) apply instantly. For breaking changes, write a migration mutation in `convex/` and run it with `bunx convex run`.

### Testing

```bash
bun run test                           # All tests
bunx vitest run path/to/file.test.tsx  # Single file
bun run test:watch                     # Watch mode
```

Tests use jsdom environment with Testing Library. MSW mocks external calls.

### Path Aliases

`@/*` maps to project root:
```ts
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
```

## Pull Request Guidelines

- **One feature or fix per PR** — keep them focused
- **Clear description** — explain what changed and why
- **Tests** — add them for new functionality when possible
- **Lint clean** — `bun run lint` and `bun run test` must pass
- **Screenshots** — include them for UI changes

PRs require 1 approval before merging. Stale approvals are dismissed on new pushes.

## Don't Touch

- `convex/_generated/` — auto-generated by Convex
- `components/ui/` — managed by shadcn

## Reporting Issues

Use [GitHub Issues](https://github.com/bhekanik/openclaw-horror-leaderboard/issues). Include:

- What you expected
- What happened instead
- Steps to reproduce
- Browser/OS if relevant

## Code of Conduct

Be respectful. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Questions?

Open a [discussion](https://github.com/bhekanik/openclaw-horror-leaderboard/discussions) or an issue.
