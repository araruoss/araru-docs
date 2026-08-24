---
title: "ADR-002: PostgreSQL como persistência e Redis como cache"
---

# ADR-002: PostgreSQL como persistência e Redis como cache

Status: Accepted  
Date: 2026-08-23

## Context

Catálogo, autenticação, progresso, metadados, jobs e operação precisam de concorrência segura, consultas estruturadas, busca textual e suporte a serviços externos.

## Decision

PostgreSQL é a única fonte de verdade do backend. Redis armazena apenas caches com TTL. Arquivos originais continuam no filesystem ou Google Drive, e derivados permanecem regeneráveis.

## Consequences

A aplicação exige `DATABASE_URL`, cria schema e índices na inicialização e suporta PostgreSQL externo. Redis pode ser local ou externo e sua indisponibilidade não deve provocar perda de dados persistentes.
