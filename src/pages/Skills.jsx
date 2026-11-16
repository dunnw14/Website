import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { label, skills } from "../data/content.js";
import useTitle from "../components/useTitle.js";
import "./Skills.css";

export default function Skills() {
  useTitle(skills.heading);
  // The home page links straight to a tab by passing { tab } in route state.
  const requested = useLocation().state?.tab;
  const [active, setActive] = useState(
    Number.isInteger(requested) && skills.sections[requested] ? requested : 0
  );
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
    <div className="shell">
        <header className="page-head">
          <p className="eyebrow">{label(skills.eyebrow)}</p>
          <h1 className="display">{skills.heading}</h1>
          <p className="lead">{skills.lead}</p>
          <p>{skills.intro}</p>
        </header>

        <div className="sk-tablist" role="tablist" aria-label="Capability areas">
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
        </div>

        <div
          role="tabpanel"
          id={`sk-panel-${active}`}
          aria-labelledby={`sk-tab-${active}`}
          tabIndex={0}
          key={section.name}
          className="sk-panel"
        >
          <p className="lead sk-section-intro">{section.intro}</p>

          <div className="sk-groups">
            {section.groups.map((group) => (
              <div className="sk-group" key={group.label}>
                <div>
                  <h3>{group.label}</h3>
                  {group.description && <p className="grey">{group.description}</p>}
                </div>
                <ul className="rule-list">
                  {group.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
