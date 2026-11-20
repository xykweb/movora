# Current study — advertisement manipulation
Instrument: short-drama-questionnaire-v7-advertisement.
Flow: General Instruction → Instruction with assigned advertisement → short drama pairs with matching condition banner → Experience Survey introduction → affect grid → scales → demographics → confirmed submission.
Equal-probability assignment: internal busy = time_scarcity; control = control. The same condition determines both advertisement and banner; assignment persists on reload. Instruction button is an accessible overlay on the image Watch on Movora region, enabled only after image decode. Ready and entry events plus timestamps are recorded. Image decode is not evidence of attention.
Word tasks are no longer administered. Historical raw data and export fields retain their meanings. New responses record Ad_Condition, Ad_Image, Banner_Image, Ad_Viewed_At and Ad_Clicked_At. short drama identities, title versions, genre order and left/right randomization are unchanged.
Apply supabase/017_advertisement_manipulation.sql after 016; it removes word-task completion requirements only for instrument v6. Existing in-progress formal responses cannot silently switch instruments. New preview namespace starts the revised flow.
Participant instruction wording is in research/word-paragraphs.json → advertisementInstructions. The supplied Chinese ad prompt is rendered in English. Assets are assets/brand/MovoraAd_Control.png, MovoraAd_TimeScarcity.png, MovoraBanner_Control.png and MovoraBanner_TimeScarcity.png.

Current participant wording consistently uses short drama / short dramas. Instrument v7 distinguishes it from v6 movie wording. Internal movieId and historical field names remain stable. Apply migration 019 after 018.
