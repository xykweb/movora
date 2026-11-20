# Movora — editing guide

## Where to edit
- Questionnaire item wording and anchors: research/word-paragraphs.json → questions → stable id (q1, q2, q3…). Change text, low and high. Do not rename IDs.
- General and movie-task instruction paragraphs: research/word-paragraphs.json → paragraphs. Current selection still uses paragraph prefixes; ask for a matching code update if changing a paragraph's opening words.
- Current advertisement instruction and condition assets: research/word-paragraphs.json → advertisementInstructions and advertisements. Word-task content is retired.
- Movie titles and genres: assets/dramas.xlsx (Genre / ItemNumber / Long Title / Short Title). Each row is a distinct movie; a/b identifies the movie, not title length. Blank Genre cells inherit the preceding genre. Original posters are assets/Poster/<ItemNumber>.jpeg; runtime optimized copies are assets/poster-web/<ItemNumber>.webp. Regenerate optimized copies when replacing posters.
- Page headings, button labels, public configuration and behavior: app.js.
- Visual styles: study.css.

There is one current questionnaire source: research/word-paragraphs.json. app.js no longer overrides Q2/Q3 and has no embedded legacy questionnaire or movie-title snapshot. assets/指导语.docx was removed because it was obsolete. Supabase SQL migration files describe historical database upgrades; they are not runtime questionnaire sources.

## Preview and publishing
Double-click 启动网站.command to open a local HTTP preview. Directly opening index.html with file:// is no longer supported: browsers block JSON/Excel reads and the duplicated fallback has been removed to prevent stale stimuli.

Upload index.html, app.js, study.css, research/word-paragraphs.json, assets/ and vendor/ as applicable. After editing questionnaire JSON, upload that JSON; no JavaScript edit is needed for text/anchor changes with unchanged IDs. A loaded page must be reloaded to read new content. Ongoing response stimulus assignments are preserved across reloads.

Supabase functions and SQL remain in supabase/ and run separately on the server. Do not upload secrets. The dictionary must be synchronized when question wording or coding changes. Do not edit old migration scripts to change the running website.

## Current database upgrade
Apply supabase/018_advertisement_cleanup.sql after 017 in the Supabase web SQL Editor. It strengthens advertisement/version validation and labels retired fields in the dictionary. Older migrations preserve upgrade history; do not rerun them after the latest migration. No local SQL file proves the live database was updated.

Upload app.js, index.html, study.css, research/word-paragraphs.json and the four condition advertisement/banner PNGs. The runtime has no word-task content, handlers, answer keys, timers or styles. Export columns for historical responses remain for interpretation; they are not administered in the advertisement instrument. Export SQL Editor query results as CSV if Table Editor selected-row export fails.

Short-drama wording release: current instrument short-drama-questionnaire-v7-advertisement; apply 019 after 018. Upload app.js, index.html and research/word-paragraphs.json. Internal movieId and historical column names remain stable; current wording is short drama(s).
