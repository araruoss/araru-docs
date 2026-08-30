---
title: "Frontend"
description: "Documentation for Frontend in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

React SPA started in `src/main.jsx`. The entrypoint configures the Router, theme, TanStack Query, error boundary, access control, toast, reading synchronization, local telemetry, and the production Service Worker. `App.jsx` lazy-loads pages and the command palette.

## Structure

- `pages`: Setup, Library, History, Statistics, Administration, Series, and Reading;
- `components`: navigation, cards, filters, modals, and operational panels;
- `readers`: contract, PDF.js, EPUB/MOBI parsers, and comic client;
- `hooks`: catalog and feature flags;
- `lib`: API, offline, and telemetry;
- `utils`: local storage and progress merge;
- `context`: theme and localization with catalogs in `src/locales` and fallback to `en`.

Remote state uses TanStack Query; the URL maintains navigation; local/session storage maintains the fallback and visual position; IndexedDB/Cache Storage support offline behavior.

The HTTP client in `lib/api.js` normalizes `VITE_API_URL`, sends credentials, and provides URL/fetch helpers. No secret is bundled into the build.

## Setup and administration

`AccessGate` queries `/api/v1/system/status`; setup is never decided by `localStorage`. Empty installations show a responsive seven-step wizard. After completion, the flow continues to login.

The public status also returns only the non-sensitive preferences `language`, `theme`, and `libraryName`. This applies language and theme before the login screen. Supported catalogs are in `src/locales/pt-BR.js` and `src/locales/en.js`; `en` is the default and fallback language. When global settings are saved, the frontend reloads the application to reapply the context on every route.

`/admin/*` uses the `src/features/admin` module, separated into navigation, layout, primitives, and pages. Each section loads only its own state. Desktop uses a sidebar; mobile/tablet uses a drawer with touch targets. Global theme and language live in Appearance. The header shows the active user and profile, allows switching only among associated profiles, shows Administration only to admins, and ends the session through the backend.
