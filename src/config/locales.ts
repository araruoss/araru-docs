export const locales = {
  root: { label: '🇺🇸 EN', lang: 'en' },
  'pt-br': { label: '🇧🇷 PT-BR', lang: 'pt-BR' },
} as const;

export const defaultLocale = 'root';
export const canonicalContentRoot = 'docs';
export const translatedContentRoots = { 'pt-br': 'pt-br/docs' } as const;
