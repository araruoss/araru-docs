---
title: Arquitetura da documentação
description: Entenda os limites entre conteúdo, componentes, navegação, traduções, automação e publicação.
order: 7
section: contributing
status: stable
---

## Conteúdo

Markdown e MDX armazenam conhecimento revisado. O frontmatter obrigatório descreve o estado editorial. O conteúdo não deve esconder lógica de configuração nem duplicar contratos gerados autoritativos.

## Componentes

Componentes Astro sob `src/components/docs/` fornecem blocos semânticos reutilizáveis. Sobrescritas de layout permanecem em `src/components/`. Os componentes reutilizam os tokens de `src/styles/araru.css` e evitam JavaScript no cliente, salvo quando a funcionalidade exigir.

## Navegação e configuração

`src/config/navigation.ts` define a navegação lógica compartilhada. `locales.ts` define idiomas e raízes de conteúdo. `site.ts` controla URLs da organização e dos repositórios. `astro.config.mjs` compõe essas responsabilidades sem duplicá-las.

## Traduções

O inglês é canônico e o PT-BR espelha seus slugs. Catálogos da interface sob `src/content/i18n/` são separados do conteúdo das páginas. Traduções ausentes podem usar fallback; traduções estruturalmente inválidas falham na validação.

## Automação e CI

Conteúdo, links, âncoras, traduções, tipos do Astro e build estático são validados por `npm run check:all`. Pull requests validam sem publicar. O deploy no GitHub Pages executa somente a partir de `main` ou por acionamento manual.

## Publicação

O site é estático. `SITE_URL` controla a origem canônica e `BASE_PATH` permite um prefixo opcional de projeto no Pages. O Pagefind é gerado durante o build de produção e não exige serviço externo de busca.
