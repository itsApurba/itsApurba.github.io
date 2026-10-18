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

const headerPosition = (width) => {
  let position;
  const visit = (rules) => {
    for (const rule of rules) {
      if (rule.media) {
        if (matches(rule.media, width)) visit(rule.cssRules);
      } else if (rule.selectorText?.split(",").map((s) => s.trim()).includes(".header")) {
        position = rule.style.position || position;
      }
    }
  };
  visit(style.sheet.cssRules);
  return position;
};

it("keeps the header sticky on desktop and lets it scroll away on mobile", () => {
  expect(headerPosition(1280)).toBe("sticky");
  expect(headerPosition(720)).toBe("sticky");
  expect(headerPosition(719)).toBe("relative");
  expect(headerPosition(375)).toBe("relative");
});
