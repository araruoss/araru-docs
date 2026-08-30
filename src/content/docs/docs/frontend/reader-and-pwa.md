---
title: "Reader, Responsiveness, and PWA"
description: "Documentation for the reader, responsiveness, and PWA in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

## Reader

`Leitura.jsx` selects a capability by format. `ReaderShell` standardizes opening, error, retry, and closing states. The overlaid dock remains visible on desktop/mobile and contains navigation, page controls, and close.

PDF.js receives a Worker created by the Vite bundle, avoiding a `.mjs` MIME dependency. EPUB/MOBI are normalized into pages/content; comics request images on demand. Cleanup cancels tasks, destroys documents, clears canvases, and revokes Object URLs.

Touch, click, and keyboard are supported. The full page is fitted to the viewport; the page-turn animation was removed.

## PWA

`public/sw.js` uses versioned caches. Navigation and catalog are network-first; covers/assets use stale-while-revalidate with limits. Book payloads are excluded from automatic caching. `offlineLibrary.js` downloads content only after explicit action and records metadata in IndexedDB.

The shell has a manifest, icon, and offline fallback. When policies change, increment `CACHE_VERSION` and run PWA/E2E tests.

## Erros

`AppErrorBoundary` handles global failures. Queries show loading/error/retry; readers show a specific error instead of a blank screen; toasts communicate operations. Code cancels asynchronous work on unmount where applicable.
