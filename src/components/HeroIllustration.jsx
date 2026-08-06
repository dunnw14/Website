import "./HeroIllustration.css";

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 300 400"
      className="hero-illustration"
      aria-hidden="true"
    >
      {/* Hand sketching gesture */}
      <g className="hand-group">
        {/* Arm */}
        <path
          d="M 80 320 Q 120 280 160 250"
          className="sketch-line"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hand fingers - simplified */}
        <path
          d="M 160 250 L 170 230"
          className="sketch-line sketch-thin"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 160 250 L 165 225"
          className="sketch-line sketch-thin"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 160 250 L 160 220"
          className="sketch-line sketch-thin"
          fill="none"
          strokeLinecap="round"
        />

        {/* Pencil/pen */}
        <path
          d="M 165 225 L 200 190"
          className="sketch-accent"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="202" cy="188" r="3" className="sketch-accent" />
      </g>

      {/* Organic flowing lines representing journey/flow */}
      <g className="flow-lines">
        <path
          d="M 200 150 Q 240 120 260 80"
          className="flow-line"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 190 180 Q 250 160 280 130"
          className="flow-line flow-line-secondary"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 210 200 Q 260 190 290 160"
          className="flow-line flow-line-secondary"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Small accent dots/nodes */}
      <g className="accent-dots">
        <circle cx="200" cy="150" r="2.5" className="dot" />
        <circle cx="260" cy="80" r="2.5" className="dot" />
        <circle cx="250" cy="160" r="2" className="dot-secondary" />
        <circle cx="280" cy="130" r="2" className="dot-secondary" />
      </g>
    </svg>
  );
}
