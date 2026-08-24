---
title: "Ambiente e configuração"
---

# Ambiente e configuração

Os arquivos `.env.example` são a lista autorizada de variáveis. Nunca documente ou versione valores reais.

## Raiz/Compose

`.env.example` contém variáveis `DOCKER_*`, Google, segredo de acesso e cookies. O prefixo Docker impede que a configuração do Vite local altere a imagem sem intenção.

## Frontend

- `VITE_API_URL`: base da API; `/api` no mesmo host ou URL absoluta.
- `VITE_DEV_PROXY_TARGET`: backend usado pelo Vite.
- `VITE_ALLOWED_HOSTS`: hosts de LAN/túnel aceitos.

## Backend

Os grupos completos estão no [`.env.example` do araru-server](https://github.com/araruoss/araru-server/blob/main/.env.example): servidor/CORS, dados, Drive, metadados, capas, reader, watcher/jobs, segurança e observabilidade.

Paths relativos são resolvidos a partir da raiz. Em HTTPS, `SECURE_COOKIES=true`; `SameSite=None` exige cookie seguro. `ALLOWED_ORIGINS` recebe origens completas separadas por vírgula.
