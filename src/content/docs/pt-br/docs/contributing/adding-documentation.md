---
title: Adicionando nova documentação
description: Crie uma página validada em inglês e sua tradução correspondente em português do Brasil.
order: 5
section: contributing
status: stable
---

1. Escolha a seção responsável pelo assunto e confirme que outra página ainda não o explica.
2. Crie o arquivo canônico em inglês sob `src/content/docs/docs/`. Use `npm run docs:new -- <seção> <slug>` para gerar uma estrutura segura.
3. Substitua todos os `TODO` e defina `title`, `description`, `order` inteiro, `section` e um `status` válido.
4. Escreva primeiro o comportamento atual. Identifique explicitamente comportamentos experimentais e planejados.
5. Crie o arquivo correspondente sob `src/content/docs/pt-br/docs/` com o mesmo caminho relativo e metadata estrutural.
6. Adicione a página a `src/config/navigation.ts` somente quando ela pertencer à navegação global. Forneça o rótulo PT-BR por `translations`.
7. Relacione módulos usando uma rota válida a partir da página publicada, não apenas do diretório-fonte.
8. Execute `npm run check:all` e inspecione as duas rotas, sidebar, sumário, links anterior/próximo, busca, layout mobile e temas.
9. Abra um pull request específico com resultados da validação e capturas de tela para mudanças visíveis.

O gerador nunca cria texto fictício nem uma tradução automática. Uma página contendo `TODO` não está pronta para merge.
