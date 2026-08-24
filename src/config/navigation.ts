const tr = (en: string, pt: string, slug: string) => ({ label: en, translations: { 'pt-BR': pt }, slug });

export const navigation = [
  { label: 'Getting Started', translations: { 'pt-BR': 'Primeiros passos' }, items: [
    tr('Getting Started', 'Começando', 'docs/getting-started'),
    tr('Local development', 'Desenvolvimento local', 'docs/getting-started/development'),
    tr('Environment and configuration', 'Ambiente e configuração', 'docs/getting-started/environment'),
    tr('Overview', 'Visão geral', 'docs/getting-started/overview'),
    tr('Project structure', 'Estrutura de projetos', 'docs/getting-started/project-structure'),
  ] },
  { label: 'Concepts', translations: { 'pt-BR': 'Conceitos' }, items: [
    tr('What is Araru?', 'O que é o Araru?', 'docs/concepts/what-is-araru'),
    tr('Content ownership and responsibility', 'Propriedade e responsabilidade do conteúdo', 'docs/concepts/content-responsibility'),
  ] },
  { label: 'Ecosystem', translations: { 'pt-BR': 'Ecossistema' }, items: [
    tr('Overview', 'Visão geral', 'docs/ecosystem'),
    { label: 'Araru Server', slug: 'docs/server' },
    { label: 'Araru Web', slug: 'docs/web' },
    { label: 'Android', slug: 'docs/android' },
    { label: 'Desktop', slug: 'docs/desktop' },
  ] },
  tr('Administration', 'Administração', 'docs/admin'),
  { label: 'Architecture', translations: { 'pt-BR': 'Arquitetura' }, items: [
    tr('Architecture overview', 'Visão geral da arquitetura', 'docs/architecture'),
    tr('Administration, users, and profiles', 'Administração, usuários e perfis', 'docs/architecture/admin-panel'),
    tr('Data flows', 'Fluxos de dados', 'docs/architecture/data-flow'),
    tr('Architecture decisions', 'Decisões arquiteturais', 'docs/architecture/decisions'),
    tr('Jobs and caches', 'Jobs e caches', 'docs/architecture/jobs-and-cache'),
    tr('Current architecture', 'Arquitetura atual', 'docs/architecture/overview'),
    tr('Reader architecture', 'Arquitetura dos leitores', 'docs/architecture/reader-architecture'),
    tr('Storage architecture', 'Arquitetura de armazenamento', 'docs/architecture/storage-architecture'),
  ] },
  { label: 'API', translations: { 'pt-BR': 'API' }, items: [
    { label: 'API', slug: 'docs/api' },
    tr('Endpoint inventory', 'Inventário de endpoints', 'docs/api/endpoints'),
    tr('HTTP API', 'API HTTP', 'docs/api/overview'),
  ] },
  tr('Storage', 'Armazenamento', 'docs/storage'),
  { label: 'Readers', translations: { 'pt-BR': 'Leitores' }, items: [
    tr('Readers', 'Leitores', 'docs/readers'),
    tr('Reading formats', 'Formatos de leitura', 'docs/readers/formats'),
    tr('Reader overview', 'Visão geral dos leitores', 'docs/readers/overview'),
    tr('Performance, Range, and progress', 'Performance, Range e progresso', 'docs/readers/performance-and-progress'),
  ] },
  tr('Metadata', 'Metadados', 'docs/metadata'),
  tr('Search', 'Busca', 'docs/search'),
  tr('Development', 'Desenvolvimento', 'docs/development'),
  { label: 'Contributing', translations: { 'pt-BR': 'Contribuindo' }, collapsed: false, items: [
    tr('Overview', 'Visão geral', 'docs/contributing'),
    tr('Services', 'Serviços', 'docs/contributing/services'),
    tr('Documentation', 'Documentação', 'docs/contributing/documentation'),
    tr('Writing documentation', 'Escrevendo documentação', 'docs/contributing/writing-docs'),
    tr('Adding documentation', 'Adicionando documentação', 'docs/contributing/adding-documentation'),
    tr('Translations', 'Traduções', 'docs/contributing/translations'),
    tr('Docs architecture', 'Arquitetura editorial', 'docs/contributing/docs-architecture'),
  ] },
  tr('Releases', 'Versões', 'docs/releases'),
  { label: 'Project context', translations: { 'pt-BR': 'Contexto do projeto' }, items: [
    tr('Overview', 'Visão geral', 'docs/project-context'),
    tr('Current state', 'Estado atual', 'docs/project-context/current-state'),
  ] },
] as const;
