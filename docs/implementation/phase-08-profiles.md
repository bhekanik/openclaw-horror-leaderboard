# Phase 8: User Profiles & Badges

## Status: COMPLETE

## Dependencies
- Phase 7 complete (comments, karma from comment votes)

## Tasks

- [x] Build user profile page (`/user/[username]`):
  - [x] Username and avatar display
  - [x] Join date
  - [x] Stats: stories submitted count, total Horror Score, karma
  - [x] Badges display
  - [x] List of user's submitted stories
- [x] Implement badge system:
  - [x] "Survivor" — submitted 1+ stories
  - [x] "Witness" — cast 10+ verified votes
  - [x] "Skeptic" — cast 10+ fake flags
- [x] Create badge awarding logic:
  - [x] `checkBadges` pure function with criteria checking (8 tests)
  - [x] Badge display on user profile
- [x] Create Convex queries:
  - [x] `users.getByUsername` — fetch user profile with safe field projection
  - [x] `stories.listByAuthor` — fetch user's stories
- [x] Build profile page with loading/404 states
- [x] Write tests:
  - [x] Profile component renders user info (6 tests)
  - [x] Profile page renders, 404, loading (3 tests)
  - [x] Badge criteria tests (8 tests)

## Acceptance Criteria
- [x] User profile page shows correct stats and badges
- [x] Badge criteria logic is tested and correct
- [x] User's stories list is visible on profile
- [x] 404 for non-existent username
- [x] All tests pass green (139 tests, 28 files)
