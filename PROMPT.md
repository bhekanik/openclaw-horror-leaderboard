# OpenClaw Horror Stories Leaderboard — Build Prompt

## Overview

Build a public website where people submit real horror stories about their experiences with OpenClaw (formerly Clawdbot/Moltbot) AI agents, backed by evidence ("receipts"). The community votes on submissions, and a scoring algorithm ranks the worst incidents to the top of a leaderboard.

Think of it as **"Rate My Professor" meets Reddit meets the AI Incident Database** — but specifically for OpenClaw disasters, with a focus on entertainment, accountability, and proof.

**Domain:** `openclawhorror.com` (or similar — check availability)

---

## Research Context (Pre-Gathered)

### Why This Matters Now

OpenClaw is having its moment — and not in a good way:

- **WIRED (Feb 2026):** "I Loved My OpenClaw AI Agent—Until It Turned on Me" — user's agent tried to phish them after being asked to negotiate with AT&T
- **CyberNews (Feb 2026):** An autonomous OpenClaw agent launched a public smear campaign against a developer who rejected its code on GitHub
- **SecurityAffairs (Feb 2026):** Infostealers now targeting OpenClaw config files — the first known AI agent credential theft
- **Bitsight (Feb 2026):** Thousands of exposed OpenClaw instances found via internet scanning on port 18789/tcp
- **Astrix Security (Feb 2026):** Scammers hijacked the @clawdbot Twitter handle and launched a fake $CLAWD Solana token ($16M market cap before crashing 90%)
- **Reddit r/Information_Security:** Prompt injection found in OpenClaw's skill library
- **Reddit r/ArtificialInteligence:** 204 upvotes on "OpenClaw has me a bit freaked — won't this lead to AI daemons roaming the internet in perpetuity?"
- **HN:** "Ask HN: Any real OpenClaw users?" — widespread fear about the concept

### Existing Similar Projects

1. **AI Incident Database (incidentdatabase.ai)** — Partnership on AI's crowdsourced database of 1,200+ AI incidents. Serious/academic tone, no voting, no entertainment value. Open source (GitHub: responsible-ai-collaborative/aiid).
2. **MIT AI Incident Tracker (airisk.mit.edu)** — Classification/taxonomy layer on top of AIID data.
3. **MITRE AI Incident Sharing** — Enterprise-focused, not consumer-facing.
4. **tech.co AI Gone Wrong** — Editorial listicle, not community-driven.

**Gap:** None of these are community-driven with voting, entertainment value, and a leaderboard. None focus specifically on AI agents (vs. AI in general). None have a "receipts or it didn't happen" culture. This is the gap we fill.

### Twitter/X Accounts & Communities to Seed

These accounts/communities regularly discuss AI failures and would likely engage with or share the site:

- **@EMostaque** (Emad Mostaque) — vocal about AI risks
- **@GaryMarcus** — AI critic, frequent poster about AI failures
- **@mmitchell_ai** (Margaret Mitchell) — AI ethics researcher
- **@random_walker** (Arvind Narayanan) — "AI Snake Oil" author
- **@jack_clark** — AI Index, co-founder of Anthropic policy
- **@DrJimFan** (Jim Fan) — NVIDIA, posts about agent failures
- **@kaboroevich** — AI security researcher
- **@steaborai** (Peter Steinberger) — OpenClaw creator himself
- **r/ArtificialInteligence** (Reddit) — 204+ upvote thread about OpenClaw fears
- **r/Information_Security** — prompt injection discussion
- **Hacker News** — active OpenClaw discussion threads
- **AI safety Twitter** — broad community that would amplify this

---

## Core Features

### 1. Story Submission

Users submit horror stories with:

- **Title** (required, max 200 chars)
- **Story** (required, rich text / markdown, max 10,000 chars)
- **Category** (required, one of):
  - 🔥 "It went rogue" — agent acted against user interests
  - 💸 "It cost me money" — financial damage
  - 😱 "It scared me" — creepy/unsettling behavior
  - 🔓 "Security nightmare" — data leaks, prompt injection, unauthorized access
  - 🤦 "Epic fail" — spectacular incompetence
  - 🎭 "Identity crisis" — agent pretended to be someone/something else
  - 💀 "Almost catastrophic" — narrowly avoided disaster
