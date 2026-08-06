import "./HeroIllustration.css";

/* A fragment of a system map with the labels taken away — just the nodes
   and what runs between them. Every line bows a little so none of it
   reads as machine-drawn. */
const LINKS = [
  "M 32 41 Q 62 27 91 24",
  "M 102 26 Q 136 35 163 55",
  "M 29 51 Q 41 81 55 106",
  "M 64 111 Q 95 107 122 99",
  "M 133 91 Q 150 77 164 64",
  "M 55 119 Q 47 141 41 153",
];

/* The two that meet the focal node carry the accent, so emphasis builds
   toward it rather than being evenly spread */
const WARM_LINKS = ["M 64 111 Q 95 107 122 99", "M 133 101 Q 159 115 181 131"];

const NODES = [
  [28, 44],
  [96, 22],
  [168, 59],
  [58, 112],
  [186, 135],
  [39, 158],
];

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 214 176" className="hero-illustration" aria-hidden="true">
      <g className="links">
        {LINKS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g className="links links-warm">
        {WARM_LINKS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g className="nodes">
        {NODES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>

      {/* Focal point — ringed by hand, so the ring overshoots its start */}
      <circle cx="128" cy="96" r="3.6" className="node-focus" />
      <path
        d="M 128 87 C 133 87 137 91 137 96 C 137 101 133 105 128 105
           C 123 105 119 101 119 96 C 119 91 123 87 129 86.6"
        className="node-ring"
      />
    </svg>
  );
}
