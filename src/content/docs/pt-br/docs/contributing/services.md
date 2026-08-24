---
title: Contribuindo com os serviços
description: Desenvolva, teste e envie mudanças para Araru Server, Web e infraestrutura de runtime.
---

Use este guia para mudanças no `araru-server`, `araru-web` ou no runtime local. Cada repositório possui dependências, versões, CI e responsabilidades independentes; não os acople por imports do filesystem ou por `node_modules` compartilhado.

## Antes de começar

Você precisa de Git, uma versão do Node.js compatível com `engines` do repositório, Docker com Compose v2 e armazenamento local suficiente para imagens, PostgreSQL, Redis e fixtures de teste. Consulte o exemplo de ambiente do repositório sem colocar segredos no controle de versão.

Escolha o repositório responsável pelo comportamento:

| Mudança | Repositório |
| --- | --- |
| API HTTP, autenticação, catálogo, metadados, jobs, PostgreSQL, Redis | `araru-server` |
| Interface da biblioteca, UI do leitor, PWA, acessibilidade, estado no cliente | `araru-web` |
| Orquestração local e composição dos serviços | repositório de runtime |
| Contratos públicos e guias operacionais | `araru-docs` junto ao serviço responsável |

## Prepare o ambiente

```bash
git clone git@github.com:araruoss/araru-server.git
# ou: git clone git@github.com:araruoss/araru-web.git
cd araru-server
git switch -c feature/descricao-curta
npm ci
```

Use o `.env.example` do repositório como referência de configuração. Inicie instâncias isoladas do PostgreSQL e Redis no desenvolvimento do backend. Nunca execute testes automatizados em um banco pessoal ou de produção.

## Limites arquiteturais

- O PostgreSQL é a fonte persistente de verdade; o Redis armazena somente cache reconstruível, locks e coordenação efêmera.
- Os clientes consomem a API HTTP do Server e não acessam diretamente PostgreSQL, Redis, provedores ou caminhos de armazenamento.
- As categorias derivam do filesystem e de `categoryPath`, não das tags.
- Endpoints de conteúdo preservam IDs opacos, intervalos de bytes, tipos MIME e cabeçalhos `Content-Disposition` seguros.
- Migrations são incrementais e imutáveis depois de lançadas. Adicione uma migration em vez de reescrever uma já aplicada.
- Autenticação e autorização devem ser impostas pelo Server, independentemente da visibilidade no cliente.
- Leitores devem liberar recursos, limitar o uso de memória, preservar o progresso e funcionar com toque, teclado, navegação mobile e desktop.

## Implemente e teste

Comece pela menor mudança que comprove o comportamento. Adicione testes próximos à camada afetada:

- testes unitários para parsing, validação, relevância e regras puras de domínio;
- testes de integração para controllers, repositórios PostgreSQL, comportamento do Redis, sessões e jobs;
- testes de contrato da API para status, schemas de resposta, CORS, Range e autorização;
- testes de componentes para estados e interações do Web;
- testes E2E para login, navegação da biblioteca, busca, progresso, administração e modo offline;
- testes de regressão sempre que corrigir um bug reproduzível.

A indisponibilidade do Redis deve degradar com segurança onde o cache for opcional. Falhas no banco não podem ser ocultadas como gravações bem-sucedidas. Os testes devem limpar seus registros e ser determinísticos.

Execute os scripts definidos pelo repositório. No mínimo, valide lint, testes e build de produção. Em mudanças entre serviços, execute o ambiente Compose completo e verifique console do navegador, logs do Server, health checks, migrations do PostgreSQL e conectividade com o Redis.

## Mudanças no banco e na API

Para uma mudança de schema, inclua migration, atualização de repositórios e serviços, observações de rollback ou recuperação e testes de integração em uma instalação PostgreSQL limpa. Não adicione compatibilidade com SQLite.

Para uma mudança da API, atualize o OpenAPI em `araru-server/api/openapi.yaml`, preserve compatibilidade quando possível, documente erros e autorização e atualize todos os clientes afetados. Mudanças incompatíveis exigem caminho explícito de migração e nota de versão.

## Checklist do pull request

- O PR explica o problema visível e por que o repositório escolhido é responsável por ele.
- Os testes falham sem a correção e passam com ela, quando isso for viável.
- Lint, testes, build e testes E2E relevantes passam.
- Novas variáveis de ambiente estão documentadas e têm padrões seguros.
- Logs possuem contexto útil sem credenciais ou caminhos pessoais.
- Efeitos em segurança, acessibilidade, localização, mobile e desktop foram revisados.
- OpenAPI, documentação, imagens, migrations e notas de versão foram atualizados quando necessário.
- O PR não contém formatação não relacionada, estado gerado ou mudanças desnecessárias de dependências.

## Revisão e lançamento

Responda à revisão com commits específicos ou mudanças posteriores claramente explicadas. Os mantenedores podem solicitar um ADR para alterações arquiteturais. Uma mudança integrada é lançada conforme o ciclo independente de seu repositório; o merge não garante implantação imediata.

Relate vulnerabilidades de segurança de forma privada conforme o `SECURITY.md` do repositório.
