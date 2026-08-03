import { useState } from "react";
import "./Media.css";

/**
 * Turns a path stored in content/*.json into a URL that works both locally and
 * on GitHub Pages (where everything is served under /Website/).
 * Absolute URLs are passed straight through.
 */
export function assetUrl(src) {
  if (!src) return null;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
}

const isEmbed = (src) => /youtube\.com|youtu\.be|vimeo\.com|player\./i.test(src || "");

/**
 * One media slot. Renders the real asset once `src` is filled in inside
 * content/case-studies.json — until then it shows a labelled placeholder so
 * the layout is already correct.
 */
export function MediaFrame({ item, ratio = "16 / 10", label = "Image" }) {
  const [failed, setFailed] = useState(false);
  const src = assetUrl(item?.src);
  const type = item?.type ?? "image";

  const showPlaceholder = !src || failed;

  return (
    <figure className="media" style={{ "--ratio": ratio }}>
      <div className="media-frame">
        {showPlaceholder ? (
          <Placeholder label={type === "video" ? "Video" : label} failed={failed} />
        ) : type === "video" ? (
          isEmbed(item.src) ? (
            <iframe
              className="media-el"
              src={src}
              title={item.caption || "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="media-el"
              src={src}
              poster={assetUrl(item.poster) ?? undefined}
              controls
              preload="metadata"
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <img
            className="media-el"
            src={src}
            alt={item.alt ?? ""}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {item?.caption ? <figcaption className="media-caption">{item.caption}</figcaption> : null}
    </figure>
  );
}

function Placeholder({ label, failed }) {
  return (
    <div className="media-placeholder" role="img" aria-label={`${label} placeholder`}>
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none" aria-hidden="true">
        {label === "Video" ? (
          <>
            <rect x="3" y="7" width="26" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M13.6 12.8 20.5 16l-6.9 3.2v-6.4Z" fill="currentColor" />
          </>
        ) : (
          <>
            <rect x="3" y="6" width="26" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="11.5" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.4" />
            <path d="m5 22 6.6-6.1a2 2 0 0 1 2.7 0L20 21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="m18 19 3.3-3a2 2 0 0 1 2.7 0L27 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </>
        )}
      </svg>
      <span className="media-placeholder-label">
        {failed ? `${label} not found` : `${label} placeholder`}
      </span>
    </div>
  );
}

/**
 * The "Work Samples" carousel: one item at a time with prev/next and a counter,
 * matching the layout of the original site.
 */
export function Gallery({ items = [], label = "Work samples" }) {
  const [index, setIndex] = useState(0);
  if (!items.length) return null;

  const total = items.length;
  const go = (dir) => setIndex((i) => Math.min(total - 1, Math.max(0, i + dir)));

  return (
    <div className="gallery" aria-roledescription="carousel" aria-label={label}>
      <div className="gallery-viewport">
        <div className="gallery-track" style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}>
          {items.map((item, i) => (
            <div
              className="gallery-slide"
              key={i}
              aria-hidden={i !== index}
              // Keeps hidden slides out of the tab order.
              inert={i !== index ? "" : undefined}
            >
              <MediaFrame item={item} label={`Work sample ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {total > 1 ? (
        <div className="gallery-controls">
          <button className="gallery-btn" onClick={() => go(-1)} disabled={index === 0}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <span className="gallery-count" aria-live="polite">
            {index + 1} / {total}
          </span>
          <button className="gallery-btn" onClick={() => go(1)} disabled={index === total - 1}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
