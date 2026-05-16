# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (Persian / English) single-page React presentation of Mozart's Requiem K. 626. The same movement-by-movement content is rendered through nine visually distinct "views" (Interactive, Poetic, Museum, Cinematic, Minimal, Editorial, Illuminated, Performance, Sheet/Score) selectable from the top bar.

## Commands

```bash
npm install        # install deps
npm run dev        # vite dev server (HMR)
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
```

No test runner, linter, or formatter is configured.

## Architecture

### Single source of truth: `src/content.js`
All copy, translations, and structural data live here. Three exports drive everything:
- `movements` — array of 15 movement objects. Each has shared fields (`num`, `latin`, `arc` 0–100 for emotional intensity, `color`, `sheetUrl`) plus parallel `fa` / `en` blocks (`title`, `sub`, `meaning`, `note`) and a `text[]` array where every Latin snippet carries `la`, `phon` (Ecclesiastical Latin pronunciation with CAPITALS for stress), `fa`, and `en`.
- `themes` — seven recurring motifs, each with `fa` / `en` descriptions.
- `STR` — `{ fa: {...}, en: {...} }` UI string table. Includes `viewLabels` (the top-bar names — these are the user-facing names for views; the internal keys differ, e.g. `dramatic` label maps to the `cinematic` view).
- `arcPoints` — derived from `movements`; maps `arc` to SVG coords for `ArcSVG`.

When adding a movement or theme, mirror **all** language fields and (for Latin lines) the `phon` field. The arc plot, all nine views, and the modal read from the same objects.

### Views and shared components
- `src/App.jsx` — top-bar view switcher + language toggle, mounts the chosen view, injects global `@font-face` `@import` and responsive `@media` overrides for the `tw-grid` / `mu-grid` / `spine` class hooks used inside views.
- `src/components.jsx` — shared `Modal`, `ArcSVG`, and the **style helpers `SANS(lang)`, `SERIF(lang)`, `LATIN`** plus `isFA / dirFor / alignFor`. Persian uses Vazirmatn (sans) + Amiri (serif) with `dir="rtl"`; English uses Inter + Cormorant Garamond LTR; Latin always renders LTR in Cinzel italic. **Always use these helpers** when adding language-aware text so RTL/LTR mirroring stays consistent.
- `src/views-classic.jsx` — `ViewInteractive`, `ViewPoetic`, `ViewMuseum`.
- `src/views-new.jsx` — `ViewCinematic`, `ViewMinimal`, `ViewEditorial`, `ViewIlluminated`, `ViewSheetMusic`, `ViewPerformance`.

Each view is a self-contained component that receives `{ lang }`, reads from `movements / themes / STR`, and styles everything **inline** (no CSS framework, no CSS modules). When tweaking visuals, edit the inline `style={{ ... }}` objects directly. RTL-sensitive properties typically use the `[isFA(lang) ? "right" : "left"]: ...` computed-key pattern — preserve that when editing.

### Feedback widget
`src/FeedbackWidget.jsx` is a floating button that posts to `POST /api/feedback` (a Vercel serverless function expected at deploy time — **not in this repo**). It also uses the browser Web Speech API (`webkitSpeechRecognition`) for voice input and mirrors submissions to `localStorage` under `mozart_feedback_log`. If the backend response contains `{ reply }`, the modal shows it and stays open longer.

## Conventions

- **Branch**: develop on `claude/init-project-setup-hzNPi`, push only to that branch.
- **HTML lang/dir**: `index.html` is hard-coded `lang="fa" dir="rtl"`; per-view direction is controlled at the React level via `dirFor(lang)`. Do not move direction logic back into the document root.
- **Fonts** load from Google Fonts via an `@import` inside a `<style>` tag in `App.jsx` — there is no font self-hosting and no build-time CSS pipeline beyond what Vite + `@vitejs/plugin-react` provide.
