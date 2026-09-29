# Editing mxjxn.com

Open `/keystatic` on the running site. On your local preview this is
http://127.0.0.1:3010/keystatic.

## Where to write

The **Homepage — top to bottom** group matches the page: introduction,
Cryptoart.social, Suchbot and its knowledge system, public tools, about,
creative practice, and contact. Supporting headings and the knowledge-diagram
caption have their own section. The prompts explain what each passage does.

Use **Résumé** for the separate `/resume` page, including experience,
projects, education, and skill groups. Homepage and résumé wording are separate
so each can have an appropriate level of detail.

**Other pages** includes the separate `/about` page and existing blog.
**Legacy content** does not populate the redesigned homepage. It is retained
for existing pages and should not be used to change homepage projects.

## Save and review

In development, Save writes files in this checkout. Keep the homepage in
another tab and refresh after saving. This is a saved-content preview, not a
live visual editor; local saves do not publish to the internet.

Production retains the existing GitHub-backed editor. Review the selected
branch before saving. A GitHub save and a server deployment are separate
steps; this change does not add an automatic deployment workflow.

Text is rendered as text, not raw HTML. Layout, diagrams, artwork assets,
and decorative labels remain in the templates. For those changes, edit the
site code. Project link slots are fixed to match their positions on the page;
edit their labels and destinations in their respective sections.

Homepage narratives live in `src/content/site/*.json`, the introduction in
`src/content/hero/index.yaml`, and résumé content in
`src/content/resume/index.yaml`. Those files can also be edited directly.
