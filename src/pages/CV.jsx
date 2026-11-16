import { cv, label } from "../data/content.js";
import { assetUrl } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import useTitle from "../components/useTitle.js";
import "./CV.css";

export default function CV() {
  useTitle("CV");
  const cvFile = assetUrl(cv.cta.file);

  return (
    <div className="shell">
      <header className="page-head cv-head">
        <div>
          <p className="eyebrow">{label(cv.eyebrow)}</p>
          <h1 className="display">{cv.name}</h1>
          <p className="lead">{cv.title}</p>
          <p>
            {cv.location} · {cv.availability}
          </p>
        </div>
        {/* Disabled until a PDF is added — see README, "Adding your CV PDF". */}
        {cvFile ? (
          <a className="btn" href={cvFile} download>
            {cv.cta.label}
          </a>
        ) : (
          <button className="btn" disabled title={cv.cta.fileNote}>
            {cv.cta.label}
          </button>
        )}
      </header>

      <Reveal as="section" className="split">
        <h2>{label(cv.profile.label)}</h2>
        <p className="cv-profile">{cv.profile.text}</p>
      </Reveal>

      <section className="split">
        <h2>Experience</h2>
        <ol className="cv-jobs">
          {cv.experience.map((job, i) => (
            <Reveal as="li" className="cv-job" key={`${job.company}-${i}`}>
              <p className="grey cv-job-when">
                {job.dateRange}
                <br />
                {job.location}
              </p>
              <div>
                <h3>{job.title}</h3>
                <p className="cv-job-company">{job.company}</p>
                <p className="cv-job-desc">{job.description}</p>
                <ul className="rule-list">
                  {job.highlights.map((point, p) => (
                    <li key={p}>{point}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <Reveal as="section" className="split">
        <h2>Core Capabilities</h2>
        <ul className="cv-columns">
          {cv.coreCapabilities.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="split">
        <h2>Industry Experience</h2>
        <ul className="cv-columns">
          {cv.industryExperience.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
