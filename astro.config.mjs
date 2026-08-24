import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';

import githubLinksNewTab from './src/plugins/githubLinksNewTab.mjs';
import { navigation } from './src/config/navigation.ts';
import { defaultLocale, locales } from './src/config/locales.ts';
import { docsEditBase, site } from './src/config/site.ts';

const normalizedBase = (process.env.BASE_PATH || '')
  .replace(/^\/+|\/+$/g, '');

const basePath = normalizedBase ? `/${normalizedBase}/` : '/';

const fromBase = (path = '') =>
  `${basePath}${path.replace(/^\/+/, '')}`;

export default defineConfig({
  site: "https://araruoss.github.io",
  base: "/",

  redirects: {
    '/pt-BR': fromBase('pt-br'),
    '/pt-BR/docs': fromBase('pt-br/docs'),
  },

  integrations: [
    starlight({
      title: site.title,
      logo: {
        src: './public/brand/araru-logo.png',
        alt: 'Araru',
      },
      favicon: '/favicon.ico',
      description: site.description,

      defaultLocale,
      locales,

      social: [
        {
          icon: 'github',
          label: 'Araru OSS on GitHub',
          href: site.organization,
        },
      ],

      editLink: {
        baseUrl: docsEditBase,
      },

      customCss: ['./src/styles/araru.css'],

      components: {
        Header: './src/components/Header.astro',
        Footer: './src/components/Footer.astro',
        SocialIcons: './src/components/GithubSocial.astro',
        EditLink: './src/components/EditLink.astro',
      },

      sidebar: navigation,
    }),
  ],

  markdown: {
    processor: unified({
      rehypePlugins: [githubLinksNewTab],
    }),
  },
});