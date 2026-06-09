import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'mxjxn/www-mxjxn',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
      path: 'src/content/hero/',
      format: { data: 'yaml' },
      schema: {
        tagline: fields.text({
          label: 'Tagline',
          description: 'e.g. full-stack engineer · agentic AI · creative systems',
        }),
        bio: fields.text({
          label: 'Bio',
          description: 'Typewriter text — the sentence that types out on the homepage.',
        }),
        status: fields.text({
          label: 'Status',
          description: 'e.g. Open to freelance · Boston, MA',
        }),
        cta: fields.text({
          label: 'CTA Text',
          description: 'Hero call-to-action button text, e.g. Get in touch. Leave empty to hide.',
        }),
        cta_url: fields.text({
          label: 'CTA URL',
          description: 'URL for the CTA button, e.g. mailto:you@example.com',
        }),
      },
    }),
    about: singleton({
      label: 'About Page',
      path: 'src/content/about/',
      format: { data: 'yaml' },
      schema: {
        paragraphs: fields.array(fields.text({
          label: 'Paragraph',
        }), {
          label: 'Paragraphs',
        }),
      },
    }),
    resume: singleton({
      label: 'Resume',
      path: 'src/content/resume/',
      format: { data: 'yaml' },
      schema: {
        headline: fields.text({ label: 'Headline', description: 'e.g. Full Stack Engineer — Agentic AI & Creative Systems' }),
        summary: fields.text({ label: 'Summary', description: '2-3 sentence professional summary.' }),
        skills: fields.array(fields.object({
          category: fields.text({ label: 'Category', description: 'e.g. Languages, AI/ML, Infrastructure' }),
          items: fields.array(fields.text({ label: 'Skill' }), { label: 'Skills' }),
        }), { label: 'Skill Groups' }),
        experience: fields.array(fields.object({
          company: fields.text({ label: 'Company' }),
          role: fields.text({ label: 'Role' }),
          period: fields.text({ label: 'Period', description: 'e.g. July 2021 — February 2023' }),
          bullets: fields.array(fields.text({ label: 'Bullet' }), { label: 'Bullets' }),
        }), { label: 'Experience' }),
        projects: fields.array(fields.object({
          name: fields.text({ label: 'Project Name' }),
          url: fields.text({ label: 'URL', description: 'Optional link' }),
          period: fields.text({ label: 'Period', description: 'e.g. 2024 — present' }),
          description: fields.text({ label: 'Description' }),
          tech: fields.array(fields.text({ label: 'Tech' }), { label: 'Tech Stack' }),
        }), { label: 'Projects' }),
        education: fields.array(fields.object({
          school: fields.text({ label: 'School' }),
          degree: fields.text({ label: 'Degree' }),
          period: fields.text({ label: 'Period' }),
          note: fields.text({ label: 'Note', description: 'Optional detail' }),
        }), { label: 'Education' }),
      },
    }),
  },
  collections: {
    skills: collection({
      label: 'Skills',
      path: 'src/content/skills/*/',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
      },
    }),
    recently: collection({
      label: 'Recently',
      path: 'src/content/recently/*/',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        tag: fields.text({ label: 'Tag', description: 'e.g. Residency' }),
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description' }),
        date: fields.text({ label: 'Date', description: 'e.g. Apr — May 2026' }),
      },
    }),
    art: collection({
      label: 'Art',
      path: 'src/content/art/*/',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
        gradient: fields.text({ label: 'Gradient', description: 'CSS linear-gradient value' }),
      },
    }),
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*/',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
      },
    }),
    links: collection({
      label: 'Links',
      path: 'src/content/links/*/',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
      },
    }),
    posts: collection({
      label: 'Blog Posts',
      path: 'src/content/posts/*/',
      slugField: 'slug',
      format: { contentField: 'body', data: 'yaml' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ name: { label: 'Slug' } }),
        date: fields.date({ label: 'Publish Date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
        }),
        excerpt: fields.text({ label: 'Excerpt', description: 'Short description for the post listing' }),
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts are hidden from the blog listing' }),
        body: fields.markdoc({ label: 'Body', extension: 'md' }),
      },
    }),
  },
  ui: {
    brand: {
      name: 'mxjxn.com',
    },
  },
});