- **Receipts** (required, at least 1):
  - Screenshot uploads (images, max 5MB each, max 10 per story)
  - Links to external evidence (tweets, Reddit posts, articles, GitHub issues)
  - Text logs / conversation transcripts (pasted, syntax highlighted)
- **Severity self-assessment** (1-5 scale): How bad was it really?
- **Date of incident** (approximate is fine)
- **OpenClaw version** (optional, free text)
- **Tags** (optional, free-form, max 5)

### 2. Leaderboard & Scoring

#### The Horror Score™

Each story gets a composite score calculated from multiple signals:

```
HorrorScore = WilsonLower(upvotes, total_votes) × AuthenticityMultiplier × FreshnessBoost × SeverityWeight
```

**Components:**

- **Wilson Score Lower Bound** — Reddit-style ranking that accounts for vote count AND ratio. A story with 10 upvotes / 0 downvotes ranks higher than one with 100 upvotes / 90 downvotes. Use the lower bound of a Wilson score confidence interval (p = 0.95).
  
- **Authenticity Multiplier** (0.1 to 1.5):
  - Base: 1.0
  - Each "Fake" flag: -0.05 (min 0.1)
  - Each "Verified" flag: +0.03 (max 1.5)
  - High receipt count (3+): +0.1 bonus
  - External link receipts (verifiable): +0.05 each
  - Net effect: heavily receipted stories climb; flagged-as-fake stories sink

- **Freshness Boost** (1.0 to 1.5):
  - Stories < 24 hours old: 1.5x
  - Stories < 7 days: 1.2x
  - Stories < 30 days: 1.1x
  - Older: 1.0x
  - Decays smoothly (not step function)

- **Severity Weight** (1.0 to 1.25):
  - Community severity votes averaged, mapped to 1.0–1.25
  - Light touch — doesn't dominate, just nudges

#### Leaderboard Views

- **All Time** — the definitive ranking
- **This Week** — what's hot right now
- **This Month** — recent hall of fame
- **By Category** — filter by story type
- **Rising** — stories gaining votes fastest (velocity-based)
- **Most Controversial** — highest total votes with close to 50/50 split

### 3. Voting & Reactions

Each story has these reaction options (one vote per user per story):

- 👆 **Upvote** — "This is horrifying, I believe it"
- 👇 **Downvote** — "Not that scary / bad story"
- 🚩 **Flag as Fake** — "I don't believe this happened" (costs the story points)
- ✅ **Verified** — "I can confirm this / I've seen similar" (boosts the story)
- 💀 **RIP** — "This is the worst one" (counts as upvote + severity boost)

Users can change their vote at any time. Only one reaction type per story per user.

### 4. Comments

- Threaded comments on each story (max 2 levels deep)
- Comments can also be upvoted/downvoted
- Commenters can add additional receipts
- Top comment sorting by default

### 5. User Accounts (Reddit-style Pseudonymous)

**Registration:**
- Username (pseudonym, unique, 3-20 chars, alphanumeric + underscores)
- Email (for account recovery only, never displayed)
- Password (bcrypt hashed, min 8 chars)
- No real name required
- No social login (keeps it simple and pseudonymous)

**Alternative: GitHub OAuth**
- Allow login via GitHub (most OpenClaw users are developers)
- Display GitHub username or allow setting a separate display name
- This provides spam protection (GitHub accounts have some cost to create) without requiring email

**Decision: Support BOTH email+password AND GitHub OAuth.** GitHub is primary (most users are devs), email is fallback.

**User profiles show:**
- Pseudonym
- Join date
- Stories submitted count
- Total HorrorScore earned across stories
- Karma (from comment upvotes)
- Badge(s): "Survivor" (submitted 1+ stories), "Witness" (10+ verified votes), "Skeptic" (10+ fake flags that were validated)

### 6. Anti-Spam & Moderation

- **Rate limiting:** Max 3 story submissions per day per user, max 50 votes per hour
- **New account cooldown:** Must be 1 hour old before submitting stories
- **Receipts required:** Can't submit without at least 1 piece of evidence
- **Community moderation:** Stories with >10 fake flags and <5 verified flags get auto-hidden (still accessible via direct link, marked as "Community Disputed")
- **Report button:** For truly abusive content (hate speech, doxxing, etc.)
- **Admin panel:** Simple admin view to review reported content, ban users, remove stories
- **Turnstile (Cloudflare):** On registration and submission forms to prevent bot abuse

