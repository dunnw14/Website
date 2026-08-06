import { Link } from "react-router-dom";
import { home, caseStudies } from "../data/content.js";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import CaseStudyCard from "../components/CaseStudyCard.jsx";
import ServiceBlueprint from "../components/ServiceBlueprint.jsx";
import "./Home.css";

export default function Home() {
  const { hero, tagTicker } = home;
  const featured = caseStudies.slice(0, 4);

  return (
    <>
      <section className="hero">
        <ServiceBlueprint />

        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-greeting shell-narrow">
              <p className="hero-greeting-text">{hero.greeting}</p>
            </div>

            <div className="hero-tagline-section shell-narrow">
              <p className="hero-tagline">{hero.tagline}</p>
            </div>

            <div className="hero-copy-section shell-narrow">
              <div className="hero-copy">
                {hero.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="hero-links shell-narrow">
              <Link to="/case-studies" className="btn">
                View work
              </Link>
              <Link to="/cv" className="link-quiet">
                Say hello
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Marquee items={tagTicker} />

      <section className="home-work">
        <div className="shell">
          <Reveal className="home-work-head">
            <h2 className="display home-work-title">Selected work</h2>
            <Link to="/case-studies" className="btn-outline">
              All case studies
            </Link>
          </Reveal>

          <div className="home-work-grid">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 2) * 0.08}>
                <CaseStudyCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
