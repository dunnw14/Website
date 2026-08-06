import { Link } from "react-router-dom";
import { MediaFrame } from "./Media.jsx";
import "./CaseStudyCard.css";

export default function CaseStudyCard({ item }) {
  return (
    <Link to={`/case-studies/${item.slug}`} className="cs-card">
      <div className="cs-card-media">
        <MediaFrame
          item={{ src: item.media?.cardImage, alt: item.media?.cardImageAlt, type: "image" }}
          ratio="16 / 11"
          label="Cover image"
        />
      </div>

      <div className="cs-card-body">
        <div className="cs-card-headline">
          <h3 className="cs-card-title">{item.title}</h3>
          <span className="cs-card-arrow" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13 13 3m0 0H5.5M13 3v7.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p className="cs-card-sub">{item.subtitle}</p>

        <div className="tag-row cs-card-tags">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
