import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import githubLinksNewTab from './src/plugins/githubLinksNewTab.mjs';

const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`;
const basePath = base === '/' ? '/' : `${base}/`;
const fromBase = (path) => `${basePath}${path.replace(/^\//, '')}`;

export default defineConfig({
  site: process.env.SITE_URL || 'https://araruoss.github.io',
  base: basePath,
  redirects: {
    '/pt-BR': fromBase('pt-br'),
    '/pt-BR/docs': fromBase('pt-br/docs'),
    '/pt-BR/docs/getting-started': fromBase('pt-br/docs/getting-started'),
    '/pt-BR/docs/concepts/what-is-araru': fromBase('pt-br/docs/concepts/what-is-araru'),
    '/pt-BR/docs/ecosystem': fromBase('pt-br/docs/ecosystem'),
    '/pt-BR/docs/server': fromBase('pt-br/docs/server'),
    '/pt-BR/docs/web': fromBase('pt-br/docs/web'),
  },
  integrations: [
    starlight({
      title: 'Araru',
      logo: { src: './public/brand/araru-logo.png', alt: 'Araru' },
      favicon: '/favicon.ico',
      description: 'Your digital library, under your control.',
      defaultLocale: 'root',
      locales: {
        root: { label: '🇺🇸 EN', lang: 'en' },
        'pt-br': { label: '🇧🇷 PT-BR', lang: 'pt-BR' },
      },
      social: [{ icon: 'github', label: 'Araru OSS on GitHub', href: 'https://github.com/araruoss' }],
      editLink: { baseUrl: 'https://github.com/araruoss/araru-docs/edit/main/' },
      customCss: ['./src/styles/araru.css'],
      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/GithubSocial.astro',
        EditLink: './src/components/EditLink.astro',
      },
      sidebar: [
        {
          label: 'Getting Started',
          translations: { 'pt-BR': 'Primeiros passos' },
          items: [
            { label: 'Getting Started', translations: { 'pt-BR': 'Começando' }, slug: 'docs/getting-started' },
            { label: 'Local development', translations: { 'pt-BR': 'Desenvolvimento local' }, slug: 'docs/getting-started/development' },
            { label: 'Environment and configuration', translations: { 'pt-BR': 'Ambiente e configuração' }, slug: 'docs/getting-started/environment' },
            { label: 'Overview', translations: { 'pt-BR': 'Visão geral' }, slug: 'docs/getting-started/overview' },
            { label: 'Project structure', translations: { 'pt-BR': 'Estrutura de projetos' }, slug: 'docs/getting-started/project-structure' },
          ],
        },
        {
          label: 'Concepts',
          translations: { 'pt-BR': 'Conceitos' },
          items: [
            { label: 'What is Araru?', translations: { 'pt-BR': 'O que é o Araru?' }, slug: 'docs/concepts/what-is-araru' },
          ],
        },
        { label: 'Ecosystem', translations: { 'pt-BR': 'Ecossistema' }, items: [
          { label: 'Overview', translations: { 'pt-BR': 'Visão geral' }, slug: 'docs/ecosystem' },
          { label: 'Araru Server', slug: 'docs/server' },
          { label: 'Araru Web', slug: 'docs/web' },
          { label: 'Android', slug: 'docs/android' },
          { label: 'Desktop', slug: 'docs/desktop' },
        ] },
        { label: 'Administration', translations: { 'pt-BR': 'Administração' }, slug: 'docs/admin' },
        {
          label: 'Architecture',
          translations: { 'pt-BR': 'Arquitetura' },
          items: [
            { label: 'Architecture overview', translations: { 'pt-BR': 'Visão geral da arquitetura' }, slug: 'docs/architecture' },
            { label: 'Administration, users, and profiles', translations: { 'pt-BR': 'Administração, usuários e perfis' }, slug: 'docs/architecture/admin-panel' },
            { label: 'Data flows', translations: { 'pt-BR': 'Fluxos de dados' }, slug: 'docs/architecture/data-flow' },
            { label: 'Architecture decisions', translations: { 'pt-BR': 'Decisões arquiteturais' }, slug: 'docs/architecture/decisions' },
            { label: 'Jobs and caches', translations: { 'pt-BR': 'Jobs e caches' }, slug: 'docs/architecture/jobs-and-cache' },
            { label: 'Current architecture', translations: { 'pt-BR': 'Arquitetura atual' }, slug: 'docs/architecture/overview' },
            { label: 'Reader architecture', translations: { 'pt-BR': 'Arquitetura dos leitores' }, slug: 'docs/architecture/reader-architecture' },
            { label: 'Storage architecture', translations: { 'pt-BR': 'Arquitetura de armazenamento' }, slug: 'docs/architecture/storage-architecture' },
          ],
        },
        {
          label: 'API',
          translations: { 'pt-BR': 'API' },
          items: [
            { label: 'API', slug: 'docs/api' },
            { label: 'Endpoint inventory', translations: { 'pt-BR': 'Inventário de endpoints' }, slug: 'docs/api/endpoints' },
            { label: 'HTTP API', translations: { 'pt-BR': 'API HTTP' }, slug: 'docs/api/overview' },
          ],
        },
        { label: 'Storage', translations: { 'pt-BR': 'Armazenamento' }, slug: 'docs/storage' },
        {
          label: 'Readers',
          translations: { 'pt-BR': 'Leitores' },
          items: [
            { label: 'Readers', translations: { 'pt-BR': 'Leitores' }, slug: 'docs/readers' },
            { label: 'Reading formats', translations: { 'pt-BR': 'Formatos de leitura' }, slug: 'docs/readers/formats' },
            { label: 'Reader overview', translations: { 'pt-BR': 'Visão geral dos leitores' }, slug: 'docs/readers/overview' },
            { label: 'Performance, Range, and progress', translations: { 'pt-BR': 'Performance, Range e progresso' }, slug: 'docs/readers/performance-and-progress' },
          ],
        },
        { label: 'Metadata', translations: { 'pt-BR': 'Metadados' }, slug: 'docs/metadata' },
        { label: 'Search', translations: { 'pt-BR': 'Busca' }, slug: 'docs/search' },
        { label: 'Development', translations: { 'pt-BR': 'Desenvolvimento' }, slug: 'docs/development' },
        { label: 'Contributing', translations: { 'pt-BR': 'Contribuindo' }, slug: 'docs/contributing' },
        { label: 'Releases', translations: { 'pt-BR': 'Versões' }, slug: 'docs/releases' },
        { label: 'Project context', translations: { 'pt-BR': 'Contexto do projeto' }, slug: 'docs/project-context' },
      ],
    }),
  ],
  markdown: {
    processor: unified({ rehypePlugins: [githubLinksNewTab] }),
  },
});