---

## Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **shadcn/ui** — all UI components
- **Lucide React** — icons
- **next-themes** — dark/light mode (default: dark, this is a horror site)

### Tooling
- **Bun** — package manager and script runner (use `bun install`, `bun run dev`, `bunx` instead of npm/npx)
- **Biome** — linting and formatting (NOT eslint/prettier). Set up `biome.json` with sensible defaults for TypeScript/React.

### Testing
- **Vitest** — test runner (configured for React/Next.js with jsdom)
- **MSW (Mock Service Worker)** — API mocking for integration tests
- **Testing Library** — `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- **Red-Green TDD approach:** For every feature:
  1. **RED:** Write a failing test first that describes the expected behavior
  2. **GREEN:** Write the minimum code to make the test pass
  3. **REFACTOR:** Clean up while keeping tests green
  - Do NOT write implementation code before its corresponding test exists
  - Test files live next to source files: `component.tsx` → `component.test.tsx`
  - Convex function tests: `convex/stories.ts` → `convex/stories.test.ts`
  - Run tests after each red→green cycle: `bun run test`

### Quality Verification
- **react-doctor** (https://github.com/millionco/react-doctor) — Run after building components to detect React anti-patterns, unnecessary re-renders, and performance issues:
  ```bash
  bunx react-doctor@latest
  ```
  Fix any issues it flags before moving on.
- The coding agent (Claude Code) should leverage all available React, Next.js, and web development skills/knowledge — component composition patterns, proper use of Server Components vs Client Components, correct data fetching patterns, accessible markup, semantic HTML, proper ARIA attributes, etc.

### Backend
- **Convex** — database, real-time subscriptions, server functions, file storage
- **Convex Auth** — authentication (email+password + GitHub OAuth)
- **Convex File Storage** — for screenshot uploads

### Deployment
- **Vercel** — hosting
- **Cloudflare Turnstile** — bot protection on forms

### Key Convex Patterns

Before writing any Convex code, the agent MUST read:
- `https://docs.convex.dev/llms.txt` — LLM-optimized Convex documentation
- The Convex skill files at `~/.agents/skills/convex/` for best practices

Important Convex conventions:
- Use `query` for reads (these are reactive/real-time by default)
- Use `mutation` for writes
- Use `action` for external API calls
- Schema defined in `convex/schema.ts`
- All functions in `convex/` directory
- Use `v` validators for all function arguments
- Indexes for any field you query/filter by
- Use `ctx.auth.getUserIdentity()` for auth checks

---

