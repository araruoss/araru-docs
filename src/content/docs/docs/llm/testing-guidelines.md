---
title: "Testing guidelines for agents"
description: "Documentation for Testing Guidelines for Agents in the Araru ecosystem."
order: 100
section: "llm"
status: stable
---

| Change | Minimum validation |
|---|---|
| component/hook | frontend tests + build |
| reader/format/touch | reader tests + E2E + performance |
| PWA/offline | PWA test + E2E; increment version if policy changed |
| route/controller/service | backend unit/integration |
| Range/file | integration + large fixtures + E2E |
| migration | new bank + existing upgrade |
| metadata | pipeline unit + integration ofendpoint |
| job/cache/backup | specific test + operational integration |
| Docker/proxy/CORS | Compose health + curl/browser/E2E |
| docs | `npm run docs:check` |

Before completing normally run `npm run lint`, `npm test`, `npm run build`; enlarge as per table.
