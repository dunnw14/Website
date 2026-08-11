import { useEffect, useState } from "react";
import { assetUrl } from "./Media.jsx";
import "./WorkCollage.css";

/**
 * Real project imagery in the hero: two clean, axis-aligned landscape
 * frames — one larger, one smaller overlapping its corner — cycling
 * through crops from every case study project. Every crop here is
 * naturally landscape (or cropped to read as one); narrow portrait phone
 * screens live in the case study pages, not here, since forcing them into
 * a landscape frame just cropped away the content that made them legible.
 */
const POOL = [
  { src: "media/hero/oroton-campaign.jpg", caption: "Fashion retail · Digital product" },
  { src: "media/hero/kfc-presenting.jpg", caption: "QSR · CX strategy" },
  { src: "media/hero/aussuper-family.jpg", caption: "Superannuation · Experience design" },
  { src: "media/hero/fg-tax-ui.png", caption: "Government · Service design" },
  { src: "media/hero/eco-architecture.jpg", caption: "Retail · Customer strategy" },
  { src: "media/hero/oroton-qr.jpg", caption: "Fashion retail · Digital product" },
  { src: "media/hero/kfc-review.jpg", caption: "QSR · CX strategy" },
  { src: "media/hero/esssuper-cliff.jpg", caption: "Superannuation · Experience design" },
  { src: "media/hero/billio-landscape.png", caption: "Banking · Product design" },
  { src: "media/hero/officeworks-interior.jpg", caption: "Retail · Experience design" },
];

const INTERVAL_MS = 4200;

export default function WorkCollage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % POOL.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const a = POOL[index];
  const b = POOL[(index + Math.floor(POOL.length / 2)) % POOL.length];

  return (
    <div className="work-collage" aria-hidden="true">
      <div className="work-collage-tile work-collage-tile-a">
        <img key={a.src} src={assetUrl(a.src)} alt="" loading="eager" />
      </div>

      <div className="work-collage-tile work-collage-tile-b">
        <img key={b.src} src={assetUrl(b.src)} alt="" loading="eager" />
      </div>

      <span key={a.caption + index} className="work-collage-caption">
        {a.caption}
      </span>
    </div>
  );
}
