# Working notes for Claude

Conventions for this repo, written down because sessions start cold and
these were expensive to arrive at.

## Verify before claiming

Render the page and look at it before saying a change worked. Chromium is
available; drive it with Playwright, screenshot the affected pages, and read
the screenshot. Uninstall Playwright again afterwards so it stays out of
`package.json`.

Five real bugs in this repo shipped or nearly shipped because output was
asserted rather than checked:

- `--accent: var(--accent)` in both theme blocks — a custom-property cycle,
  which CSS treats as invalid, so every accent on the site silently fell back
  to black. Invisible in the diff, obvious the moment the page was rendered.
- `index.html` bootstrapped the `dark` theme after the tokens were rewritten
  to make cream the primary look, so first-time visitors landed on the wrong
  theme. Only visible by loading the site with cleared storage.
- A page title stayed apricot for four commits because a multi-file
  find-and-replace matched `.csd-back:hover` instead of `.csd-title`.
- Case study media frames (`MediaFrame`/`Gallery` in `src/components/Media.jsx`)
  enforce a fixed `aspect-ratio` plus `object-fit: cover`. Dropping a raw
  screenshot in without checking its native ratio against the frame's crops
  silently: a card thumbnail sliced clean through a slide's title mid-word,
  and a 6-screen product flow rendered as barely two screens. Both were
  invisible in the JSON diff, obvious only once rendered. `Gallery` items
  accept an optional `ratio` (e.g. `"3030 / 862"`, the image's own pixel
  width/height) so one slide can use its native ratio instead of a forced
  crop — used for the Major Australian Bank case study's Billio flow.
- Centring an absolutely positioned `<img>` with `left:0; right:0` (no
  explicit `width`) does not fill-and-centre it the way it would a `<div>`.
  For a replaced element, browsers shrink-to-fit the width to the image's
  own intrinsic ratio and anchor it to `left:0`, silently dropping `right:0`
  — so the image sits flush left with unclaimed space on the right, not
  centred. Looked plausible in the CSS, wrong the moment it rendered. Fix:
  wrap it in a plain `<div>` sized by the insets (that isn't a replaced
  element, so it fills correctly) and let the `img` fill that frame at
  100%/100%. See `.wc-illustration-frame` in `src/components/WorkCard.css`.

**On any change touching several files at once, read the resulting diff per
file.** Do not report a multi-file edit as done on the strength of the command
having run.

Check both themes. The toggle persists in `localStorage` under `wd-theme`, and
`index.html` sets it before first paint, so `prefers-color-scheme` alone will
not switch it — set the storage key.

## Design language

Settled deliberately; don't re-litigate without being asked.

- **Restraint reads as expensive.** Fixes are usually subtractive.
- **Sentence case** for nav, buttons and links. Wide-tracked uppercase earns
  its place only on small labels and metadata.
- **Accent is a reward, not decoration.** Apricot belongs on small elements
  and hover states. Large accent display type tints the whole page.
- **`--t-h2` is the ceiling** — hero statements and page titles. There is
  deliberately no larger step; a 96px `--t-h1` used to exist and every page
  title reached for it, so each page's title outgrew what it introduced.
- **Measure is capped separately from container width.** Body copy past ~70
  characters reads as a wall. Containers set the left edge; `max-width` on the
  text sets the measure. These are separate jobs.
- **One left edge.** All content aligns with the nav and footer. `.shell` and
  `.shell-narrow` share an outer width; the narrow one caps its content column
  instead of centring a smaller box.

`src/styles/TOKENS.md` documents the tokens and, where it matters, why a token
exists. Keep it current — several of the notes there exist to stop a specific
bug being reintroduced.

## Where things stand

Done and live: the design tokens, case study cards, page titles and footer,
site-wide left-edge alignment, and the mobile overflow fix.

