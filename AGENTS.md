# AGENTS.md

## Development Commands
- **Setup:** `npm install && git submodule update --init themes/hextra`
- **Dev Server:** `hugo server -D -F`
- **Production Build:** `hugo --minify`

## Critical Conventions
- **Content Language:** Always write content in German.
- **Images:** 
  - Use SEO-friendly lowercase names with hyphens (e.g., `lego-spike-prime.jpg`).
  - Convert HEIC/AVIF to JPG before adding.
  - Use **Page Bundles** (folder with `index.md`) for images associated with a page to ensure Hugo recognizes them as Page Resources.

## Architecture Notes
- **Framework:** Hugo with Hextra theme.
- **Custom Shortcodes:** Located in `layouts/shortcodes/`. Key ones: `pretix`, `gallery`, `slider`, `github-repo`.
- **Hextra Components:** Uses callouts and cards. Refer to `themes/hextra/layouts/_shortcodes/` for available theme shortcodes.
- **Navigation:** Managed in `hugo.yaml` under `menu.main`.
- **Deployment:** Automated via GitHub Action on push to `main` $\rightarrow$ Docker (GHCR) $\rightarrow$ Nginx.
