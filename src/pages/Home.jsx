import { Link } from "react-router-dom";
import home from "../../content/home.json";
import { caseStudies } from "../data/content.js";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import CaseStudyCard from "../components/CaseStudyCard.jsx";
import "./Home.css";

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wraps the words listed in `headlineEmphasis` so they can be underlined. */
function renderHeadline(text, emphasis = []) {
  if (!emphasis.length) return text;
  const pattern = new RegExp(`(${emphasis.map(escapeRegex).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    emphasis.includes(part) ? (
      <em className="hero-em" key={i}>
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Home() {
  const { hero, tagTicker } = home;
  const featured = caseStudies.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-inner shell">
          <div className="hero-lede">
            <p className="eyebrow hero-eyebrow">{hero.eyebrow}</p>
            <h1 className="hero-title">
              {renderHeadline(hero.headline, hero.headlineEmphasis)}
            </h1>

            <div className="hero-actions">
              <Link to="/case-studies" className="btn">
                See my work
                <svg
                  className="arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 8h11m0 0L9.5 4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/cv" className="btn-quiet">
                View my CV
              </Link>
            </div>
          </div>

          <div className="hero-body">
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
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="home-work-title">Recent engagements</h2>
            </div>
            <Link to="/case-studies" className="btn-quiet home-work-all">
              All case studies
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2.5 8h11m0 0L9.5 4m4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>

          <div className="home-work-grid">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08}>
                <CaseStudyCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
