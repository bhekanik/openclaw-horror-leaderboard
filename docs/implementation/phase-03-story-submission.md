## Status: COMPLETE

# Phase 3: Story Submission

## Dependencies
- Phase 2 complete (auth, schema deployed)

## Tasks

- [x] Build receipt link input component (URL input, add/remove, display list)
- [x] Build receipt transcript paste component (textarea, character count)
- [x] Build story submission form (`/submit` page):
  - [x] Title input (required, max 200 chars, character count)
  - [x] Body textarea (required, markdown, max 10,000 chars)
  - [x] Category selection (grid of clickable options with emojis)
  - [x] Severity slider (1-5 with labels)
  - [x] Incident date picker (optional)
  - [x] OpenClaw version input (optional)
  - [x] Tags input (comma-separated, max 5)
  - [x] Receipt section with tabs (Screenshots placeholder, Links, Transcript)
- [x] Create Convex mutations:
  - [x] `stories.create` — create story + receipts with validation
  - [x] `stories.generateUploadUrl` — for file uploads
  - [x] `stories.getById` — fetch single story
- [x] Auth guard — Unauthenticated shows "Sign In Required" with link
- [x] Success state (redirect to story page via router.push)
- [x] Error handling and display
- [x] Screenshot upload placeholder (noted as "coming soon")
- [x] Write tests:
  - [x] Receipt link input: renders, adds URLs, displays links, removes links (4 tests)
  - [x] Receipt transcript input: renders, onChange, character count (3 tests)
  - [x] Story form: renders all fields, validation, receipt tabs, submit button (8 tests)
  - [x] Submit page: auth guard, story form render (2 tests)
- [x] All 56 tests pass green (15 test files)
- [x] Biome passes

## Acceptance Criteria
- [x] Story form renders all required and optional fields
- [x] At least one receipt is required (link or transcript)
- [x] Form validates inputs correctly with error messages
- [x] Auth guard redirects unauthenticated users
- [x] All 56 tests pass green
- [x] Biome passes
