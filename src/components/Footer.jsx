import { Link } from "react-router-dom";
import { home } from "../data/content.js";
import "./Footer.css";

const LINKS = [
  { label: "Work", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

export default function Footer() {
  const email = home.contact?.email;

  return (
    <footer className="footer">
      <div className="footer-top shell">
        <p className="label">{home.hero.eyebrow}</p>
        <p className="display footer-shout">
          Let&rsquo;s make sense
          <br />
          of something complex.
        </p>
        {email ? (
          <a className="btn footer-cta" href={`mailto:${email}`}>
            {home.contact.label}
          </a>
        ) : (
          <Link className="btn footer-cta" to="/cv">
            {home.contact?.label ?? "Get in touch"}
          </Link>
        )}
      </div>

      <div className="footer-base shell">
        <p className="footer-copy">
          © {new Date().getFullYear()} William Dunn — Senior Service Designer &amp; CX Strategist
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
