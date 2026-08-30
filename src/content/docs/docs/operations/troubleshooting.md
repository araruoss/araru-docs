---
title: "Troubleshooting"
description: "Documentation for Troubleshooting in the Araru ecosystem."
order: 100
section: "operations"
status: stable
---

## Backend não inicia / PostgreSQL ou Redis

Confirme `DATABASE_URL`, `REDIS_URL`, DNS/portas, credenciais e healthchecks. Use `docker compose ps`, `docker compose logs server postgres redis` e `/health/details`. Redis pode ser temporariamente desativado com `REDIS_ENABLED=false`; PostgreSQL é obrigatório.

## CORS ou cookies

Use origem completa em `ALLOWED_ORIGINS`; confirme protocolo/porta, `TRUST_PROXY`, `Secure` e `SameSite`. No Compose acesse `8080`, não `3001`.

## Senha inicial do administrador não aparece

A senha só é gerada quando o PostgreSQL ainda não possui usuários. Enquanto a troca obrigatória estiver pendente, ela é repetida no log `auth.admin.bootstrap_pending` e mantida com permissão restrita em `storage/.araru-admin-bootstrap.json`. `make admin-password` apenas consulta esse estado e nunca rotaciona uma senha já configurada. Para uma rotação administrativa explícita, use `make admin-password-force`.

## PDF não abre / worker MIME

Reconstrua frontend, confirme worker `.js` com `application/javascript`, feche SW antigo e valide CSP. O Nginx atual contém regra de MIME e o bundle instancia o Worker diretamente.

## Range não funciona

Verifique 206, `Content-Range`, `Accept-Ranges`, CORS exposed headers e se o proxy não bufferiza. Teste com `curl -H 'Range: bytes=0-1023'` no endpoint de conteúdo.

## EPUB/MOBI/HQ falha

Confirme extensão e arquivo não protegido/corrompido. MOBI pode exigir recursos internos válidos; CBZ exige ZIP; CBR depende de UnRAR/7z. Use logs com request ID e endpoint de páginas.

## Capa não gera

Confira Poppler/7z, memória, espaço, permissões do cache, versão/fingerprint e painel de capas problemáticas. Execute regeneração; derivados podem ser apagados e recriados.

## Drive OAuth

Confirme credenciais, redirect exato, HTTPS/cookies e Drive habilitado. API key pública não exige OAuth. Consulte sync/circuit breaker em health details.

## Job preso

Consulte `/operations/jobs`. Reinício recupera `running` para `queued`; jobs em execução não aceitam cancelamento atual. Retry manual só vale para failed/cancelled.

## Memória com arquivo grande

Não baixe conteúdo inteiro no cliente/backend. Confirme Range e budgets. Archives podem exigir mais memória; reduza concorrência e valide formato. Os testes esparsos cobrem o caminho PDF Range, não toda combinação real.
