import { cv } from "../data/content.js";
import { assetUrl } from "../components/Media.jsx";
import Reveal from "../components/Reveal.jsx";
import "./CV.css";

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 2v8m0 0L4.8 6.8M8 10l3.2-3.2M2.8 12.2h10.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CV() {
  const cvFile = assetUrl(cv.cta.file);

  return (
    <div className="page">
      <div className="shell-narrow">
        <header className="cv-head">
          <Reveal>
            <p className="label">{cv.eyebrow}</p>
            <h1 className="cv-name">{cv.name}</h1>
            <p className="cv-role">{cv.title}</p>
          </Reveal>

          <Reveal delay={0.1} className="cv-meta">
            <p className="cv-meta-item">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="6" r="1.8" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              {cv.location}
            </p>
            <p className="cv-meta-item">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="m2.6 4.5 5.4 4 5.4-4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              {cv.availability}
            </p>
          </Reveal>
        </header>

        <Reveal as="section" className="cv-profile">
          <h2 className="section-label">{cv.profile.label}</h2>
          <p className="cv-profile-text">{cv.profile.text}</p>
        </Reveal>

        <section className="cv-section">
          <Reveal>
            <h2 className="section-label">Experience</h2>
          </Reveal>

          <ol className="cv-timeline">
            {cv.experience.map((job, i) => (
              <Reveal as="li" className="cv-job" key={`${job.company}-${i}`} delay={i * 0.06}>
                <div className="cv-job-when">
                  <p className="cv-job-dates">{job.dateRange}</p>
                  <p className="cv-job-place">{job.location}</p>
                </div>

                <div className="cv-job-what">
                  <h3 className="cv-job-title">{job.title}</h3>
                  <p className="cv-job-company">{job.company}</p>
                  <p className="cv-job-desc">{job.description}</p>
                  <ul className="cv-job-points">
                    {job.highlights.map((point, p) => (
                      <li key={p}>{point}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <Reveal as="section" className="cv-section">
          <h2 className="section-label">Core Capabilities</h2>
          <ul className="cv-capabilities">
            {cv.coreCapabilities.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="cv-section">
          <h2 className="section-label">Industry Experience</h2>
          <ul className="tag-row cv-industries">
            {cv.industryExperience.map((entry) => (
              <li className="pill" key={entry}>
                {entry}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="cv-cta">
          {cvFile ? (
            <a className="btn" href={cvFile} download>
              <DownloadIcon />
              {cv.cta.label}
            </a>
          ) : (
            <button className="btn" disabled title={cv.cta.fileNote}>
              <DownloadIcon />
              {cv.cta.label}
            </button>
          )}
        </Reveal>
      </div>
    </div>
  );
}
