import { caseStudies, caseStudiesPage } from "../data/content.js";
import CaseStudyCard from "../components/CaseStudyCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./CaseStudies.css";

export default function CaseStudies() {
  return (
    <div className="page">
      <div className="shell">
        <header className="csl-head">
          <Reveal>
            <p className="label">{caseStudiesPage.eyebrow}</p>
            <h1 className="display csl-title">{caseStudiesPage.heading}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead csl-intro">{caseStudiesPage.intro}</p>
          </Reveal>
        </header>

        <div className="csl-grid">
          {caseStudies.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 2) * 0.08}>
              <CaseStudyCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
