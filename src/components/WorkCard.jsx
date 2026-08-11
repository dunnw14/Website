import { Link } from "react-router-dom";
import { assetUrl } from "./Media.jsx";
import "./WorkCard.css";

const GRADIENT_COUNT = 6;

/**
 * A full-bleed, image-led project card for the redesign concept. Real
 * cardImage renders as a photograph; case studies without one yet get a
 * curated gradient (picked deterministically by index, not random) so an
 * empty slot still reads as a deliberate visual, not a placeholder.
 */
export default function WorkCard({ item, index = 0 }) {
  const src = item.media?.cardImage ? assetUrl(item.media.cardImage) : null;
  const number = String(index + 1).padStart(2, "0");
  const gradientClass = `wc-gradient-${(index % GRADIENT_COUNT) + 1}`;

  return (
    <Link to={`/case-studies/${item.slug}`} className="wc">
      <div className={`wc-media ${src ? "" : gradientClass}`}>
        {src ? (
          <img className="wc-img" src={src} alt={item.media?.cardImageAlt ?? ""} loading="lazy" />
        ) : null}
        <div className="wc-scrim" aria-hidden="true" />
        <span className="wc-number" aria-hidden="true">
          {number}
        </span>
        <span className="wc-arrow" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 13 13 3m0 0H5.5M13 3v7.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="wc-copy">
          <p className="wc-tags">{item.tags.slice(0, 2).join(" · ")}</p>
          <h3 className="wc-title">{item.title}</h3>
        </div>
      </div>
    </Link>
  );
}
