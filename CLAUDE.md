# Working notes for Claude

Conventions for this repo, written down because sessions start cold and
these were expensive to arrive at.

## Verify before claiming

Render the page and look at it before saying a change worked. Chromium is
available; drive it with Playwright, screenshot the affected pages, and read
the screenshot. Uninstall Playwright again afterwards so it stays out of
`package.json`.

Four real bugs in this repo shipped or nearly shipped because output was
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

Done and live: the design tokens, hero, case study cards, page titles and
footer, site-wide left-edge alignment, and the mobile overflow fix.

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
case studies are still placeholders. `README.md` explains how to drop real
images and the CV PDF in, including the optional `hero` slot and per-item
`ratio` override.

## Workflow

Component work happens on a branch and is shown before it merges. Approved
states get a `*-v1` bookmark branch (`hero-v1`, `cards-v1`, `layout-v1`, …).
Because merges have been fast-forwards, each bookmark marks the whole site at
that point, not that component in isolation.

Pushing tags fails with 403 in this environment — branch pushes work. Use a
branch for bookmarks.

Deploys run on push to `main` via `.github/workflows/deploy.yml`. Wait for the
run to report `success` before telling the user something is live.
