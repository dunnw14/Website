import { skills } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import "./Skills.css";

export default function Skills() {
  return (
    <div className="page">
      <div className="shell">
        <header className="skills-head">
          <Reveal>
            <p className="eyebrow">{skills.eyebrow}</p>
            <h1 className="skills-title">{skills.heading}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead skills-intro">{skills.intro}</p>
          </Reveal>
        </header>

        {skills.sections.map((section, s) => (
          <section className="skills-section" key={section.name} data-accent={section.accentColor}>
            <Reveal>
              <h2 className="skills-section-name">
                <span className="skills-dot" aria-hidden="true" />
                {section.name}
              </h2>
            </Reveal>

            <div className="skills-grid">
              {section.groups.map((group, g) => (
                <Reveal key={group.label} delay={g * 0.07} className="skills-card-wrap">
                  <div className="skills-card">
                    <h3 className="skills-card-label">{group.label}</h3>
                    <ul className="skills-card-list">
                      {group.items.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
