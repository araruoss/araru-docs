---
title: API
description: Contrato, autenticação, erros e referência de endpoints.
order: 100
section: "api"
status: stable
---

O Araru Server expõe seu contrato de produto exclusivamente em `/api/v1`, além de respostas binárias ou parciais para o conteúdo dos leitores. A autenticação no navegador usa um cookie de sessão HttpOnly; endpoints protegidos retornam `401` sem uma sessão e `403` quando o papel é insuficiente.

O contrato original está em [`araru-server/api/openapi.yaml`](https://github.com/araruoss/araru-server/blob/main/api/openapi.yaml). Este site aponta para essa fonte em vez de manter um segundo schema divergente.

O contrato v1 cobre configuração do sistema/cliente, sessão, bibliotecas, obras, séries, autores, busca, leitura, favoritos, histórico, home, administração, capabilities de storage, configurações e jobs. As observações atuais estão em [Endpoints](./endpoints/); o arquivo OpenAPI continua sendo a fonte do contrato.
