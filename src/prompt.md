# Supabase schema
## Schema
```sql
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.dataset (
  id text NOT NULL,
  image text,
  page_type USER-DEFINED,
  has_text boolean,
  has_table boolean,
  objects_present ARRAY,
  caption_short text,
  caption_detail text,
  text_in_image text,
  review_priority USER-DEFINED DEFAULT 'normal'::review_priority,
  auto_flags ARRAY,
  notes text,
  is_checked boolean DEFAULT false,
  error_tags ARRAY,
  change_log text,
  CONSTRAINT dataset_pkey PRIMARY KEY (id)
);
```

## Enums
```md
public.auto_flags: [OCR_UNREADABLE, OCR_LONG, HAS_TABLE, LAYOUT_COMPLEX, POSSIBLE_BLANK, LOW_CERTAINTY, COUNTING_WRONG, CLOCK_READING_WRONG],

public.error_tags: [OCR_MISSING, OCR_WRONG, OCR_UNREADABLE, OCR_NOT_CONTEXTUALIZED, HALLUCINATION, WRONG_LAYOUT, SUBJECTIVE_REASONING, TOO_LONG_SHORT, DETAIL_INCOHERENT_FLOW, MISQUOTED_TEXT, COUNTING_WRONG, CLOCK_READING_WRONG, ID_ISSUE, IMAGE_MISMATCH],

public.objects_present: [person_child, person_adult, student, teacher, animal_generic, animal_pet, animal_farm, animal_wild, food_fruit, food_vegetable, food_bundle, book, notebook, pen, pencil, school_bag, clock_analog, clock_digital, countable_object, grouped_object, table, chart, illustration_scene],

page_type: [cover, title_page, toc, content, exercise, blank, other],

public.review_priority: [low, normal, high]
```

## Raw image
installed in bucket: images
link to bucket items: f"SUPABASE_URL/storage/v1/object/public/images/{id}.png";

# Web stack:
+ Astro
+ TailwindCSS
+ Supabase

# Requirements
## UI
The UI have 2 divisions, for each 'is_checked == false' row in dataset:
    + UI.Left: Show the image, id below the image.
    + UI.Right: Interactive questions, from public.dataset, choose random dataset.row, prioritize (high > normal > low) review_priority:
        + ("{page_type} page?") yes(): no(dropdown to edit);
        + ("has text?") yes(): no(toggle to edit);
        + (has table?") yes(): no(toggle to edit);
        + ("{o for o in objects_present[]} present?") yes(): no(tick_box_list of public.objects_present to edit);
        + ("caption short correct?") yes(): no(tick_box_list of public.error_tags to edit);
        + ("caption detail correct?") yes(): no(tick_box_list of public.error_tags to edit);
        + ("text in image correct?") yes(): no(tick_box_list of public.error_tags to edit);
        + (notes correct?) yes(): no(spawn note(textbox) in UI.Right.Bottom to edit);
        + if edit occured, spawn change_log(textbox) in UI.Right.Bottom, this textbox can be empty
        + Button: ("Save & Continue") clicked(update this dataset.row(Checked_data && assign is_checked = true), continue to next randomized dataset.row)

        elseif (is_checked = true for all rows):
            + ("Hooray, All checked!") with beautiful presentation and fireworks animation.