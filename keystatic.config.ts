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
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
      },
    }),
    recently: collection({
      label: 'Recently',
      path: 'src/content/recently/*/',
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
      schema: {
        icon: fields.text({ label: 'Icon (emoji)' }),
        title: fields.text({ label: 'Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        url: fields.text({ label: 'URL' }),
      },
    }),
  },
  ui: {
    brand: {
      name: 'mxjxn.com',
    },
  },
});
