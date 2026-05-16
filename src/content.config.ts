import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const about = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/about' }),
  schema: z.object({
    paragraphs: z.array(z.string()),
  }),
});

const art = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/art' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    url: z.string(),
    gradient: z.string(),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/hero' }),
  schema: z.object({
    tagline: z.string(),
    bio: z.string(),
    status: z.string(),
  }),
});

const links = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/links' }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    subtitle: z.string(),
    url: z.string(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    subtitle: z.string(),
    url: z.string(),
  }),
});

const recently = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/recently' }),
  schema: z.object({
    tag: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/skills' }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  about,
  art,
  hero,
  links,
  posts,
  projects,
  recently,
  skills,
};
