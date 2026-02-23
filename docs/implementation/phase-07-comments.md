# Phase 7: Comments

## Status: COMPLETE

## Dependencies
- Phase 6 complete (leaderboard, story cards)

## Tasks

- [x] Build comment form component:
  - [x] Textarea for comment body
  - [x] Submit button
  - [x] Disabled when empty
  - [x] Reply form (appears inline when clicking reply)
- [x] Build comment display component:
  - [x] Author, date, body
  - [x] Threading (max 2 levels deep)
  - [x] Reply button (hidden at max depth)
  - [x] Comment vote buttons (upvote/downvote)
  - [x] Vote count display
- [x] Build comment thread component:
  - [x] Top-level comments with nested replies
  - [x] Comment count header
  - [x] Empty state
  - [x] Loading state
- [x] Create Convex mutations:
  - [x] `comments.create` — create comment (top-level or reply), validates body length, story existence, max depth
  - [x] `commentVotes.cast` — vote on a comment (toggle behavior like story votes)
- [x] Create Convex queries:
  - [x] `comments.getByStory` — get comments with threading (enriched with author username, sorted by net votes)
  - [x] `commentVotes.getUserVotes` — get user's votes on comments
- [x] Integrate comments into story detail page
- [x] Write tests:
  - [x] Comment form renders and validates (5 tests)
  - [x] Comment displays author, date, body (7 tests)
  - [x] Threading renders correctly (parent -> child)
  - [x] Max 2 levels deep enforced
  - [x] Reply form appears inline
  - [x] Comment thread renders, empty/loading states (5 tests)

## Acceptance Criteria
- [x] Can create top-level comments on stories
- [x] Can reply to comments (max 2 levels)
- [x] Comment voting (upvote/downvote) works
- [x] Comments sorted by top (most upvoted) by default
- [x] All tests pass green (122 tests, 25 files)
