// Renders the app to static HTML inside dist/index.html, so the page shows its
// content before any JavaScript runs (and to crawlers and link previews).
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const indexPath = `${root}dist/index.html`;
const ssrDir = `${root}dist-ssr/`;
const marker = "<!--app-html-->";

const { render } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href);
const template = await readFile(indexPath, "utf8");
if (!template.includes(marker)) {
  throw new Error(`${indexPath} has no ${marker} marker to fill`);
}
await writeFile(indexPath, template.replace(marker, render()));
await rm(ssrDir, { recursive: true, force: true });
console.log("prerendered dist/index.html");
