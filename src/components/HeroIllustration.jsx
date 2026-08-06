import "./HeroIllustration.css";

/* A hand-drawn line that starts tangled and settles into a straight
   run, ending in a circled point — the tagline drawn rather than said. */
const LINE =
  "M 8 60 Q 14 22 20 60 Q 26 98 32 60 Q 38 24 44 60 Q 50 96 56 60 " +
  "Q 62 28 68 60 Q 74 92 80 60 Q 87 34 94 60 Q 101 86 108 60 " +
  "Q 116 40 124 60 Q 132 80 140 60 Q 149 47 158 60 Q 167 73 176 60 " +
  "Q 186 54 196 60 Q 206 66 216 60 L 227 60";

/* Deliberately not a circle — the last curve overshoots where it started,
   the way a pen does when you ring something on a wall of stickies. */
const RING =
  "M 228 46 C 236 46 243 52 242 60 C 241 68 235 74 228 74 " +
  "C 220 74 214 68 214 60 C 214 52 220 46 230 45";

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 258 120" className="hero-illustration" aria-hidden="true">
      {/* Offset ghost stroke — reads as a pencil gone over twice */}
      <path d={LINE} className="mark-line mark-ghost" />
      <path d={LINE} className="mark-line" />
      <path d={RING} className="mark-ring" />
      <circle cx="228" cy="60" r="3.5" className="mark-dot" />
    </svg>
  );
}
