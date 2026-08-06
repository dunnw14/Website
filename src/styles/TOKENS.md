# Design Token System

A warm, minimal design system for a service design portfolio. Single accent color on neutral warm palette, inspired by editorial design aesthetics.

## Color Palette

### Brand Colors
- **`--cream`** `#faf7f3` – Warm, off-white background
- **`--sand`** `#ede8e1` – Warm sand for surface elements
- **`--taupe`** `#2a2520` – Warm dark, primary text
- **`--taupe-light`** `#6b6359` – Warm medium-gray for secondary text
- **`--apricot`** `#d4a574` – Warm apricot; the single accent hue

Raw hues are never used directly in components. Each theme maps `--apricot`
onto the semantic `--accent`, which is what everything else references. Keep
that indirection: naming the raw token `--accent` creates a
`--accent: var(--accent)` cycle, which CSS treats as invalid at
computed-value time and silently drops the colour sitewide.

### Semantic Color Tokens

#### Light Theme (Default)
- **`--page`** – Background (cream)
- **`--surface`** – Primary surface (sand)
- **`--surface-2`** – Secondary surface (darker sand)
- **`--surface-3`** – Tertiary surface (lighter for contrast)
- **`--raised`** – A surface sitting *above* the page (cards). Prefer this
  over `--surface-N` for anything meant to read as lifted: the numbered
  surfaces step away from the page in whichever direction the theme runs, so
  `--surface-3` is lighter than the page in light mode but darker in dark,
  which makes a card look raised in one theme and cut-in in the other.
- **`--ink`** – Primary text (dark taupe)
- **`--ink-2`** – Secondary text (taupe with 74% opacity)
- **`--ink-3`** – Tertiary text (taupe with 52% opacity)
- **`--accent`** – Interactive elements (apricot)
- **`--on-accent`** – Text on accent (cream)
- **`--line`** – Borders and dividers (taupe with 16% opacity)
- **`--line-soft`** – Subtle borders (taupe with 8% opacity)

#### Dark Theme
- Inverted approach: warm dark taupe becomes background, cream becomes text
- Accent remains consistent warm apricot
- All opacity values adjusted to work on dark backgrounds

### Usage Guidelines

- **Use `--accent`** for buttons, links, emphasis—sparingly
- **Use `--surface`** for cards, containers, media placeholders
- **Use `--ink`** for primary text, headings
- **Use `--ink-2`** for body copy, descriptions
- **Use `--ink-3`** for labels, meta information
- **Use `--line`** for visible borders, dividers
- **Use `--line-soft`** for subtle separations

## Typography

### Font Stack
```css
--font-display: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Single font family for minimalist consistency. Inter bundled into the project.

### Type Scale (Responsive)
- **`--t-mega`** – Extra-large display (3.4rem → 12rem)
- **`--t-h2`** – Largest type on the site (1.9rem → 3.4rem). Hero statement
  and page titles. There is deliberately no larger step: a 96px `--t-h1`
  used to exist and every page title reached for it, so each page's title
  outgrew the content it was introducing.
- **`--t-section`** – Section heading within a page (1.7rem → 2.3rem)
- **`--t-h3`** – Small heading (1.2rem → 1.75rem)
- **`--t-lead`** – Intro paragraph (1.05rem → 1.32rem)
- **`--t-body`** – Body text (1rem)
- **`--t-small`** – Small text (0.875rem)
- **`--t-label`** – Label, caption (0.72rem)

All scales use `clamp()` for fluid, responsive sizing across viewport widths.

### Type Helpers
- **`.display`** – Oversized heading (uses `--t-mega` or similar)
- **`.label`** – Small caps label (uppercase, 600 weight, reduced letterspacing)
- **`.section-label`** – Section heading (uppercase, 600 weight)
- **`.lead`** – Intro paragraph (uses `--t-lead`, slightly dimmed ink)

## Spacing & Layout

### Viewport Containers
- **`--shell`** – `1400px` – Wide content max-width
- **`--shell-narrow`** – `940px` – Narrow content max-width
- **`--gutter`** – Responsive padding (1.1rem → 3.5rem)
- **`--section-y`** – Vertical section spacing (4rem → 9rem)

### Layout Classes
- **`.shell`** – Centered container with max-width and gutter padding
- **`.shell-narrow`** – Narrower version for text-focused sections
- **`.page`** – Top/bottom padding for page sections

## Shape & Radius

- **`--radius`** – `8px` – Standard corner radius (subtle)
- **`--radius-lg`** – `12px` – Larger corners (cards, containers)
- **`--frame-radius`** – Responsive frame border (12px → 20px)
- **`--pill`** – `999px` – Fully rounded (buttons)

Reduced from previous system; favors geometric minimalism over soft roundness.

## Motion

- **`--ease`** – `cubic-bezier(0.22, 1, 0.36, 1)` – Standard easing (snappy)
- **`--ease-back`** – `cubic-bezier(0.34, 1.4, 0.5, 1)` – Back-easing (anticipation)

Transitions kept to 0.3–0.4s for responsiveness.

## Component Patterns

### Buttons
- **`.btn`** – Filled button (accent background, cream text)
  - Hover: slight scale and opacity change
  - Padding: 0.75rem 1.5rem
  - Radius: pill-shaped
- **`.btn-outline`** – Outlined button (border, no fill)
  - Hover: accent border, soft background
  - Used for secondary actions

### Links & Navigation
- **`.dot-link`** – Large link with accent dot prefix
  - Hover: dot scales up subtly
  - Used for case study navigation

### Tags & Pills
- **`.tag`** – Small, bordered label
- **`.pill`** – Medium bordered pill
- Both use `--line` borders and `--ink-2` text

### Scroll Reveal
- **`.reveal`** – Fade-in + translate animation on scroll
  - Starts with `opacity: 0` and `transform: translateY(26px)`
  - Transitions to visible state
  - Respects `prefers-reduced-motion`

## Accessibility

- Focus states use `2px solid --accent` outline with `3px` offset
- Selection state: accent background with contrasting text
- Reduced motion queries disable animations for users who prefer it
- All text meets WCAG AA contrast standards

## Implementation Notes

- All colors defined as CSS custom properties in `:root`
- Light/dark themes toggle via `[data-theme]` attribute
- Responsive scales use `clamp()` for fluid sizing
- System is intentionally minimal to let content (case studies, work) dominate
- Single accent color enforces restraint and clarity
