import "./JourneyDevice.css";

/**
 * Replaces a literal screenshot collage in the hero with an abstract visual
 * grounded in the actual discipline — a journey line strung with touchpoint
 * nodes, following the Double Diamond phases (Discover, Define, Develop,
 * Deliver). No borrowed product imagery, no stock photography: pure SVG,
 * themed off the site's own tokens so it never needs its own light/dark
 * handling.
 */
export default function JourneyDevice() {
  return (
    <div className="journey-device" aria-hidden="true">
      <div className="journey-blob journey-blob-a" />
      <div className="journey-blob journey-blob-b" />

      <svg viewBox="0 0 520 520" className="journey-svg" fill="none">
        <path
          className="journey-path"
          d="M40 80 C 160 40, 200 190, 320 160 S 480 100, 480 260 S 300 300, 320 420 S 140 480, 60 440"
          stroke="var(--ink)"
          strokeOpacity="0.22"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 10"
        />
        <path
          className="journey-path journey-path-live"
          d="M40 80 C 160 40, 200 190, 320 160 S 480 100, 480 260 S 300 300, 320 420 S 140 480, 60 440"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1"
        />

        <g className="journey-node journey-node-1">
          <circle cx="40" cy="80" r="8" fill="var(--page)" stroke="var(--ink)" strokeWidth="2" />
        </g>
        <g className="journey-node journey-node-2">
          <circle cx="320" cy="160" r="9" fill="var(--page)" stroke="var(--ink)" strokeWidth="2" />
        </g>
        <g className="journey-node journey-node-3 journey-node-hero">
          <circle r="28" fill="var(--accent)" opacity="0.16" className="journey-ping" cx="480" cy="260" />
          <circle cx="480" cy="260" r="13" fill="var(--accent)" />
        </g>
        <g className="journey-node journey-node-4">
          <circle cx="60" cy="440" r="10" fill="var(--page)" stroke="var(--ink)" strokeWidth="2" />
        </g>
      </svg>

      <div className="journey-label journey-label-1">
        <span className="journey-label-index">01</span> Discover
      </div>
      <div className="journey-label journey-label-2">
        <span className="journey-label-index">02</span> Define
      </div>
      <div className="journey-label journey-label-3">
        <span className="journey-label-index">03</span> Develop
      </div>
      <div className="journey-label journey-label-4">
        <span className="journey-label-index">04</span> Deliver
      </div>
    </div>
  );
}
