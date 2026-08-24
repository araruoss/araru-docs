---
title: API
description: Contrato, autenticação, erros e referência de endpoints.
order: 100
section: "api"
status: stable
---

O Araru Server expõe endpoints JSON sob `/api` e respostas binárias ou parciais para o conteúdo dos leitores. A autenticação no navegador usa um cookie de sessão HttpOnly; endpoints protegidos retornam `401` sem uma sessão e `403` quando o papel é insuficiente.

O contrato original está em [`araru-server/api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). Este site aponta para essa fonte em vez de manter um segundo schema divergente.

As observações atuais estão disponíveis em [Endpoints](./endpoints/). Paginação e versionamento da API ainda não são contratos universais; os clientes não devem inventá-los.