The Home hero visual is an animated hand-drawn "Service Blueprint" sketch
(`src/components/ServiceBlueprintSketch.jsx`), not the earlier image collage.
It's a faithful port of a supplied standalone SVG + Web Animations API asset:
deterministic seeded wobble, staged draw-in over a 25s loop,
`prefers-reduced-motion` fallback. It draws directly onto the hero's own
background — no paper card, no border. Its ink strokes use `var(--ink)` /
`var(--ink-2)` / `var(--ink-3)` rather than the asset's original hardcoded
hex, specifically because those hardcoded darks were close to illegible once
drawn straight onto the dark theme's background — the same "invisible until
rendered" failure mode as the other bugs logged below. Check both themes
again if this component is touched.

Open, in rough priority order:

- **Accent-coloured text fails contrast in the light theme** (1.83:1). It is
  fine as a fill, border or small mark, but not as text. Known users:
  `.cv-job-company`, `.csd-subhead`, `.csd-phase-name`, `.skills-card-label`,
  and the `.footer-link` / `.csd-pager-title` hovers. Fix these when working
  the page they sit on; see the contrast table in `TOKENS.md`.
- **CV page detail.** Left-weighted since the alignment change, with a wide
  empty band down the right — a known trade of that fix, not a regression.
  Still carries old language: apricot uppercase employer names (AKQA, ATO)
  and the old panel styling on "Core capabilities".
- **Skills page.** Renders and aligns correctly but has never been audited
  for leftovers of the old visual language.
- **Real-device check.** Mobile was verified in Chromium with touch
  emulation, which will not catch Safari's behaviour around `100vh` and
  sticky headers. Worth opening the live site on a phone.
- **Not yet looked at:** landscape phone orientation; the nav drawer's
  keyboard and screen-reader behaviour beyond confirming it opens and closes.
- **Case study detail** small labels are still apricot micro-caps. That is
  consistent with the accent rule, so probably fine — but it was never a
  deliberate decision, so make one.

The Major Australian Bank case study carries real imagery: an optional
`media.hero` lead image (the Billio prototype, all six screens, rendered
right under the page title with no carousel chrome since it's one item) plus
a 4-item Work Samples carousel in its original spot (sprint board, then three
concept explorations — Time Capsule, One Pay, Pulse Check). The other six
case studies' detail-page `hero`/`workSamples` slots are still placeholders.
`README.md` explains how to drop real images and the CV PDF in, including the
optional `hero` slot and per-item `ratio` override.

All 7 work cards (Home's featured grid and the full Case Studies grid — both
render through `WorkCard.jsx`) have a client-supplied line illustration via
`media.cardIllustration`, one per case study, vector-traced from the
client's own reference art (not the site's hand-drawn sketch style). Source
SVGs ship as `fill="currentColor"`, which only resolves against page CSS for
*inline* SVG — these load through a plain `<img>`, an isolated context where
that falls back to black, so each file in `public/media/illustration-*.svg`
has its fill baked in as a literal colour instead. `.wc-media` is a two-row
CSS grid (`1fr` illustration, `auto` title/tags) so each card's illustration
fills whatever room its own title doesn't need, rather than every card
sharing one fixed-size box tuned for the longest title.

## Workflow

Component work happens on a branch and is shown before it merges. Approved
states get a `*-v1` bookmark branch (`hero-v1`, `cards-v1`, `layout-v1`, …).
Because merges have been fast-forwards, each bookmark marks the whole site at
that point, not that component in isolation.

Pushing tags fails with 403 in this environment — branch pushes work. Use a
branch for bookmarks.

Deploys run on push to `main` via `.github/workflows/deploy.yml`. Wait for the
run to report `success` before telling the user something is live.

PRs get a Vercel preview deployment (posted as a PR comment, aliased to
`website-git-<branch>-will13-a645.vercel.app`). GitHub Pages serves the site
from `/Website/`, but Vercel serves previews from the domain root — so
`vite.config.js`'s `base` switches on Vercel's own `VERCEL` build env var
(`process.env.VERCEL ? "/" : "/Website/"`). A hardcoded `/Website/` base
renders a completely blank Vercel preview (every asset 404s), invisible in
the diff and only obvious once the preview URL is actually opened.
`vercel.json` adds the SPA rewrite Vercel needs for deep links, mirroring
what the GitHub Pages `404.html` fallback does there.
