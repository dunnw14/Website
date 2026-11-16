import { Link } from "react-router-dom";
import { caseStudies, caseStudiesPage, featureImage, label, metaLine, outcomeOf } from "../data/content.js";
import { Picture } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import useTitle from "../components/useTitle.js";
import "./CaseStudies.css";

export default function CaseStudies() {
  useTitle(caseStudiesPage.heading);

  return (
    <div className="shell">
      <header className="page-head">
        <p className="eyebrow">{label(caseStudiesPage.eyebrow)}</p>
        <h1 className="display">{caseStudiesPage.heading}</h1>
        <p className="lead">{caseStudiesPage.intro}</p>
      </header>

      <ul className="csl">
        {caseStudies.map((item, i) => {
          const image = featureImage(item);
          return (
            <Reveal as="li" key={item.slug}>
              <Link to={`/case-studies/${item.slug}`} className="csl-item">
                <div className="csl-text">
                  <h2>{item.title}</h2>
                  <p className="grey">{metaLine(item)}</p>
                  <p className="csl-outcome">{outcomeOf(item)}</p>
                </div>
                {image ? (
                  <div className="csl-media">
                    <Picture
                      src={image.src}
                      alt={image.alt ?? ""}
                      sizes="(max-width: 820px) 100vw, 55vw"
                      eager={i === 0}
                    />
                  </div>
                ) : null}
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
