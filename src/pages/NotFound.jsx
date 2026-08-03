import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <div className="shell-narrow" style={{ textAlign: "center", paddingBlock: "4rem" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "var(--t-h1)", marginTop: "1rem" }}>Page not found</h1>
        <p className="lead" style={{ marginTop: "1.25rem" }}>
          That page doesn&rsquo;t exist — it may have moved or the link may be out of date.
        </p>
        <Link to="/" className="btn" style={{ marginTop: "2.25rem" }}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
