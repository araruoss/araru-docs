---
title: "ADR-005: HTTP Range para conteúdo grande"
---

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

API e testes suportam arquivos PDF esparsos de até 5 GB. Rationale inferred from current architecture.

## Decision

Conteúdo aplicável usa streaming/Range e proxies sem buffering.

## Alternatives

Buffer integral; download prévio obrigatório.

## Consequences

Memória não cresce com tamanho do PDF; clientes/proxies precisam preservar headers e 206/416.
