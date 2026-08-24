---
title: "Docker, rede e produção"
---

## Compose atual

```mermaid
flowchart LR
  H[Host/browser] -->|8080| N[frontend: Nginx]
  N -->|Docker DNS :3001| B[backend: Node]
  H -. diagnóstico .->|3001| B
  B --> P[(PostgreSQL :5432)]
  B --> R[(Redis :6379)]
  B -->|read-only| L[(./storage/pdfs → /library)]
  B --> D[(./storage → /data)]
  B --> C[(./storage/cache → /cache)]
```

O `Dockerfile` do [`araru-web`](https://github.com/araruoss/araru-web) faz build multi-stage com Node 22 e serve `dist` em Nginx. O [`araru-server`](https://github.com/araruoss/araru-server) usa Node 22 Alpine e instala as ferramentas de leitura necessárias. O [Compose oficial](https://github.com/araruoss/araru-docs/blob/main/examples/docker-compose.yml) usa imagens publicadas e não depende de contexto de build compartilhado.

```bash
docker compose up -d --build --wait
docker compose ps
docker compose logs -f frontend backend
docker compose down
```

Frontend `8080`; backend `3001`. A interface nunca deve ser aberta em `3001`.

## Same-origin e cross-origin

Compose usa `/api` no mesmo host e Nginx resolve `backend:3001`. Em deploy separado, `VITE_API_URL` deve ser absoluto, backend deve permitir a origem exata e cookies/CSP devem aceitar a topologia. Range e headers expostos precisam atravessar o proxy.

## Proxy/TLS externo

`deploy/Caddyfile` encaminha frontend e API entre containers. `deploy/nginx.conf` é exemplo para frontend estático/API local. São alternativas opcionais, não dois proxies ativos no Compose.

Em produção configure domínio, TLS, `TRUST_PROXY`, origens, redirect OAuth, `SECURE_COOKIES` e backups. PWA e cookies seguros requerem HTTPS fora de localhost.

`DATABASE_URL` e `REDIS_URL` são usados ao executar o backend diretamente no host. No Docker Compose, use `DOCKER_DATABASE_URL` e `DOCKER_REDIS_URL` somente para bancos externos; quando ausentes, o backend usa os serviços `postgres` e `redis` da rede interna.

## Persistência

Não remova `storage` nem os volumes `postgres_data` e `redis_data` em upgrade. A biblioteca pode ser montada read-only; derivados precisam de escrita. Faça backup e verificação antes de restore. PostgreSQL e Redis podem ser externos por meio de `DATABASE_URL` e `REDIS_URL`.
