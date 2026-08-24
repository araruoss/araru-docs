---
title: Adding new documentation
description: Create a validated English page and its matching Brazilian Portuguese translation.
order: 5
section: contributing
status: stable
---

1. Choose the section that owns the subject and confirm that another page does not already explain it.
2. Create the canonical English file under `src/content/docs/docs/`. Use `npm run docs:new -- <section> <slug>` for a safe skeleton.
3. Replace every `TODO` and set `title`, `description`, integer `order`, `section`, and a valid `status`.
4. Write current behavior first. Mark experimental and planned behavior explicitly.
5. Create the matching file under `src/content/docs/pt-br/docs/` with the same relative path and structural metadata.
6. Add the page to `src/config/navigation.ts` only when it belongs in global navigation. Supply the PT-BR label through `translations`.
7. Link related modules using a route that is valid from the published page, not merely from the source directory.
8. Run `npm run check:all` and inspect both locale routes, sidebar, table of contents, previous/next links, search, mobile layout, and themes.
9. Open a focused pull request with validation results and screenshots for visible changes.

The generator never creates fictional prose or an automatic translation. A page containing `TODO` is not ready to merge.
