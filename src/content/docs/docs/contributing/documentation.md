---
title: Contributing to documentation
description: Write, translate, review, and validate the Araru documentation site.
order: 100
section: "contributing"
status: stable
---

The documentation is maintained in `araru-docs` with Astro and Starlight. Documentation changes follow the same review standard as code because inaccurate instructions can break installations, expose data, or misrepresent product behavior.

## Documentation structure

```text
src/content/docs/
├── docs/                 # English, default locale
└── pt-br/docs/           # Brazilian Portuguese
src/content/i18n/         # Interface translations
src/components/           # Starlight component overrides
src/styles/               # Project visual styles
public/                   # Static brand assets
```

English and PT-BR pages use matching paths after their locale prefix. For example:

- `src/content/docs/docs/contributing/documentation.md`
- `src/content/docs/pt-br/docs/contributing/documentation.md`

Never add a page to only one locale when publishing finished user-facing documentation. Missing locale files trigger fallback content and an availability notice.

## Local setup

```bash
git clone git@github.com:araruoss/araru-docs.git
cd araru-docs
npm ci
npm run dev
```

Use the development URL printed by Astro. Test both the root English route and `/pt-br/`. A path prefix for GitHub Pages can be tested with the repository-supported `BASE_PATH` environment variable.

## Writing a page

Every Markdown page starts with valid frontmatter:

```yaml
---
title: Clear page title
description: One sentence describing the page.
---
```

Starlight renders `title` as the page H1. Do not repeat it as the first Markdown heading. Start content directly or with an H2 (`##`).

Use short paragraphs, descriptive headings, real commands, and tables only when they improve comparison. Mark planned, experimental, optional, and stable behavior accurately. Prefer repository-relative terminology and link to the authoritative OpenAPI or source file rather than copying contracts that will diverge.

Code examples must be safe to copy. Use placeholders for credentials and personal paths. Never include real tokens, library filenames, user data, internal hosts, or production secrets.

## Links and navigation

- Keep the same slug in both locales.
- Use relative links for another documentation page whenever possible.
- Include the trailing slash in documentation routes.
- External GitHub links are processed to open in a new tab.
- Add new public pages to the Starlight sidebar in `astro.config.mjs` and provide a PT-BR label through `translations`.
- Verify previous/next navigation, table of contents, mobile menu, and local search after structural changes.

## Translation guidelines

Translate meaning, not isolated words. Preserve code, commands, API paths, identifiers, configuration keys, and product names. Keep headings and link targets structurally equivalent so readers can switch locale without losing context.

Use Brazilian Portuguese (`pt-BR`) consistently. Avoid untranslated prose unless it is a proper name or established technical term. When the source changes behavior, update both locales in the same pull request.

## Visual and component changes

For Header, Footer, homepage, or style changes, validate desktop and narrow mobile widths, keyboard focus, contrast, zoom, reduced motion, and both themes when supported. Reuse existing brand assets instead of duplicating them. GitHub destinations must open safely in a new tab.

Do not use page-specific CSS to conceal content errors that should be fixed in Markdown, frontmatter, locale configuration, or a shared component.

## Validation

Run all documentation checks before opening a pull request:

```bash
npx astro sync --force
npm run check
npm run build
```

The checks must report no Astro diagnostics, broken relative links, or duplicated leading H1. The static build must generate equivalent English and PT-BR routes. Search the generated PT-BR output for the fallback warning when adding or reorganizing pages.

Also review the rendered pages manually for:

- correct language and locale switch destination;
- readable code blocks, tables, callouts, and long headings;
- valid sidebar, breadcrumbs, table of contents, previous/next links, and search results;
- no horizontal overflow at mobile widths;
- accurate commands and links.

## Documentation pull request checklist

- The change explains current behavior and separates it from roadmap items.
- English and PT-BR files exist with matching slugs.
- Titles, descriptions, sidebar labels, and link text are localized.
- No H1 duplicates the Starlight title.
- Commands were verified against the owning repository.
- Relative links and external destinations work.
- `npm run check` and `npm run build` pass.
- Screenshots are included for material UI changes.
- No secret, personal path, generated build output, or copyrighted content was committed.

Small improvements such as typo fixes are welcome. For a major information-architecture change, open an issue first and describe the affected routes, redirects, locales, and migration plan.

## Detailed guides

- [Writing documentation](../writing-docs/) documents reusable MDX components.
- [Adding documentation](../adding-documentation/) provides the complete page workflow.
- [Translations](../translations/) explains locale policy and automated checks.
- [Docs architecture](../docs-architecture/) records editorial and technical boundaries.
