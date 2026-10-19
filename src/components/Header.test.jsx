// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Header from "./Header";

let host, root, media, change;
beforeEach(async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  media = { matches: false, addEventListener: vi.fn((_, fn) => { change = fn; }), removeEventListener: vi.fn() };
  window.matchMedia = vi.fn((query) => query.includes("min-width") ? media : { matches: !media.matches });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () => root.render(<Header />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.restoreAllMocks();
});
const button = () => host.querySelector(".header__toggle");
const expanded = () => button().getAttribute("aria-expanded");
const click = async (element) => act(async () => element.click());

it("connects a collapsed native button to the existing section links", async () => {
  expect(button().type).toBe("button");
  expect(expanded()).toBe("false");
  expect(button().getAttribute("aria-controls")).toBe(host.querySelector("nav").id);
  const anchors = [...host.querySelectorAll("nav a")];
  expect(anchors.map(a => a.textContent.trim())).toEqual(["Home", "About", "Skills", "Projects", "Contact", "Resume"]);
  expect(anchors.map(a => a.getAttribute("href"))).toEqual(["#home", "#about", "#skills", "#projects", "#contact", "/resume.pdf"]);
  expect(anchors.at(-1).target).toBe("_blank");
  expect(anchors.at(-1).hasAttribute("download")).toBe(true);
  await click(button());
  expect(expanded()).toBe("true");
  await click(button());
  expect(expanded()).toBe("false");
});

it("closes on Escape and restores focus to the trigger", async () => {
  await click(button());
  host.querySelector("nav a").focus();
  await act(async () => document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  expect(expanded()).toBe("false");
  expect(document.activeElement).toBe(button());
});

it("closes on outside pointer interaction, focus departure, and breakpoint changes", async () => {
  await click(button());
  await act(async () => document.body.dispatchEvent(new Event("pointerdown", { bubbles: true })));
  expect(expanded()).toBe("false");
  await click(button());
  button().focus();
  await act(async () => button().blur());
  expect(expanded()).toBe("false");
  await click(button());
  button().focus();
  media.matches = true;
  await act(async () => change());
  expect(expanded()).toBe("false");
  expect(document.activeElement).toBe(host.querySelector("nav a"));
});

it("closes on link selection and focuses its destination without suppressing navigation", async () => {
  const section = document.createElement("section");
  section.id = "home";
  document.body.append(section);
  await click(button());
  await click(host.querySelector("nav a"));
  expect(expanded()).toBe("false");
  expect(document.activeElement).toBe(section);
  section.remove();
});

it("closes on Resume without treating its PDF path as a section selector", async () => {
  vi.spyOn(window, "open").mockReturnValue(null);
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function () {
    if (!this.hasAttribute("download") || this.closest("nav")) {
      this.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    }
  });
  await click(button());
  const resume = host.querySelector('nav a[href="/resume.pdf"]');
  // The enhancement suppresses native navigation to avoid duplicate downloads.
  let defaultPrevented;
  document.addEventListener("click", (event) => {
    defaultPrevented = event.defaultPrevented;
    event.preventDefault();
  }, { once: true });
  await click(resume);
  expect(expanded()).toBe("false");
  expect(defaultPrevented).toBe(true);
});
