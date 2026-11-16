import { Link, NavLink } from "react-router-dom";
import { home } from "../data/content.js";

const LINKS = [
  { label: "Case Studies", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

/** Falls back to the CV page until an email address is added to home.json. */
export function ContactLink({ className, children }) {
  const email = home.contact?.email;
  return email ? (
    <a className={className} href={`mailto:${email}`}>
      {children}
    </a>
  ) : (
    <Link className={className} to="/cv">
      {children}
    </Link>
  );
}

export default function Nav() {
  return (
    <header className="shell nav">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Link to="/" className="nav-name">
        {home.nav.logo.name}
        <span>{home.nav.logo.title}</span>
      </Link>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? "link is-active" : "link")}
          >
            {link.label}
          </NavLink>
        ))}
        <ContactLink className="link link-green">{home.contact?.label ?? "Get in touch"}</ContactLink>
      </nav>
    </header>
  );
}
