import { useEffect, useState } from "react";
import { assetUrl } from "./Media.jsx";
import "./WorkCollage.css";

/**
 * Real project imagery in the hero, arranged as an overlapping collage
 * rather than a tidy row — inspired by portfolio sites that let the work
 * itself carry the hero. Cycles through crops from every case study project
 * (not just one) so a visitor who lingers, or reloads, sees a different
 * pairing. Every crop was picked for sharpness/composition over anything
 * else available in that project's source material — several projects had
 * options that didn't make the cut (too low-res, or cut off content).
 */
const POOL = [
  { src: "media/hero/time-capsule.png", caption: "Banking · Product design" },
  { src: "media/hero/kfc-presenting.jpg", caption: "QSR · CX strategy" },
  { src: "media/hero/oroton-campaign.jpg", caption: "Fashion retail · Digital product" },
  { src: "media/hero/esssuper-cliff.jpg", caption: "Superannuation · Experience design" },
  { src: "media/hero/fg-tax-ui.png", caption: "Government · Service design" },
  { src: "media/hero/billio-offset.png", caption: "Banking · Product design" },
  { src: "media/hero/kfc-review.jpg", caption: "QSR · CX strategy" },
  { src: "media/hero/oroton-qr.jpg", caption: "Fashion retail · Digital product" },
  { src: "media/hero/aussuper-family.jpg", caption: "Superannuation · Experience design" },
  { src: "media/hero/officeworks-interior.jpg", caption: "Retail · Experience design" },
  { src: "media/hero/one-pay.png", caption: "Banking · Product design" },
  { src: "media/hero/kfc-drivethru.jpg", caption: "QSR · CX strategy" },
  { src: "media/hero/eco-architecture.jpg", caption: "Retail · Customer strategy" },
  { src: "media/hero/pulse-check.png", caption: "Banking · Product design" },
  { src: "media/hero/billio-payment.png", caption: "Banking · Product design" },
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
      <span className="work-collage-index">01</span>

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
