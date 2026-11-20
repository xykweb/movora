# Current release — 2026-11-20

Current instrument: movie-questionnaire-v6-advertisement. Instruction uses condition advertisement and the matching movie-page banner. See STUDY.md for current flow. Runtime word-task code, content and styles are removed. Old response snapshots are not deleted or relabeled.

Apply migration 018 after 017. Historical SQL files are upgrade history, not current frontend sources. Historical word-task validation applies only to historical instrument versions; v6 uses its own advertisement checks. Dictionary retired fields are explicitly marked legacy. No remote database mutation or browser deployment was performed here.
