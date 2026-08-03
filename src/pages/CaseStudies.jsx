import { caseStudies, caseStudiesPage } from "../data/content.js";
import CaseStudyCard from "../components/CaseStudyCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./CaseStudies.css";

export default function CaseStudies() {
  return (
    <div className="page">
      <div className="shell">
        <header className="cs-head">
          <Reveal>
            <p className="eyebrow">{caseStudiesPage.eyebrow}</p>
            <h1 className="cs-head-title">{caseStudiesPage.heading}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead cs-head-intro">{caseStudiesPage.intro}</p>
          </Reveal>
        </header>

        <div className="cs-grid">
          {caseStudies.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08}>
              <CaseStudyCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
