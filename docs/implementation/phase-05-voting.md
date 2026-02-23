## Status: COMPLETE

# Phase 5: Voting System

## Dependencies
- Phase 4 complete (stories can be viewed)

## Tasks

- [x] Implement Horror Score calculation (`convex/lib/scoring.ts`):
  - [x] Wilson score lower bound function
  - [x] Authenticity multiplier function
  - [x] Freshness boost function (smooth decay)
  - [x] Severity weight function
  - [x] Main `calculateHorrorScore` function
- [x] Build vote buttons component (5 vote types with icons):
  - [x] Upvote, Downvote, Fake, Verified, RIP
  - [x] Visual feedback for selected vote (data-active)
  - [x] Disabled state for unauthenticated users
  - [x] Vote counts display
- [x] Create Convex mutations:
  - [x] `votes.cast` — cast/change/remove vote (toggle behavior)
  - [x] Score recalculation on vote change
- [x] Create Convex queries:
  - [x] `votes.getUserVote` — get current user's vote
- [x] Write tests:
  - [x] Wilson score: no votes, better ratio, more votes, bounds (4 tests)
  - [x] Authenticity multiplier: neutral, fake/verified flags, clamping, receipts, links (7 tests)
  - [x] Freshness boost: new, old, smooth decay (3 tests)
  - [x] Severity weight: min/max/intermediate (3 tests)
  - [x] Full Horror Score: zero votes, positive score, flagged comparison (3 tests)
  - [x] Vote buttons: render, counts, active state, mutation call, disabled (5 tests)
- [x] All 89 tests pass green (18 test files)

## Acceptance Criteria
- [x] All 5 vote types work (upvote/downvote/fake/verified/rip)
- [x] One vote per user per story with toggle behavior
- [x] Horror Score calculates correctly per formula
- [x] Score recalculates on vote change
- [x] Unauthenticated users cannot vote
- [x] All 89 tests pass green
