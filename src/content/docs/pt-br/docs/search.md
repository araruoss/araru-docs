---
title: Busca
description: Busca textual do PostgreSQL, relevância e filtros.
---

A busca atual usa o Full Text Search do PostgreSQL. Campos `tsvector` indexados combinam nome do arquivo, caminho, hierarquia de categorias, título, autor, descrição, ISBN e tags. Índices GIN permitem buscas escaláveis; normalização e `unaccent` melhoram as correspondências.

Filtros e ordenação da busca são responsabilidades da API. O Redis pode armazenar resultados em cache, mas o PostgreSQL continua sendo autoritativo. O SQLite FTS5 aparece apenas no contexto histórico da migração e não faz parte da arquitetura atual.
