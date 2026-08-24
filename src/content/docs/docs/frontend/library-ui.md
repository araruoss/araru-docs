---
title: "Biblioteca, categorias e busca"
---

# Biblioteca, categorias e busca

A sidebar é a navegação global. Em desktop pode recolher; em mobile vira drawer. Biblioteca abre o catálogo e expõe a árvore derivada de `categoryPath`; recentes e favoritos usam o mesmo conteúdo sem tabs duplicadas.

## Categorias

- nós vêm de `/api/categorias/arvore`;
- somente o ramo atual expande por padrão;
- chevrons existem apenas com filhos;
- linha inteira navega e contagens são discretas;
- seleção persiste na URL e mantém back/forward;
- no drawer, categorias intermediárias mantêm o painel aberto; folha final pode fechá-lo.

## Catálogo

`Biblioteca.jsx` combina catálogo, busca, filtros, subpastas, ordenação e modos grade/lista. `VirtualBookGrid` reduz elementos montados. Cards fazem lazy loading de capas, mostram fallback e antecipam dados relevantes ao abrir.

Busca do header altera `q`; a paleta de comandos oferece navegação/ações. A busca backend possui FTS, mas o frontend também compõe estados de apresentação e filtros do catálogo carregado.

Painéis laterais concentram perfis, preferências, views, metadados, duplicidades, offline, backup/importação e operação.
