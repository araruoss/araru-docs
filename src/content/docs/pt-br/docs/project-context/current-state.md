---
title: Estado atual do projeto
description: Stack, módulos, funcionalidades, restrições e trabalhos incompletos verificados do Araru.
order: 1
section: project-context
status: stable
---

## Stack atual

- Server: Node.js e Express com PostgreSQL para armazenamento persistente e Redis para cache e coordenação.
- Web: PWA React e Vite consumindo somente a API HTTP do Server.
- Docs: Astro, Starlight, Markdown/MDX, Mermaid e Pagefind, publicados estaticamente no GitHub Pages.
- Conteúdo: armazenamento local somente para leitura e integração opcional com Google Drive.
- Leitores: experiências internas para PDF, EPUB, MOBI, CBZ e CBR com progresso compartilhado.

## Módulos atuais

Autenticação, usuários individuais, perfis, administração global, indexação do catálogo, categorias do filesystem, enriquecimento de metadados, capas, busca, progresso, favoritos, histórico/continuar lendo, jobs, integridade, backups, saúde e configurações operacionais são documentados como fundações implementadas.

## Invariantes

O Server controla a API e a autorização. Clientes nunca conectam diretamente ao PostgreSQL ou Redis. PostgreSQL é autoritativo. Dados do Redis são reconstruíveis. Releases dos repositórios são independentes. Categorias derivam dos caminhos do provedor e de `categoryPath`. O conteúdo original nunca é excluído silenciosamente por fluxos de metadados ou duplicatas.

## Incompleto ou planejado

Clientes Android e Desktop, audiolivros e um ecossistema de plugins continuam planejados. Cloudflare R2, API v1, paginação, capabilities de storage e leases de workers estão implementados na `main` mergeada do Server; MOBI possui limitações do formato. Itens planejados não podem ser apresentados como lançados.

Consulte o [contexto arquitetural](../../llm/architecture-context/), as [restrições de código](../../llm/constraints/), as [decisões técnicas](../../adr/readme/) e o [roadmap](../../roadmap/readme/).
