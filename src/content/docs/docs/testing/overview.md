---
title: "Estratégia de testes e CI"
---

# Estratégia de testes e CI

## Suítes

- Web (`test` no `araru-web`): storage/progresso, cache PWA, core/budget/cleanup do reader e merge de sync;
- Server (`test` no `araru-server`): unidades e integrações Express/PostgreSQL/filesystem em banco isolado `araru_test`;
- E2E (`test/e2e-touchscreen.js`): build, serviços temporários e browser via `playwright-core`;
- benchmarks: catálogo configurável e cenário de 1.000 registros;
- performance frontend: tamanho de main, reader e CSS.

```bash
npm run test:frontend
npm run test:backend
npm run test:e2e
npm run benchmark:catalog:1k
npm run benchmark:catalog
npm run check:performance
```

## CI atual

`.github/workflows/ci.yml` dispara em push e pull request, usa Node 22 e executa `npm ci`, testes, E2E, dois benchmarks, lint e budget. Não publica artifacts/deploy e não executa matriz de versões.

O teste E2E cobre proxy/cross-origin, Range/CORS, PDF/EPUB/MOBI/CBZ/CBR, touchscreen, PWA e offline seletivo. Testes backend usam arquivos esparsos para 500 MB, 2 GB e 5 GB sem transferi-los integralmente. `TEST_DATABASE_URL` pode apontar para um PostgreSQL externo, mas o nome do banco deve terminar em `_test`.
