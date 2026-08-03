import { Link } from "react-router-dom";
import { home, caseStudies } from "../data/content.js";
import { MediaFrame } from "../components/Media.jsx";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import CaseStudyCard from "../components/CaseStudyCard.jsx";
import "./Home.css";

export default function Home() {
  const { hero, tagTicker, heroMedia } = home;
  const featured = caseStudies.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-top shell">
          <p className="label hero-label">{hero.eyebrow}</p>
          <h1 className="display hero-title">
            <span className="hero-line">Service</span>
            <span className="hero-line hero-line-wide">Designer</span>
          </h1>
        </div>

        <div className="hero-stage">
          <div className="hero-art">
            <MediaFrame item={heroMedia} ratio="16 / 9" label="Hero image" />
          </div>

          <div className="hero-links shell">
            <Link to="/case-studies" className="dot-link">
              Projects
            </Link>
            <Link to="/cv" className="dot-link is-reversed">
              Say hello
            </Link>
          </div>
        </div>

        <div className="hero-intro shell">
          <p className="hero-tagline">{hero.headline}</p>
          <div className="hero-copy">
            {hero.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
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
                <CaseStudyCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
