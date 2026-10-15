import { afterEach, describe, expect, it, vi } from "vitest";
import { projects } from "./data/projects";
import { links } from "./data/site";
import { work } from "./data/work";
import { render } from "./entry-server";

const html = render();

describe("portfolio page", () => {
  it("has the hero, projects, skills and contact sections", () => {
    expect(html).toContain("Apurba Adhikary");
    for (const id of ["projects", "work", "skills", "contact"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("shows projects with a live site first, in the owner's order", () => {
    const order = projects.map((p) => p.id);
    expect(order).toEqual(["barreplay", "sharewise", "taskflow", "toofaani"]);
    const firstWithoutLive = projects.findIndex((p) => !p.live);
    expect(projects.slice(firstWithoutLive).every((p) => !p.live)).toBe(true);
    const positions = order.map((id) => html.indexOf(`id="project-${id}"`));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("links each live site and lists its demo accounts with the password", () => {
    for (const project of projects.filter((p) => p.live)) {
      expect(html).toContain(`href="${project.live}"`);
    }
    for (const project of projects.filter((p) => p.demo)) {
      expect(html).toContain(project.demo.password);
      for (const account of project.demo.accounts) {
        expect(html).toContain(account.email);
      }
    }
  });

  it("shows the first demo account and the password, with the rest behind a toggle", () => {
    for (const project of projects.filter((p) => p.demo)) {
      const card = html.slice(html.indexOf(`id="project-${project.id}"`));
      const demo = card.slice(card.indexOf('class="demo"'), card.indexOf("</details>"));
      const [visible, hidden] = demo.split("<details");
      const [first, ...rest] = project.demo.accounts;
      expect(visible).toContain(first.email);
      expect(visible).toContain(project.demo.password);
      expect(hidden).not.toMatch(/^[^>]*\bopen\b/);
      expect(hidden).toContain(`Show all ${project.demo.accounts.length} accounts</summary>`);
      for (const account of rest) {
        expect(visible).not.toContain(account.email);
        expect(hidden).toContain(account.email);
        expect(hidden).toContain(`aria-label="Copy ${account.name} email"`);
      }
    }
  });

  it("shows every project", () => {
    for (const project of projects) {
      expect(html).toContain(`id="project-${project.id}"`);
    }
  });

  it("links GitHub, LinkedIn and email", () => {
    expect(html).toContain(`href="${links.github}"`);
    expect(html).toContain(`href="${links.linkedin}"`);
    expect(html).toContain(`href="mailto:${links.email}"`);
    expect(html).toContain(`href="${links.x}"`);
    expect(html).not.toContain("utm_");
  });

  it("lists every recent work item", () => {
    for (const item of work) {
      expect(html).toContain(`id="work-${item.id}"`);
    }
  });

  it("marks a missing link as a placeholder in the dev server instead of rendering an empty link", () => {
    expect(html).not.toMatch(/href="(null|undefined|)"/);
    const missing = projects.some((p) => !p.live || p.source === null || !p.image);
    if (missing || !links.resume) {
      expect(html).toContain("data-placeholder");
    }
  });

  describe("production build", () => {
    afterEach(() => vi.unstubAllEnvs());

    it("leaves unset items out instead of showing placeholders", () => {
      vi.stubEnv("DEV", false);
      vi.stubEnv("VITE_SHOW_PLACEHOLDERS", "false");
      const published = render();
      expect(published).not.toContain("data-placeholder");
      expect(published).not.toContain("To add");
      expect(published).not.toMatch(/href="(null|undefined|)"/);
      for (const project of projects) {
        expect(published).toContain(`id="project-${project.id}"`);
      }
    });

    it("shows placeholders in a pull request preview build", () => {
      vi.stubEnv("DEV", false);
      vi.stubEnv("VITE_SHOW_PLACEHOLDERS", "true");
      const missing = projects.some((p) => !p.live || p.source === null || !p.image);
      if (missing || !links.resume) {
        expect(render()).toContain("data-placeholder");
      }
    });
  });
});
