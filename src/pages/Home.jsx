import { Link } from "react-router-dom";
import { home, caseStudies } from "../data/content.js";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import WorkCard from "../components/WorkCard.jsx";
import GrainField from "../components/GrainField.jsx";
import ServiceBlueprintSketch from "../components/ServiceBlueprintSketch.jsx";
import "./Home.css";

export default function Home() {
  const { hero, tagTicker } = home;
  const featured = caseStudies.slice(0, 4);

  return (
    <>
      <section className="hero">
        <GrainField />

        <div className="hero-inner shell">
          <div className="hero-text">
            <Reveal delay={0.05}>
              <p className="hero-eyebrow">{hero.greeting}</p>
            </Reveal>
            <Reveal delay={0.12} as="h1" className="hero-headline">
              {hero.tagline}
            </Reveal>
            <Reveal delay={0.2}>
              <p className="hero-lede">{hero.body[0]}</p>
            </Reveal>
            <Reveal delay={0.28} className="hero-ctas">
              <Link to="/case-studies" className="hero-btn">
                <span>See my work</span>
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 13 13 3m0 0H5.5M13 3v7.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/cv" className="hero-link">
                View my CV
              </Link>
            </Reveal>
          </div>

          <div className="hero-visual">
            <ServiceBlueprintSketch />
          </div>
        </div>
      </section>

      <Marquee items={tagTicker} />

      <section className="home-work">
        <div className="shell">
          <Reveal className="home-work-head">
            <p className="label home-work-eyebrow">Selected work</p>
            <h2 className="home-work-title">A few things I've shaped</h2>
            <Link to="/case-studies" className="btn-outline">
              All case studies
            </Link>
          </Reveal>

          <div className="home-work-grid">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 2) * 0.08} className="home-work-item">
                <WorkCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
