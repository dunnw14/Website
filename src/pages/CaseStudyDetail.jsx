import { Link, useParams } from "react-router-dom";
import { getCaseStudy, getNeighbours } from "../data/content.js";
import { Gallery } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import NotFound from "./NotFound.jsx";
import "./CaseStudyDetail.css";

function Section({ label, children, delay = 0 }) {
  return (
    <Reveal as="section" className="csd-section" delay={delay}>
      <h2 className="section-label">{label}</h2>
      {children}
    </Reveal>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const item = getCaseStudy(slug);

  if (!item) return <NotFound />;

  const { previous, next } = getNeighbours(slug);
  const { backgroundChallenge: bg, role } = item;

  return (
    <article className="page csd">
      <div className="shell-narrow">
        <Link to="/case-studies" className="csd-back">
          <span aria-hidden="true">←</span> All Case Studies
        </Link>

        <header className="csd-head">
          <div className="tag-row">
            {item.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="display csd-title">{item.title}</h1>
          <p className="csd-subtitle">{item.subtitle}</p>
        </header>

        <Section label="Project Overview">
          <p className="csd-prose">{item.overview}</p>
        </Section>

        <Section label="Background &amp; Challenge">
          <p className="csd-prose">{bg.intro}</p>
          <div className="csd-split">
            <div>
              <h3 className="csd-subhead">Challenges</h3>
              <ul className="csd-list">
                {bg.challenges.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="csd-subhead">Goals</h3>
              <ul className="csd-list csd-list-goals">
                {bg.goals.map((entry, i) => (
                  <li key={i}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section label="My Role &amp; Responsibilities">
          <p className="csd-prose">{role.intro}</p>
          <ul className="csd-role-grid">
            {role.responsibilities.map((entry, i) => (
              <li className="csd-role-card" key={i}>
                <strong>{entry.title}</strong>
                <span>{entry.desc}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Process &amp; Approach">
          <ol className="csd-process">
            {item.process.map((step, i) => (
              <li className="csd-phase" key={i}>
                <h3 className="csd-phase-name">{step.phase}</h3>
                <p className="csd-phase-desc">{step.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Work Samples">
          <Gallery items={item.media?.workSamples ?? []} label={`${item.title} work samples`} />
        </Section>

        <Section label="Key Deliverables">
          <ul className="tag-row csd-deliverables">
            {item.keyDeliverables.map((entry, i) => (
              <li className="pill" key={i}>
                {entry}
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Impact &amp; Outcomes">
          <ul className="csd-list csd-list-goals">
            {item.impact.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </Section>

        <Section label="Reflection &amp; Learnings">
          <ul className="csd-list">
            {item.reflection.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </Section>

        <nav className="csd-pager" aria-label="Case study navigation">
          {previous ? (
            <Link to={`/case-studies/${previous.slug}`} className="csd-pager-link is-prev">
              <span className="csd-pager-label">
                <span aria-hidden="true">←</span> Previous
              </span>
              <span className="csd-pager-title">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/case-studies/${next.slug}`} className="csd-pager-link is-next">
              <span className="csd-pager-label">
                Next <span aria-hidden="true">→</span>
              </span>
              <span className="csd-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
