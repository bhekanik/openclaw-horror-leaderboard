## Status: COMPLETE

# Phase 4: Story Detail Page

## Dependencies
- Phase 3 complete (stories can be submitted)

## Tasks

- [x] Build story detail component with all metadata display
- [x] Markdown rendering with `react-markdown` + `rehype-sanitize` + `remark-gfm`
- [x] Receipt display:
  - [x] External link receipts (clickable with external link icon)
  - [x] Transcript display (monospace code block)
  - [x] Screenshot display (placeholder — requires file storage URLs)
- [x] Author info display (username, link to profile)
- [x] Story metadata (date, category badge, severity, version, tags)
- [x] Convex queries:
  - [x] `stories.getById` — fetch story by ID
  - [x] `receipts.getByStory` — fetch receipts for a story
  - [x] `receipts.getUrl` — get storage URL for screenshots
  - [x] `users.getById` — fetch user by ID
- [x] Story detail page (`/story/[id]`) with loading skeleton and 404 handling
- [x] Write tests:
  - [x] Story detail renders title, body, metadata (8 tests)
- [x] All 64 tests pass green (16 test files)

## Acceptance Criteria
- [x] Story detail renders title, markdown body, metadata, receipts
- [x] Markdown renders safely with XSS protection
- [x] Link and transcript receipts display properly
- [x] Loading skeleton and 404 states work
- [x] All 64 tests pass green
