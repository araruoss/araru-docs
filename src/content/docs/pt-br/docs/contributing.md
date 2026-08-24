---
title: Como contribuir
description: Escolha como contribuir com o Araru e siga o fluxo compartilhado do projeto.
order: 100
section: "contributing"
status: stable
---

O Araru é desenvolvido em repositórios independentes. As contribuições podem melhorar os serviços Server e Web, a documentação, as traduções, os testes, a infraestrutura, a acessibilidade ou o design do projeto.

## Escolha uma forma de contribuir

- [Contribuindo com os serviços](./services/) aborda Server, Web, runtime, API, banco de dados, cache, leitores, testes e mudanças operacionais.
- [Contribuindo com a documentação](./documentation/) aborda Astro/Starlight, escrita, traduções, navegação, links e validação local.

## Fluxo compartilhado

1. Leia o `README.md`, o `CONTRIBUTING.md` e o `SECURITY.md` do repositório antes de alterar o código.
2. Pesquise issues e discussões existentes para evitar trabalho duplicado.
3. Abra uma issue ou discussão antes de mudanças grandes, arquiteturais, incompatíveis ou sensíveis à segurança.
4. Faça fork ou clone apenas do repositório alterado e crie uma branch específica `feature/*`, `fix/*` ou `docs/*`.
5. Mantenha a mudança pequena, preserve contratos públicos e adicione validação proporcional ao risco.
6. Execute as verificações do repositório localmente e atualize a documentação quando o comportamento mudar.
7. Abra um pull request descrevendo problema, solução, validação, riscos, compatibilidade e capturas de tela quando forem relevantes.

## Regras de contribuição

- Use commits claros contendo uma única mudança lógica.
- Não envie bibliotecas pessoais, livros protegidos, bancos gerados, caches, arquivos `.env`, tokens, senhas ou URLs privadas.
- Não descreva funcionalidades planejadas como lançadas.
- Preserve IDs opacos, rotas da API, histórico de migrations, comportamento das categorias do filesystem e contratos HTTP Range, salvo quando uma mudança aprovada os substituir explicitamente.
- Adicione um ADR para decisões que alterem de forma relevante arquitetura, persistência, segurança ou limites entre repositórios.
- Considere acessibilidade, responsividade, internacionalização e compatibilidade retroativa como critérios de aceite.

## Conduta e segurança

Mantenha o respeito e concentre a discussão técnica no trabalho. Relate vulnerabilidades de forma privada seguindo o `SECURITY.md` do repositório afetado; nunca divulgue uma falha explorável em um ticket público.

Ao contribuir, você concorda que suas mudanças serão distribuídas sob a licença do repositório, atualmente `AGPL-3.0-only`, salvo indicação diferente naquele repositório.
