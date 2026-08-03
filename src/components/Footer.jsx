import { Link } from "react-router-dom";
import "./Footer.css";

const LINKS = [
  { label: "Case Studies", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner shell">
        <p className="footer-copy">
          © {new Date().getFullYear()} William Dunn. Senior Service Designer &amp; CX Strategist.
        </p>
        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="footer-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
