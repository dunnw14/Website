import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { home } from "../data/content.js";
import "./Nav.css";

const LINKS = [
  { label: "Work", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const email = home.contact?.email;

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Falls back to the CV page until an email address is added to home.json.
  const contactHref = email ? `mailto:${email}` : "/cv";
  const ContactTag = email ? "a" : Link;
  const contactProps = email ? { href: contactHref } : { to: contactHref };

  return (
    <header className="nav">
      <div className="nav-inner shell">
        <Link to="/" className="nav-logo btn-outline">
          William Dunn
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-end">
          <ThemeToggle />
          <ContactTag className="btn nav-cta" {...contactProps}>
            {home.contact?.label ?? "Get in touch"}
          </ContactTag>
          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={open ? "burger-box is-open" : "burger-box"}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={open ? "nav-drawer is-open" : "nav-drawer"} hidden={!open}>
        {LINKS.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="nav-drawer-link display"
            style={{ transitionDelay: `${0.05 + i * 0.06}s` }}
          >
            {link.label}
          </NavLink>
        ))}
        <ContactTag
          className="nav-drawer-link display is-cta"
          style={{ transitionDelay: `${0.05 + LINKS.length * 0.06}s` }}
          {...contactProps}
        >
          {home.contact?.label ?? "Get in touch"}
        </ContactTag>
      </div>
    </header>
  );
}
