---
title: "Frontend Routing and State"
description: "Documentation for frontend routing and state in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

| Route | Component | Relevant state |
|---|---|---|
| `/` | `Biblioteca` | query, category, filters, order, mode |
| `/livro/:id` | `Leitura` | file, page/position, and return path |
| `/historico` | `Historico` | progress and last access |
| `/continuar` | redirect | compatibility with `/historico` |
| `/estatisticas` | `Estatisticas` | reading aggregates |
| `/series/:id` | `Serie` | work/series and sequence |

## State sources

- server: catalog, tree, profiles, reading state, preferences, and operations;
- URL: `categoria`, `q`, `secao`, `ordem`, `modo`, `subpastas`, and filters;
- localStorage: favorites/recent items and per-profile progress fallback;
- sessionStorage: scroll by route/query;
- Context: theme;
- IndexedDB/Cache Storage: offline inventory and bytes.

`readingSync.js` merges by timestamp and avoids losing the most recent position. Mutations invalidate related queries.
