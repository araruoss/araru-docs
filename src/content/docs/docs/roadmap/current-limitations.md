---
title: "Limitações atuais confirmadas"
---

| Estado atual | Impacto | Quando vira problema | Direção possível — não decidida |
|---|---|---|---|
| fila executada no processo da API | trabalho disputa CPU/memória com API | jobs pesados/alta concorrência | workers separados usando a persistência PostgreSQL |
| cache Redis sem cluster obrigatório | dependência opcional de uma instância | cache distribuído de alta disponibilidade | Sentinel/Cluster gerenciado |
| rate limit em memória | contagem não compartilhada | várias instâncias | Redis/gateway |
| métricas runtime locais | reiniciam e não agregam hosts | operação distribuída | OpenTelemetry/stack externa |
| perfis não são contas | sem identidade/autorização por usuário | acesso público multiusuário | auth, users, sessions e ACL |
| filesystem e Drive acoplados | provider novo exige mudanças de serviço | S3/R2/múltiplas regiões | `StorageProvider` |
| um backend | sem escala horizontal segura declarada | throughput/HA | stateless API + DB/cache compartilhados |
| API sem versão/OpenAPI | clientes dependem de contrato manual | Desktop/Android independentes | `/v1`, schemas e OpenAPI |
| offline centrado no navegador | quota e portabilidade limitadas | múltiplos devices | sync/download protocol estável |
| archives podem exigir buffer/ferramentas | custo variável por arquivo | HQs enormes/malformadas | extração isolada e streaming especializado |

Não há benchmark que comprove milhares de conexões simultâneas. O benchmark atual mede catálogo, e o teste de arquivos grandes mede Range com arquivos esparsos.
