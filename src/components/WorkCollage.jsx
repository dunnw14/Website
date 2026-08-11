import { assetUrl } from "./Media.jsx";
import "./WorkCollage.css";

/**
 * Real project imagery in the hero, arranged as an overlapping collage
 * rather than a tidy row — inspired by portfolio sites that let the work
 * itself carry the hero. Both crops come from the Major Australian Bank
 * sprint (public/media/hero/): a clean product screen and a UI moment with
 * real human photography in it, picked for quality over any other frame in
 * that project's source material at this display size.
 */
export default function WorkCollage() {
  return (
    <div className="work-collage" aria-hidden="true">
      <span className="work-collage-index">01</span>

      <div className="work-collage-tile work-collage-tile-a">
        <img src={assetUrl("media/hero/time-capsule.png")} alt="" loading="eager" />
      </div>

      <div className="work-collage-tile work-collage-tile-b">
        <img src={assetUrl("media/hero/billio-offset.png")} alt="" loading="eager" />
      </div>

      <span className="work-collage-caption">Banking · Product design</span>
    </div>
  );
}
