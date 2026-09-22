# Minimal Graphic Design Portfolio — Eleventy

A deliberately simple graphic design portfolio built with Eleventy.

The browser receives only static HTML, CSS and images. There is **no client-side JavaScript** and no frontend framework.

## Structure

```text
.
├── .eleventy.js
├── package.json
└── src/
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── base.njk
    │   ├── work-card.njk
    │   └── work-page.njk
    ├── css/
    │   └── style.css
    ├── images/
    │   └── ...
    ├── works/
    │   ├── quiet-objects.md
    │   └── field-notes.md
    └── index.njk
```

## Run

```sh
npm install
npm start
```

Build for production:

```sh
npm run build
```

The finished static site is in `_site/`.

## Adding a selected work

Create a new Markdown file in:

```text
src/works/
```

For example:

```text
src/works/my-new-project.md
```

Give it front matter like this:

```yaml
---
layout: work-page.njk
title: My New Project
client: Example Client
year: 2026
category: Identity / Digital
order: 3
image: /images/my-project-01.jpg
imageAlt: Description of the project image
intro: A short description of the project.
gallery:
  - src: /images/my-project-01.jpg
    alt: Main project image
    caption: Main identity
  - src: /images/my-project-02.jpg
    alt: Secondary project image
    caption: Detail
---

A longer description of the project can go here.
```

Put the images in:

```text
src/images/
```

That's it.

Eleventy automatically:

1. Finds the Markdown file.
2. Builds a page for it.
3. Adds it to the `selectedWorks` collection.
4. Sorts it using the `order` number.
5. Adds its image, title, client and year to the homepage.
6. Makes the entire work card clickable.
7. Generates the project detail page.

The URL will be based on the Markdown filename. For example:

```text
src/works/my-new-project.md
```

becomes:

```text
/my-new-project/
```

## Why Markdown?

The Markdown files are the content model for the portfolio. The designer doesn't need to touch the homepage template when adding a project.

A typical workflow is simply:

```text
create Markdown file
        ↓
add project images
        ↓
write front matter + description
        ↓
npm run build
        ↓
project automatically appears on Selected Works
```

## Customization

Edit `src/_data/site.json` for the designer's name, location, email and social links.

Edit `src/index.njk` for the homepage copy.

Edit `src/css/style.css` for the visual design.

The project currently contains two example works with SVG placeholder artwork so it works immediately after `npm install`.
