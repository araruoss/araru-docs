---
title: Araru Web
description: Official browser client and PWA for Araru.
---

# Araru Web

**Status: Stable foundation**

Araru Web is the official React/Vite client. It provides setup, login, library navigation, search, administration, offline controls, and readers for PDF, EPUB, MOBI, CBZ, and CBR.

All data flows through `VITE_API_URL`. The client has no direct access to PostgreSQL, Redis, filesystem paths, Drive, R2, or server credentials.

```bash
cp .env.example .env
npm ci
npm run dev
npm test
npm run build
```

See [UI architecture](frontend/overview/) and [reader/PWA](frontend/reader-and-pwa/).
