import "./HeroIllustration.css";

/* Every edge bows slightly and the last curve stops just past where the
   first began — a square drawn by hand never quite closes. */
const NOTE = "M 3 5 Q 31 2 58 4 Q 61 31 59 58 Q 32 61 5 59 Q 2 32 4 3";

/* Three shortening squiggles read as writing without being letters */
const SCRIBBLE = ["M 13 21 Q 26 18 44 20", "M 13 31 Q 28 28 47 30", "M 13 41 Q 24 39 38 40"];

function Note({ x, y, angle, accent = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle} 31 31)`}>
      <path d={NOTE} className={accent ? "note note-accent" : "note"} />
      {SCRIBBLE.map((d, i) => (
        <path key={i} d={d} className="note-writing" />
      ))}
    </g>
  );
}

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 222 192" className="hero-illustration" aria-hidden="true">
      {/* Drawn first so the notes sit on top of where the lines meet them */}
      <g className="links">
        <path d="M 78 54 Q 100 40 112 52 Q 124 64 146 46" />
        <path d="M 44 90 Q 52 106 68 108 Q 84 110 96 120" />
        <path d="M 178 76 Q 186 100 172 112 Q 160 122 156 136" />
      </g>

      <Note x={14} y={26} angle={-7} />
      <Note x={148} y={12} angle={6} />
      <Note x={92} y={116} angle={-3} accent />
    </svg>
  );
}
