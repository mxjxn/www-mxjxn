import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    hero: singleton({
      label: 'Hero',
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
      schema: {
        paragraphs: fields.array(fields.text({
          label: 'Paragraph',
        }), {
          label: 'Paragraphs',
          itemLabel: 'Paragraph',
        }),
      },
    }),
  },
  collections: {
    skills: collection({
      label: 'Skills',
      path: 'src/content/skills/*/',
      slugField: 'title',
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
      },
    }),
    recently: collection({
      label: 'Recently',
      path: 'src/content/recently/*/',
      slugField: 'title',
      schema: {
        tag: fields.text({ label: 'Tag', description: 'e.g. Residency' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
        date: fields.text({ label: 'Date', description: 'e.g. Apr — May 2026' }),
      },
    }),
    art: collection({
      label: 'Art',
      path: 'src/content/art/*/',
      slugField: 'title',
      schema: {
        title: fields.text({ label: 'Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
        gradient: fields.text({ label: 'Gradient', description: 'CSS linear-gradient value' }),
      },
    }),
    projects: collection({
      label: 'Projects',
      path: 'src/content/projects/*/',
      slugField: 'title',
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.text({ label: 'Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
      },
    }),
    links: collection({
      label: 'Links',
      path: 'src/content/links/*/',
      slugField: 'title',
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.text({ label: 'Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
      },
    }),
    posts: collection({
      label: 'Blog Posts',
      path: 'src/content/posts/*/',
      slugField: 'slug',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.text({ label: 'Slug', description: 'Short name used in the URL, e.g. keystatic-cms' }),
        date: fields.date({ label: 'Publish Date' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: 'Tag',
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
