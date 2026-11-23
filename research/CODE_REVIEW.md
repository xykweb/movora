# Movora launch review — 2026-11-24

Status: local regression passed; deployed release not yet approved for paid recruitment.

Observed deployment blocker: the public page loaded build 20261122-wording-35 and displayed “This study version has been retired” during the browser inspection. Local release is 20261122-launch-audit-38. Uploading the corrected release and a new online submission are required before recruitment.

Changed: app.js adds bounded retries only for idempotent response REST operations, a same-response Web Lock, readonly Connect identity, assignment-link consistency checking, stale-image callback guards, and raw buildVersion. index.html updates the cache tag. No questionnaire wording or existing export variables changed.

Database: 031_launch_hardening.sql is non-destructive. It validates six assignments/choices and long-title coding, advertisement consistency, answer completeness, age/income/work hours, and trusted verification for Connect completion. The trigger uses SECURITY DEFINER with fixed search_path so participants need not read the private CAPTCHA table. RLS continues to scope response rows to their owner. No score threshold is imposed; the preregistered threshold remains an analysis rule.

Actual local browser checks with intercepted/mock Supabase writes: entry, four ad scales, refresh recovery, repeated ad, six pairs, repeat-click deselection, disabled Next with no choice, required affect, 12 mediator items, final ratings, zero income/work hours, final refresh recovery, successful completion code A3FF37C5D0. Lost final acknowledgement was simulated and retried successfully. At 1440px DOM geometry showed no poster/detail overlap, no document horizontal overflow and zero gap between header and banner. This is not a Windows/Safari/Firefox test.

Actual isolated PostgreSQL-compatible execution: all 31 migration files (001–031, with no 010 file) were executed locally, not remotely. Draft/final/idempotent writes passed. Invalid choice, counterbalance, banner, affect, rating and work-hour records were rejected. Unverified Connect completion and duplicate Connect ID were rejected. Authenticated-owner completion with a private trusted-score row passed. Other-owner access and participant reads of research exports were rejected. All 68 export columns and corresponding data values were checked. No production rows were deleted by this audit.

Release steps:
1. Apply 031 in Supabase SQL Editor after the existing 030 setup. Do not rerun 030: it clears previews.
2. Upload app.js and index.html. Ensure current JSON, CSS, workbook, 12 WebP posters and four condition images are already deployed.
3. Confirm public index references 20261122-launch-audit-38.
4. Run an online preview to completion; inspect Finished, Progress, current instrument, four ad ratings, six choices/codes, affect 1–9, demographics, trusted score and completion code.
5. Verify the genuine Connect test URL supplies participantId, assignmentId and projectId and that manual completion code A3FF37C5D0 is configured in Connect. A fictitious parameter test does not prove Connect-side completion.
6. Check the SQL preflight output, policy expressions, unique index, private views and current 68-column dictionary. Share the returned result for review.

Unverified: actual deployed database/function/permissions after 031, latest online end-to-end save, genuine Connect completion recognition, target-region networking, other browsers, concurrent participant load and quota/project health. CAPTCHA was intentionally not solved by the agent. Closing a browser can lose its last unsynced edits; regular drafts are primary. Web Locks require browser support. Client URL IDs are classification, not server verification of Connect identity.
