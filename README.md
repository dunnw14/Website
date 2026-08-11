# William Dunn — Portfolio

Portfolio site for William Dunn, Senior Service Designer & CX Strategist.
Built with React + Vite, deployed to GitHub Pages.

All copy lives in plain JSON files in [`content/`](content/), so you can change
wording without touching any code.

---

## Adding your images and videos

Every image and video slot is currently a **placeholder** (a dashed frame that
says "placeholder"). To fill one in:

1. Put your file in the `public/media/` folder — create the folder if it isn't
   there yet. Name files however you like, e.g. `bank-workshop.jpg`.
2. Open `content/case-studies.json` and find the case study you want.
3. Inside its `"media"` block, change the matching `"src": null` to the path of
   your file, relative to `public/`:

```jsonc
"media": {
  "cardImage": "media/bank-card.jpg",        // thumbnail on the Case Studies grid
  "hero": {                                  // optional — a lead image/video right under the page title
    "type": "image",
    "src": "media/bank-hero.jpg",
    "alt": "The finished prototype, full flow",
    "caption": "The finished prototype, end to end",
    "ratio": "3030 / 862"                    // optional — see below
  },
  "workSamples": [
    {
      "type": "image",
      "src": "media/bank-workshop.jpg",       // was null
      "alt": "Sprint wall of concept sketches",
      "caption": "Concept territories from the sprint"
    }
  ]
}
```

Notes:

- Any slot left as `null` keeps showing a placeholder — you can fill them in one
  at a time.
- `alt` is the description read aloud by screen readers. Worth filling in.
- `caption` is optional text shown under the image; leave as `null` for none.
- For video, set `"type": "video"` and point `src` at either an `.mp4` in
  `public/media/` **or** a YouTube/Vimeo embed URL. `poster` is an optional
  still image shown before playback.
- You can add or remove items from a `workSamples` list freely — the carousel
  counter adjusts automatically.
- `hero` is optional and separate from `workSamples`. When set, it renders as
  a single lead image right under the page title, above "Project Overview" —
  no carousel controls, since it's just the one item. Leave the key out
  entirely and the page reads exactly as it does without it, with Work
  Samples in its usual spot further down.
- Any media item — `hero` or a `workSamples` entry — can set an optional
  `ratio` (e.g. `"3030 / 862"`, the image's own pixel width and height) to
  override the default 16:10 frame. Every image and video frame on the site
  is a fixed aspect ratio with the image cropped to fill it, so a photo or
  screenshot much wider or taller than usual will get cropped unless you set
  `ratio` to match it.

### Adding your CV PDF

Put the PDF in `public/cv/`, then in `content/cv.json` set:

```jsonc
"cta": { "label": "Download Full CV", "file": "cv/william-dunn-cv.pdf" }
```

Until you do, the "Download Full CV" button stays greyed out.

---

## Editing the words

| What you want to change | File to edit |
| --- | --- |
| Hero greeting, headline, intro paragraphs, scrolling tags | `content/home.json` |
| Case study copy (all 7) | `content/case-studies.json` |
| Skills page | `content/skills.json` |
| CV: profile, roles, capabilities | `content/cv.json` |

Save the file and the site updates — no code changes needed.

---

## Running it on your own computer

You need [Node.js](https://nodejs.org) 20 or newer installed. Then, in a
terminal from this folder:

```bash
npm install     # once, to download dependencies
npm run dev     # start a local preview
```

That prints a link (usually <http://localhost:5173/Website/>) — open it in your
browser. It reloads automatically as you edit.

To check the real production build before pushing:

```bash
npm run build
npm run preview
```

---

## Publishing to GitHub Pages

The repo already includes a workflow (`.github/workflows/deploy.yml`) that
builds and publishes the site every time `main` is updated. Two one-time
settings are needed in GitHub:

1. **Settings → Pages → Build and deployment → Source**: choose
   **GitHub Actions** (not "Deploy from a branch").
2. **Settings → General → Default branch**: make sure it is **`main`** — the
   workflow only runs on pushes to `main`.

After that, every push to `main` republishes the site automatically. You can
watch progress in the **Actions** tab. The live URL will be:

```
https://dunnw14.github.io/Website/
```

### If you rename the repo or use a custom domain

The site is served from a subfolder (`/Website/`), so that path is set in two
places. Change both to match:

- `vite.config.js` → the `BASE` constant
- For a custom domain at the root of the domain, set `BASE = "/"`

---

## How it's put together

```
content/                 all site copy as JSON — edit these
public/                  files served as-is (favicon, your media, your CV)
src/
  data/content.js        loads the JSON and exposes it to the pages
  components/            nav, footer, cards, media placeholders, marquee
  pages/                 Home, Case Studies, Case Study detail, Skills, CV
  styles/tokens.css      colours, fonts, spacing — change the look here
.github/workflows/       automatic deploy to GitHub Pages
```

Some details worth knowing:

- **Light and dark themes** are both supported. The toggle sits in the nav.
  The light (cream) theme is the default for a first-time visitor; after that
  the site remembers the last choice. It does not follow the operating
  system's dark-mode setting. Colours are all defined once in
  `src/styles/tokens.css`.
- **The font** (Inter) is bundled into the site rather than loaded from
  Google, so there are no third-party requests and nothing to break.
- **Deep links work** — `404.html` is generated at build time so that refreshing
  on a page like `/Website/cv` still loads correctly on GitHub Pages.
- **Motion is reduced automatically** for visitors who have "reduce motion"
  turned on in their operating system.

---

## Where the content came from

Copy was transcribed from the original Base44 portfolio
(`william-dunn-portfolio.base44.app`). Images and videos from that site were
not carried across — those are the placeholders described above.
