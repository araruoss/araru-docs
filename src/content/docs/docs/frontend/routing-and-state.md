---
title: "Rotas e estado do frontend"
description: "Documentation for Rotas e estado do frontend in the Araru ecosystem."
order: 100
section: "frontend"
status: stable
---

| Rota | Componente | Estado relevante |
|---|---|---|
| `/` | `Biblioteca` | query, categoria, filtros, ordem, modo |
| `/livro/:id` | `Leitura` | arquivo, página/posição e retorno |
| `/historico` | `Historico` | progresso e último acesso |
| `/continuar` | redirect | compatibilidade para `/historico` |
| `/estatisticas` | `Estatisticas` | agregados de leitura |
| `/series/:id` | `Serie` | obra/série e sequência |

## Fontes de estado

- servidor: catálogo, árvore, perfis, reading state, preferências e operação;
- URL: `categoria`, `q`, `secao`, `ordem`, `modo`, `subpastas` e filtros;
- localStorage: favoritos/recentes e fallback de progresso por perfil;
- sessionStorage: scroll por rota/query;
- Context: tema;
- IndexedDB/Cache Storage: inventário e bytes offline.

`readingSync.js` mescla por timestamp e evita perder a posição mais recente. Mutations invalidam queries relacionadas.
