import { useRef, useState } from "react";
import { skills } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import "./Skills.css";

export default function Skills() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const section = skills.sections[active];

  function focusTab(index) {
    const count = skills.sections.length;
    const next = (index + count) % count;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event, index) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(skills.sections.length - 1);
        break;
      default:
        break;
    }
  }

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

        <Reveal delay={0.18} className="sk-tablist" role="tablist" aria-label="Capability areas">
          {skills.sections.map((s, i) => (
            <button
              key={s.name}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`sk-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`sk-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className="sk-tab"
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
            >
              {s.name}
            </button>
          ))}
        </Reveal>

        <div
          role="tabpanel"
          id={`sk-panel-${active}`}
          aria-labelledby={`sk-tab-${active}`}
          tabIndex={0}
          key={section.name}
          className="sk-panel"
        >
          <Reveal>
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
        </div>
      </div>
    </div>
  );
}
