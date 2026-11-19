# Local code audit — 2026-11-19

Reviewed runtime flow, word answer keys, click progression, timing, movie mapping/coding, questionnaire IDs, incremental/final saving, CAPTCHA verification function and SQL export/validation definitions.

Fixed: conflicting movie double-click handler; progress formula missing word-task completion; unreadable server-response diagnostics; explicit draft retry after failed final submission. Added per-item accumulated timing, errors and help export columns. Existing historical records are preserved.

Timing: Word_Task_N_Seconds = accumulated running-page time to the latest correct selection, including retries and help, excluding automatic advance delay. Visible_Seconds excludes background-tab time. Elapsed_Seconds continues through confirmation, including the automatic delay. Refresh retains cumulative values; closed-page time is excluded. Old records without measurements remain NULL. Raw timing includes startedAt, correctAt and confirmedAt.

Verification: JavaScript syntax; mocked 12-item runs in both conditions, incorrect-answer rejection, two-error help trigger, answer-hint logging, correct feedback, auto-transition and timing records; 12 scalar response-time export columns present.

External checks not performed: actual browser layout and fullscreen behavior, deployed function secrets, live RLS and trigger definitions, live migration execution, actual CAPTCHA score receipt and real network performance. SQL migration 015 must be applied after 014. Local checks cannot prove live data collection.

Known operational limits: closing a browser cannot guarantee the final keepalive request arrives; regular drafts and heartbeat remain primary. Concurrent tabs have no exclusive response lock. Network failures preserve local answers, but do not guarantee server receipt. Existing database selected-row export limitations require SQL Editor result export. Do not treat these as tested remote guarantees.
