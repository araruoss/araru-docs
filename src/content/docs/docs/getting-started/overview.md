---
title: "Visão geral"
description: "Documentation for Visão geral in the Araru ecosystem."
order: 100
section: "getting-started"
status: stable
---

O Araru cataloga arquivos, deriva a navegação das pastas, enriquece metadados e fornece leitores internos. Ele é self-hosted e atualmente orientado a uma instalação, embora suporte perfis de leitura dentro dessa instalação.

## Estado atual

- frontend React/Vite, servido por Nginx em produção;
- backend Node.js/Express;
- PostgreSQL como fonte persistente de estado e índice;
- Redis para cache compartilhado com TTL;
- filesystem local como fonte principal; Google Drive opcional;
- PDF, EPUB, MOBI, CBZ e CBR no leitor interno;
- PWA e download offline explícito;
- jobs e manutenção executados no processo do backend.

## Conceitos centrais

- **Library File**: arquivo físico indexado, com ID e fingerprint.
- **Work**: obra canônica que pode agrupar mais de um arquivo/formato.
- **categoryPath**: sequência de diretórios que define a categoria.
- **Profile**: contexto local que isola progresso e preferências; não é uma conta autenticada.
- **Derived File**: capa ou outro recurso regenerável.

Detalhes estão no [glossário](../llm/glossary.md) e no [modelo de domínio](../llm/domain-model.md).
