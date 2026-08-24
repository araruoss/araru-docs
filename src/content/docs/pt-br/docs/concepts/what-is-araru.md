---
title: O que é o Araru?
description: Filosofia, conceitos centrais e limites de confiança.
order: 100
section: "concepts"
status: stable
---

O Araru organiza e disponibiliza um acervo digital na infraestrutura controlada pelo proprietário. Um Server central mantém storage, credenciais, metadados e estado de leitura em uma fonte confiável.

## Por que self-hosted?

Arquivos e dados de comportamento permanecem sob suas políticas. Ainda é responsabilidade do operador manter HTTPS, credenciais fortes, backups, atualizações e acesso de rede restrito.

O Araru é um software, não um serviço de hospedagem de conteúdo. O projeto Araru não recebe, armazena, fornece nem distribui os arquivos do acervo de um usuário. O operador da instalação fornece arquivos adquiridos legitimamente e os disponibiliza somente por meio da infraestrutura e das redes que controla. Consulte [Propriedade e responsabilidade do conteúdo](../content-responsibility/).

Usuários são identidades autenticadas; perfis são contextos de leitura. Obras representam itens canônicos e arquivos representam formatos concretos. Clientes nunca acessam PostgreSQL, Redis, filesystem, Drive ou segredos diretamente.
