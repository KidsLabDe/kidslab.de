# CLAUDE.md

## Project Overview

KidsLab.de Website – gebaut mit **Hugo** und dem **Hextra** Theme.

## Preferences

- **Bilder immer mit SEO-freundlichen Dateinamen** benennen: Kleinbuchstaben, Bindestriche, beschreibende Keywords. Beispiel: `lego-spike-prime-kinder-roboter-bauen-kurs.jpg` statt `DSC_5530.jpg`
- HEIC/AVIF Bilder vor dem Einbinden nach JPG konvertieren
- Content auf Deutsch schreiben

## Development

```bash
# Install dependencies
npm install
git submodule update --init themes/hextra

# Start dev server
hugo server -D -F

# Build
hugo --minify
```

### Deployment

- **Production:** https://kidslab.de (auto-deploy via GitHub Action bei Push auf `main`)
- GitHub Action: `.github/workflows/deploy.yml`
- Docker: Multi-stage Build (hugomods/hugo → nginx:alpine), Image auf GHCR
- Server: Deploy-User `deploy-kidslabde`, Ziel `/opt/kidslab`, Traefik-Reverse-Proxy

### Custom Shortcodes (layouts/shortcodes/)

- `pretix` – Pretix Ticket-Widget v2 einbetten. Params: `event` (URL). CSS wird eventspezifisch geladen.
- `gallery` – Bildergalerie mit Hugo Image Processing (Resize auf 800px WebP, 1600px für Lightbox). Params: `cols` (default 3), `maxwidth` (default 800). Setzt `hasImageZoom` für Hextra medium-zoom.
- `slider` – Auto-rotierender Bildslider (1200px WebP). Params: `height` (default 500px), `interval` (default 5000ms).
- `github-repo` – GitHub Repository als Card. Params: `repo` (z.B. "KidsLabDe/RepoName"), `text`.
- `button`, `cta`, `video`, `scratch-embed`, `download` – weitere Shortcodes

### Hextra Theme Features

- Callouts: `{{</* callout type="info|warning|error|important" */>}}`
- Cards: `{{</* cards */>}}{{</* card link="..." title="..." subtitle="..." */>}}{{</* /cards */>}}`
- Details, Steps, Tabs, Badge, Icon, PDF – siehe `themes/hextra/layouts/_shortcodes/`
- Image Zoom (medium-zoom): aktiviert in `hugo.yaml` unter `params.imageZoom.enable: true`

### Content-Struktur (content/)

- `kurse/` – MinniMaker, Lego Robotics, HackerWerkstatt (mit Staffeln als Unterseiten)
- `schulen/` – Workshop-Angebote für Schulen, Koffer leihen, Selber machen, Workshops buchen
- `gameslab/` – GamesLab, GamesPreis, Studio, Mentoring
- `minecraft/` – Minecraft-Inhalte
- `neuigkeiten/` – Blog-Posts (ehemals `/blog/`)
- `demokratie-in-minecraft/` – Demokratie-Projekt
- `ueber-kidslab/` – Über KidsLab

### Bilder als Page Resources

Bilder für eine Seite direkt in deren Ordner legen. Bei normalen `.md`-Dateien (nicht `_index.md`) muss ein Page Bundle erstellt werden (eigener Ordner mit `index.md`), damit Hugo die Bilder als Resources erkennt.
