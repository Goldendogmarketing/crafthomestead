# Craft Homestead Design Notes

## First-pass MVP status

The homepage is built as a polished static landing page with a placeholder-ready cinematic foundation. It intentionally does not depend on final farm photography yet, so the page can be reviewed before asset replacement.

## MVP sections included

- Hero with `craft.` mark, headline, CTA, and abstract egg-basket visual
- Boutique farm/product intro
- Hatching eggs and day-old chicks cards
- Selected breed cards
- Care standards / biosecurity trust section
- Pricing preview
- FAQ
- Availability request form UI

## Cinematic expansion path

Once final assets are available, replace the abstract hero/trust visuals with one of these:

1. **Egg Basket Hero Loop**
   - Real or generated close-up of the colorful egg basket in morning light.
   - Slow swaying camera movement, shallow depth of field, warm pasture background.

2. **Pasture-to-Color Scroll Scene**
   - Sticky section where scroll moves through: pasture → flock → feed/care → egg basket → chicks.
   - Keep it slow and premium, not futuristic.

3. **Craft Flock Story Panels**
   - Use real photos as oversized editorial panels with subtle parallax and small labels.
   - Best quick path if video generation is delayed.

## Asset needs

- Old `craft.` logo or a clean redraw/SVG
- Egg basket hero image/video
- Chick-in-hand image
- Flock feeding image
- Pasture/timberland image
- Any final contact email/form destination
- Final order workflow: email, CRM, Formspree, Airtable, Google Sheet, or database

## Build notes

- Current CTA anchors scroll to the request form.
- The request form is visual-only until a final submission destination is chosen.
- Next Dev Tools badge may appear in local dev only; it is not part of production build.
