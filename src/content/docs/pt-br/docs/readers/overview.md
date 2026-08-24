---
title: "Readers"
description: "Documentação sobre Readers no ecossistema Araru."
order: 100
section: "readers"
status: stable
---

O catálogo indexa formatos reconhecidos; a abertura depende de capability em `src/readers/core.js` no `araru-web`. O Server resolve ID para fonte e nunca expõe path físico.

Fluxo comum:

1. `Leitura` obtém livro e formato;
2. carrega engine/parser sob demanda;
3. requisita conteúdo, índice ou página;
4. renderiza dentro do shell comum;
5. prefetch limitado prepara vizinhas;
6. progresso é persistido;
7. cleanup libera recursos ao trocar/fechar.

Endpoints estão em [API/content](../api/endpoints.md#conteúdo-e-reader). Detalhes por formato em [formatos](formats.md).
