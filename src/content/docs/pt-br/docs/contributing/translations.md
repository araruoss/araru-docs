---
title: Traduzindo a documentação
description: Mantenha documentação equivalente em inglês e português do Brasil sem divergir os slugs.
order: 6
section: contributing
status: stable
---

O inglês sob `src/content/docs/docs/` é canônico. O português do Brasil fica sob `src/content/docs/pt-br/docs/`. As duas árvores usam o mesmo nome de arquivo relativo e slug.

Traduza o significado e a intenção do usuário. Preserve comandos, código, rotas da API, identificadores, variáveis de ambiente, nomes de produtos e a precisão do status. Localize títulos, descrições, prosa, rótulos de tabelas, textos alternativos e rótulos de navegação.

`npm run check:translations` apresenta uma página PT-BR ausente como aviso controlado para manter disponível o fallback do Starlight. O comando falha para traduções órfãs, frontmatter inválido ou divergência de `order`, `section` e `status`. Atualmente o CI possui pares completos e deve continuar sem avisos.

Quando uma página mudar de comportamento, atualize os dois arquivos no mesmo pull request. Teste a troca de idioma na mesma rota. Se uma tradução for intencionalmente adiada, garanta que o fallback renderize a fonte inglesa com o aviso localizado, em vez de retornar 404.
