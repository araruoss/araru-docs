# Diretrizes de testes para agentes

| Mudança | Validação mínima |
|---|---|
| componente/hook | frontend tests + build |
| reader/formato/touch | reader tests + E2E + performance |
| PWA/offline | PWA test + E2E; incrementar versão se política mudou |
| rota/controller/service | backend unit/integration |
| Range/arquivo | integration + fixtures grandes + E2E |
| migration | banco novo + upgrade existente |
| metadata | pipeline unit + integration do endpoint |
| job/cache/backup | teste específico + integração operacional |
| Docker/proxy/CORS | Compose health + curl/browser/E2E |
| docs | `npm run docs:check` |

Antes de concluir normalmente execute `npm run lint`, `npm test`, `npm run build`; amplie conforme a tabela.
