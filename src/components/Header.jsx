import { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

// The theme is applied before first paint by the script in index.html, so the
// button renders the same markup in either theme and CSS picks the icon.
const toggleTheme = () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const header = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    setReady(true);
    const closeOutside = (event) => {
      if (!header.current.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 720px)");
    const reset = () => {
      if (desktop.matches && document.activeElement === trigger.current) {
        header.current.querySelector("nav a").focus();
      }
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", reset);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", reset);
    };
  }, []);

  return (
  <header ref={header} className={`header${ready ? " header--interactive" : ""}`} onKeyDown={(event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      trigger.current.focus();
    }
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <div className="header__inner">
      <a className="header__mark" href="#top" aria-label="Apurba Adhikary, back to top">
        AA
      </a>
      <button ref={trigger} type="button" className="header__toggle" aria-expanded={open}
        aria-controls="section-navigation" onClick={() => setOpen(!open)}>
        Menu <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <nav id="section-navigation" aria-label="Sections" className={open ? "header__sections header__sections--open" : "header__sections"}>
        <ul className="header__nav">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => {
                setOpen(false);
                if (window.matchMedia("(max-width: 719px)").matches) {
                  const destination = document.querySelector(item.href);
                  destination?.setAttribute("tabindex", "-1");
                  destination?.focus({ preventScroll: true });
                }
              }}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="icon-button" onClick={toggleTheme} aria-label="Switch between light and dark theme">
        <SunIcon className="theme-icon theme-icon--sun" />
        <MoonIcon className="theme-icon theme-icon--moon" />
      </button>
    </div>
  </header>
  );
};

export default Header;
