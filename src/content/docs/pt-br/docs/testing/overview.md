---
title: "Estratégia de testes e CI"
description: "Documentação sobre Estratégia de testes e CI no ecossistema Araru."
order: 100
section: "testing"
status: stable
---

## Suítes

- Web (`test` no `araru-web`): storage/progresso, cache PWA, core/budget/cleanup do reader e merge de sync;
- Server (`test` no `araru-server`): unidades e integrações Express/PostgreSQL/filesystem em banco isolado `araru_test`;
- E2E (`test/e2e-smoke.js`): build, serviços temporários e browser via `playwright-core`;
- benchmarks: catálogo configurável e cenário de 1.000 registros;
- benchmark de API configurável para health, system, works, operations/jobs e métricas p50/p95/p99;
- contrato automatizado entre as rotas `/api/v1` e o OpenAPI;
- performance frontend: tamanho de main, reader e CSS.

```bash
npm test # dentro de araru-server ou araru-web
npm run test:e2e # dentro de araru-web
npm run benchmark:catalog:1k
npm run benchmark:catalog
npm run benchmark:api
npm run check:performance
```

## CI atual

`.github/workflows/ci.yml` dispara em push e pull request, usa Node 22 e executa `npm ci`, testes, E2E, dois benchmarks, lint e budget. Não publica artifacts/deploy e não executa matriz de versões.

O teste E2E cobre proxy/cross-origin, Range/CORS, PDF/EPUB/MOBI/CBZ/CBR, touchscreen, PWA e offline seletivo. Testes backend usam arquivos esparsos para 500 MB, 2 GB e 5 GB sem transferi-los integralmente. `TEST_DATABASE_URL` pode apontar para um PostgreSQL externo, mas o nome do banco deve terminar em `_test`.
