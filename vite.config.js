import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * GitHub Pages serves this project from https://<user>.github.io/Website/
 * so every asset URL needs the /Website/ prefix. If you later point a custom
 * domain at the site (or rename the repo), change `base` to match.
 */
const BASE = "/Website/";

/**
 * The site uses client-side routing, but GitHub Pages only knows about real
 * files. Copying index.html to 404.html means any deep link (e.g. /Website/CV)
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
