# Current study — advertisement manipulation
Instrument: short-drama-questionnaire-v7-advertisement.
Flow: General Instruction → Instruction with assigned advertisement → short drama pairs with matching condition banner → Experience Survey introduction → affect grid → scales → demographics → confirmed submission.
Equal-probability assignment: internal busy = time_scarcity; control = control. The same condition determines both advertisement and banner; assignment persists on reload. Instruction button is an accessible overlay on the image Watch on Movora region, enabled only after image decode. Ready and entry events plus timestamps are recorded. Image decode is not evidence of attention.
Word tasks are no longer administered. Historical raw data and export fields retain their meanings. New responses record Ad_Condition, Ad_Image, Banner_Image, Ad_Viewed_At and Ad_Clicked_At. short drama identities, title versions, genre order and left/right randomization are unchanged.
Apply supabase/017_advertisement_manipulation.sql after 016; it removes word-task completion requirements only for instrument v6. Existing in-progress formal responses cannot silently switch instruments. New preview namespace starts the revised flow.
Participant instruction wording is in research/word-paragraphs.json → advertisementInstructions. The supplied Chinese ad prompt is rendered in English. Assets are assets/brand/MovoraAd_Control.png, MovoraAd_TimeScarcity.png, MovoraBanner_Control.png and MovoraBanner_TimeScarcity.png.

Current participant wording consistently uses short drama / short dramas. Instrument v7 distinguishes it from v6 movie wording. Internal movieId and historical field names remain stable. Apply migration 019 after 018.

Current v8 short-drama-questionnaire-v8-ad-reflection: first Instruction shows assigned advertisement and two required text responses, followed by Next; second Instruction describes choices and repeats the same assigned ad with Watch on Movora overlay. Completion code A3FF37C5D0. Apply migration 020 after 019.

Current instrument v9 short-drama-questionnaire-v9-ad-evaluation: ad evaluation uses four required 1–7 ratings, stored in adEvaluation, replacing the two open-ended questions. No AI-generated framing. Weekly work hours uses three visual rows, with inline input/unit. Apply 027 after 026; current export/dictionary contains 68 variables. Original historical payloads retained.

Current v10: third advertisement rating is ad liking (adEvaluation.adLiking / Ad_Liking), replacing slogan familiarity. Question order: visualDesign, sloganLiking, adLiking, platformFamiliarity. Historical sloganFamiliarity is not relabeled. Apply migration 029 after 028; 68 current export variables remain.

Current preview reset: 030_reset_preview_current.sql clears preview-only responses (aborts if any Connect rows exist), rebuilds 68 current export/dictionary fields, and removes retired instrument validation. Current-only guard rejects old instrument drafts. Preview namespace reset1 starts a fresh response after the site update. Close old tabs before resetting.
