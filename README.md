# Araru Documentation

Official institutional and technical documentation for the Araru ecosystem.

## Stack

- Astro and TypeScript;
- Starlight Content Collections and accessible documentation layout;
- Markdown/MDX with Expressive Code;
- built-in Pagefind search;
- English root locale and Portuguese (Brazil) translations;
- static deployment to GitHub Pages.

## Local development

Requires Node.js 22.5 or newer.

```bash
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The production site uses the `/araru-docs` base path. Astro's development server handles local links automatically.

## Project structure

```text
public/brand/                 official web assets
src/content/docs/             English root content
src/content/docs/pt-br/       Portuguese translations (`lang="pt-BR"`)
src/styles/                   Araru visual tokens
astro.config.mjs              i18n, navigation, SEO and Pages base
examples/                     deployment examples
```

Keep matching slugs across locales. When a Portuguese file is absent, Starlight serves the English page with a translation notice. Do not copy future functionality into the current feature set.

## GitHub Pages

Pushes to `main` run CI and `.github/workflows/deploy.yml`. The official Astro action builds and uploads the static artifact to `https://araruoss.github.io/araru-docs/`.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY guidance](https://github.com/araruoss/araru-server/blob/main/SECURITY.md), and the AGPL-3.0-only [LICENSE](LICENSE).
