import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages serves this project from the custom domain in public/CNAME
 * (williamdunnportfolio.com), and Vercel (used for PR previews) serves from
 * its own preview domain — both are the site root, so the base is always "/".
 * Before the custom domain, GitHub Pages served from /Website/ and this
 * switched on Vercel's own `VERCEL` build env var; a hardcoded /Website/
 * base renders a completely blank Vercel preview (every asset 404s), so if
 * this ever needs to branch again, branch it rather than hardcoding one path.
 */
const BASE = "/";

/**
 * The site uses client-side routing, but GitHub Pages only knows about real
 * files. Copying index.html to 404.html means any deep link (e.g. /CV)
 * still boots the app, which then renders the right page from the URL.
 */
function spaFallback() {
  return {
    name: "spa-fallback-404",
    closeBundle() {
      const dist = resolve(process.cwd(), "dist");
      copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), spaFallback()],
});
