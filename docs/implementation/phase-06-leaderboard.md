# Phase 6: Leaderboard

## Status: COMPLETE

## Dependencies
- Phase 5 complete (voting and scoring work)

## Tasks

- [x] Build story card component for leaderboard:
  - [x] Horror Score display (large, prominent, left side)
  - [x] Title (linked to story page)
  - [x] Category badge
  - [x] Vote counts (upvotes)
  - [x] Receipt count indicator
  - [x] Author and date
- [x] Build leaderboard page (`/`):
  - [x] Story cards list
  - [x] Time filter tabs (All Time, This Week, This Month)
  - [x] Most Controversial view (sort option in dropdown)
- [x] Build category filtered view (`/category/[slug]`):
  - [x] Same layout as main leaderboard
  - [x] Filtered by category
  - [x] Category header with emoji and name
- [x] Build leaderboard filters component:
  - [x] Sort options dropdown (Top Scored, Most Recent, Controversial)
- [x] Create Convex queries:
  - [x] `stories.list` — sorted by horrorScore (default), supports timeRange, category, sortBy, limit
- [x] Empty state for no stories
- [x] Write tests:
  - [x] Story card renders all required info (6 tests)
  - [x] Leaderboard renders list of story cards
  - [x] Time filter tabs render
  - [x] Category page renders with header
  - [x] Sort filter renders and calls callback
  - [x] Empty state renders when no stories
  - [x] Loading state renders skeleton

## Acceptance Criteria
- [x] Leaderboard displays stories sorted by Horror Score
- [x] All time filter views work (All Time, This Week, This Month)
- [x] Category filtering works
- [x] Controversial sort option available
- [x] Story cards show all required information
- [x] All tests pass green (105 tests, 22 files)

## Notes
- Combined multiple query variants into single `stories.list` query with filter args (simpler API, Convex handles filtering)
- Used native `<select>` for sort dropdown (better testability in jsdom vs Radix Select)
- Pagination deferred to Phase 10 (polish) — current `limit` param supports it when needed
