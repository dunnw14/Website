import "./ServiceBlueprint.css";

export default function ServiceBlueprint() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="service-blueprint"
      aria-hidden="true"
    >
      {/* Faint background grid lines (swimlanes) */}
      <line x1="0" y1="40" x2="400" y2="40" className="blueprint-lane" />
      <line x1="0" y1="100" x2="400" y2="100" className="blueprint-lane" />
      <line x1="0" y1="160" x2="400" y2="160" className="blueprint-lane" />
      <line x1="0" y1="220" x2="400" y2="220" className="blueprint-lane" />

      {/* Vertical timeline markers */}
      <line x1="60" y1="0" x2="60" y2="300" className="blueprint-timeline" />
      <line x1="150" y1="0" x2="150" y2="300" className="blueprint-timeline" />
      <line x1="240" y1="0" x2="240" y2="300" className="blueprint-timeline" />
      <line x1="330" y1="0" x2="330" y2="300" className="blueprint-timeline" />

      {/* Accent touchpoints */}
      <circle cx="60" cy="40" r="4" className="blueprint-touchpoint" />
      <circle cx="150" cy="100" r="4" className="blueprint-touchpoint" />
      <circle cx="240" cy="160" r="4" className="blueprint-touchpoint" />
      <circle cx="330" cy="220" r="4" className="blueprint-touchpoint" />

      {/* Secondary touchpoints */}
      <circle cx="120" cy="160" r="3" className="blueprint-touchpoint-secondary" />
      <circle cx="210" cy="40" r="3" className="blueprint-touchpoint-secondary" />
      <circle cx="290" cy="100" r="3" className="blueprint-touchpoint-secondary" />
      <circle cx="370" cy="220" r="3" className="blueprint-touchpoint-secondary" />
    </svg>
  );
}
