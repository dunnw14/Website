import { Link, useParams } from "react-router-dom";
import { getCaseStudy, getNeighbours, metaLine, sizeRatio } from "../data/content.js";
import { Artefact } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import useTitle from "../components/useTitle.js";
import NotFound from "./NotFound.jsx";
import "./CaseStudyDetail.css";

function Section({ label, children }) {
  return (
    <Reveal as="section" className="split">
      <h2>{label}</h2>
      <div>{children}</div>
    </Reveal>
  );
}

/**
 * One template for every case study, in a fixed order:
 * overview → challenge → my role → approach → key artefacts → outcome.
 */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const item = getCaseStudy(slug);
  useTitle(item?.title ?? "Page not found");

  if (!item) return <NotFound />;

  const { previous, next } = getNeighbours(slug);
  const { backgroundChallenge: bg, role } = item;
  const hero = item.media?.hero;
  const samples = (item.media?.workSamples ?? []).filter((m) => m?.src);

  return (
    <article className="cs">
      <div className="shell">
        <Link to="/case-studies" className="link grey cs-back">
          <span aria-hidden="true">←</span> All Case Studies
        </Link>

        <header className="cs-head">
          <p className="eyebrow">{metaLine(item)}</p>
          <h1 className="display">{item.title}</h1>
          <p className="lead cs-overview">{item.overview}</p>
        </header>
      </div>

      {hero?.src ? (
        <div className="cs-band">
          <div className={hero.type === "video" ? "shell cs-band-video" : "shell"}>
            <Artefact item={hero} sizes="(max-width: 1480px) 94vw, 1400px" eager />
          </div>
        </div>
      ) : null}

      <div className="shell cs-body">
        <Section label="Background &amp; Challenge">
          <p className="lead measure">{bg.intro}</p>
          <div className="cs-two">
            <div>
              <h3>Challenges</h3>
              <ul className="rule-list">
                {bg.challenges.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Goals</h3>
              <ul className="rule-list">
                {bg.goals.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section label="My Role &amp; Responsibilities">
          <p className="lead measure">{role.intro}</p>
          <dl className="cs-rows">
            {role.responsibilities.map((entry, i) => (
              <div key={i}>
                <dt>{entry.title}</dt>
                <dd>{entry.desc}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section label="Process &amp; Approach">
          <ol className="cs-rows">
            {item.process.map((step, i) => (
              <li key={i}>
                <h3>{step.phase}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {samples.length ? (
        <section className="cs-band cs-samples" aria-labelledby="cs-samples">
          <div className="shell">
            <h2 id="cs-samples">Work Samples</h2>
            <div className="cs-sample-grid">
              {samples.map((sample, i) => (
                // Very wide artefacts (journey maps, process strips) take the
                // full width; squarer ones sit two-up.
                <Reveal key={i} className={sizeRatio(sample) > 2.1 ? "is-wide" : ""}>
                  <Artefact
                    item={sample}
                    sizes={
                      sizeRatio(sample) > 2.1
                        ? "(max-width: 1480px) 94vw, 1400px"
                        : "(max-width: 820px) 94vw, 46vw"
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="shell cs-body">
        <Section label="Key Deliverables">
          <ul className="rule-list measure">
            {item.keyDeliverables.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </Section>

        <Section label="Impact &amp; Outcomes">
          <ul className="cs-impact">
            {item.impact.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </Section>

        <Section label="Reflection &amp; Learnings">
          <ul className="rule-list measure">
            {item.reflection.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </Section>

        <nav className="cs-pager" aria-label="Case study navigation">
          {previous ? (
            <Link to={`/case-studies/${previous.slug}`} className="cs-pager-link">
              <span className="grey">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="cs-pager-title">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/case-studies/${next.slug}`} className="cs-pager-link is-next">
              <span className="grey">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="cs-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
