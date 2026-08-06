import "./HeroIllustration.css";

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 280 320"
      className="hero-illustration"
      aria-hidden="true"
    >
      {/* Nested organic circles - representing layers/complexity */}
      <g className="circles-group">
        {/* Outer circle - largest */}
        <circle
          cx="140"
          cy="140"
          r="110"
          className="circle circle-1"
        />

        {/* Mid circle */}
        <circle
          cx="140"
          cy="140"
          r="75"
          className="circle circle-2"
        />

        {/* Inner circle */}
        <circle
          cx="140"
          cy="140"
          r="45"
          className="circle circle-3"
        />

        {/* Center accent circle */}
        <circle
          cx="140"
          cy="140"
          r="15"
          className="circle circle-center"
        />
      </g>

      {/* Flowing connector lines - representing connections/flow */}
      <g className="connectors">
        <path
          d="M 140 30 Q 180 70 180 140"
          className="connector-line"
        />
        <path
          d="M 250 140 Q 210 100 180 70"
          className="connector-line"
        />
        <path
          d="M 140 250 Q 100 200 70 170"
          className="connector-line"
        />
        <path
          d="M 30 140 Q 80 170 110 200"
          className="connector-line"
        />
      </g>

      {/* Small accent elements */}
      <g className="accents">
        <circle cx="180" cy="70" r="3" className="accent-dot" />
        <circle cx="250" cy="140" r="3" className="accent-dot" />
        <circle cx="140" cy="250" r="3" className="accent-dot" />
        <circle cx="30" cy="140" r="3" className="accent-dot" />
      </g>
    </svg>
  );
}
