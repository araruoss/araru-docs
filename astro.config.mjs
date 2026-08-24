import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: process.env.SITE_URL || 'https://araruoss.github.io',
  redirects: {
    '/pt-BR': '/pt-br',
    '/pt-BR/docs': '/pt-br/docs',
    '/pt-BR/docs/getting-started': '/pt-br/docs/getting-started',
    '/pt-BR/docs/concepts/what-is-araru': '/pt-br/docs/concepts/what-is-araru',
    '/pt-BR/docs/ecosystem': '/pt-br/docs/ecosystem',
    '/pt-BR/docs/server': '/pt-br/docs/server',
    '/pt-BR/docs/web': '/pt-br/docs/web',
  },
  integrations: [
    starlight({
      title: 'Araru',
      logo: { src: './public/brand/araru-logo.png', alt: 'Araru' },
      favicon: '/favicon.ico',
      description: 'Your digital library, under your control.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR' },
      },
      social: [{ icon: 'github', label: 'Araru repositories', href: 'https://github.com/araruoss?tab=repositories' }],
      editLink: { baseUrl: 'https://github.com/araruoss/araru-docs/edit/main/' },
      customCss: ['./src/styles/araru.css'],
      components: { Footer: './src/components/Footer.astro' },
      sidebar: [
        { label: 'Getting Started', items: [{ autogenerate: { directory: 'docs/getting-started' } }] },
        { label: 'Concepts', items: [{ autogenerate: { directory: 'docs/concepts' } }] },
        { label: 'Ecosystem', items: [
          { label: 'Overview', slug: 'docs/ecosystem' },
          { label: 'Araru Server', slug: 'docs/server' },
          { label: 'Araru Web', slug: 'docs/web' },
          { label: 'Android', slug: 'docs/android' },
          { label: 'Desktop', slug: 'docs/desktop' },
        ] },
        { label: 'Administration', slug: 'docs/admin' },
        { label: 'Architecture', items: [{ autogenerate: { directory: 'docs/architecture' } }] },
        { label: 'API', items: [{ autogenerate: { directory: 'docs/api' } }] },
        { label: 'Storage', slug: 'docs/storage' },
        { label: 'Readers', items: [{ autogenerate: { directory: 'docs/readers' } }] },
        { label: 'Metadata', slug: 'docs/metadata' },
        { label: 'Search', slug: 'docs/search' },
        { label: 'Development', slug: 'docs/development' },
        { label: 'Contributing', slug: 'docs/contributing' },
        { label: 'Releases', slug: 'docs/releases' },
        { label: 'Project context', slug: 'docs/project-context' },
      ],
    }),
  ],
});
