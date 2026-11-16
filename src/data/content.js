/**
 * Single entry point for all site content.
 *
 * Everything the site renders comes from the JSON files in /content — edit
 * those to change copy, and nothing in /src needs to change.
 */
import homeData from "../../content/home.json";
import caseStudiesData from "../../content/case-studies.json";
import skillsData from "../../content/skills.json";
import cvData from "../../content/cv.json";
import mediaSizes from "./media-sizes.json";

export const home = homeData;
export const skills = skillsData;
export const cv = cvData;

export const caseStudiesPage = caseStudiesData.listing;
export const caseStudies = caseStudiesData.items;

export const getCaseStudy = (slug) => caseStudies.find((item) => item.slug === slug);

/** Previous/next links shown at the foot of each case study. */
export function getNeighbours(slug) {
  const i = caseStudies.findIndex((item) => item.slug === slug);
  return {
    previous: i > 0 ? caseStudies[i - 1] : null,
    next: i >= 0 && i < caseStudies.length - 1 ? caseStudies[i + 1] : null,
  };
}

/**
 * What the home page shows for each project, in strip order.
 *  - image:  which of the project's existing artefacts appears in the
 *            catalogue strip. Service blueprints and journey maps come first;
 *            the bank project shows the Billio prototype flow.
 *  - scale:  the artefact's height relative to the tallest one, so very wide
 *            maps don't take over the strip.
 *  - impact: which line of the case study's own impact list is quoted as the
 *            one-line outcome (copy is never rewritten, only selected).
 */
const HOME_FEATURE = {
  "global-fast-food-chain": { image: "media/qsr-hero-all-journeys.png", scale: 1, impact: 0 },
  "major-australian-bank": { image: "media/bank-work-billio-flow.png", scale: 0.52, impact: 3 },
  "major-australian-super-fund": { image: "media/superfund-hero-service-blueprint.png", scale: 0.86, impact: 0 },
  "major-australian-retailer": { image: "media/bts-hero-education-blueprint.png", scale: 0.6, impact: 0 },
  "federal-government-agency": { image: "media/tax-work-opportunity-map.png", scale: 0.8, impact: 0 },
  "luxury-architecture-brand": { image: "media/global-hero-customer-journey-blueprint.webp", scale: 0.56, impact: 1 },
  "major-luxury-retailer": { image: "media/luxury-hero-complete-my-look-flow.png", scale: 0.7, impact: 0 },
};

/** Every image a case study carries, hero first. */
export const allMedia = (item) =>
  [item.media?.hero, ...(item.media?.workSamples ?? [])].filter((m) => m?.src && m.type !== "video");

/** The one-line outcome quoted on listings. */
export const outcomeOf = (item) => item.impact[HOME_FEATURE[item.slug]?.impact ?? 0];

/** The artefact that represents a project on listings, with its own alt text. */
export function featureImage(item) {
  const media = allMedia(item);
  const wanted = HOME_FEATURE[item.slug]?.image;
  return media.find((m) => m.src === wanted) ?? media[0] ?? null;
}

/** Projects in catalogue-strip order, each with its artefact and scale. */
export const catalogue = Object.keys(HOME_FEATURE)
  .map((slug) => {
    const item = getCaseStudy(slug);
    return item ? { item, image: featureImage(item), scale: HOME_FEATURE[slug].scale } : null;
  })
  .filter((entry) => entry?.image);

/**
 * Content stores tags and section labels in capitals ("LUXURY RETAIL"). The
 * design sets them in sentence case, so this converts for display without
 * touching the words. Initialisms stay as they are.
 */
const KEEP = new Set(["QSR", "CX", "CV", "UX", "AI"]);
export function label(text = "") {
  if (text !== text.toUpperCase()) return text;
  return text
    .split(" ")
    .map((word) => (KEEP.has(word) ? word : word.charAt(0) + word.slice(1).toLowerCase()))
    .join(" ");
}

/** "Banking · Service/Product Design" */
export const metaLine = (item) => `${label(item.tags[0])} · ${item.subtitle}`;

/** Width ÷ height of a media item: its real pixel size, else its `ratio`. */
export function sizeRatio(media) {
  const meta = mediaSizes[media?.src];
  if (meta) return meta.w / meta.h;
  const [w, h] = String(media?.ratio ?? "16 / 10").split("/").map(Number);
  return w && h ? w / h : 1.6;
}

/**
 * A second artefact for the home page's project index, so it shows different
 * work from the catalogue strip directly above it. Falls back to the strip's
 * image when a project has only one.
 */
export function indexImage(item) {
  const feature = featureImage(item);
  return allMedia(item).find((m) => m.src !== feature?.src) ?? feature;
}
