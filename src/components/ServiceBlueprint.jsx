import "./ServiceBlueprint.css";

export default function ServiceBlueprint() {
  return (
    <svg
      viewBox="0 0 1000 600"
      className="service-blueprint-bg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Subtle horizontal swimlanes */}
      <line x1="0" y1="80" x2="1000" y2="80" className="blueprint-lane" />
      <line x1="0" y1="200" x2="1000" y2="200" className="blueprint-lane" />
      <line x1="0" y1="320" x2="1000" y2="320" className="blueprint-lane" />
      <line x1="0" y1="440" x2="1000" y2="440" className="blueprint-lane" />

      {/* Vertical timeline markers - very subtle */}
      <line x1="120" y1="0" x2="120" y2="600" className="blueprint-timeline" />
      <line x1="300" y1="0" x2="300" y2="600" className="blueprint-timeline" />
      <line x1="480" y1="0" x2="480" y2="600" className="blueprint-timeline" />
      <line x1="660" y1="0" x2="660" y2="600" className="blueprint-timeline" />
      <line x1="840" y1="0" x2="840" y2="600" className="blueprint-timeline" />

      {/* Minimal accent dots */}
      <circle cx="120" cy="80" r="3" className="blueprint-dot" />
      <circle cx="300" cy="200" r="3" className="blueprint-dot" />
      <circle cx="480" cy="320" r="3" className="blueprint-dot" />
      <circle cx="660" cy="440" r="3" className="blueprint-dot" />
      <circle cx="840" cy="200" r="3" className="blueprint-dot" />
      <circle cx="200" cy="320" r="2" className="blueprint-dot-small" />
      <circle cx="500" cy="80" r="2" className="blueprint-dot-small" />
      <circle cx="750" cy="440" r="2" className="blueprint-dot-small" />
    </svg>
  );
}
