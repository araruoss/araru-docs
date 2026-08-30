---
title: "Performance, Range e progresso"
description: "Documentação sobre Performance, Range e progresso no ecossistema Araru."
order: 100
section: "readers"
status: stable
---

## Arquivos grandes

Conteúdo local usa streams e `fs.stat`; Range lê somente o intervalo solicitado e retorna `206`. O E2E/backend cria arquivos esparsos de 500 MB, 2 GB e 5 GB e valida pequenos ranges, demonstrando que o caminho testado não aloca o arquivo inteiro.

Limites configuráveis:

- `READER_MAX_IN_MEMORY_MB`: orçamento backend para operações que exigem buffer;
- `COVER_MAX_IN_MEMORY_MB` e `COVER_MAX_SOURCE_IMAGE_MB`: pipeline de capas;
- frontend: `ResourceBudget` LRU e prefetch adaptativo por dispositivo/conexão.

Nem todo formato pode ser totalmente streamado: ZIP/MOBI/archives podem exigir índice ou buffer parcial/total conforme biblioteca. Operações checam orçamento e devem falhar de modo controlado em vez de excedê-lo.

## Range

Cliente envia `Range: bytes=start-end`; backend valida limites, responde `Content-Range`, `Content-Length`, `Accept-Ranges` e 416 para intervalo inválido. Proxy Nginx desativa buffering nas rotas de conteúdo para preservar streaming.

## Progresso

Estado contém ID, posição/página, total, percentual, timestamps e conclusão. Frontend grava fallback local e sincroniza `/api/v1/works/:id/reading-state`. Merge escolhe atualização mais recente por livro/perfil. Histórico mostra capa, último acesso e retomada.

Readers novos devem implementar posição estável, total quando conhecido e cleanup idempotente.
