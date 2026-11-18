# Movora current study contract

Instrument: movie-questionnaire-v3-wordtask.

Flow: General Instruction → Task I (12 scrambled-sentence items) → Task II (movie-task instructions) → six sequential movie pairs → Task III (affect grid, four three-item scale pages, two manipulation checks, demographics and final ratings) → confirmed cloud submission → completion code.

Conditions: equal-probability busy (time scarcity) or control (neutral). Both use the wording, fixed item order and five-word groups in research/word-paragraphs.json → wordTask. Each answer must use four provided words. Semantic correctness is not automatically scored. New answers use wordPuzzle; activities is legacy data only.

Six genre order, title-to-poster assignment and left/right positions are independently randomized and recorded. Watch toggles selection; Next confirms one choice per genre. Long title = 1; short title = 0. No timer, sidebar or banner.

Question wording and anchors: research/word-paragraphs.json → questions. Current IDs: q1–q12, mc_time_pressed, mc_time_constricted, q15–q16. Historical q13 and q14 are not administered. Affect grid: arousal and pleasantness each 1–9, with 5 indicating no change.

Cloud: Supabase anonymous authentication, owner-scoped RLS, incremental drafts and server-confirmed completion. reCAPTCHA v3 score is obtained through the verification function. Local HTTP preview bypasses CAPTCHA and has no score. Preview can be repeated; valid Connect URL entries are constrained by participant ID. Reload resumes the current session; ordinary closed-tab preview reentry starts a new session. Browser tab restoration may preserve session storage.

Recorded data include version, condition, assigned stimuli and titles, choices, word responses, ratings, demographics, local/UTC dates, environment, progress, duration and task timings. Historical response fields remain available under their original meanings. Latest local database migration: supabase/011_word_task.sql. Local files do not establish the state of the deployed site or live database.

Stimulus version two-movies-two-titles-v2: each genre has two distinct movie IDs (e.g. 1a, 1b); each movie has its own long title, short title and fixed poster. Exactly one movie per pair receives the long title; the other receives the short title. Movie IDs never encode title length. Records explicitly store movieId, posterId, titleId, titleLength and longTitle. New preview namespace avoids resuming obsolete assignments; existing formal assignments are blocked from switching versions.
