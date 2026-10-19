// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Contact from "./components/Contact";

let root, host;
afterEach(async () => {
  if (root) await act(async () => root.unmount());
  host?.remove();
  vi.restoreAllMocks();
});

for (const [name, Component, selector] of [
  ["nav", Header, "nav"], ["Home", Hero, "#home"], ["Contact", Contact, "#contact"],
]) {
  it(`${name} Resume attempts one preview and one download within the click`, async () => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    window.matchMedia = vi.fn(() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const open = vi.spyOn(window, "open").mockReturnValue(null); // Popup blocking must not duplicate downloads.
    const downloads = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function () {
      downloads.push({ href: this.href, download: this.hasAttribute("download"), connected: this.isConnected });
    });
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    await act(async () => root.render(<Component />));
    const anchor = host.querySelector(`${selector} a[href="/resume.pdf"]`);
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    await act(async () => anchor.dispatchEvent(event));
    expect(event.defaultPrevented).toBe(true);
    expect(open).toHaveBeenCalledExactlyOnceWith(anchor.href, "_blank", "noopener,noreferrer");
    expect(downloads).toEqual([{ href: anchor.href, download: true, connected: true }]);
    expect(document.querySelectorAll('a[download]')).toHaveLength(1); // Temporary download link was removed.

    for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
      const modified = new MouseEvent("click", { bubbles: true, cancelable: true, ...options });
      // Stop jsdom's unsupported native navigation after observing the handler.
      let prevented;
      const observe = e => { prevented = e.defaultPrevented; e.preventDefault(); };
      document.addEventListener("click", observe, { once: true });
      await act(async () => anchor.dispatchEvent(modified));
      expect(prevented).toBe(false);
    }
    expect(open).toHaveBeenCalledTimes(1);
    expect(downloads).toHaveLength(1);
  });
}
