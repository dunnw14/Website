# Design tokens

Defined in `tokens.css`. The system is deliberately small: one typeface, one
colour, one tint.

## Colour

| Token | Value | Used for |
|---|---|---|
| `--white` | `#ffffff` | Page background, artefact sheets |
| `--ink` | `#111111` | Text |
| `--grey` | `#63685f` | Secondary text |
| `--line` | `#dde2da` | Hairlines between rows |
| `--green` | `#0b5d3b` | Links, hover states, buttons, the contact band |
| `--sage` | `#edf1ea` | The surface behind artefacts |
| `--on-green` | `#ffffff` | Text on the green band |
| `--on-green-2` | `#dce9e0` | Secondary text on the green band |

Green was chosen because the artefacts are mostly purple, orange and blue and
it sits apart from all three. It means "clickable"; don't use it as
decoration or to tint a word in a heading.

### Contrast (WCAG AA needs 4.5:1 for text)

| Pair | Ratio |
|---|---|
| `--ink` on `--white` | 18.9:1 |
| `--grey` on `--white` | 5.7:1 |
| `--grey` on `--sage` | 5.0:1 |
| `--green` on `--white` | 7.9:1 |
| `--green` on `--sage` | 7.0:1 |
| `--on-green` on `--green` | 7.9:1 |
| `--on-green-2` on `--green` | 6.3:1 |

`--line` is for hairlines only, never text.

## Type

Hanken Grotesk, weights 400 and 500 only. Emphasis comes from size and
weight 500, never from colour, italics or capitals.

| Token | Used for |
|---|---|
| `--t-display` | The home statement and page titles. This is the ceiling. |
| `--t-title` | Listing titles, the about lead |
| `--t-h3` | Row titles, outcomes, the CV profile |
| `--t-lead` | Intro paragraphs |
| `--t-body` / `--t-small` | Body and metadata |

Body copy is capped with `max-width` in `ch` (see `.measure`) separately from
the container width, so lines stay readable on wide screens.

## Layout

- `--shell` / `--g`: the container width and its gutter. Everything aligns to
  the shell's left edge.
- `--edge`: that same left edge as a length, for full-bleed scrollers (the
  home strip) that need their first item to line up with the shell.
- `.split`: sticky label on the left, content on the right; one column on
  phones.

## Motion

Scroll reveals (`.reveal`), underline and colour hovers, a short page fade
(`page-in`). `base.css` turns all of it off under `prefers-reduced-motion`.
