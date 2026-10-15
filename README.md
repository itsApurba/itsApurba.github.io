# itsApurba.github.io

Apurba Adhikary's portfolio, live at https://itsapurba.github.io/.

A single static page built with React and Vite. The build prerenders the page to
HTML, so it shows its content before any JavaScript runs.

## Editing the content

Everything the page says is in `src/data/`:

- `site.js`: name, intro, location, and the GitHub, LinkedIn, email and resume links.
- `projects.js`: the projects. `headline` picks which lead project (`"barreplay"` or
  `"toofaani"`) comes first as "Currently building".
- `skills.js`: the skill groups.

A link or screenshot set to `null` is a placeholder. The dev server and pull request
builds show it as a dashed "To add: ..." badge; the published site (the push to `main`)
leaves it out until it is filled in. Project screenshots live in
`src/assets/projects/` (1280x800 WebP works well).

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
