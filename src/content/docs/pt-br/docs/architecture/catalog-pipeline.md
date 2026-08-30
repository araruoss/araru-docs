---
title: "Pipeline de catálogo e contrato do leitor"
description: "Identidade de conteúdo, indexação e manifesto versionado do Araru."
order: 115
section: "architecture"
status: stable
---

## Fonte de verdade

O PostgreSQL é a fonte de verdade para arquivos, obras, autores, séries, estado de leitura e tarefas. O Redis é somente cache e coordenação efêmera. Cada arquivo possui fingerprint operacional e, quando possível, um hash de conteúdo (`sha256`, `md5` ou checksum do provider). Isso permite detectar mudanças sem confundir nome ou caminho com identidade do conteúdo.

## Estados do pipeline

`library_files.pipeline_status` e `pipeline_stage` tornam descoberta, extração de metadados, geração de capa e preparação do leitor observáveis. Erros preservam código e mensagem para retry administrativo; uma falha não deve apagar a obra já catalogada.

## Manifesto do leitor

Antes de abrir uma obra, o cliente pode consultar `GET /api/v1/works/:id/manifest`. A resposta é versionada pelo hash do conteúdo e descreve `readingType` (`paged` ou `reflowable`), formato, páginas, capítulos, dimensões, direção e URLs dos recursos. PDFs e quadrinhos usam páginas sob demanda; EPUB/MOBI usam o conteúdo reflowable. O endpoint aceita ETag e não expõe paths físicos.

## Arquivos grandes

O limite `READER_MAX_IN_MEMORY_MB` impede que o Node materialize arquivos grandes sem controle. PDFs locais grandes usam ferramentas Poppler com saída limitada; formatos que não possuem extração segura por stream são marcados com erro explícito para processamento posterior, em vez de causar uma leitura integral silenciosa.
