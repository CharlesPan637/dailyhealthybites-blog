import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { CATEGORIES } from './consts';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string().min(10).max(100),
    description: z.string().min(50).max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lastReviewedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).min(1).max(5),
    author: z.string().default('James Harper'),
    heroImage: image().optional(),
    readingTime: z.string().default('5 min read'),
    draft: z.boolean().default(false),
    faqs: z.array(z.object({
      question: z.string().min(5).max(200),
      answer: z.string().min(10).max(500),
    })).max(6).optional(),
  }),
});

export const collections = { blog };
