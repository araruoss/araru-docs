---
title: "Desenvolvimento local"
---

Clone apenas os projetos nos quais trabalhará. Não há dependência de diretório compartilhado.

## Server

```bash
git clone git@github.com:araruoss/araru-server.git
cd araru-server
cp .env.example .env
docker compose -f docker-compose.dev.yml up -d
npm ci
npm run migrate
npm run dev
```

## Web

Em outro terminal:

```bash
git clone git@github.com:araruoss/araru-web.git
cd araru-web
cp .env.example .env
npm ci
npm run dev
```

Por padrão, o Vite encaminha `/api` para `http://localhost:3001`. Para outro host, altere `VITE_API_URL`.

Para a instalação completa por imagens publicadas, use o [Compose oficial](https://github.com/araruoss/araru-docs/blob/main/examples/docker-compose.yml).
