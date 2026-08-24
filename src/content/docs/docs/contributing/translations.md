---
title: Translating documentation
description: Maintain equivalent English and Brazilian Portuguese documentation without diverging slugs.
order: 6
section: contributing
status: stable
---

English under `src/content/docs/docs/` is canonical. Brazilian Portuguese lives under `src/content/docs/pt-br/docs/`. Both trees use the same relative filename and slug.

Translate meaning and user intent. Preserve commands, code, API routes, identifiers, environment variables, product names, and status accuracy. Localize titles, descriptions, prose, table labels, alt text, and navigation labels.

`npm run check:translations` reports a missing PT-BR page as a controlled warning so Starlight fallback can remain available. It fails for orphan translations, invalid frontmatter, divergent `order`, `section`, or `status`. CI currently contains a complete locale pair and should remain warning-free.

When a page changes behavior, update both files in the same pull request. Test the language switch from the same route. If a translation is intentionally delayed, ensure fallback renders the English source with the localized availability notice instead of a 404.
