---
title: "Referência de configuração"
description: "Como configurar o Araru Server, Web, bancos, segurança e storage."
order: 100
section: "getting-started"
status: stable
---

O Araru é executado a partir de repositórios separados. Configure `araru-server` e `araru-web` de forma independente; eles não precisam compartilhar um diretório.

## Início rápido

```bash
cd araru-server
cp .env.example .env
npm ci
npm run migrate
npm run dev
```

Em outro terminal:

```bash
cd araru-web
cp .env.example .env
npm ci
npm run dev
```

O servidor lê `.env` na raiz do próprio repositório. Paths relativos são resolvidos a partir dessa raiz. A lista completa e oficial está em [`araru-server/.env.example`](https://github.com/araruoss/araru-server/blob/main/.env.example).

## Configuração mínima

```dotenv
NODE_ENV=development
PORT=3001
DATABASE_URL=postgres://araru:password@localhost:5432/araru
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173
PUBLIC_BACKEND_URL=http://localhost:3001
ALLOWED_ORIGINS=http://localhost:5173
APP_ACCESS_SECRET=troque-por-um-segredo-aleatorio-longo
```

O PostgreSQL é a fonte de verdade do catálogo, usuários, estado de leitura e metadados dos providers. O Redis é cache/coordenação opcional e não deve ser tratado como dado persistente.

## Grupos de parâmetros

### Rede e banco

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | Modo de execução. |
| `PORT` | `3001` | Porta HTTP. |
| `DATABASE_URL` | — | URL PostgreSQL; obrigatória na operação normal. |
| `DATABASE_SSL` | `false` | TLS do PostgreSQL. |
| `DATABASE_POOL_MAX` | `10` | Tamanho máximo do pool. |
| `DATABASE_IDLE_TIMEOUT_MS` | `30000` | Timeout de conexão ociosa. |
| `DATABASE_CONNECTION_TIMEOUT_MS` | `5000` | Timeout de conexão. |
| `REDIS_ENABLED` | `true` | Habilita Redis. |
| `REDIS_URL` | — | URL Redis quando habilitado. |
| `REDIS_KEY_PREFIX` | `araru:` | Namespace das chaves Redis. |
| `FRONTEND_URL` | `http://localhost:5173` | URL canônica do frontend. |
| `PUBLIC_BACKEND_URL` | `http://localhost:<PORT>` | URL pública usada nos links. |
| `ALLOWED_ORIGINS` | `FRONTEND_URL` | Origens CORS exatas separadas por vírgula. |

### Arquivos e jobs

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `DATA_DIR` | `storage` | Diretório persistente do servidor. |
| `LOCAL_LIBRARY_DIR` | `storage/pdfs` | Diretório da biblioteca local. |
| `COVER_CACHE_DIR` | `storage/cache/covers` | Cache recriável de capas. |
| `DRIVE_FOLDERS_CONFIG` | `storage/drive-folders.json` | Mapeamento de pastas Drive/categorias. |
| `MANUAL_CATEGORIAS_PATH` | `storage/categorias.json` | Sobrescritas manuais. |
| `LOCAL_FILES_ROUTE` | `/arquivos` | Prefixo de recursos locais. |
| `LIBRARY_WATCH_ENABLED` | `true` | Observa alterações na biblioteca local. |
| `LIBRARY_WATCH_DEBOUNCE_MS` | `1200` | Debounce do watcher. |
| `JOBS_ENABLED` | `true` | Habilita jobs agendados. |
| `CATALOG_REFRESH_INTERVAL_MINUTES` | `60` | Intervalo de atualização do catálogo. |
| `MAINTENANCE_INTERVAL_MINUTES` | `1440` | Intervalo de manutenção. |
| `CATALOG_MISSING_RETENTION_DAYS` | `30` | Retenção de registros ausentes. |

### Google Drive

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `ENABLE_GOOGLE_DRIVE` | `true` | Habilita a integração Drive. |
| `GOOGLE_API_KEY` | vazio | Acesso por chave a recursos públicos. |
| `GOOGLE_CLIENT_ID` | vazio | ID do cliente OAuth. |
| `GOOGLE_CLIENT_SECRET` | vazio | Segredo do cliente OAuth. |
| `GOOGLE_REDIRECT_URI` | `http://localhost:3001/api/v1/auth/callback` | URL de callback OAuth. |
| `DRIVE_FOLDER_ID` | vazio | Pasta raiz a indexar. |
| `DRIVE_REQUEST_TIMEOUT` | `15000` | Timeout em milissegundos. |
| `DRIVE_CONCURRENCY` | `6` | Operações Drive simultâneas. |

Consulte o [guia de storage](../../storage/) para OAuth, mapeamento de pastas, sincronização e limitações.

### Segurança e cookies

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `TRUST_PROXY` | `false` | Confia em headers encaminhados somente atrás de proxy confiável. |
| `RATE_LIMIT_ENABLED` | `false` | Habilita rate limit da API. |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Janela do rate limit. |
| `API_RATE_LIMIT_PER_MINUTE` | `300` | Requisições por janela. |
| `APP_ACCESS_SECRET` | vazio | Segredo aleatório longo para sessões/OAuth. |
| `ACCESS_SESSION_SECONDS` | `86400` | Duração da sessão. |
| `SECURE_COOKIES` | `false` | Use `true` com HTTPS. |
| `COOKIE_SAME_SITE` | `lax` | `lax`, `strict` ou `none`; `none` exige cookie seguro. |
| `LOG_LEVEL` | `info` | `error`, `warn`, `info` ou `debug`. |
| `USE_MOCK_DATA` | `false` | Modo mock somente para desenvolvimento. |

### Web

| Variável | Descrição |
| --- | --- |
| `VITE_API_URL` | `/api` no mesmo domínio ou URL absoluta da API. |
| `VITE_DEV_PROXY_TARGET` | Destino do proxy Vite no desenvolvimento. |
| `VITE_ALLOWED_HOSTS` | Hosts de LAN/túnel permitidos no desenvolvimento. |

Somente valores `VITE_*` chegam ao navegador. Nunca coloque senhas do banco, segredos OAuth ou chaves secretas R2 no ambiente do Web.

## Regras de produção

- Use `NODE_ENV=production`, HTTPS, `SECURE_COOKIES=true`, `ALLOWED_ORIGINS` exatas e `APP_ACCESS_SECRET` aleatório longo.
- Habilite rate limit quando a API estiver acessível pela Internet.
- Mantenha o R2 privado e emita URLs assinadas pelo servidor quando precisar de entrega direta.
- Monte `DATA_DIR`, os dados do PostgreSQL e a biblioteca original em storage persistente.
- Não exponha `/health/details` nem rotas administrativas sem autenticação.
- Não registre objetos de ambiente, tokens, URLs assinadas ou headers de autorização.
