import { skills } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import "./Skills.css";

export default function Skills() {
  return (
    <div className="page">
      <div className="shell">
        <header className="sk-head">
          <Reveal>
            <p className="label">{skills.eyebrow}</p>
            <h1 className="sk-title">{skills.heading}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead sk-lead">{skills.lead}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sk-intro">{skills.intro}</p>
          </Reveal>
        </header>

        {skills.sections.map((section, s) => (
          <section className="sk-section" key={section.name}>
            <Reveal className="sk-section-head">
              <h2 className="sk-section-name">
                <span className="sk-dot" aria-hidden="true" />
                {section.name}
              </h2>
              <p className="sk-section-intro">{section.intro}</p>
            </Reveal>

            <div className="sk-groups">
              {section.groups.map((group, g) => (
                <Reveal as="div" className="sk-group" key={group.label} delay={g * 0.06}>
                  <div className="sk-group-about">
                    <h3 className="sk-group-label">{group.label}</h3>
                    {group.description && <p className="sk-group-desc">{group.description}</p>}
                  </div>
                  <ul className="sk-group-items">
                    {group.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
