import { MoonIcon, SunIcon } from "./Icons";

const nav = [
  { href: "#projects", label: "Projects" },
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

const Header = () => (
  <header className="header">
    <div className="header__inner">
      <a className="header__mark" href="#top" aria-label="Apurba Adhikary, back to top">
        AA
      </a>
      <nav aria-label="Sections">
        <ul className="header__nav">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
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

export default Header;
