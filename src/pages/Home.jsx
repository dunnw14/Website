import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { home, cv, skills, caseStudies, caseStudiesPage, catalogue, indexImage, metaLine, outcomeOf } from "../data/content.js";
import { Picture } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import useTitle from "../components/useTitle.js";
import "./Home.css";

export default function Home() {
  useTitle(null);
  const { hero } = home;
  const strip = useRef(null);

  // The strip drifts sideways on its own, slowly, and turns round at each end.
  // It holds still while the pointer or keyboard focus is on it, for a few
  // seconds after anyone scrolls it by hand, when it is off screen, and
  // whenever it has been paused with the button. It never starts for people
  // who ask for reduced motion.
  const [paused, setPaused] = useState(false);
  const hold = useRef({ hover: false, until: 0, visible: true });

  useEffect(() => {
    const node = strip.current;
    if (!node || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const SPEED = 22; // pixels per second
    let dir = 1;
    let pos = node.scrollLeft;
    let last = performance.now();
    let frame;

    const tick = (now) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const h = hold.current;
      if (!h.hover && h.visible && now > h.until) {
        const max = node.scrollWidth - node.clientWidth;
        // Pick up from wherever a manual scroll left it.
        if (Math.abs(node.scrollLeft - pos) > 2) pos = node.scrollLeft;
        pos += dir * SPEED * dt;
        if (pos >= max) {
          pos = max;
          dir = -1;
        } else if (pos <= 0) {
          pos = 0;
          dir = 1;
        }
        node.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => {
      hold.current.visible = entry.isIntersecting;
    });
    observer.observe(node);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused]);

  const holdFor = (ms) => {
    hold.current.until = performance.now() + ms;
  };

  const scrollStrip = (dir) => {
    const node = strip.current;
    if (!node) return;
    holdFor(6000);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: dir * node.clientWidth * 0.7, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <section className="shell home-intro">
        <div>
          <h1 className="display">{hero.tagline}</h1>
          <p className="lead grey">{hero.body[0]}</p>
        </div>
        {/* Sits opposite the statement on wide screens, under it on phones. */}
        <p className="home-intro-aside">{hero.body[1]}</p>
      </section>

      {/* The catalogue strip: each project's artefact at its own proportions,
          bottoms aligned like prints on a shelf. Sized from the viewport
          height so it always starts on the first screen. */}
      <section className="home-band" aria-label="Selected work">
        <div
          className="home-strip"
          ref={strip}
          onPointerEnter={() => (hold.current.hover = true)}
          onPointerLeave={() => (hold.current.hover = false)}
          onFocus={() => (hold.current.hover = true)}
          onBlur={() => (hold.current.hover = false)}
          onWheel={() => holdFor(4000)}
          onTouchStart={() => holdFor(6000)}
          onTouchMove={() => holdFor(6000)}
        >
          {catalogue.map(({ item, image, scale }, i) => (
            <Link key={item.slug} to={`/case-studies/${item.slug}`} className="home-strip-item" style={{ "--f": scale }}>
              <Picture src={image.src} alt={image.alt ?? ""} sizes="(max-width: 820px) 80vw, 640px" eager={i < 3} />
              <span className="home-strip-title">{item.title}</span>
              <span className="grey">{metaLine(item)}</span>
            </Link>
          ))}
        </div>
        <div className="shell home-strip-controls">
          <button
            className="home-strip-pause"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Play" : "Pause"}
            aria-pressed={paused}
          >
            <span aria-hidden="true">{paused ? "▶" : "❙❙"}</span>
          </button>
          <button onClick={() => scrollStrip(-1)} aria-label="Previous">
            <span aria-hidden="true">←</span>
          </button>
          <button onClick={() => scrollStrip(1)} aria-label="Next">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="shell" id="work">
        <div className="split home-work">
          <div className="split-label">
            <h2>{caseStudiesPage.heading}</h2>
            <p>{caseStudiesPage.intro}</p>
          </div>
          <ul className="home-rows">
            {caseStudies.map((item) => (
              <Reveal as="li" key={item.slug}>
                <Link to={`/case-studies/${item.slug}`} className="home-row">
                  <span className="home-row-thumb" aria-hidden="true">
                    <Picture src={indexImage(item).src} alt="" sizes="200px" />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="grey home-row-meta">{metaLine(item)}</p>
                  <p className="home-row-outcome">{outcomeOf(item)}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* About, as a credibility snapshot: what I do, where I've done it, and
          for whom. Every line comes from the Skills and CV content, and each
          column leads into the page that has the detail. */}
      <section className="shell" id="about">
        <div className="split home-about">
          <h2>{hero.greeting}</h2>
          <div>
            <Reveal>
              <p className="home-about-lead">{hero.body[2]}</p>
            </Reveal>

            <div className="home-facts">
              <Reveal className="home-fact">
                <h3>{skills.heading}</h3>
                <ul>
                  {skills.sections.map((section, i) => (
                    <li key={section.name}>
                      <Link to="/skills" state={{ tab: i }} className="link">
                        {section.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="home-fact" delay={0.06}>
                <h3>Experience</h3>
                <ul>
                  {cv.experience.map((job) => (
                    <li key={job.company}>
                      {job.company}
                      <span className="grey">{job.dateRange}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/cv" className="link link-green home-fact-more">
                  View my CV
                </Link>
              </Reveal>

              <Reveal className="home-fact" delay={0.12}>
                <h3>Industry Experience</h3>
                <ul>
                  {cv.industryExperience.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
