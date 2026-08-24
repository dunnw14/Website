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
  "cardIllustration": "media/bank-mark.svg", // shown instead of cardImage when that's still null —
                                              // a spot illustration on the card's curated gradient
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
- `cardIllustration` only renders when `cardImage` is still `null` — once you
  add a real photo as `cardImage`, that takes over the card and the
  illustration stops showing. Use an SVG with the fill colour baked in as a
  literal value, not `currentColor` — the browser renders it through a plain
  `<img>` tag, which doesn't inherit CSS, so `currentColor` resolves to black
  instead of following the page. Use a light colour: the card is always
  styled dark (dark scrim, light text) regardless of the site's theme toggle.
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

That prints a link (usually <http://localhost:5173/>) — open it in your
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
watch progress in the **Actions** tab. The live URL is:

```
https://williamdunnportfolio.com
```

(`https://dunnw14.github.io/Website/` still works — GitHub Pages redirects it
to the custom domain automatically once one is set.)

### Custom domain setup

Two things point the site at a custom domain instead of the `/Website/`
subfolder GitHub Pages uses by default:

- `public/CNAME` — a one-line file with the domain (`williamdunnportfolio.com`).
  Vite copies everything in `public/` into the build output as-is, so this
  ends up at the root of the deployed site, which is where GitHub Pages looks
  for it.
- `vite.config.js`'s `BASE` constant — `"/"`, since a custom domain serves
  from its own root rather than a repo subfolder.

At your domain registrar, point DNS at GitHub Pages:

- Apex domain (`williamdunnportfolio.com`): four `A` records to
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- `www` subdomain, if you want `www.williamdunnportfolio.com` to work too: a
  `CNAME` record to `dunnw14.github.io`.

Once DNS propagates (can take a few hours), tick **Settings → Pages → Enforce
HTTPS** — GitHub issues the certificate automatically.

If you rename the GitHub repo instead of using a custom domain, the site goes
back to being served from a subfolder matching the new repo name — update
`public/CNAME` (delete it) and `vite.config.js`'s `BASE` to match.

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
  on a page like `/cv` still loads correctly on GitHub Pages.
- **Motion is reduced automatically** for visitors who have "reduce motion"
  turned on in their operating system.

---

## Where the content came from

Copy was transcribed from the original Base44 portfolio
(`william-dunn-portfolio.base44.app`). Images and videos from that site were
not carried across — those are the placeholders described above.
