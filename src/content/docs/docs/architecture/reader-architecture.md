---
title: "Reader Architecture"
description: "Documentation for reader architecture in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

The frontend uses capabilities in `readers/core.js` and a shared shell for loading, errors, retry, dock, progress, and cleanup. Engines are loaded on demand.

| Format | Current transport | Rendering |
|---|---|---|
| PDF | original content with Range | PDF.js + Vite worker |
| EPUB | binary content | JSZip parser and normalized HTML content |
| MOBI | content/pages/resources | frontend parser and backend support |
| CBZ | index and pages | on-demand images |
| CBR | index and pages | UnRAR/7z extraction and on-demand images |

The reader keeps only the current and nearby pages where possible, revokes Object URLs, and runs cleanup on close. Progress is format-agnostic: position/page, total, percentage, completion, and timestamp.

Details: [readers](../../readers/overview/).
