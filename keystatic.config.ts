import { config, fields, singleton, collection } from '@keystatic/core';
const copy = (label: string, multiline = false) => fields.text({ label, multiline });
export default config({
    storage: import.meta.env.DEV
        ? { kind: 'local' }
        : { kind: 'github', repo: 'mxjxn/www-mxjxn' },
    singletons: {
        framing: singleton({ label: 'Homepage headings & supporting text', path: 'src/content/site/framing', format: { data: 'json' }, schema: { experience: copy("Experience summary \u2014 below the introduction", true),
                workTitle: copy("Selected work heading", true),
                graphCaption: copy("Caption below the knowledge diagram", true),
                poolTitle: copy("Expandable personal story title", true),
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
                title: copy("Project name", false),
                subtitle: copy("One-sentence introduction", true),
                motivation: copy("What problem made you build this?", true),
                implementation: copy("What did you build, and how does it work?", true),
                ownership: copy("What did you own? What is still in progress?", true),
                grant: copy("Grant recognition \u2014 shown beside the story", true),
                sponsorship: copy("Sponsorship \u2014 shown below the grant", true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Explore the auction house" }),
                }, { label: 'Links shown in this section' }),
            } }),
        suchbot: singleton({ label: "03 \u00b7 Suchbot & its knowledge system", path: 'src/content/site/suchbot', format: { data: 'json' }, schema: {
                title: copy("Project name", false),
                subtitle: copy("One-sentence introduction", true),
                overview: copy("What is Suchbot part of?", true),
                knowledge: copy("How do Logseq and logseqd support the agent?", true),
                feedback: copy("How do feedback and privacy shape the system?", true),
                contribution: copy("Your contribution and agent implementation credit", true),
                decisionsTitle: copy("Details: decisions heading", false),
                decisions: copy("Which decisions mattered, and why?", true),
                roleTitle: copy("Details: contribution heading", false),
                role: copy("What did you personally contribute?", true),
                limitationsTitle: copy("Details: limitations heading", false),
                limitations: copy("What remains unfinished or requires maintenance?", true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Suchbot on Farcaster" }),
                    link1: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Read the blog" }),
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Graph service: logseqd" }),
                    link3: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Integration template" }),
                }, { label: 'Links shown in this section' }),
            } }),
        tools: singleton({ label: "04 \u00b7 Suchbot public tools", path: 'src/content/site/tools', format: { data: 'json' }, schema: {
                glitchTitle: copy("First tool: name", false),
                glitchDescription: copy("First tool: what can someone do with it?", true),
                example: copy('Example command shown in the code block', true),
                snapTitle: copy('Second tool: name'),
                snapDescription: copy('Second tool: capabilities and outcome', true),
                links: fields.object({
                    link0: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Open Glitch Pipeline" }),
                    link1: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Explore Such Snap" }),
                    link2: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "such.gallery" }),
                    link3: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "Rogue Pedicab" }),
                    link4: fields.object({ label: copy('Link text'), url: copy('Destination URL') }, { label: "GitHub" }),
                }, { label: 'Links shown in this section' }),
            } }),
        person: singleton({ label: "05 \u00b7 About on the homepage", path: 'src/content/site/person', format: { data: 'json' }, schema: {
                title: copy("Section heading", false),
                experience: copy("How has your engineering experience shaped your work?", true),
                people: copy("What do you bring to working with people?", true),
                story: copy("The swimming story \u2014 inside the expandable section", true),
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
                    description: 'e.g. Open to forward deployed engineering roles',
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
            'Homepage — top to bottom': ['hero', 'cryptoart', 'suchbot', 'tools', 'person', 'practice', 'contact', 'framing'],
            'Résumé': ['resume'],
            'Other pages': ['about', 'posts'],
            'Legacy content — not used on the homepage': ['skills', 'recently', 'art', 'projects', 'links'],
        },
        brand: {
            name: 'mxjxn.com',
        },
    },
});
