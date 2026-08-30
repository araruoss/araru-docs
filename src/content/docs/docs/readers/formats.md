---
title: "Reading formats"
description: "Documentation for Read formats in the Araru ecosystem."
order: 100
section: "readers"
status: stable
---

PDF

- discovery: extension `.pdf`;
- backend: `/conteudo` with HEAD/get and range for local file;
- frontend: PDF.js legacy and worker packaged by Vite as `.js`;
- pages: canvas sized to viewport; current/neighboring cache;
- cover: internal/provider or first page via Poppler/pipeline;
- progress: page, total and percentage;
- cleanup: cancels render tasks, clears canvas/cache and destroys document;
-limitation: Corrupted/protected PDFs may fail; external sources depend on the source.

ePUB

- discovery: `.epub`;
- backend: delivers the file, including Range when local file;
- frontend: `epubParser.js` uses JSZip for container, OPF, spine and resources; does not use `epubjs` library;
- CAPA: metadata/manifest or fallback generated;
- progress: paginated unit/position of normalized content;
- cleanup: removes temporary URLs/DOM;
- limitation: EPUBs with non-standard features/DRM may not renderfully.

MOBI

- discovery: `.mobi`;
- backend: reader service/parser provides content, pages and `/recursos/mobi/:recindex`;
- frontend: `mobiParser.js` normalizes payload and references;
- CAPA: internal record when extractable, then fallbacks;
- progress: page/total;
- limitation: proprietary variants/DRM and malformed MOBI.

Cbz

- discovery: `.cbz`;
- backend: JSZip creates ordered index and serves `/paginas/:page`;
- frontend: `comicClient.js` fetches images on demand and keeps Object URLs nearby;
- cover: first image;
- progress: image index;
- cleanup: revokes Object URLs.

cbr

- discovery: `.cbr`;
- backend: UnRAR and 7-Zip fallback for index/page;
- frontend: same comics reader;
- cover: first image;
- limitation: requires compatible tools/file; protected files or unsupported RAR variants fail.
