---
title: Documentation architecture
description: Understand the boundaries between content, components, navigation, translations, automation, and deployment.
order: 7
section: contributing
status: stable
---

## Content

Markdown and MDX store reviewed knowledge. Required frontmatter describes editorial state. Content must not hide configuration logic or duplicate authoritative generated contracts.

## Components

Astro components under `src/components/docs/` provide reusable semantic blocks. Layout overrides remain in `src/components/`. Components reuse the existing tokens in `src/styles/araru.css` and avoid client JavaScript unless functionality requires it.

## Navigation and configuration

`src/config/navigation.ts` defines shared logical navigation. `locales.ts` defines supported locales and content roots. `site.ts` owns organization and repository URLs. `astro.config.mjs` composes these concerns without duplicating them.

## Translations

English is canonical and PT-BR mirrors its slugs. Interface catalogs under `src/content/i18n/` are separate from page content. Missing translations may use fallback; structurally invalid translations fail validation.

## Automation and CI

Content, links, anchors, translations, Astro types, and the static build are validated by `npm run check:all`. Pull requests validate without deploying. GitHub Pages deployment runs only from `main` or manual dispatch.

## Deployment

The site is static. `SITE_URL` controls the canonical origin and `BASE_PATH` supports an optional Pages project prefix. Pagefind is generated during the production build and requires no external search service.
