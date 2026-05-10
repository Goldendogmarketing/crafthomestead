# Craft Homestead MVP Landing Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task if expanding beyond the initial single-page MVP.

**Goal:** Build a polished first-pass homepage for Craft Homestead that presents the boutique homestead brand, products, breed lineup, care standards, pricing preview, FAQ, and availability CTA.

**Architecture:** A single Next.js App Router landing page with static content arrays in `src/app/page.tsx`, global theme tokens in `src/app/globals.css`, and metadata in `src/app/layout.tsx`. The first version uses CSS-based cinematic placeholders until final photography/video files are added.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vercel-ready static deployment.

---

## Brand Card

**Business:** Craft Homestead

**Audience:** Backyard poultry keepers, homesteaders, small farms, and egg-color enthusiasts looking for specialty hatching eggs and day-old chicks.

**Primary offer:** Seasonal hatching eggs and day-old chicks from selected specialty breeds.

**Main CTA:** Request Availability

**Tone:** Warm, boutique, handmade, trustworthy, natural, rustic-premium.

**Colors:** Warm cream, soft black, deep forest green, olive, egg blue, clay/tan, chocolate brown.

**Typography direction:** Refined sans for body, understated serif/editorial feel in large headings, mono/typewriter accents for small labels.

**Hero line:** Colorful hatching eggs from a small craft homestead.

**Story journey:** Pasture → craft flock → daily care → colorful eggs → chicks/waitlist.

**Must-have sections:** Hero, story intro, products, breeds, care/biosecurity, pricing, FAQ, request availability CTA.

**Risks/unknowns:** Final photos/logo/domain/contact destination not yet added; availability form is static/CTA-only in MVP.

---

## Tasks

### Task 1: Scaffold project

**Objective:** Create a Vercel-ready Next.js + Tailwind app.

**Files:** Project root under `/Users/brandenwaters/Projects/craft-homestead`.

**Verification:** `npm run lint` and `npm run build` pass.

### Task 2: Build static homepage content

**Objective:** Replace create-next-app default content with Craft Homestead landing page sections.

**Files:**
- Modify: `src/app/page.tsx`

**Verification:** Page renders without runtime errors and clearly includes all MVP sections.

### Task 3: Apply brand theme and cinematic foundation

**Objective:** Add cream/forest/egg-blue theme, subtle grain, decorative gradients, responsive layout, and room for later video/scrolly scene.

**Files:**
- Modify: `src/app/globals.css`

**Verification:** Visual QA in browser on desktop/mobile widths.

### Task 4: Update SEO metadata

**Objective:** Set appropriate title and description.

**Files:**
- Modify: `src/app/layout.tsx`

**Verification:** Metadata compiles during build.

### Task 5: Verify and commit

**Objective:** Run lint/build, launch local preview, inspect visually, then commit.

**Commands:**
- `npm run lint`
- `npm run build`
- `npm run dev`

**Verification:** No lint/build errors; browser QA passes.
