---
title: Propriedade e responsabilidade do conteúdo
description: Entenda o limite self-hosted e a responsabilidade do operador por arquivos, acessos e backups.
order: 2
section: concepts
status: stable
---

O Araru é totalmente self-hosted. O Araru OSS publica software e documentação, mas não opera uma biblioteca em nuvem nem um serviço de hospedagem para o conteúdo dos usuários.

## O que o Araru OSS não fornece

O projeto Araru não hospeda, envia, recebe, seleciona, vende, licencia nem distribui livros, quadrinhos, mangás, revistas, documentos, audiolivros ou qualquer outra mídia lida por uma instalação Araru. O projeto não possui acesso ao acervo privado do operador, salvo se esse operador decidir, de forma independente, expor seu próprio servidor.

O software não inclui um catálogo de obras protegidas e não concede direitos sobre conteúdo. Instalar o Araru não autoriza copiar, compartilhar, contornar DRM ou disponibilizar um arquivo além das permissões associadas a ele.

## Responsabilidade do operador

A pessoa ou organização que opera uma instalação é responsável por:

- obter cada arquivo por uma fonte oficial, legítima ou devidamente autorizada;
- confirmar que armazenamento e acesso respeitam a licença aplicável e a legislação local;
- configurar o provedor de armazenamento, o Server, a rede, os usuários e as permissões;
- limitar o acesso à própria rede do operador e aos usuários autorizados;
- proteger credenciais, terminação TLS, hosts, volumes e provedores externos;
- manter os arquivos originais separadamente dos metadados, capas, índices e caches gerados pelo Araru.

Depois que o operador fornece um arquivo autorizado, sua própria instalação do Araru pode indexá-lo e disponibilizá-lo para leitores autorizados na rede controlada por esse operador. Essa é uma atividade de hospedagem do operador, não um serviço de hospedagem fornecido pelo Araru OSS.

## Backups são uma responsabilidade operacional obrigatória

O Araru não deve ser a única cópia do acervo e não pode ser tratado como um provedor de backup. Mantenha cópias recuperáveis de:

1. arquivos originais adquiridos por meios oficiais;
2. estado da aplicação no PostgreSQL;
3. configurações persistentes e segredos necessários para recuperação;
4. qualquer estado não reconstruível dos provedores de armazenamento.

Mantenha pelo menos um backup fora do host ativo e teste periodicamente a restauração. Caches do Redis, índices de busca, miniaturas geradas e outros dados reconstruíveis não substituem os arquivos originais.

Remover o Araru, perder um volume, corromper um host ou configurar incorretamente um provedor pode tornar a instalação ativa indisponível. A recuperação continua sendo responsabilidade do operador.

## Expectativa de rede privada

O padrão mais seguro é permitir acesso somente por uma rede privada confiável ou por um túnel privado configurado adequadamente. Se o operador expuser o Araru à internet pública, ele assume a responsabilidade por autenticação, autorização, HTTPS, atualizações, monitoramento, limites de requisição, firewall, conformidade legal e resposta a incidentes.

O fato de o Araru ser open source e self-hosted não torna os arquivos públicos. Isso oferece ao operador controle — e a responsabilidade correspondente — sobre onde os arquivos ficam e quem pode acessá-los.
