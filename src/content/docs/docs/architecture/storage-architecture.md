---
title: "Arquitetura de storage"
---

# Arquitetura de storage

## Filesystem local

`LOCAL_LIBRARY_DIR` é percorrido para descobrir formatos suportados. O ID local codifica o caminho relativo; fingerprint e timestamps detectam alterações. `categoryPath` é o diretório relativo sem o filename. Streams e Range evitam ler PDFs grandes integralmente.

## Google Drive

É uma fonte opcional. A configuração aceita pasta única ou `drive-folders.json`, API key e OAuth. Credenciais OAuth são criptografadas no PostgreSQL; `source_sync_state` guarda cursor incremental. Falhas não devem apagar itens apenas por ausência transitória; o catálogo usa status/retenção.

## Derivados

`COVER_CACHE_DIR` guarda capas regeneráveis. `cache_entries` registra path, tamanho, fingerprint, versão e último acesso. Integridade e LRU removem órfãos/excesso. Cache nunca é fonte de verdade.

## Direção futura — não implementada

Uma interface `StorageProvider` e objetos S3/R2 podem reduzir acoplamento e facilitar escala. Não existem atualmente; filesystem e Drive são implementados diretamente nos serviços atuais.
