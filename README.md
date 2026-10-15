# itsApurba.github.io

Apurba Adhikary's portfolio, live at https://itsapurba.github.io/.

A single static page built with React and Vite. The build prerenders the page to
HTML, so it shows its content before any JavaScript runs.

## Editing the content

Everything the page says is in `src/data/`:

- `site.js`: name, role, current company, intro, location, and the GitHub, LinkedIn, X,
  email and resume links.
- `projects.js`: the projects, in display order (live sites first; the first one gets
  the large card), with the demo accounts each project publishes in its README.
- `work.js`: the "Recent work" entries.
- `skills.js`: the skill groups.

A link, screenshot or company set to `null` is a placeholder. The dev server and pull request
builds show it as a dashed "To add: ..." badge; the published site (the push to `main`)
leaves it out until it is filled in.

## Images

The original screenshots and the avatar live in `src/assets/source/`. `npm run images`
turns them into AVIF and WebP files at a few widths in `src/assets/images/`, each with a
tiny blurred placeholder, and regenerates `src/assets/images/index.js`; commit the result.
To add a screenshot (for example Toofaani's), drop a 16:10 PNG named after the project
into `src/assets/source/`, run `npm run images`, then set the project's `image` to
`images.<name>` in `src/data/projects.js`. Phones never get a screenshot wider than 800px.

## Running it

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev      # local dev server
npm test         # checks the rendered page
npm run build    # production build in dist/
npm run preview  # serves dist/
```

## Deploying

GitHub Pages serves the `gh-pages` branch. The `Build and deploy` workflow builds every
pull request, and on every push to `main` it publishes `dist/` to `gh-pages`, so merging a
pull request updates the live site.
