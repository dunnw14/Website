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
