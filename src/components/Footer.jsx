import { Link } from "react-router-dom";
import { cv, home } from "../data/content.js";
import { ContactLink } from "./Nav.jsx";

const LINKS = [
  { label: "Case Studies", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

export default function Footer() {
  return (
    <footer>
      {/* The one large block of colour on the site, so every page ends here. */}
      <section className="contact" id="contact">
        <div className="shell contact-inner">
          <div>
            <h2 className="display">Let&rsquo;s make sense of something complex.</h2>
            <ContactLink className="contact-link">
              {home.contact?.label ?? "Get in touch"}
              <span aria-hidden="true">→</span>
            </ContactLink>
          </div>
          <p className="contact-meta">
            {cv.location}
            <br />
            {cv.availability}
          </p>
        </div>
      </section>

      <div className="shell footer-base">
        <p>
          © {new Date().getFullYear()} William Dunn. Senior Service Designer &amp; CX Strategist.
        </p>
        <nav aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
