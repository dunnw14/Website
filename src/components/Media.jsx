import { useEffect, useRef, useState } from "react";
import sizes from "../data/media-sizes.json";
import "./Media.css";

/**
 * Turns a path stored in content/*.json into a URL that works both locally
 * and once deployed, wherever the base path (import.meta.env.BASE_URL) puts
 * it. Absolute URLs are passed straight through.
 */
export function assetUrl(src) {
  if (!src) return null;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
}

const isEmbed = (src) => /youtube\.com|youtu\.be|vimeo\.com|player\./i.test(src || "");

/** Pixel size of an original, from scripts/optimise-media.py. */
export const sizeOf = (src) => sizes[src] ?? null;

/**
 * An image served from the resized WebP copies in public/media/opt/, with
 * width/height set so the page never jumps while it loads. Falls back to the
 * original file for anything the optimise script hasn't seen yet.
 */
export function Picture({ src, alt = "", sizes: sizesAttr = "100vw", eager = false, ...rest }) {
  const meta = sizeOf(src);
  if (!meta) {
    return <img src={assetUrl(src)} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" {...rest} />;
  }
  const stem = src.replace(/^media\//, "").replace(/\.[^.]+$/, "");
  const variant = (w) => assetUrl(`media/opt/${stem}-${w}.webp`);
  return (
    <img
      src={variant(meta.widths[meta.widths.length - 1])}
      srcSet={meta.widths.map((w) => `${variant(w)} ${w}w`).join(", ")}
      sizes={sizesAttr}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...rest}
    />
  );
}

/**
 * One artefact on a case study page: the image at page width, its caption,
 * and a button that opens the full-resolution original in a lightbox so
 * journey maps and blueprints can actually be read — including on a phone,
 * where the lightbox scrolls in both directions.
 */
export function Artefact({ item, sizes: sizesAttr, eager = false }) {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  if (!item?.src) return null;

  if (item.type === "video") {
    return (
      <figure className="artefact">
        <div className="artefact-video">
          {isEmbed(item.src) ? (
            <iframe
              src={item.src}
              title={item.caption || item.alt || "Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={assetUrl(item.src)} poster={assetUrl(item.poster) ?? undefined} controls preload="metadata" />
          )}
        </div>
        {item.caption ? <figcaption>{item.caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className="artefact">
      <button
        className="artefact-open"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${item.alt || item.caption || "image"}`}
      >
        <Picture src={item.src} alt={item.alt ?? ""} sizes={sizesAttr} eager={eager} />
        <span className="artefact-plus" aria-hidden="true">
          +
        </span>
      </button>
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => {
          setOpen(false);
          setZoomed(false);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(false);
        }}
      >
        {open ? (
          <>
            <button className="lightbox-close" onClick={() => setOpen(false)} autoFocus>
              Close
            </button>
            <div className={zoomed ? "lightbox-stage is-zoomed" : "lightbox-stage"}>
              {/* The original, not a resized copy: this is where detail matters. */}
              <img
                src={assetUrl(item.src)}
                alt={item.alt ?? ""}
                onClick={() => setZoomed((z) => !z)}
              />
            </div>
          </>
        ) : null}
      </dialog>
    </figure>
  );
}
