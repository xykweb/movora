# Movora current study contract

Instrument: movie-questionnaire-v4-wordtask9.

Flow: General Instruction → Task I (nine scrambled-sentence items) → Task II (movie-task instructions) → six sequential movie pairs → Task III (affect grid, four three-item scale pages, demographics and final ratings) → confirmed cloud submission → completion code.

Conditions: equal-probability busy (time scarcity) or control (neutral). Both use the wording, fixed item order and five-word groups in research/word-paragraphs.json → wordTask. Each answer must use four provided words. Semantic correctness is not automatically scored. New answers use wordPuzzle; activities is legacy data only.

Six genre order, title-to-poster assignment and left/right positions are independently randomized and recorded. Watch toggles selection; Next confirms one choice per genre. Long title = 1; short title = 0. No timer, sidebar or banner.

Question wording and anchors: research/word-paragraphs.json → questions. Current IDs: q1–q12, q15–q16. Historical q13 and q14 are not administered. Affect grid: arousal and pleasantness each 1–9, with 5 indicating no change.

Cloud: Supabase anonymous authentication, owner-scoped RLS, incremental drafts and server-confirmed completion. reCAPTCHA v3 score is obtained through the verification function. Local HTTP preview bypasses CAPTCHA and has no score. Preview can be repeated; valid Connect URL entries are constrained by participant ID. Reload resumes the current session; ordinary closed-tab preview reentry starts a new session. Browser tab restoration may preserve session storage.

Recorded data include version, condition, assigned stimuli and titles, choices, word responses, ratings, demographics, local/UTC dates, environment, progress, duration and task timings. Historical response fields remain available under their original meanings. Latest local database migration: supabase/013_task9_no_manipulation_check.sql. Local files do not establish the state of the deployed site or live database.

Stimulus version two-movies-two-titles-v2: each genre has two distinct movie IDs (e.g. 1a, 1b); each movie has its own long title, short title and fixed poster. Exactly one movie per pair receives the long title; the other receives the short title. Movie IDs never encode title length. Records explicitly store movieId, posterId, titleId, titleLength and longTitle. New preview namespace avoids resuming obsolete assignments; existing formal assignments are blocked from switching versions.

Task III begins with a separate introduction page and Okay, I got it. button, followed by the affect grid. Task I displays nine items numbered 1–9 but preserves source IDs 1,2,4,5,6,8,9,10,12 in records. Source items 3,7,11 and both v3 manipulation checks are retired; their export columns remain for historical interpretation.

Task I interaction: ordered clicks on four of five words; clicking a selected word removes it. Stores ordered word indices under wordPuzzle.selections, joined answer text under wordPuzzle.answers, interactionMode ordered-word-clicks, and word_selection_change events. Source item IDs and export columns unchanged; 013 submission validation remains applicable.

Task I now has ten screens: introduction/example with Start, followed by nine single-item screens. Four selected words trigger a 1000 ms delay; deselection cancels the timer. Confirmation events and confirmedItems record progression. Completion is based on selecting four supplied words; semantic sentence correctness is not automatically graded.

Current instrument movie-questionnaire-v5-wordtask12-correct: all 12 original items restored, introduction plus 12 item screens. Correct ordered answer required; Correct! displayed for 1000 ms before automatic advance. Accepted alternatives are explicit in wordTask.items[].acceptedAnswers. Latest migration 014_wordtask12_correct.sql validates correct answers server-side.
