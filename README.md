# Movora — editing guide

## Where to edit
- Questionnaire item wording and anchors: research/word-paragraphs.json → questions → stable id (q1, q2, q3…). Change text, low and high. Do not rename IDs.
- Instruction paragraphs and manipulation wording: research/word-paragraphs.json → paragraphs. Current selection still uses paragraph prefixes; ask for a matching code update if changing a paragraph's opening words.
- Movie titles and genres: assets/dramas.xlsx (Genre / ItemNumber / Title; a=long, b=short).
- Page headings, button labels, public configuration and behavior: app.js.
- Visual styles: study.css.

There is one current questionnaire source: research/word-paragraphs.json. app.js no longer overrides Q2/Q3 and has no embedded legacy questionnaire or movie-title snapshot. assets/指导语.docx was removed because it was obsolete. Supabase SQL migration files describe historical database upgrades; they are not runtime questionnaire sources.

## Preview and publishing
Double-click 启动网站.command to open a local HTTP preview. Directly opening index.html with file:// is no longer supported: browsers block JSON/Excel reads and the duplicated fallback has been removed to prevent stale stimuli.

Upload index.html, app.js, study.css, research/word-paragraphs.json, assets/ and vendor/ as applicable. After editing questionnaire JSON, upload that JSON; no JavaScript edit is needed for text/anchor changes with unchanged IDs. A loaded page must be reloaded to read new content. Ongoing response stimulus assignments are preserved across reloads.

Supabase functions and SQL remain in supabase/ and run separately on the server. Do not upload secrets. The dictionary must be synchronized when question wording or coding changes. Do not edit old migration scripts to change the running website.
