---
title: "Convenções de desenvolvimento"
---

# Convenções de desenvolvimento

## Backend

Rotas apenas mapeiam; controllers adaptam HTTP; services contêm regras. Erros esperados recebem `statusCode`; middleware normaliza envelope. Use logger estruturado, nunca `console` ou secrets. Streams/Range devem evitar buffers integrais. Jobs longos precisam dedupe, prioridade, retry e estado observável.

Migrations são append-only e transacionais. Preserve IDs/URLs e o boundary Work/File. Cache é derivado.

## Frontend

API passa por `lib/api.js`; estado remoto por Query; URL para navegação compartilhável; local state para apresentação. Componentes devem manter mobile/touch, foco, loading, erro e cleanup. Readers usam capabilities/core e não duplicam shell/progresso.

## Estilo atual

ES modules, React funcional/hooks, imports relativos e nomes de domínio majoritariamente em português. O lint atual verifica TODO/FIXME e console no backend; não é um linter semântico completo.
