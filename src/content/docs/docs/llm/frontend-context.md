---
title: "Frontend context for LLM"
description: "Documentation for Frontend Context for LLM in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

Entrypoint `main.jsx`; routes/lazy in `App.jsx`; pages in `pages`; UI in `components`; readers in `readers`; API in `lib/api.js`.

Remote state: TanStack Query. Navigation/filters: URL. Fallback/progress: localStorage + sync API. Scroll: sessionStorage. Offline: Cache Storage + IndexedDB. Theme: Context.

Library focuses navigation on the sidebar/drawer and tree of `categoryPath`; do not reintroduce global tabs in the content. History is “Pick up where you left off”; `/continuar` only redirects.

Readers share shell, dock, progress, budget, and cleanup. Preserve desktop/mobile/touch, full viewport and PDF worker Vite `.js`. Service Worker should not automatically cache books.

Minimum tests for frontend: `npm run test:frontend`, build; reader/PWA requires E2E and performance.
