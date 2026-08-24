import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const contentStatus = ['stable', 'experimental', 'planned', 'deprecated'] as const;

const editorialSchema = z.object({
  description: z.string().trim().min(10),
  order: z.number().int().nonnegative(),
  section: z.string().trim().min(1),
  status: z.enum(contentStatus),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: editorialSchema }) }),
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
