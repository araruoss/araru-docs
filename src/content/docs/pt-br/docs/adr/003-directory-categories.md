---
title: "ADR-003: categorias derivadas de diretórios"
description: "Documentação sobre ADR-003: categorias derivadas de diretórios no ecossistema Araru."
order: 100
section: "adr"
status: stable
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

A árvore e filtros usam `categoryPath`. Rationale inferred from current architecture.

## Decision

Diretórios são a taxonomia hierárquica; tags não criam categorias.

## Alternatives

Tags livres ou categorias manuais como fonte primária.

## Consequences

Organização previsível e compatível com filesystem; mover arquivo altera categoria.
