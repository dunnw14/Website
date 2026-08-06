# Working notes for Claude

Conventions for this repo, written down because sessions start cold and
these were expensive to arrive at.

## Verify before claiming

Render the page and look at it before saying a change worked. Chromium is
available; drive it with Playwright, screenshot the affected pages, and read
the screenshot. Uninstall Playwright again afterwards so it stays out of
`package.json`.

Three real bugs in this repo shipped or nearly shipped because output was
asserted rather than checked:

- `--accent: var(--accent)` in both theme blocks — a custom-property cycle,
  which CSS treats as invalid, so every accent on the site silently fell back
  to black. Invisible in the diff, obvious the moment the page was rendered.
- `index.html` bootstrapped the `dark` theme after the tokens were rewritten
  to make cream the primary look, so first-time visitors landed on the wrong
  theme. Only visible by loading the site with cleared storage.
- A page title stayed apricot for four commits because a multi-file
  find-and-replace matched `.csd-back:hover` instead of `.csd-title`.

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

## Workflow

Component work happens on a branch and is shown before it merges. Approved
states get a `*-v1` bookmark branch (`hero-v1`, `cards-v1`, `layout-v1`, …).
Because merges have been fast-forwards, each bookmark marks the whole site at
that point, not that component in isolation.

Pushing tags fails with 403 in this environment — branch pushes work. Use a
branch for bookmarks.

Deploys run on push to `main` via `.github/workflows/deploy.yml`. Wait for the
run to report `success` before telling the user something is live.
