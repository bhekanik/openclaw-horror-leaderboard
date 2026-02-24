# OpenClaw Horror Stories

Community-driven leaderboard of the worst things AI agents have done to real people. Submit stories with evidence, vote on incidents, and a scoring algorithm ranks the most horrifying cases.

Think Reddit meets AI Incident Database.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- A free [Convex](https://www.convex.dev/) account
- (Optional) A [GitHub OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) for social login

### 1. Clone and install

```bash
git clone https://github.com/bhekanik/openclaw-horror-leaderboard.git
cd openclaw-horror-leaderboard
bun install
```

### 2. Set up Convex

Run `bunx convex dev` — it will walk you through creating a project on your first run. This generates your `.env.local` automatically with `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`.

If it doesn't, copy the example and fill in your values:

```bash
cp .env.example .env.local
```

### 3. Set up auth (optional for basic dev)

GitHub OAuth and email/password auth require environment variables set in the **Convex dashboard** (Settings > Environment Variables), not in `.env.local`:

| Variable | Where to get it |
|---|---|
| `AUTH_GITHUB_ID` | [GitHub OAuth App](https://github.com/settings/developers) > Client ID |
| `AUTH_GITHUB_SECRET` | Same app > Client Secret |
| `AUTH_SECRET` | Any random string (`openssl rand -hex 32`) |

**You can skip this step** — the app works without auth, you just can't vote or submit stories.

### 4. Seed the database (optional)

To populate your dev database with sample horror stories:

```bash
bunx convex run seed:seedStories
```

### 5. Run the dev servers

You need **two terminals**:

```bash
# Terminal 1 — Convex backend (watches for schema/function changes)
bunx convex dev

# Terminal 2 — Next.js frontend
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui |
| Backend | Convex (real-time DB, server functions, file storage, auth) |
| Auth | Convex Auth — GitHub OAuth + email/password |
| Linting | Biome (tabs, double quotes, semicolons) |
| Testing | Vitest + Testing Library + MSW |
| Deployment | Vercel (frontend) + Convex Cloud (backend) |

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Next.js dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run test` | Vitest (single pass) |
| `bun run test:watch` | Vitest (watch mode) |
| `bun run lint` | Biome check |
| `bun run lint:fix` | Biome check + auto-fix |
| `bun run format` | Biome format |
| `bunx convex dev` | Convex dev server |
| `bunx convex deploy` | Deploy Convex to production |

Always use `bun`/`bunx`, never `npm`/`npx`.

## Project Structure

```
app/                    Next.js App Router pages
  page.tsx              Home / leaderboard
  story/[id]/           Individual story page
  submit/               Story submission form
  category/[slug]/      Stories filtered by category
  auth/                 Login / register
  admin/                Admin dashboard
components/
  stories/              Story cards, vote buttons, detail views
  comments/             Comment threads
  leaderboard/          Leaderboard list, filters
  auth/                 Auth buttons, forms
  admin/                Admin tools
  layout/               Header, footer, providers
  ui/                   shadcn/ui primitives (auto-generated, don't edit)
convex/                 All backend logic
  schema.ts             Database schema
  stories.ts            Story queries & mutations
  votes.ts              Vote logic + score recalculation
  comments.ts           Comment CRUD
  auth.ts               Auth provider config
  seed.ts               Sample data seeder
  lib/scoring.ts        Horror Score algorithm
lib/                    Frontend utilities
  utils.ts              cn() for Tailwind class merging
  constants.ts          Categories, badges
  format.ts             Date/time formatting
```

## How It Works

### Data Flow

There's no REST API. The frontend calls Convex `query` (reactive reads) and `mutation` (writes) directly. Real-time updates happen automatically — when someone votes, every connected client sees it instantly.

```
React Component → useQuery(api.stories.list) → Convex DB (real-time subscription)
React Component → useMutation(api.votes.cast) → Convex mutation → recalculates score
```

### Horror Score

```
HorrorScore = WilsonLower(upvotes + rip, total) * Authenticity * Freshness * Severity
```

- **Wilson Score** — lower bound of confidence interval, so stories with few votes don't dominate
- **Authenticity** — ratio of verified vs. fake flags
- **Freshness** — recent stories get a boost
- **Severity** — author-assigned 1-5 rating

Score recalculates on every vote and is stored denormalized on the story document for fast sorted queries.

### Vote Types

| Vote | Meaning |
|---|---|
| Upvote | This belongs on the leaderboard |
| Downvote | This doesn't belong |
| Verified | I can confirm this happened |
| Fake | I believe this is fabricated |
| RIP | This one is truly devastating |

One vote per user per story. Togglable — click again to remove.

### Categories

`rogue` · `cost_money` · `scared_me` · `security` · `epic_fail` · `identity_crisis` · `almost_catastrophic`

### Auth

Convex Auth handles everything. Providers configured in `convex/auth.ts`. New users get app fields initialized via the `afterUserCreatedOrUpdated` callback (karma, badges, etc.).

## Developer Guide

### Working with Convex

Convex functions live in the `convex/` directory. The dev server (`bunx convex dev`) watches for changes and hot-deploys them. Types are auto-generated in `convex/_generated/` — never edit those.

**Adding a new query:**

```ts
// convex/stories.ts
export const myQuery = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stories")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});
```

**Using it in React:**

```tsx
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const stories = useQuery(api.stories.myQuery, { category: "rogue" });
```

**Adding a mutation:**

```ts
export const myMutation = mutation({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    // ... do stuff
  },
});
```

### Adding a New Page

Pages go in `app/`. Follow the App Router convention:

```
app/my-page/page.tsx     → /my-page
app/my-page/[id]/page.tsx → /my-page/:id
```

All pages are client-rendered since they use Convex's real-time subscriptions. Use `"use client"` at the top.

### Adding UI Components

We use shadcn/ui. To add a new component:

```bash
bunx shadcn@latest add dialog
```

This generates into `components/ui/`. Don't manually edit those files.

### Schema Changes

Edit `convex/schema.ts`, then let `bunx convex dev` pick it up. Convex handles migrations automatically for additive changes. For breaking changes (removing fields, changing types), you'll need to write a migration mutation.

### Running Tests

```bash
bun run test                         # All tests
bunx vitest run path/to/file.test.tsx  # Single file
bun run test:watch                   # Watch mode
```

Tests use jsdom with Testing Library and MSW for mocking Convex calls.

### Common Patterns

**Check if user is authenticated:**
```ts
const userId = await getAuthUserId(ctx);
if (!userId) throw new Error("Not authenticated");
```

**Paginated query:**
```ts
export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stories")
      .withIndex("by_horrorScore")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
```

**Path aliases:** `@/*` maps to the project root. Use `@/components/...`, `@/lib/...`, `@/convex/...`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)

## Disclaimer

Not affiliated with OpenClaw, Peter Steinberger, or any related entity. This is a community accountability project.
