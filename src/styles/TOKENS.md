# Design tokens

A warm, minimal system for a service design portfolio: one accent hue on a
neutral warm palette. Where a note explains *why* a token exists, it is
usually there to stop a specific bug being reintroduced — keep those.

## Colour

### Raw hues

| Token | Value | |
| --- | --- | --- |
| `--cream` | `#faf7f3` | warm off-white |
| `--sand` | `#ede8e1` | warm sand |
| `--taupe` | `#2a2520` | warm dark |
| `--taupe-light` | `#6b6359` | warm mid-grey |
| `--apricot` | `#d4a574` | the single accent hue |

Raw hues are never referenced by components. Each theme maps `--apricot` onto
the semantic `--accent`, and everything else points at that. **Keep the
indirection:** naming the raw token `--accent` creates a
`--accent: var(--accent)` cycle, which CSS treats as invalid at
computed-value time and which silently drops the colour sitewide.

### Semantic tokens

| Token | Role |
| --- | --- |
| `--page` | page background |
| `--surface` | the main content surface (what body copy sits on) |
| `--surface-2` | secondary panels |
| `--surface-3` | tertiary surface |
| `--raised` | a surface sitting *above* the page — cards |
| `--ink` | primary text |
| `--ink-2` | body copy (74% ink) |
| `--ink-3` | labels and metadata (52% ink) |
| `--accent` | small elements and hover states |
| `--on-accent` | text on an accent fill |
| `--line` | visible borders |
| `--line-soft` | hairlines |

**Use `--raised` for anything meant to read as lifted, not `--surface-N`.**
The numbered surfaces step away from the page in whichever direction the theme
runs, so `--surface-3` is lighter than the page in light mode and darker in
dark — a card built on it looks raised in one theme and cut into the page in
the other.

**`--on-accent` is dark in both themes.** `--accent` is the same mid-light
apricot in each, so what sits on it cannot flip. Cream-on-apricot measured
2.08:1.

## Contrast

Measured in-browser against the real computed values, not estimated.

| Pair | Light | Dark |
| --- | --- | --- |
| `--ink` on `--surface` | 12.45 | 11.01 |
| `--ink-2` on `--surface` | 5.80 | 6.85 |
| `--ink-3` on `--surface` | 3.10 | 4.25 |
| `.btn` text on fill | 14.21 | 14.21 |
| `.btn:hover` text on accent | 6.82 | 6.82 |

`--ink-3` is below 4.5:1 in light mode. That is fine for the large or
incidental text it is used on (labels, metadata) but **it must not carry body
copy**.

**`--accent` as text fails in light mode** — apricot on sand is 1.83:1. It is
safe as a fill, a border or a small graphic mark, but any accent-coloured
*text* needs checking. Known remaining users: `.cv-job-company`,
`.csd-subhead`, `.csd-phase-name`, and the `.footer-link` / `.csd-pager-title`
hovers.

## Type

Single family, both roles:

```css
--font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-body:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Inter is self-hosted and subset to **weights 300–600**. Asking for 700 clamps
to 600 rather than rendering bolder, so 600 is the effective maximum — write
600 and mean it.

| Token | Range | Use |
| --- | --- | --- |
| `--t-h2` | 1.9 → 3.4rem | **the ceiling.** Hero statement, page titles |
| `--t-section` | 1.7 → 2.3rem | section heading within a page |
| `--t-h3` | 1.2 → 1.75rem | card titles, sub-headings |
| `--t-lead` | 1.05 → 1.32rem | opening paragraph |
| `--t-body` | 1rem | body |
| `--t-small` | 0.875rem | small print |
| `--t-label` | 0.72rem | micro-caps labels |

**There is deliberately no step above `--t-h2`.** A 96px `--t-h1` and a 192px
`--t-mega` both existed; every page title reached for the largest one going and
outgrew the content it introduced. Both are retired. Don't add a third.

### Helpers

- `.display` — display family, weight 600, tight tracking. Sets **no size**;
  pair it with a size token.
- `.label` / `.section-label` — micro-caps in `--ink-3`, 0.08em tracking.
- `.lead` — `--t-lead` in `--ink-2`.

## Layout

| Token | Value |
| --- | --- |
| `--shell` | 1400px — the container width, used everywhere |
| `--shell-narrow` | 940px — the *reading column* cap, not a container |
| `--gutter` | 1.1 → 3.5rem |
| `--section-y` | 4 → 9rem |

`.shell` and `.shell-narrow` **share the same outer width**. The narrow one
does not centre a smaller box — it caps its direct children and left-aligns
them, so every page's content sits on the same left edge as the nav and
footer. Two centred containers of different widths drift apart as the viewport
grows (184px at 1440, inverting to -32px at 940), which reads as a mistake
because it is one.

`.shell-narrow.is-centered` restores centring for layouts with no left edge to
break. Not Found is the only user.

## Shape and motion

`--radius` 8px · `--radius-lg` 12px · `--frame-radius` 12→20px · `--pill` 999px

`--ease` `cubic-bezier(0.22, 1, 0.36, 1)` · `--ease-back`
`cubic-bezier(0.34, 1.4, 0.5, 1)`. Transitions 0.3–0.4s.

## Components

- **`.btn`** — ink fill, page-coloured text, sentence case. **Hovers to
  accent**, so the accent is a reward for interaction rather than permanent
  decoration.
- **`.btn-outline`** — hairline border, no fill; border goes to `--ink` on
  hover. Secondary actions and the nav logo.
- **`.link-quiet`** — quiet text link; a rule wipes in from the left on hover.
  Its underline is anchored to the text, not to the tap-target padding.
- **`.tag`** — borderless micro-caps in `--ink-3`. Outlined pills read as
  controls; spaced caps read as metadata, which is what these are.
- **`.pill`** — bordered pill, still used on the CV.
- **`.reveal`** — fade and rise on scroll; respects `prefers-reduced-motion`.

## Accessibility

- Focus: `2px solid --accent`, 3px offset.
- **Interactive targets carry `min-height: 32px`** (and `min-width` where the
  label is short) to clear the 24px WCAG 2.5.8 minimum. Bare text gave 23px,
  and a "CV" link only 21px wide. These minimums look like cruft — they are
  not; deleting them reintroduces the failure.
- Reduced motion disables animation and scroll-reveal.
- Contrast: see the table above. Not every pair passes AA — the exceptions are
  listed there rather than glossed.
