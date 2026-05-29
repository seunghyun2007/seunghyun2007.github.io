# Content Editing Guide

This file documents where to edit each piece of content on the site.

## Profile & Bio

Edit the bio text directly in:
- `src/app/about/page.tsx` — main About page bio and section intro text
- `src/app/page.tsx` + `src/components/home/HeroSection.tsx` — hero tagline and body copy

## Projects

Edit the projects array in `src/lib/projects.ts`:

```ts
export const PROJECTS: Project[] = [
  {
    id: 'my-project',
    title: 'Project Title',
    summary: 'Short description shown on the card.',
    stack: ['React', 'TypeScript'],
    image: '/assets/my-image.jpg',   // must be in public/assets/
    notionUrl: 'https://notion.so/...',
    featured: false,
    tags: ['hardware', 'academic'],  // used for filtering
  },
  ...
]
```

To mark a project as featured (shown prominently at the top), set `featured: true`. Only one project should be featured at a time.

## Blog Posts

Add `.mdx` files to `content/posts/`. Each file needs this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-06-01"
tags: ["tag1", "tag2"]
excerpt: "One-sentence summary shown on the blog list page."
---

Your content here in Markdown...
```

The `readTime` is computed automatically from word count. The URL slug is derived from the filename — `my-post.mdx` becomes `/blog/my-post`.

## Contact Endpoint (Formspree)

1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL (looks like `https://formspree.io/f/abcd1234`)
3. Replace the placeholder in `src/components/contact/ContactForm.tsx`:

```ts
// TODO: Replace with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder'
```

## Social Links & Email

Edit the `SOCIAL` array in `src/app/contact/page.tsx` and update:
- Email in `src/components/layout/Footer.tsx`
- GitHub and LinkedIn in `src/components/layout/Footer.tsx`
- Resume header in `src/app/resume/page.tsx`

## Assets / Images

Place image files in `public/assets/`. Reference them in code as `/assets/filename.jpg`.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.JPG`, `.JPG`

## Design Tokens

- **Colors and spacing**: edit CSS variables in `src/app/globals.css` (`:root` and `.dark` blocks)
- **Tailwind utilities**: extend `tailwind.config.ts` for new design tokens
- **Design toolbar**: add accent swatches or font options in `src/components/customization/DesignToolbar.tsx`

## Deploy Settings

The deploy workflow is at `.github/workflows/deploy.yml`. It:
1. Builds the site with `npm run build` → produces `out/`
2. Pushes `out/` to the `gh-pages` branch

In GitHub repository settings → Pages → set source to **Deploy from branch `gh-pages`**.

To deploy manually: push any commit to `main` and the workflow runs automatically.
