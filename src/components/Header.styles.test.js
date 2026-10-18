// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

const style = document.createElement("style");
style.textContent = readFileSync(join(import.meta.dirname, "../styles.css"), "utf8");
document.head.append(style);

const matches = (media, width) => [...media].every((query) => {
  const min = query.match(/min-width:\s*(\d+)px/);
  const max = query.match(/max-width:\s*(\d+)px/);
  return (!min || width >= Number(min[1])) && (!max || width <= Number(max[1]));
});

const resolve = (selector, property, width) => {
  let value;
  const visit = (rules) => {
    for (const rule of rules) {
      if (rule.media) {
        if (matches(rule.media, width)) visit(rule.cssRules);
      } else if (rule.selectorText?.split(",").map((s) => s.trim()).includes(selector)) {
        value = rule.style.getPropertyValue(property) || value;
      }
    }
  };
  visit(style.sheet.cssRules);
  return value;
};

it("keeps the header sticky on desktop and lets it scroll away on mobile", () => {
  expect(resolve(".header", "position", 1280)).toBe("sticky");
  expect(resolve(".header", "position", 720)).toBe("sticky");
  expect(resolve(".header", "position", 719)).toBe("relative");
  expect(resolve(".header", "position", 375)).toBe("relative");
});

it("offsets anchor scrolling only where the header sticks", () => {
  expect(resolve("html", "scroll-padding-top", 1280)).toBe("72px");
  expect(resolve("html", "scroll-padding-top", 720)).toBe("72px");
  expect(resolve("html", "scroll-padding-top", 719)).toBeUndefined();
  expect(resolve("html", "scroll-padding-top", 375)).toBeUndefined();
});
