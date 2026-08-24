export const site = {
  title: 'Araru',
  description: 'Your digital library, under your control.',
  defaultUrl: 'https://araruoss.github.io',
  organization: 'https://github.com/araruoss',
  repositories: {
    server: 'https://github.com/araruoss/araru-server',
    web: 'https://github.com/araruoss/araru-web',
    android: 'https://github.com/araruoss/araru-android',
    desktop: 'https://github.com/araruoss/araru-desktop',
    docs: 'https://github.com/araruoss/araru-docs',
  },
} as const;

export const docsEditBase = `${site.repositories.docs}/edit/main/`;
