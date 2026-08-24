---
title: "Guias de mudança"
description: "Documentation for Guias de mudança in the Araru ecosystem."
order: 100
section: "development"
status: stable
---

## Nova rota

1. adicione regra em service;
2. crie/estenda controller;
3. registre em router adequado;
4. documente método/path/auth/headers;
5. teste sucesso, validação, erro e acesso.

## Nova migration

Próximo número, `version/name/up`, registro em index, sem editar antigas. Teste banco vazio e upgrade da versão anterior.

## Novo job

Defina handler, dedupe key, prioridade, concorrência/retry e observabilidade. Teste recuperação e falha; exponha operação apenas se necessária.

## Novo formato reader

Adicione extensão/capability, entrega backend, engine frontend, capa, progresso e cleanup. Teste fixture real, erro, touch, arquivo grande e PWA. Não carregue arquivo inteiro sem budget explícito.

## Novo storage provider (futuro)

Não há interface atual. Uma mudança dessas é arquitetural: preserve IDs, fingerprints, Range, retenção e falhas transitórias; crie ADR antes da implementação.
