# Phase 9: Moderation

## Status: COMPLETE

## Dependencies
- Phase 8 complete (profiles, badges)

## Tasks

- [x] Build report button component (stories + comments):
  - [x] Report reason selection (inline dropdown)
  - [x] Submit report with reason (4 tests)
- [x] Implement auto-hide logic:
  - [x] `shouldAutoHide` pure function (>10 fake flags AND <5 verified flags)
  - [x] 5 tests for threshold logic
- [x] Build admin panel (`/admin`):
  - [x] Auth + admin role guard
  - [x] Report queue (pending reports)
  - [x] Review report (dismiss/action)
  - [x] Stats display (pending report count)
  - [x] Access denied for non-admin users (4 tests)
- [x] Create Convex mutations:
  - [x] `reports.create` — file a report (with duplicate prevention)
  - [x] `admin.reviewReport` — mark report reviewed/actioned
  - [x] `admin.removeStory` — admin remove story
  - [x] `admin.restoreStory` — admin restore story
  - [x] `admin.banUser` — ban a user
  - [x] `admin.unbanUser` — unban a user
- [x] Create Convex queries:
  - [x] `reports.listPending` — pending reports for admin
  - [x] `admin.getStats` — moderation stats
- [x] Write tests:
  - [x] Report button renders and submits (4 tests)
  - [x] Auto-hide triggers at correct thresholds (5 tests)
  - [x] Admin-only access enforced (4 tests)

## Acceptance Criteria
- [x] Report button works on stories
- [x] Auto-hide logic tested and correct
- [x] Admin panel with auth guard
- [x] Non-admin users see access denied
- [x] All tests pass green (152 tests, 31 files)

## Notes
- Rate limiting deferred to production environment (Convex has built-in rate limiting at the platform level)
- Admin actions (ban/unban, remove/restore) have backend mutations ready, admin panel UI for these can be extended in Phase 10
