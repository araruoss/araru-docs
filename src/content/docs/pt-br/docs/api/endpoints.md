---
title: "Inventário de endpoints"
description: "Documentação sobre Inventário de endpoints no ecossistema Araru."
order: 100
section: "api"
status: stable
---

Fonte: `server/app.js`, middleware de segurança e rotas do [`araru-server`](https://github.com/araruoss/araru-server). **Auth** indica sessão individual obrigatória após a conclusão do setup; health, status, setup e login têm as exceções descritas abaixo.

## Saúde e acesso

| Método | Path | Auth | Contrato/notas |
|---|---|---:|---|
| GET | `/api/health` | não | status, uptime, proteção ativa |
| GET | `/api/health/details` | sim | runtime, catálogo, filas, watcher e Drive |
| POST | `/api/access/login` | não | `{secret}`; cria cookie; 401 inválido |
| POST | `/api/access/logout` | não | limpa cookie; 204 |
| GET | `/api/auth/login` | sim | inicia OAuth ou informa configuração por API key |
| GET | `/api/auth/callback` | sim¹ | callback Google e redirect ao frontend |
| POST | `/api/auth/logout` | sim | remove credenciais do Drive |

¹ O callback passa pelo middleware de acesso quando proteção está ativa; a implantação deve considerar esse fluxo.

## Administração

Todos os endpoints desta seção exigem sessão com role `admin`; usuário autenticado sem essa role recebe `403`.

| Método | Path | Contrato/notas |
|---|---|---|
| GET | `/api/admin/overview` | saúde e contagens não sensíveis da instalação |
| GET | `/api/admin/audit` | ações administrativas recentes; `limit` máximo 100 |
| GET/PUT | `/api/settings/general` | lê/atualiza configurações globais permitidas |
| GET/POST | `/api/access/users` | lista/cria users |
| PATCH/DELETE | `/api/access/users/:id` | altera/exclui com proteção do último admin |
| POST | `/api/access/users/:id/reset-password` | define senha temporária e encerra sessões |
| PUT | `/api/profiles/:id/users` | substitui associações user/profile |

## Catálogo, categorias e busca

| Método | Path | Request/response e notas |
|---|---|---|
| GET | `/api/livros` | catálogo atual |
| GET | `/api/livros/categoria/:categoria` | filtro legado por nome |
| GET | `/api/livros/busca` | query textual indexada |
| GET | `/api/livros/isbn/:isbn` | lookup por ISBN |
| GET | `/api/categorias` | categorias resumidas |
| GET | `/api/categorias/arvore` | árvore de `categoryPath` |
| POST | `/api/categorias/sincronizar` | reconcilia categorias/catalogação |

## Conteúdo e reader

| Método | Path | Resposta/cache/notas |
|---|---|---|
| GET/HEAD | `/api/livros/:id/conteudo` | binário; Range/ETag/Disposition conforme fonte |
| GET | `/api/livros/:id/capa` | imagem derivada/interna; cache HTTP |
| GET | `/api/livros/:id/metadados` | metadados e proveniência |
| GET | `/api/livros/:id/paginas` | índice de páginas para formatos paginados |
| GET | `/api/livros/:id/paginas/:page` | bytes/imagem da página; 404/422/416 conforme caso |
| GET | `/api/livros/:id/recursos/mobi/:recindex` | recurso incorporado MOBI |

IDs devem ser tratados como opacos e URL-encoded. O cliente não usa path físico.

## Metadados

| Método | Path | Request/response |
|---|---|---|
| POST | `/api/livros/:id/atualizar` | patch manual de campos |
| POST | `/api/livros/:id/enriquecer` | inicia/executa enriquecimento |
| POST | `/api/livros/enriquecer-pendentes` | lote com critérios do payload |
| GET | `/api/livros/revisar-metadados` | sugestões pendentes |
| GET | `/api/metadata/export` | exportação JSON atual |
| POST | `/api/metadata/import` | importa payload validado |

## Continuidade, perfis e produto

| Método | Path | Request/response |
|---|---|---|
| GET/PUT | `/api/reading-state` | estado do perfil atual; PUT faz merge/persistência |
| GET/POST | `/api/profiles` | lista/cria perfil |
| PUT/DELETE | `/api/profiles/:id` | atualiza/remove perfil |
| POST | `/api/profiles/:id/select` | seleciona perfil |
| GET | `/api/works` | obras canônicas |
| GET | `/api/works/:id` | obra + arquivos |
| GET/POST | `/api/saved-views` | lista/cria view |
| DELETE | `/api/saved-views/:id` | remove view; 204 |
| GET/PUT | `/api/preferences` | preferências do perfil |
| GET | `/api/series` | séries |
| GET | `/api/series/:id` | série e volumes |
| GET | `/api/features` | feature flags |
| GET | `/api/duplicates` | candidatos duplicados |
| POST | `/api/duplicates/decision` | registra decisão |
| POST | `/api/reader-metrics` | telemetria local; 202 |

## Backup e operações

| Método | Path | Request/response/notas |
|---|---|---|
| GET | `/api/backup` | arquivo gzip |
| POST | `/api/backup/verify` | gzip/octet-stream até 100 MB; não altera estado |
| POST | `/api/backup/restore` | gzip/octet-stream até 100 MB; exige confirmação definida pelo controller |
| GET | `/api/operations/jobs` | histórico/fila |
| POST | `/api/operations/jobs/:id/cancel` | somente job pendente |
| POST | `/api/operations/jobs/:id/retry` | failed/cancelled |
| GET | `/api/operations/metrics` | métricas HTTP/runtime |
| GET | `/api/operations/reader-metrics` | métricas recebidas dos readers |
| GET | `/api/operations/cache` | uso por tipo |
| POST | `/api/operations/cache/cleanup` | dry-run por padrão; `?apply=true` executa |
| GET | `/api/operations/covers/problems` | capas de baixa qualidade/ausentes |
| POST | `/api/operations/covers/regenerate` | agenda/regenera seleção |
| GET | `/api/operations/integrity` | último relatório/listagem |
| POST | `/api/operations/integrity/scan` | escaneia; reparo depende do payload/controller |
| GET | `/api/operations/circuit-breakers` | estado de provedores |

Todos esses endpoints passam pela proteção global quando configurada. Payloads exatos devem ser confirmados no controller antes de criar um cliente novo; não existe schema OpenAPI gerado.
## Setup, identidade e configuração

- `GET /api/system/status`: informa se o setup inicial é necessário;
- `POST /api/setup`: cria configuração, administrador e perfil de forma atômica;
- `POST /api/access/login`, `POST /api/access/logout`: abre e encerra sessão individual;
- `GET /api/auth/me`: retorna usuário, perfis associados e perfil ativo;
- `GET|POST /api/access/users`: lista/cria usuários (admin);
- `PATCH|DELETE /api/access/users/:id`: altera/exclui conta (admin);
- `POST /api/access/users/:id/reset-password`: redefine senha e encerra sessões;
- `GET|PUT /api/settings/general`: configuração global (admin);
- `GET|POST /api/profiles`, `PUT|DELETE /api/profiles/:id`: perfis;
- `PUT /api/profiles/:id/users`: substitui associações explícitas do perfil;
- `POST /api/profiles/:id/select`: persiste o perfil ativo na sessão.
