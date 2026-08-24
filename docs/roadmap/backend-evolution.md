# Evolução possível do backend — FUTURO

## Próximas capacidades a avaliar

- autenticação real, usuários, autorização, devices e sessões revogáveis;
- versionamento de API, schemas e OpenAPI;
- abstração de storage preservando ID/fingerprint/Range;
- testes de carga e SLOs antes de alegações de escala.

## Evolução posterior possível

- PostgreSQL para estado compartilhado;
- Redis para rate limit, cache/coordenador e eventualmente filas;
- S3/Cloudflare R2 para objetos;
- workers separados para capas, metadata e archives;
- observabilidade distribuída e escala horizontal.

## Não decidido

- permanecer em Node.js ou introduzir Go em componentes específicos;
- migrations PostgreSQL incrementais após a fundação atual;
- Redis/broker/provedor de objetos;
- tenancy e modelo de autorização;
- ordem e cronograma.

Qualquer adoção exige ADR, migração, compatibilidade e benchmark. Nenhuma tecnologia acima existe no estado atual.
