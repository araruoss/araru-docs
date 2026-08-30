---
title: Administração
description: Gerencie usuários, perfis, configurações, armazenamento, tarefas e backups.
order: 100
section: "admin"
status: stable
---

O painel administrativo centraliza as configurações globais e as ferramentas operacionais.

- **Geral/Aparência:** nome da biblioteca, idioma global, tema, fuso horário e formato de data.
- **Usuários:** credenciais individuais, papéis, ativação e recuperação de senha.
- **Papéis e permissões:** papéis agrupados por área do produto, chaves de permissão explícitas, papéis de sistema protegidos e autorização exclusiva para administradores.
- **Perfis:** contextos de leitura atribuídos aos usuários.
- **Armazenamento/Metadados:** indexação, configuração de provedores, revisão, capas e duplicatas.
- **Tarefas/Sistema:** integridade, filas, cache, verificações, logs e flags de recursos.
- **Backup/Segurança:** exportação e restauração do estado, política de sessão, CORS, cookies e limites de requisição.

Coleções como usuários, perfis, jobs e outros registros operacionais usam paginação no servidor. A busca e os filtros fazem parte do contrato da requisição e retornam à primeira página quando são alterados. Os jobs expõem os estados enfileirado, em execução, concluído, falhou e cancelado; ações longas aceitas pelo servidor apontam de volta para a área de Jobs.

A administração usa abas para visões relacionadas, incluindo visão geral, execuções, agendamentos e tipos de job em Jobs; resumo, provedores e processamento em Metadados; e autenticação, sessões, limites, cookies, política do leitor e auditoria em Segurança. A aba selecionada é preservada na URL quando a visão pode ser acessada diretamente.

O guard de autorização do Web controla apenas a navegação. O Server continua sendo a autoridade para autenticação, autorização, validação, persistência e auditoria administrativa. Papéis de sistema e configurações gerenciadas pelo deploy não são editáveis por formulários comuns.

As **configurações do sistema** afetam a instalação. As **configurações do usuário** afetam uma identidade. As **preferências do perfil** afetam o contexto de leitura selecionado. Mantenha esses escopos separados.
