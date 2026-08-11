import "./GrainField.css";

/**
 * Decorative hero background: two slow-drifting colour blobs plus an SVG
 * turbulence filter for film grain. No external image assets — the grain is
 * generated in-browser via feTurbulence, so it costs nothing to ship.
 */
export default function GrainField() {
  return (
    <div className="grain-field" aria-hidden="true">
      <div className="grain-blob grain-blob-a" />
      <div className="grain-blob grain-blob-b" />
      <svg className="grain-noise">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
