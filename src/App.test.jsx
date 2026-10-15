import { afterEach, describe, expect, it, vi } from "vitest";
import { headline, leadProjects, otherProjects } from "./data/projects";
import { links } from "./data/site";
import { render } from "./entry-server";

const html = render();

describe("portfolio page", () => {
  it("has the hero, projects, skills and contact sections", () => {
    expect(html).toContain("Apurba Adhikary");
    for (const id of ["projects", "skills", "contact"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("puts the headline project first among the lead projects", () => {
    expect(leadProjects[0].id).toBe(headline);
    expect(leadProjects.map((p) => p.id).sort()).toEqual(["barreplay", "toofaani"]);
    expect(html.indexOf(`id="project-${leadProjects[0].id}"`)).toBeLessThan(
      html.indexOf(`id="project-${leadProjects[1].id}"`),
    );
  });

  it("shows every project", () => {
    for (const project of [...leadProjects, ...otherProjects]) {
      expect(html).toContain(`id="project-${project.id}"`);
    }
  });

  it("links GitHub, LinkedIn and email", () => {
    expect(html).toContain(`href="${links.github}"`);
    expect(html).toContain(`href="${links.linkedin}"`);
    expect(html).toContain(`href="mailto:${links.email}"`);
  });

  it("marks a missing link as a placeholder in the dev server instead of rendering an empty link", () => {
    expect(html).not.toMatch(/href="(null|undefined|)"/);
    const missing = [...leadProjects, ...otherProjects].some((p) => !p.live || p.source === null || !p.image);
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
      for (const project of [...leadProjects, ...otherProjects]) {
        expect(published).toContain(`id="project-${project.id}"`);
      }
    });

    it("shows placeholders in a pull request preview build", () => {
      vi.stubEnv("DEV", false);
      vi.stubEnv("VITE_SHOW_PLACEHOLDERS", "true");
      const missing = [...leadProjects, ...otherProjects].some((p) => !p.live || p.source === null || !p.image);
      if (missing || !links.resume) {
        expect(render()).toContain("data-placeholder");
      }
    });
  });
});
