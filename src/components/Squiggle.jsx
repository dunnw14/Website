import "./Squiggle.css";

/**
 * Hand-drawn organic ribbons layered over the hero artwork.
 * Purely decorative, so they're hidden from assistive tech and dropped
 * entirely on small screens where they'd crowd the type.
 */
export function Ribbon({ className = "", variant = "a" }) {
  const paths = {
    // A long meandering ribbon that loops back on itself
    a: "M6 296c34-58 78-96 116-72 34 22 12 74-24 78-40 4-54-44-26-78 32-38 96-40 140-14 52 30 62 96 122 108 56 12 104-26 150-58 44-30 96-52 140-30 40 20 46 74 14 100-30 24-74 8-78-30-4-42 44-66 86-58 46 8 78 46 124 54",
    // A shorter, tighter curl for corners
    b: "M4 74C30 20 92-6 132 22c34 24 22 76-18 82-38 6-58-38-34-70 28-38 92-42 134-16 38 24 48 74 92 88",
  };

  return (
    <svg
      className={`ribbon ribbon-${variant} ${className}`.trim()}
      viewBox={variant === "a" ? "0 0 900 380" : "0 0 340 180"}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Wide pass first = the light outline, narrow pass on top = the fill */}
      <path d={paths[variant]} className="ribbon-outline" />
      <path d={paths[variant]} className="ribbon-fill" />
    </svg>
  );
}

/** Simple filled circle used as a floating accent. */
export function Blob({ className = "", size = 120 }) {
  return (
    <span
      className={`blob ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
