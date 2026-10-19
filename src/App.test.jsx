import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { projects } from "./data/projects";
import { links } from "./data/site";
import { render } from "./entry-server";

const html = render();

describe("portfolio page", () => {
  it("preserves the supplied downloadable PDF byte contract", () => {
    const pdf = readFileSync(new URL("../public/resume.pdf", import.meta.url));
    expect(createHash("sha256").update(pdf).digest("hex"))
      .toBe("4d9ce5479796563cd33de98d593a322a8aad127eeb6a04eebc18d8a25028f66e");
  });
  it("orders the page Home, About, Skills, Projects, Contact to match the nav", () => {
    expect(html).toContain("Apurba Adhikary");
    const order = ["home", "about", "skills", "projects", "contact"];
    const positions = order.map((id) => html.indexOf(`id="${id}"`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    const nav = html.match(/<nav\b[\s\S]*?<\/nav>/)[0];
    expect([...nav.matchAll(/<a\b[^>]*>(.*?)<\/a>/g)].map((match) => match[1]))
      .toEqual(["Home", "About", "Skills", "Projects", "Contact", "Resume"]);
  });

  it("keeps the short professional About separate from a brief full-stack Home", () => {
    const home = html.slice(html.indexOf('id="home"'), html.indexOf('id="about"'));
    const about = html.slice(html.indexOf('id="about"'), html.indexOf('id="skills"'));
    expect(home).toContain("Apurba Adhikary");
    expect(home).toContain("full-stack developer");
    expect(home).not.toContain("Masai School");
    expect(home).not.toContain("current company");
    expect(about).toContain("I’m Apurba Adhikary, a developer with experience building web applications, Flutter apps, and business-system integrations. I have worked across frontend, backend, and mobile development. I enjoy solving practical problems and collaborating with teams to build useful products.");
    for (const text of ["Masai School", "Career path", "360ithub", "MerlinAi.co", "Zarektronix"]) {
      expect(html).not.toContain(text);
    }
    expect(html).toContain('href="#about">About</a>');
  });

  it("has downloadable new-tab Resume links in the nav and Home", () => {
    const navAndHome = html.slice(0, html.indexOf('id="about"'));
    const resumeLinks = (navAndHome.match(/<a\b[^>]*>/g) ?? []).filter(tag => tag.includes('href="/resume.pdf"'));
    expect(resumeLinks).toHaveLength(3);
    const downloads = resumeLinks.filter(tag => tag.includes('download=""'));
    expect(downloads).toHaveLength(2);
    for (const tag of downloads) {
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('download=""');
    }
  });

  it("offers distinct Home download and new-tab preview actions for the same PDF", () => {
    const home = html.slice(html.indexOf('id="home"'), html.indexOf('id="about"'));
    const anchors = home.match(/<a\b[^>]*>[\s\S]*?<\/a>/g) ?? [];
    const download = anchors.find(a => a.includes('aria-label="Download resume"'));
    const preview = anchors.find(a => a.includes('>Preview resume</a>'));
    expect(download).toContain('download=""');
    expect(preview).toBeDefined();
    expect(preview).not.toMatch(/\sdownload(?:=|\s|>)/);
    for (const anchor of [download, preview]) {
      expect(anchor).toContain('href="/resume.pdf"');
      expect(anchor).toContain('target="_blank"');
      expect(anchor).toContain('rel="noopener noreferrer"');
    }
  });

  it("lists the resume-backed soft skills alongside technical skills", () => {
    for (const skill of ["Collaboration", "Problem-Solving", "Mentoring", "Adaptability", "React", "Flutter"]) {
      expect(html).toContain(skill);
    }
    expect(html).toContain("Soft skills");
  });

  it("puts the pointer trails behind the hero as decoration", () => {
    const hero = html.slice(html.indexOf('class="hero"'), html.indexOf('id="hero-title"'));
    expect(hero).toContain('<canvas class="hero__trails" aria-hidden="true">');
  });

  it("shows projects with a live site first, in the owner's order", () => {
    const order = projects.map((p) => p.id);
    expect(order).toEqual(["barreplay", "sharewise", "taskflow", "timecamp"]);
    expect(projects.every((p) => Boolean(p.live))).toBe(true);
    const positions = order.map((id) => html.indexOf(`id="project-${id}"`));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("links each live site and lists its demo accounts with the password", () => {
    expect(projects).toHaveLength(4);
    for (const project of projects) {
      const tag = html.match(new RegExp(`<a[^>]*href="${project.live.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`))?.[0];
      expect(tag).toBeDefined();
      expect(tag).toContain('target="_blank"');
      expect(tag).toContain('rel="noopener noreferrer"');
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

  it("serves every image as responsive AVIF and WebP with fixed dimensions", () => {
    const pictures = html.match(/<picture[\s\S]*?<\/picture>/g) ?? [];
    const withImages = projects.filter((p) => p.image).length;
    expect(pictures.length).toBe(withImages + 1); // the screenshots plus the avatar
    for (const picture of pictures) {
      expect(picture).toMatch(/<source type="image\/avif" srcSet="[^"]+ \d+w, [^"]+ \d+w/);
      expect(picture).toMatch(/<source type="image\/webp" srcSet="[^"]+ \d+w, [^"]+ \d+w/);
      expect(picture).toMatch(/<img [^>]*width="\d+" height="\d+"/);
      expect(picture).toContain("background-image:url(data:image/webp;base64,");
    }
  });

  it("never offers a phone a project screenshot wider than 800px", () => {
    const phoneSources = html.match(/<source media="\(max-width: 719px\)"[^>]*>/g) ?? [];
    expect(phoneSources.length).toBe(projects.filter((p) => p.image).length * 2);
    for (const tag of phoneSources) {
      const widths = [...tag.matchAll(/ (\d+)w/g)].map((m) => Number(m[1]));
      expect(widths.length).toBeGreaterThan(0);
      expect(Math.max(...widths)).toBeLessThanOrEqual(800);
    }
  });

  it("loads the avatar first, the lead screenshot eagerly and the rest lazily", () => {
    const imgs = (html.match(/<img [^>]*>/g) ?? []).filter((tag) => tag.includes("picture__img"));
    const [avatar, lead, ...rest] = imgs;
    expect(avatar).toContain('fetchPriority="high"');
    expect(avatar).toContain('loading="eager"');
    expect(lead).toContain('loading="eager"');
    expect(rest.length).toBeGreaterThan(0);
    for (const tag of rest) {
      expect(tag).toContain('loading="lazy"');
    }
  });

  it("links GitHub, LinkedIn and email", () => {
    expect(html).toContain(`href="${links.github}"`);
    expect(html).toContain(`href="${links.linkedin}"`);
    expect(html).toContain(`href="mailto:${links.email}"`);
    expect(html).toContain(`href="${links.x}"`);
    expect(html).not.toContain("utm_");
  });

  it("removes Recent work and Digital Info Link without removing BarReplay", () => {
    expect(html).not.toContain("Recent work");
    expect(html).not.toContain("Digital Info Link");
    expect(html).not.toContain('id="work"');
    expect(html).not.toContain('id="work-');
    expect(html).toContain('id="project-barreplay"');
    expect(html).toContain('href="https://barreplay.digitalinfolink.in"');
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
