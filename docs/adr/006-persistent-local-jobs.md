# ADR-006: jobs locais com histórico persistente

Status: Accepted  
Date: 2026-08-23 (retrospective)

## Context

Fila em memória persiste estados em `background_jobs`. Rationale inferred from current architecture.

## Decision

Backend executa jobs com prioridade, dedupe, retry e recuperação local.

## Alternatives

Execução síncrona; broker externo.

## Consequences

Sem infraestrutura adicional e com recuperação; concorrência/coordenação permanecem limitadas a uma instância.
