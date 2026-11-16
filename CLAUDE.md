# Working notes for Claude

Conventions for this repo, written down because sessions start cold and
these were expensive to arrive at.

## Default workflow

- Default: push to the branch and give the Vercel preview URL. Don't wait
  to be asked — after committing, push and report back the preview link
  (see "Workflow" below for how the alias is derived).
- Don't screenshot or read images unless explicitly asked. This overrides
  the "Verify before claiming" section below by default — treat visual
  verification as opt-in, not automatic.
- If asked for screenshots, write them to `/screenshots/` and stop. Never
  read them back into context.

## Verify before claiming

Only do the following when the user has asked for visual verification —
see "Default workflow" above; it is not the default anymore.

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

## Design language

Redesigned November 2026 ("Plain Catalogue"). Settled deliberately; don't
re-litigate without being asked.

- **Simple, clear, minimalist.** White page, one typeface (Hanken Grotesk,
  weights 400 and 500), hierarchy from size and space only.
- **One colour, used for meaning.** Bottle green (`--green`) marks anything
  clickable and fills the closing contact band — the only large block of
  colour. Pale sage (`--sage`) sits behind artefacts so white documents read
  as sheets of paper. No second accent, no dark theme, no theme toggle.
- **The work is the imagery.** No illustration, no decoration. The home page
  opens with the statement, then the catalogue strip: each project's artefact
  at its own proportions, bottoms aligned. The strip must start on the first
  screen — its heights and the intro's padding scale with viewport *height*
  (`--u` in `Home.css`); check the fold at 1440x900 and on a phone if either
  is touched.
- **Strip images are service blueprints and journey maps first**, and the
  Billio prototype flow for the bank. The choice lives in `HOME_FEATURE` in
  `src/data/content.js`, along with which impact line is quoted as the
  one-line outcome.
- **Copy is never rewritten.** All wording comes from `content/*.json`
  verbatim; the design may re-chunk it and choose which line to quote.
  Labels stored in capitals are shown in sentence case via `label()`.
- **Avoid the "AI-generated" look**: no giant headline with one coloured
  word, no uppercase monospace labels, no 01/02 numbering, no status dots,
  no cream background.
- **Sentence case** everywhere. **`--t-display` is the ceiling** for type.
- **One left edge.** Everything aligns to `.shell`; full-bleed strips use
  `--edge` to line up with it.

`src/styles/TOKENS.md` documents the tokens and the contrast table.

## Where things stand

Every page is built in the new design: Home, Case Studies, the case study
template (all seven), Skills, CV and 404. Live since 16 Nov 2026. The
previous design is bookmarked on the `pre-redesign-v1` branch.

- **Home** order: statement with the AKQA paragraph opposite it (stacks on
  phones), the catalogue strip (drifts sideways slowly; pauses on hover,
  focus, manual scroll and off screen; pause button; still under reduced
  motion), the project index with a small second artefact per row on sage,
  then About as a facts grid (Capabilities linking to each Skills tab via
  route state, Experience, Industry Experience).
- **Artefacts** on case study pages are capped at `min(66vh, 640px)` tall
  so squarer images don't fill the screen; wide maps stay under the cap.

- **Case study template** runs in a fixed order: overview, hero artefact,
  Background & Challenge, My Role, Process & Approach, Work Samples, Key
  Deliverables, Impact & Outcomes, Reflection, pager. Artefacts sit on sage
  bands at full width; very wide ones (ratio over 2.1) take a full row,
  others sit two-up. Each opens the full-resolution original in a lightbox
  (`Artefact` in `src/components/Media.jsx`) that zooms and scrolls, which is
  what makes journey maps readable on a phone.
- **Images** are served as resized WebP copies from `public/media/opt/`,
  generated by `python3 scripts/optimise-media.py` (needs Pillow), which also
  writes `src/data/media-sizes.json`. Re-run it whenever an image is added or
  replaced, and commit the output. An image the script hasn't seen falls
  back to its original file.
- **Skills** keeps the tabbed layout and WAI-ARIA tabs behaviour from before
  (tabbed beat stacked; the tabs are a bordered segmented control so they
  don't read as nav text).
- **Fonts** are self-hosted (`src/assets/fonts/`), no third-party requests.

Open:

- **No contact email** in `content/home.json`, so every "Get in touch" link
  goes to the CV page. **No CV PDF**, so the download button is disabled.
- **Client names are visible inside two artefacts** ("bankwest" in the
  Billio screens, "State Super Fund" on the journey map) while the copy
  anonymises both clients. The user has been told; their call.
- `cardImage` / `cardIllustration` in `case-studies.json` and the
  `public/media/illustration-*.svg` files are no longer used by any page.
- **Real-device check** still outstanding: verified in desktop Chrome and
  Chrome's phone emulation only, not Safari.

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
`website-git-<branch>-will13-a645.vercel.app`). `vercel.json` adds the SPA
rewrite Vercel needs for deep links, mirroring what the GitHub Pages
`404.html` fallback does there.

The live site is `williamdunnportfolio.com`, a custom domain on GitHub Pages
(`public/CNAME`, DNS at the registrar pointed at GitHub's IPs). Before this,
GitHub Pages served from `/Website/` while Vercel previews served from the
domain root, so `vite.config.js`'s `base` switched on Vercel's own `VERCEL`
build env var — a hardcoded `/Website/` base rendered a completely blank
Vercel preview (every asset 404s), invisible in the diff and only obvious
once the preview URL was actually opened. Now that GitHub Pages also serves
from the root (the custom domain, not a subfolder), `base` is just `"/"`
unconditionally. If GitHub Pages ever goes back to serving from a subfolder
(repo renamed, custom domain removed), that conditional needs to come back —
don't hardcode `"/"` in that case, it's the same blank-Vercel-preview bug in
the other direction.
