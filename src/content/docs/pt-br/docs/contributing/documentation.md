---
title: Contribuindo com a documentação
description: Escreva, traduza, revise e valide o site de documentação do Araru.
order: 100
section: "contributing"
status: stable
---

A documentação é mantida no `araru-docs` com Astro e Starlight. Mudanças na documentação seguem o mesmo padrão de revisão do código, pois instruções incorretas podem quebrar instalações, expor dados ou representar incorretamente o comportamento do produto.

## Estrutura da documentação

```text
src/content/docs/
├── docs/                 # Inglês, idioma padrão
└── pt-br/docs/           # Português do Brasil
src/content/i18n/         # Traduções da interface
src/components/           # Sobrescritas de componentes do Starlight
src/styles/               # Estilos visuais do projeto
public/                   # Recursos estáticos da marca
```

As páginas em inglês e PT-BR usam caminhos correspondentes depois do prefixo do idioma. Por exemplo:

- `src/content/docs/docs/contributing/documentation.md`
- `src/content/docs/pt-br/docs/contributing/documentation.md`

Não adicione uma página em apenas um idioma ao publicar documentação final para usuários. A ausência do arquivo localizado ativa o conteúdo de fallback e um aviso de indisponibilidade.

## Configuração local

```bash
git clone git@github.com:araruoss/araru-docs.git
cd araru-docs
npm ci
npm run dev
```

Use a URL de desenvolvimento exibida pelo Astro. Teste tanto a rota raiz em inglês quanto `/pt-br/`. Um prefixo de caminho para o GitHub Pages pode ser testado com a variável `BASE_PATH` suportada pelo repositório.

## Escrevendo uma página

Toda página Markdown começa com um frontmatter válido:

```yaml
---
title: Título claro da página
description: Uma frase descrevendo a página.
---
```

O Starlight renderiza `title` como H1 da página. Não o repita como o primeiro título Markdown. Comece diretamente pelo conteúdo ou por um H2 (`##`).

Use parágrafos curtos, títulos descritivos, comandos reais e tabelas somente quando melhorarem a comparação. Identifique corretamente comportamentos planejados, experimentais, opcionais e estáveis. Prefira a terminologia dos repositórios e aponte para o OpenAPI ou arquivo-fonte autoritativo em vez de copiar contratos que ficarão divergentes.

Exemplos de código devem ser seguros para copiar. Use placeholders para credenciais e caminhos pessoais. Nunca inclua tokens reais, nomes de arquivos da biblioteca, dados de usuários, hosts internos ou segredos de produção.

## Links e navegação

- Mantenha o mesmo slug nos dois idiomas.
- Sempre que possível, use links relativos para outras páginas da documentação.
- Inclua a barra final nas rotas da documentação.
- Links externos do GitHub são processados para abrir em uma nova aba.
- Adicione novas páginas públicas à sidebar do Starlight em `astro.config.mjs` e forneça o rótulo PT-BR por `translations`.
- Depois de mudanças estruturais, verifique navegação anterior/próxima, sumário, menu mobile e busca local.

## Diretrizes de tradução

Traduza o significado, não palavras isoladas. Preserve código, comandos, rotas da API, identificadores, chaves de configuração e nomes de produtos. Mantenha títulos e destinos de links estruturalmente equivalentes para o leitor trocar de idioma sem perder o contexto.

Use português do Brasil (`pt-BR`) de forma consistente. Evite prosa sem tradução, salvo nomes próprios ou termos técnicos consolidados. Quando a fonte alterar um comportamento, atualize os dois idiomas no mesmo pull request.

## Mudanças visuais e de componentes

Em alterações de Header, Footer, homepage ou estilos, valide desktop e mobile estreito, foco por teclado, contraste, zoom, redução de movimento e os dois temas quando suportados. Reutilize recursos de marca existentes em vez de duplicá-los. Destinos do GitHub devem abrir com segurança em uma nova aba.

Não use CSS específico da página para esconder erros de conteúdo que devem ser corrigidos no Markdown, frontmatter, configuração de idioma ou componente compartilhado.

## Validação

Execute todas as verificações antes de abrir um pull request:

```bash
npx astro sync --force
npm run check
npm run build
```

As verificações não podem apresentar diagnósticos do Astro, links relativos quebrados ou H1 inicial duplicado. O build estático deve gerar rotas equivalentes em inglês e PT-BR. Ao adicionar ou reorganizar páginas, procure o aviso de fallback no resultado PT-BR gerado.

Revise também as páginas renderizadas manualmente:

- idioma correto e destino correto na troca de idioma;
- blocos de código, tabelas, avisos e títulos longos legíveis;
- sidebar, breadcrumbs, sumário, links anterior/próximo e resultados da busca válidos;
- ausência de overflow horizontal em telas mobile;
- comandos e links corretos.

## Checklist do pull request de documentação

- A mudança explica o comportamento atual e o separa dos itens do roadmap.
- Os arquivos em inglês e PT-BR existem com slugs correspondentes.
- Títulos, descrições, rótulos da sidebar e textos dos links estão localizados.
- Nenhum H1 duplica o título do Starlight.
- Os comandos foram verificados no repositório responsável.
- Links relativos e destinos externos funcionam.
- `npm run check` e `npm run build` passam.
- Capturas de tela foram incluídas para mudanças relevantes de UI.
- Nenhum segredo, caminho pessoal, saída gerada do build ou conteúdo protegido foi enviado.

Pequenas melhorias, como correções ortográficas, são bem-vindas. Para uma grande mudança na arquitetura da informação, abra primeiro uma issue e descreva as rotas, redirecionamentos, idiomas e plano de migração afetados.

## Guias detalhados

- [Escrevendo documentação](../writing-docs/) documenta os componentes MDX reutilizáveis.
- [Adicionando documentação](../adding-documentation/) apresenta o fluxo completo de uma página.
- [Traduções](../translations/) explica a política de idiomas e os checks automatizados.
- [Arquitetura editorial](../docs-architecture/) registra os limites editoriais e técnicos.
