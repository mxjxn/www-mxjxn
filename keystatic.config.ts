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
          description: 'e.g. Currently in Rome',
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
        body: fields.markdoc({ label: 'Body' }),
      },
    }),
  },
  ui: {
    brand: {
      name: 'mxjxn.com',
    },
  },
});
