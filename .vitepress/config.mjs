import { defineConfig } from 'vitepress';
export default defineConfig({
  title: 'Araru Documentation',
  description: 'Documentation for users, contributors and maintainers.',
  base: '/araru-docs/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Getting started', link: '/getting-started/overview' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'API', link: '/api/overview' },
      { text: 'GitHub', link: 'https://github.com/araruoss' }
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/araruoss' }]
  }
});
