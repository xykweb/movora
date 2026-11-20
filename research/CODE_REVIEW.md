# Current local code review — 2026-11-20

Removed retired word-task styles and outdated setup instructions. Runtime JavaScript and JSON contain no word-task data, helpers, countdowns, answer keys, input handlers or task-stage rendering. Current flow is General Instruction → advertisement Instruction → six movie pairs with matching banner → Experience Survey.

Additional guards: movies require an advertisement entry click; poster controls wait for both poster and condition banner decoding. Migration 018 validates condition-specific advertisement paths and timestamps, demographics and affect coordinates for completed v6 responses, while preserving historical validation/data.

Local evidence: JavaScript syntax, content/assets presence, both-condition advertisement transitions and current runtime absence checks. Live SQL execution, browser appearance, actual RLS and real network performance remain external checks.

Retained deliberately: historical SQL migrations and old export fields, including Word_Task columns, retain meanings for old responses. They are not active tasks. Closed-tab keepalive remains best effort; concurrent tabs have no exclusive response lock.
