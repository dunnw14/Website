import { Link } from "react-router-dom";
import { MediaFrame } from "./Media.jsx";
import "./CaseStudyCard.css";

export default function CaseStudyCard({ item }) {
  return (
    <Link to={`/case-studies/${item.slug}`} className="cs-card">
      <div className="cs-card-media">
        <MediaFrame
          item={{ src: item.media?.cardImage, alt: item.media?.cardImageAlt, type: "image" }}
          ratio="4 / 3"
          label="Cover image"
        />
      </div>

      <div className="cs-card-body">
        <div className="tag-row cs-card-tags">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="cs-card-title">{item.title}</h3>
        <p className="cs-card-sub">{item.subtitle}</p>

        <span className="cs-card-cue" aria-hidden="true">
          View case study
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.5 8h11m0 0L9.5 4m4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
