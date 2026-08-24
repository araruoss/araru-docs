---
title: "Arquitetura dos readers"
description: "Documentation for Arquitetura dos readers in the Araru ecosystem."
order: 100
section: "architecture"
status: stable
---

O frontend usa capabilities em `readers/core.js` e um shell comum para loading, erro, retry, dock, progresso e cleanup. Engines são carregadas sob demanda.

| Formato | Transporte atual | Renderização |
|---|---|---|
| PDF | conteúdo original com Range | PDF.js + worker Vite |
| EPUB | conteúdo binário | parser JSZip e conteúdo HTML normalizado |
| MOBI | conteúdo/páginas/recursos | parser frontend e suporte do backend |
| CBZ | índice e páginas | imagens sob demanda |
| CBR | índice e páginas | extração UnRAR/7z e imagens sob demanda |

O reader mantém somente página atual e vizinhas quando possível, revoga Object URLs e executa cleanup no fechamento. Progresso é formato-agnóstico: posição/página, total, percentual, conclusão e timestamp.

Detalhes: [readers](../../readers/overview/).
