# Copilot instructions for Resume repository

Purpose: help future Copilot sessions understand how to build, lint, and reason about this project.

---

## Quick commands

- Install dependencies (CI uses this):
  - npm ci

- Development (dev server, auto-open):
  - npm start

- Quick compile (development config):
  - npm run compile

- Production build (writes dist/):
  - npm run build

- Linting
  - All HTML: npm run lint:html
  - All CSS: npm run lint:css
  - Both: npm run lint

- Single-file lint examples (use npx to target one file):
  - npx htmllint src/index.html
  - npx stylelint src/styles/style.css

Notes: there are no test scripts or unit tests configured in this repository.

---

## High-level architecture (big picture)

- Type: single-page static resume site built with Webpack (ESM config files).
- Entry points:
  - JS entry: src/index.js — dynamically imports CSS and selects a theme based on the URL query parameter `?style=`.
  - HTML template: src/index.html (used by HtmlWebpackPlugin).
  - Styles: src/styles/*.css (reset.css, style.css, maselli.css). The runtime imports reset.css and then conditionally loads a theme file.
- Build pipeline:
  - Webpack configs: webpack.config.common.js (base), merged with environment-specific configs: webpack.config.development.js and webpack.config.production.js using webpack-merge.
  - Output: dist/ containing index.html, bundle.js, and styles.css (MiniCssExtractPlugin).
  - Optimization: CSS and JS minimizers applied in production config.
- Dev server: webpack-dev-server configured in common config (served from ./dist with hot reload).
- CI: GitHub Actions workflow (.github/workflows/deploy.yaml) runs on pushes to master, executes `npm ci` and `npm run build`, uploads the dist/ artifact and deploys to GitHub Pages.

---

## Key conventions and repo-specific patterns

- ESM mode: package.json sets `type: "module"` and webpack configs use ESM imports/exports. Any Copilot-produced code changes touching configs should use import/export syntax, not CommonJS.

- Dynamic theme selection: src/index.js imports reset.css always, then uses URLSearchParams to look for `style`. If present, it attempts `./styles/${style}.css` and falls back to style.css on failure. When adding new themes, add the CSS file to src/styles and ensure filenames match expected query values.

- Linting rules:
  - HTML: .htmllintrc enforces several bans (e.g., attribute/style bans, tag bans for <b>, <i>, disallows inline style attribute). Copilot should avoid suggesting inline styles or banned tags.
  - CSS: stylelint.config.js extends stylelint-config-standard. A specific exception exists for `-webkit-text-size-adjust` (allowed). Follow that when suggesting CSS rules.

- Build filenames and outputs:
  - Webpack writes `bundle.js` and `styles.css` by default (configured in common config). CI and GitHub Pages expect `dist/` to contain the final static site.

- Node/runtime constraints:
  - GitHub Actions workflow uses Node 22.x. The project uses ESM and import.meta usage in configs; align Copilot suggestions with modern Node ESM patterns.

- No test framework is present. Avoid adding a test runner unless explicitly requested.

---

## Files of interest to reference

- package.json — scripts and devDependencies
- webpack.config.common.js, webpack.config.development.js, webpack.config.production.js — build behavior
- src/index.js — dynamic CSS loading and entrypoint logic
- src/index.html — HTML content and template for HtmlWebpackPlugin
- src/styles/ — theme and CSS files
- .htmllintrc and stylelint.config.js — linting rules
- .github/workflows/deploy.yaml — CI and GitHub Pages deployment

---

## AI assistant config check

No special AI assistant config files (CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, .clinerules) were found. If you add one later, include its important parts here.

---

## When modifying or adding features

- Keep webpack config ESM; use webpack-merge for env-specific overrides.
- If adding a new CSS theme, place it under src/styles and ensure the filename matches the `?style=` query-value you intend to support.
- Preserve lint rules: do not suggest inline styles or banned HTML tags; follow stylelint rules.
- When changing CI, ensure `npm ci && npm run build` still produces a complete dist/ for Pages deployment.

---

If anything here should be adjusted (more CI detail, testing guidance, or extra conventions), say which area to expand.
