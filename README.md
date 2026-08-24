# Araru Documentation

Official institutional, product, operational, and technical documentation for the Araru ecosystem. English is the canonical content language and Brazilian Portuguese mirrors the same public slugs.

## Stack

- Astro and TypeScript;
- Starlight Content Collections and accessible documentation layout;
- Markdown/MDX with validated editorial frontmatter and reusable Astro components;
- Mermaid diagrams as code;
- built-in Pagefind search;
- English root locale and Portuguese (Brazil) translations;
- static deployment to GitHub Pages.

## Local development

Requires Node.js 22.5 or newer.

```bash
npm ci
npm run dev
npm run check:all
npm run preview
```

The production site is served from the domain root. Set `SITE_URL` during the build when publishing under a custom domain.
For a GitHub Pages project subpath, also set `BASE_PATH` (for example, `/araru-docs`). Root publishing remains the default.

## Project structure

```text
public/brand/                     official web assets
src/components/docs/              reusable documentation primitives
src/components/                   Starlight layout overrides
src/config/navigation.ts          shared sidebar structure
src/config/locales.ts             locale definitions and content roots
src/config/site.ts                site and repository URLs
src/content/docs/docs/            canonical English content
src/content/docs/pt-br/docs/      Portuguese translations
src/content/i18n/                 localized Starlight interface strings
src/styles/                       Araru visual tokens and component styles
scripts/                          content, links, translation and scaffolding tools
.github/workflows/                pull request validation and Pages deploy
astro.config.mjs                  Astro/Starlight composition
```

## Adding a page

Generate a canonical skeleton without fictional content:

```bash
npm run docs:new -- server feature-name
```

Complete all `TODO` values, write the English source, create the matching file under `src/content/docs/pt-br/docs/`, and add global navigation only when necessary. Every document requires:

```yaml
title: Clear title
description: A useful page summary.
order: 100
section: server
status: stable # stable | experimental | planned | deprecated
```

See [Adding documentation](src/content/docs/docs/contributing/adding-documentation.md) and [Writing documentation](src/content/docs/docs/contributing/writing-docs.mdx).

## Translation policy

Keep matching relative paths and slugs across locales. Translate prose and UI labels while preserving code, commands, API paths, identifiers, and configuration names. A missing Portuguese file is a controlled warning and may use Starlight fallback; orphan or structurally incompatible translations fail validation.

See the complete [translation guide](src/content/docs/docs/contributing/translations.md).

## Checks

```bash
npm run check:content       # required metadata and negative test cases
npm run check:links         # files, anchors and Araru repository URLs
npm run check:translations  # locale tree and structural compatibility
npm run check               # Astro plus all checks above
npm run build               # static pages and Pagefind index
npm run check:all           # complete CI validation
```

Planned functionality must be labeled accurately and must not be copied into the current feature set. OpenAPI remains authoritative in `araru-server`; the docs link to that source instead of maintaining a divergent generated contract.

## GitHub Pages

Pull requests execute `npm ci`, dependency audit, all content checks, and the production build without deploying. Pushes to `main` and manual `workflow_dispatch` runs may publish through `.github/workflows/deploy.yml`.

The site defaults to a root GitHub Pages domain such as `araruoss.github.io`. Set `SITE_URL` for the canonical origin and `BASE_PATH` when publishing under a project subpath. Pagefind is produced during the static build and does not require an external service.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY guidance](https://github.com/araruoss/araru-server/blob/main/SECURITY.md), and the AGPL-3.0-only [LICENSE](LICENSE).
