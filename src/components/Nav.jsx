import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import "./Nav.css";

const LINKS = [
  { label: "Case Studies", to: "/case-studies" },
  { label: "Skills", to: "/skills" },
  { label: "CV", to: "/cv" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav">
      <div className="nav-inner shell">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-name">William Dunn</span>
          <span className="nav-logo-sep">—</span>
          <span className="nav-logo-role">Senior Service Designer</span>
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
          <ThemeToggle />
        </nav>

        <div className="nav-mobile-controls">
          <ThemeToggle />
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
            className="nav-drawer-link"
            style={{ transitionDelay: `${0.06 + i * 0.06}s` }}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
