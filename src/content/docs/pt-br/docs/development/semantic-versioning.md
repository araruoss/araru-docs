---
title: Versionamento semântico e releases
description: Entenda versões independentes, Conventional Commits, pull requests de release, tags e imagens dos projetos Araru.
order: 4
section: development
status: stable
---

Araru Server, Web, Docs e clientes futuros seguem [Versionamento Semântico](https://semver.org/) de forma independente. Um Server `2.3.0` não exige que Web ou Docs usem `2.3.0`; a compatibilidade é expressa pelos contratos documentados da API, não por números iguais.

## Significado da versão

Considerando `MAJOR.MINOR.PATCH`:

- **PATCH** corrige comportamento compatível, segurança, documentação ou defeitos internos sem adicionar uma capacidade pública.
- **MINOR** adiciona funcionalidade retrocompatível.
- **MAJOR** introduz mudança incompatível em API pública, dados persistidos, configuração, operação ou contrato visível ao usuário.

Identificadores de pré-release, como `3.0.0-beta.1`, podem ser usados para versões explicitamente instáveis. Versões estáveis publicadas nunca são reutilizadas ou sobrescritas.

## Conventional Commits

O Release Please deriva a próxima versão e o changelog dos commits integrados em `main`:

```text
fix: impedir progresso de leitura duplicado       # patch
feat: adicionar filtro de séries                  # minor
feat!: substituir o contrato de autenticação      # major
```

Uma mudança incompatível também pode usar o rodapé `BREAKING CHANGE:`. Tipos comuns que não geram release incluem `docs`, `test`, `ci`, `build`, `refactor`, `style` e `chore`; eles não alteram a versão, salvo quando possuem um marcador de mudança incompatível.

Escopos são recomendados quando úteis, por exemplo `fix(reader): liberar recursos do PDF`. Um pull request pode conter vários commits, mas toda mudança visível deve ser representada por um Conventional Commit correto.

## Fluxo automatizado de release

1. Mudanças são integradas em `main` depois que o CI do repositório passa.
2. O Release Please avalia os commits desde a última versão.
3. Ele abre ou atualiza um pull request de release com a próxima versão e entradas de `CHANGELOG.md`.
4. Os mantenedores revisam e integram esse pull request.
5. O Release Please cria a tag `vMAJOR.MINOR.PATCH` e o GitHub Release.
6. Server e Web validam novamente e publicam imagens GHCR para versão exata, `MAJOR.MINOR`, `MAJOR` e `latest`.
7. O deploy do Docs permanece independente: o GitHub Pages publica a partir de `main`, enquanto tags semânticas identificam releases da documentação.

Não execute `npm version`, não edite manualmente o manifesto do Release Please e não crie uma tag concorrente durante o fluxo normal. Releases manuais emergenciais devem manter alinhados `package.json`, lockfile, changelog, manifesto, tag e imagem.

## Versões de containers

Implantações de produção devem fixar imagens exatas, como `ghcr.io/araruoss/araru-server:2.4.1` e `ghcr.io/araruoss/araru-web:2.7.0`. Os aliases mutáveis `latest`, major e minor são canais convenientes de descoberta, não travas reproduzíveis de implantação.

As versões do Server e do Web são configuradas separadamente porque possuem ciclos independentes. Antes de atualizar, leia as duas notas de release e confirme compatibilidade da API e configuração, migrations, requisitos de backup e instruções de rollback.

## Repositórios reservados

Android e Desktop ainda não contêm um produto lançado, portanto não recebem versões ou tags artificiais. Sua primeira implementação deverá adotar esta política antes do primeiro release público. O repositório de perfil da organização e a workspace local de runtime não são produtos versionados; eles referenciam artefatos com versões independentes.
