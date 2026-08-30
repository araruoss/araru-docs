---
title: "Readers"
description: "Documentation for Readers in the Araru ecosystem."
order: 100
section: "readers"
status: stable
---

The catalog indexes recognized formats; opening depends on capability in `src/readers/core.js` in `araru-web`. The Server resolves ID to source and never exposes physical path.

Common flow:

1. `Reading` gets the book and format;
2. loads engine/parser on demand;
3. requests content, index, or page;
4. renders within the common shell;
5. limited prefetch prepares neighbors;
6. progress is persisted;
7. cleanup frees resources when switching/closing.

Endpoints are in [API/content](../../api/endpoints/#library-and-reading). Details by format in [formats](../formats/).
---
