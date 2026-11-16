import { Link } from "react-router-dom";
import useTitle from "../components/useTitle.js";

export default function NotFound() {
  useTitle("Page not found");

  return (
    <div className="shell">
      <header className="page-head">
        <p className="eyebrow">404</p>
        <h1 className="display">Page not found</h1>
        <p className="lead">
          That page doesn&rsquo;t exist — it may have moved or the link may be out of date.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link to="/" className="link link-green">
            Back to home
          </Link>
        </p>
      </header>
    </div>
  );
}