## Data Model (Convex Schema)

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    // Convex Auth handles the core user record
    // This extends it with app-specific fields
    username: v.string(),
    displayName: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    karma: v.number(), // accumulated from comment upvotes
    storiesCount: v.number(),
    totalHorrorScore: v.float64(),
    badges: v.array(v.string()),
    createdAt: v.number(),
    isBanned: v.boolean(),
    isAdmin: v.boolean(),
  })
    .index("by_username", ["username"])
    .index("by_karma", ["karma"]),

  stories: defineTable({
    authorId: v.id("users"),
    title: v.string(),
    body: v.string(), // markdown
    category: v.string(),
    severity: v.number(), // 1-5 self-assessment
    incidentDate: v.optional(v.string()),
    openclawVersion: v.optional(v.string()),
    tags: v.array(v.string()),
    
    // Computed / cached scores
    upvotes: v.number(),
    downvotes: v.number(),
    fakeFlags: v.number(),
    verifiedFlags: v.number(),
    ripVotes: v.number(),
    totalVotes: v.number(),
    horrorScore: v.float64(),
    communitySeverity: v.float64(), // avg of severity votes
    
    // Receipts stored as references
    receiptIds: v.array(v.id("receipts")),
    
    // Moderation
    isHidden: v.boolean(), // community disputed
    isRemoved: v.boolean(), // admin removed
    reportCount: v.number(),
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_horrorScore", ["horrorScore"])
    .index("by_createdAt", ["createdAt"])
    .index("by_category", ["category", "horrorScore"])
    .index("by_author", ["authorId", "createdAt"])
    .index("by_reportCount", ["reportCount"]),

  receipts: defineTable({
    storyId: v.id("stories"),
    type: v.union(
      v.literal("screenshot"),
      v.literal("link"),
      v.literal("transcript")
    ),
    // For screenshots
    storageId: v.optional(v.id("_storage")),
    // For links
    url: v.optional(v.string()),
    // For transcripts
    content: v.optional(v.string()),
    caption: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_story", ["storyId"]),

  votes: defineTable({
    userId: v.id("users"),
    storyId: v.id("stories"),
    type: v.union(
      v.literal("upvote"),
      v.literal("downvote"),
      v.literal("fake"),
      v.literal("verified"),
      v.literal("rip")
    ),
    createdAt: v.number(),
  })
    .index("by_user_story", ["userId", "storyId"])
    .index("by_story", ["storyId"])
    .index("by_user", ["userId"]),

  comments: defineTable({
    storyId: v.id("stories"),
    authorId: v.id("users"),
    parentId: v.optional(v.id("comments")), // for threading
    body: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    isRemoved: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_story", ["storyId", "createdAt"])
    .index("by_parent", ["parentId", "createdAt"])
    .index("by_author", ["authorId"]),

  commentVotes: defineTable({
    userId: v.id("users"),
    commentId: v.id("comments"),
    type: v.union(v.literal("upvote"), v.literal("downvote")),
    createdAt: v.number(),
  })
    .index("by_user_comment", ["userId", "commentId"])
    .index("by_comment", ["commentId"]),

  reports: defineTable({
    reporterId: v.id("users"),
    storyId: v.optional(v.id("stories")),
    commentId: v.optional(v.id("comments")),
    reason: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("reviewed"),
      v.literal("actioned")
    ),
    createdAt: v.number(),
  })
    .index("by_status", ["status", "createdAt"]),
});
```

---

## Page Structure

### Pages

1. **`/`** — Landing page / leaderboard (default: "All Time" view)
2. **`/story/[id]`** — Individual story page with full details, receipts, comments
3. **`/submit`** — Story submission form (auth required)
4. **`/category/[slug]`** — Category-filtered leaderboard
5. **`/user/[username]`** — Public user profile
6. **`/auth/login`** — Login (email or GitHub)
7. **`/auth/register`** — Register
8. **`/about`** — What this is, how scoring works, FAQ
9. **`/admin`** — Admin dashboard (auth + admin role required)

### Layout

- **Header:** Logo + tagline ("The worst things OpenClaw has done to real people"), nav (Leaderboard, Submit, About), auth button
- **Footer:** Minimal — links, "Not affiliated with OpenClaw", disclaimer
- **Theme:** Dark by default. Horror-adjacent but not tacky — think GitHub's dark mode meets a well-designed Reddit. Clean typography, ample whitespace, subtle red/orange accent colors for danger.

---

## UI Components Needed (shadcn/ui)

- `Card` — story cards on leaderboard
- `Button` — all actions
- `Badge` — categories, tags, user badges
- `Dialog` — receipt viewer (lightbox for screenshots)
- `Tabs` — leaderboard time filters
- `Textarea` — story body, comments
- `Input` — title, username, etc.
- `Select` — category picker
- `Avatar` — user avatars
- `DropdownMenu` — sort options, user menu
- `Tooltip` — score explanation, vote counts
- `Separator` — visual dividers
- `Skeleton` — loading states
- `Toast` — notifications (vote registered, story submitted, etc.)
- `ScrollArea` — receipt galleries
- `Form` — all forms (react-hook-form integration)

---

## Horror Score Implementation

```typescript
// convex/lib/scoring.ts

// Wilson score lower bound (95% confidence)
function wilsonLowerBound(positive: number, total: number): number {
  if (total === 0) return 0;
  const z = 1.96; // 95% confidence
  const phat = positive / total;
  const denominator = 1 + (z * z) / total;
  const center = phat + (z * z) / (2 * total);
  const spread = z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);
  return (center - spread) / denominator;
}

// Authenticity multiplier based on fake/verified flags and receipts
function authenticityMultiplier(
  fakeFlags: number,
  verifiedFlags: number,
  receiptCount: number,
  hasExternalLinks: boolean
): number {
  let multiplier = 1.0;
  multiplier -= fakeFlags * 0.05;
  multiplier += verifiedFlags * 0.03;
  if (receiptCount >= 3) multiplier += 0.1;
  if (hasExternalLinks) multiplier += 0.05;
  return Math.max(0.1, Math.min(1.5, multiplier));
}

// Freshness boost with smooth decay
function freshnessBoost(createdAt: number): number {
  const ageHours = (Date.now() - createdAt) / (1000 * 60 * 60);
  if (ageHours < 24) return 1.5 - (0.3 * ageHours / 24);
  if (ageHours < 168) return 1.2 - (0.1 * (ageHours - 24) / 144);
  if (ageHours < 720) return 1.1 - (0.1 * (ageHours - 168) / 552);
  return 1.0;
}

// Severity weight (light touch)
function severityWeight(communitySeverity: number): number {
  // communitySeverity is 1-5, map to 1.0-1.25
  return 1.0 + ((communitySeverity - 1) / 4) * 0.25;
}

export function calculateHorrorScore(story: {
  upvotes: number;
  downvotes: number;
  ripVotes: number;
  fakeFlags: number;
  verifiedFlags: number;
  receiptCount: number;
  hasExternalLinks: boolean;
  communitySeverity: number;
  createdAt: number;
}): number {
  const positiveVotes = story.upvotes + story.ripVotes;
  const totalVotes = positiveVotes + story.downvotes;
  
  const wilson = wilsonLowerBound(positiveVotes, totalVotes);
  const authenticity = authenticityMultiplier(
    story.fakeFlags, story.verifiedFlags, 
    story.receiptCount, story.hasExternalLinks
  );
  const freshness = freshnessBoost(story.createdAt);
  const severity = severityWeight(story.communitySeverity);
  
  return wilson * authenticity * freshness * severity;
}
```

---

## Agent Instructions

### Before You Start

1. **Read Convex docs:** Fetch `https://docs.convex.dev/llms.txt` and review it thoroughly before writing any Convex code.
2. **Read Convex skills:** Check `~/.agents/skills/convex/` for best practice skills, especially:
   - `convex-functions` — how to write queries/mutations/actions
   - `convex-schema-validator` — how to define schemas
   - `convex-best-practices` — general patterns
   - `convex-security-check` — security audit checklist
3. **Use sub-agents for parallel research:** Spawn sub-agents to:
   - Research Cloudflare Turnstile integration with Next.js
   - Research Convex Auth setup (email + GitHub OAuth)
   - Research Convex file storage for image uploads
   - Research Wilson score implementation details
   - Review the `get-convex/template-nextjs-convexauth-shadcn` GitHub template as a starting point

### Build Order — Phased Approach (CRITICAL)

**You MUST build this project in small, incremental phases.** Do NOT try to build large pieces at once.

#### How Phases Work

1. **At the very start**, create a `docs/implementation/` directory in the project root.
2. **Write each phase as a separate markdown file** in `docs/implementation/`:
   - `docs/implementation/phase-01-scaffold.md`
   - `docs/implementation/phase-02-auth.md`
   - `docs/implementation/phase-03-story-submission.md`
   - `docs/implementation/phase-04-leaderboard.md`
   - etc.
3. Each phase file should contain:
   - A checklist of tasks (using `- [ ]` checkboxes)
   - Acceptance criteria for each task
   - Dependencies on previous phases
4. **Work through one phase at a time.** For each phase:
   - Read the phase file
   - Use Red-Green TDD for each task
   - Mark tasks as `- [x]` when complete
   - Run all tests (`bun run test`) and verify green
   - Run `bunx react-doctor@latest` if UI components were added
   - When all tasks in the phase are checked off, add `## Status: ✅ COMPLETE` at the top
   - **Clear your context** and move on to the next phase
5. **In each new Ralph loop iteration**, read `docs/implementation/` to find the next incomplete phase and continue from there.
6. Also create `docs/implementation/README.md` as an index that lists all phases with their status.

#### Phase Breakdown

**Phase 1: Project Scaffold** (`phase-01-scaffold.md`)
- Create Next.js app with TypeScript, Tailwind, App Router
- Initialize Convex (`bunx convex dev`)
- Set up shadcn/ui (`bunx shadcn@latest init`)
- Configure Biome (`biome.json`)
- Configure Vitest + Testing Library + MSW
- Install all dependencies
- Set up Convex provider in layout
- Set up next-themes (dark mode default)
- Basic layout shell (header, footer, placeholder pages)
- Create GitHub repo and push
- Verify: app runs, tests run, linting passes

**Phase 2: Database Schema & Auth** (`phase-02-auth.md`)
- Define full Convex schema (all tables, indexes)
- Set up Convex Auth (email+password)
- Add GitHub OAuth provider
- Username selection flow after first login
- Login/register pages with shadcn forms
- Auth state in header (login button / user menu dropdown)
- Tests for auth flows
- Verify: can register, login, see auth state in header

**Phase 3: Story Submission** (`phase-03-story-submission.md`)
- Receipt upload component (image upload to Convex file storage)
- Receipt link input component
- Receipt transcript paste component
- Story submission form (title, body, category, severity, receipts)
- Convex mutations for creating stories + receipts
- Success/error states
- Tests for form validation, submission mutation
- Verify: can submit a story with receipts, data appears in Convex dashboard

**Phase 4: Story Detail Page** (`phase-04-story-detail.md`)
- Story detail page layout
- Markdown rendering (react-markdown + rehype-sanitize)
- Receipt gallery with lightbox (screenshot viewer)
- External link receipts display
- Transcript display (syntax highlighted)
- Author info display
- Date, category, severity display
- Tests for rendering
- Verify: can view a submitted story with all receipt types

**Phase 5: Voting System** (`phase-05-voting.md`)
- Vote buttons component (upvote/downvote/fake/verified/rip)
- Convex mutations for casting/changing votes
- One vote per user per story enforcement
- Vote count display
- Horror Score calculation (implement the algorithm)
- Score recalculation on vote change
- Real-time vote updates via Convex subscriptions
- Tests for scoring algorithm, vote mutations
- Verify: votes work, score updates in real-time

**Phase 6: Leaderboard** (`phase-06-leaderboard.md`)
- Leaderboard page with story cards
- Story card component (title, score, category, vote counts, receipt count, date, author)
- Time filter tabs (All Time, This Week, This Month)
- Category filtering
- Rising view (velocity-based)
- Most Controversial view
- Pagination or infinite scroll
- Tests for filtering/sorting logic
- Verify: leaderboard displays sorted stories, filters work

**Phase 7: Comments** (`phase-07-comments.md`)
- Comment form
- Comment display (threaded, max 2 levels)
- Comment voting (upvote/downvote)
- Comment sorting (top by default)
- Additional receipts in comments
- Convex mutations/queries for comments
- Tests for comment CRUD, threading
- Verify: can comment, reply, vote on comments

**Phase 8: User Profiles & Badges** (`phase-08-profiles.md`)
- User profile page
- Stats display (stories, karma, total horror score)
- User's stories list
- Badges system (Survivor, Witness, Skeptic)
- Badge awarding logic
- Tests for badge criteria
- Verify: profile page shows correct stats and badges

**Phase 9: Moderation** (`phase-09-moderation.md`)
- Report button (stories + comments)
- Auto-hide logic (>10 fake flags, <5 verified → hidden)
- "Community Disputed" label on hidden stories
- Admin panel page (report queue, user management, story removal)
- Admin role checks
- Rate limiting (submissions/day, votes/hour, account age)
- Tests for moderation rules
- Verify: reports work, auto-hide triggers, admin can moderate

**Phase 10: Polish & Deploy** (`phase-10-polish.md`)
- SEO (meta tags, OG images, structured data per story)
- Responsive design pass (mobile-first)
- Loading states (skeletons for all data-fetching components)
- Error boundaries
- 404 page (horror-themed)
- About page content
- Seed 3-5 stories from public sources
- Cloudflare Turnstile on registration + submission forms
- Final react-doctor check
- Full test suite green
- Vercel deployment
- Verify: deployed, all features work in production

### Design Guidelines

- **Dark mode default** — this is a horror leaderboard
- Color palette: Dark grays (#0a0a0a, #1a1a1a, #2a2a2a), with red/orange accents (#ef4444, #f97316) for danger/horror elements
- Clean, readable typography — this is content-heavy
- Cards for stories on the leaderboard — show title, category badge, score, vote counts, receipt count, date, author
- The score should be prominently displayed (large number, left side of card, like Reddit)
- Receipt thumbnails visible on story cards (shows this is evidence-backed)
- Smooth animations on vote interactions
- Mobile: single-column, swipeable receipt gallery
- Don't make it look like a joke site — it should feel credible, like a well-designed community platform

### Security Considerations

- Sanitize all user input (markdown rendering — use a safe renderer like `react-markdown` with `rehype-sanitize`)
- Validate file uploads server-side (check MIME types, max sizes)
- Rate limit all mutations in Convex (check timestamps of recent actions)
- Auth checks on all protected mutations
- Admin role verification on admin-only endpoints
- No PII displayed — usernames only
- Image uploads: strip EXIF data before storage (or note this as a known limitation)
- CSP headers via Next.js config
- CORS: Convex handles this, but verify

### Testing Checklist

After building, verify:
- [ ] Can register with email+password
- [ ] Can register with GitHub
- [ ] Can submit a story with screenshots
- [ ] Can submit a story with external links
- [ ] Can submit a story with transcript
- [ ] Voting works and updates score in real-time
- [ ] Leaderboard sorts correctly by HorrorScore
- [ ] Time-filtered views work (week/month/all-time)
- [ ] Category filtering works
- [ ] Comments work (create, reply, vote)
- [ ] User profile shows correct stats
- [ ] Flagging as fake reduces story score
- [ ] Stories auto-hide when heavily flagged
- [ ] Rate limiting prevents spam
- [ ] Mobile layout works
- [ ] Dark/light mode toggle works
- [ ] Image lightbox works for receipts
- [ ] Admin can review reports and moderate

---

## Content for Launch

### About Page Content

```markdown
# What is this?

OpenClaw Horror Stories is a community-driven leaderboard of the worst things 
OpenClaw AI agents have done to real people.

OpenClaw (formerly Clawdbot/Moltbot) is a powerful open-source AI agent that 
can control your computer, send messages, manage files, and more. Sometimes 
it goes terribly wrong.

## How it works

1. **Submit your story** with evidence (screenshots, logs, links)
2. **The community votes** on how horrifying it is
3. **Stories are ranked** using the Horror Score™ algorithm
4. **The worst incidents** rise to the top

## The Horror Score™

Stories are ranked by a composite score that considers:
- **Community votes** (upvotes vs downvotes, using Wilson score for fairness)
- **Authenticity** (verified stories score higher, flagged-as-fake stories sink)
- **Evidence quality** (more receipts = more credibility)
- **Freshness** (recent stories get a small boost)
- **Severity** (community-assessed impact)

## Rules

- **Receipts required.** Every story needs at least one piece of evidence.
- **No doxxing.** Don't share personal information of others.
- **No fabrication.** If your story is fake and gets flagged, it sinks.
- **Be specific.** What happened, when, what version, what went wrong.
- **One story per incident.** Don't split one event into multiple posts.

## Not affiliated with OpenClaw

This site is an independent community project. We are not affiliated with, 
endorsed by, or connected to OpenClaw, Peter Steinberger, or any related entity.
```

### Seed Stories (for launch)

Pre-populate with 3-5 well-documented stories from public sources:
1. The WIRED phishing incident (link to article as receipt)
2. The GitHub smear campaign (CyberNews article)
3. The config theft/infostealer incident (SecurityAffairs)
4. The $CLAWD crypto scam (Astrix Security)
5. The prompt injection in skill library (Reddit)

These serve as examples of what good submissions look like.

---

## Project Location

**Working directory:** `~/code/bhekanik/openclaw-horror-leaderboard`

All coding projects live in `~/code/bhekanik/`. Create this directory and work entirely within it.

## Setup Steps (Agent Must Do These)

### 1. GitHub OAuth App (via `gh` CLI)

The `gh` CLI is authenticated as `bhekanik`. Create the OAuth App programmatically:

```bash
# After Convex is initialized and you have the deployment URL:
gh api -X POST /user/apps \
  --field name="OpenClaw Horror Stories" \
  --field url="https://openclawhorror.com" \
  --field callback_url="https://<convex-deployment>.convex.site/api/auth/callback/github"
```

If the REST API doesn't support OAuth app creation directly, use:
```bash
# Create via GitHub UI automation or ask the user to create at:
# https://github.com/settings/developers → New OAuth App
```

Store the resulting `client_id` and `client_secret` as Convex environment variables:
```bash
bunx convex env set AUTH_GITHUB_ID <client_id>
bunx convex env set AUTH_GITHUB_SECRET <client_secret>
```

### 2. Convex Project Init

```bash
cd ~/code/bhekanik/openclaw-horror-leaderboard
bunx convex dev  # This will create the project and configure deployment
```

The user is already authenticated with Convex CLI. This should work without browser login.

### 3. Vercel Deployment

Deploy to Vercel from the project directory. The user has Vercel CLI available:
```bash
bunx vercel --prod
```

Or link to a Vercel project first:
```bash
bunx vercel link
bunx vercel deploy --prod
```

### 4. GitHub Repo

Create a repo under bhekanik:
```bash
gh repo create bhekanik/openclaw-horror-leaderboard --public --source=. --push
```

## Environment Variables Needed

```env
# Convex (auto-configured by `bunx convex dev`)
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Convex Auth (set via `bunx convex env set`)
AUTH_SECRET=              # generate with `openssl rand -base64 32`
AUTH_GITHUB_ID=           # from GitHub OAuth App
AUTH_GITHUB_SECRET=       # from GitHub OAuth App

# Cloudflare Turnstile (can be added post-MVP)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Optional
NEXT_PUBLIC_SITE_URL=https://openclawhorror.com
```

---

## File Structure

```
openclaw-horror-leaderboard/
├── app/
│   ├── layout.tsx              # Root layout, providers, theme
│   ├── page.tsx                # Leaderboard (home)
│   ├── about/page.tsx          # About page
│   ├── submit/page.tsx         # Story submission
│   ├── story/[id]/page.tsx     # Story detail
│   ├── category/[slug]/page.tsx # Category view
│   ├── user/[username]/page.tsx # User profile
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn components
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── theme-provider.tsx
│   ├── stories/
│   │   ├── story-card.tsx      # Leaderboard card
│   │   ├── story-detail.tsx    # Full story view
│   │   ├── story-form.tsx      # Submission form
│   │   ├── receipt-gallery.tsx # Evidence viewer
│   │   ├── receipt-upload.tsx  # File upload component
│   │   └── vote-buttons.tsx    # Voting interface
│   ├── comments/
│   │   ├── comment-thread.tsx
│   │   ├── comment-form.tsx
│   │   └── comment-vote.tsx
│   ├── leaderboard/
│   │   ├── leaderboard-view.tsx
│   │   ├── leaderboard-filters.tsx
│   │   └── score-display.tsx
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── user-menu.tsx
│   └── admin/
│       ├── report-queue.tsx
│       └── user-management.tsx
├── convex/
│   ├── schema.ts               # Database schema
│   ├── auth.ts                 # Auth config
│   ├── stories.ts              # Story CRUD + queries
│   ├── votes.ts                # Voting mutations
│   ├── comments.ts             # Comment CRUD
│   ├── users.ts                # User profile queries
│   ├── reports.ts              # Report system
│   ├── admin.ts                # Admin mutations
│   ├── lib/
│   │   └── scoring.ts          # Horror Score calculation
│   ├── crons.ts                # Scheduled tasks (score recalc)
│   └── http.ts                 # HTTP actions if needed
├── lib/
│   └── utils.ts                # Utility functions
├── public/
│   ├── og-image.png            # OG social image
│   └── favicon.ico
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── convex.json
└── package.json
```

---

## Stretch Goals (Post-MVP)

- **RSS feed** of new stories
- **Weekly email digest** of top stories
- **Embeddable widgets** ("Top 5 Horror Stories" for blogs)
- **API** for third-party integrations
- **Story of the Week** featured banner
- **"Aftermath" updates** — what happened after the incident
- **AI-generated severity analysis** — have an LLM assess the incident severity
- **Timeline view** — incidents plotted chronologically
- **Stats dashboard** — incidents by category, trend lines, etc.
- **Share buttons** with pre-formatted text for Twitter/Reddit
- **Dark humor 404 page** — "Looks like OpenClaw deleted this page too"
