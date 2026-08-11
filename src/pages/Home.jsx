import { useRef } from "react";
import { Link } from "react-router-dom";
import { home, caseStudies } from "../data/content.js";
import { assetUrl } from "../components/Media.jsx";
import Marquee from "../components/Marquee.jsx";
import Reveal from "../components/Reveal.jsx";
import WorkCard from "../components/WorkCard.jsx";
import GrainField from "../components/GrainField.jsx";
import "./Home.css";

const COLLAGE = [
  { src: "media/bank-work-concept-one-pay.png", alt: "" },
  { src: "media/bank-work-concept-time-capsule.png", alt: "" },
  { src: "media/bank-work-concept-pulse-check.png", alt: "" },
];

export default function Home() {
  const { hero, tagTicker } = home;
  const featured = caseStudies.slice(0, 4);
  const heroRef = useRef(null);

  // Subtle pointer-driven parallax on the floating image stack. Purely
  // decorative, so a missing/failed pointer event just leaves it static.
  const handlePointerMove = (e) => {
    const node = heroRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--px", x.toFixed(3));
    node.style.setProperty("--py", y.toFixed(3));
  };

  return (
    <>
      <section className="hero" ref={heroRef} onPointerMove={handlePointerMove}>
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

          <div className="hero-collage" aria-hidden="true">
            {COLLAGE.map((item, i) => (
              <div className={`hero-collage-item hero-collage-item-${i + 1}`} key={item.src}>
                <img src={assetUrl(item.src)} alt="" loading="eager" />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span />
          Scroll
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
