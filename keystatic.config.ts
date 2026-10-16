import { config, fields, singleton, collection } from '@keystatic/core';
const copy = (label: string, multiline = false) => fields.text({ label, multiline });
export default config({
    storage: import.meta.env.DEV
        ? { kind: 'local' }
        : { kind: 'github', repo: 'mxjxn/www-mxjxn' },
    singletons: {
        framing: singleton({ label: 'Homepage headings & supporting text', path: 'src/content/site/framing', format: { data: 'json' }, schema: { experience: copy("Experience summary \u2014 below the introduction", true),
                workTitle: copy("Recent work heading", true),
                workDescription: copy("One-line deck under the work heading", true),
                graphCaption: copy("Caption below the knowledge diagram", true),
                capability3: copy('Practice strip — item 3'),
                capability2: copy('Practice strip — item 2'),
                capability1: copy('Practice strip — item 1'), } }),
        resume: singleton({
            label: '08 · Résumé', path: 'src/content/resume/', format: { data: 'yaml' },
            schema: {
                headline: copy('Professional headline'), summary: copy('Opening summary — what should a hiring team understand first?', true),
                skills: fields.array(fields.object({ category: copy('Skill group'), items: fields.array(copy('Skill'), { label: 'Skills', itemLabel: p => p.value }) }), { label: 'Skills', itemLabel: p => p.fields.category.value }),
                experience: fields.array(fields.object({ company: copy('Company or organization'), role: copy('Your role'), period: copy('Dates as displayed'), bullets: fields.array(copy('Contribution or outcome', true), { label: 'Contributions', itemLabel: p => p.value }) }), { label: 'Experience — displayed in this order', itemLabel: p => p.fields.company.value }),
                projects: fields.array(fields.object({ name: copy('Project name'), url: copy('Project URL'), period: copy('Dates as displayed'), description: copy('Problem, your contribution, and outcome', true), tech: fields.array(copy('Technology'), { label: 'Technologies', itemLabel: p => p.value }) }), { label: 'Projects', itemLabel: p => p.fields.name.value }),
                education: fields.array(fields.object({ school: copy('School'), degree: copy('Degree'), period: copy('Dates (optional)'), note: copy('Additional detail (optional)', true) }), { label: 'Education', itemLabel: p => p.fields.school.value }),
            }
        }),
        cryptoart: singleton({ label: "02 \u00b7 Cryptoart.social", path: 'src/content/site/cryptoart', format: { data: 'json' }, schema: {
                tooling: copy('Tests, deployment tooling and documentation contribution', true),
                title: copy("Project name", false),
                subtitle: copy("One-sentence introduction", true),
                motivation: copy("What problem made you build this?", true),
                implementation: copy("What did you build, and how does it work?", true),
                ownership: copy("What did you own? What is still in progress?", true),
                grant: copy("Grant recognition \u2014 shown beside the story", true),
                sponsorship: copy("Sponsorship \u2014 shown below the grant", true),
                links: fields.object({
                    link1: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: 'CryptoArt Studio reference' }),
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: 'LSSVM documentation' }),
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Explore the auction house" }),
                }, { label: 'Links shown in this section' }),
            } }),
        suchbot: singleton({ label: "03 \u00b7 The agent stack", path: 'src/content/site/suchbot', format: { data: 'json' }, schema: {
                title: copy("Section title", false),
                subtitle: copy("One-sentence introduction", true),
                overview: copy("Lead-in line above the subsystem grid", true),
                subsystems: fields.array(fields.object({ title: copy('Subsystem title'), text: copy('What it does', true) }), { label: 'Subsystems' }),
                decisionsTitle: copy("Details: decisions heading", false),
                decisions: copy("Which decisions mattered, and why?", true),
                limitationsTitle: copy("Details: limitations heading", false),
                limitations: copy("What remains unfinished or requires maintenance?", true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Suchbot on Farcaster" }),
                    link1: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Read the blog" }),
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Graph service: logseqd" }),
                    link3: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Integration template" }),
                }, { label: 'Links shown in this section' }),
            } }),
        tools: singleton({ label: "04 \u00b7 Built with the stack \u2014 ledger", path: 'src/content/site/tools', format: { data: 'json' }, schema: {
                familyLabel: copy('Label connecting the ledger to the agent stack'),
                familyDescription: copy('What is this record of?', true),
                entries: fields.array(fields.object({
                    domain: copy('Domain or name, shown in mono'),
                    description: copy('One line \u2014 what it is', true),
                    url: copy('Destination URL'),
                    example: copy('Optional example line (shown as code)', false),
                    footnote: fields.checkbox({ label: 'Footnote row (smaller, muted)', defaultValue: false }),
                }), { label: 'Ledger entries' }),
                links: fields.object({
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "such.gallery" }),
                    link3: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Rogue Pedicab" }),
                    link4: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "GitHub" }),
                    link5: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Generant" }),
                    link6: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "OSC Score Bridge" }),
                    link7: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Renoise OSC Sequencer" }),
                }, { label: 'Links shown in this section' }),
            } }),
        writing: singleton({ label: "09 \u00b7 Featured writing", path: 'src/content/site/writing', format: { data: 'json' }, schema: {
                label: copy("Strip label (e.g. WRITING)"),
                slug: copy("Post slug to feature (from the posts collection)"),
            } }),
        person: singleton({ label: "05 \u00b7 About on the homepage", path: 'src/content/site/person', format: { data: 'json' }, schema: {
                title: copy("Section heading", false),
                experience: copy("How has your engineering experience shaped your work?", true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Experience & background" }),
                }, { label: 'Links shown in this section' }),
            } }),
        practice: singleton({ label: "06 \u00b7 Creative practice", path: 'src/content/site/practice', format: { data: 'json' }, schema: {
                title: copy("Section heading", false),
                description: copy("How would you describe your art practice?", true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Visit the art portfolio" }),
                }, { label: 'Links shown in this section' }),
            } }),
        contact: singleton({ label: "07 \u00b7 Contact & footer", path: 'src/content/site/contact', format: { data: 'json' }, schema: {
                title: copy("Contact heading", false),
                invitation: copy("Who would you like to hear from, and about what?", true),
                links: fields.object({
                    link1: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Notes & writing" }),
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "GitHub" }),
                    link3: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "LinkedIn" }),
                }, { label: 'Links shown in this section' }),
            } }),
        hero: singleton({
            label: '01 · Homepage introduction',
            path: 'src/content/hero/',
            format: { data: 'yaml' },
            schema: {
                tagline: fields.text({
                    label: 'Opening statement — below your name',
                    description: 'Explain the kind of engineer you are in one clear sentence.',
                }),
                bio: fields.text({
                    label: 'Short introduction',
                    multiline: true,
                    description: 'Introductory paragraph on the homepage.',
                }),
                status: fields.text({
                    label: 'Status',
                    description: 'e.g. Looking for work as a developer and creative',
                }),
                cta: fields.text({
                    label: 'Contact button text',
                    description: 'Button in the contact section at the bottom of the homepage. Defaults to Email me.',
                }),
                cta_url: fields.text({
                    label: 'Contact button destination',
                    description: 'URL for the CTA button, e.g. mailto:you@example.com',
                }),
            },
        }),
        about: singleton({
            label: 'Standalone /about page (not homepage)',
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
            label: 'Legacy · Skills (not homepage)',
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
            label: 'Legacy · Recently (not homepage)',
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
            label: 'Legacy · Art (not homepage)',
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
            label: 'Legacy · Projects (not homepage)',
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
            label: 'Legacy · Links (not homepage)',
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
        navigation: {
            'Homepage — top to bottom': ['hero', 'cryptoart', 'suchbot', 'tools', 'writing', 'person', 'practice', 'contact', 'framing'],
            'Résumé': ['resume'],
            'Other pages': ['about', 'posts'],
            'Legacy content — not used on the homepage': ['skills', 'recently', 'art', 'projects', 'links'],
        },
        brand: {
            name: 'mxjxn.com',
        },
    },
});
