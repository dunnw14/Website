import { caseStudies, caseStudiesPage } from "../data/content.js";
import WorkCard from "../components/WorkCard.jsx";
import Reveal from "../components/Reveal.jsx";
import "./CaseStudies.css";

export default function CaseStudies() {
  return (
    <div className="page csl">
      <div className="shell">
        <header className="csl-head">
          <Reveal>
            <p className="label csl-eyebrow">{caseStudiesPage.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="csl-title">{caseStudiesPage.heading}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="csl-intro">{caseStudiesPage.intro}</p>
          </Reveal>
        </header>

        <div className="csl-grid">
          {caseStudies.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.08} className="csl-grid-item">
              <WorkCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
