# Portfolio Website Plan

## Goal
Build a complete, production-ready personal portfolio website for an engineering student. The primary purpose is to help the student land internships, research roles, and freelance clients while showcasing a thoughtful engineering portfolio.

## Hosting requirement
GitHub Pages via static export. This is a hard constraint and must drive architecture decisions.

### Hard rules
- `next.config.ts`: `output: 'export'` and `trailingSlash: true`
- `images`: use `unoptimized: true`
- No API routes
- No server actions
- No dynamic server-side rendering
- Blog content must be loaded from local MDX/JSON files at build time
- Contact form must use a client-side form service (Formspree) with a clear TODO placeholder for the endpoint
- Add GitHub Actions workflow at `.github/workflows/deploy.yml` to build and deploy `out/` to `gh-pages` on every push to `main`

### GitHub Pages nuance
- If repository deploy is not root domain (`username.github.io/repo-name`), include `basePath` and `assetPrefix` in `next.config.ts`
- Ensure static export generates correct local link structure and canonical URLs

## Tech stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animation
- shadcn/ui for shared UI components
- `gray-matter` + `next-mdx-remote` for build-time blog rendering

## Pages and sections
1. **Home**: hero with animated name reveal, concise tagline, and scroll cue
2. **About**: short bio, skills grouped by category, education timeline, plus soft personality details
3. **Projects**: filterable card grid with title, stack badges, summary, and external links
4. **Blog**: list of MDX posts with tags, excerpt, and estimated read time
5. **Resume**: printable, clean resume page that matches site styling
6. **Contact**: Formspree contact form (name, email, message) and social links

## Design system
- Minimal and clean
- Neutral background palette with one accent color
- Typography: Inter or Geist, with strong visual hierarchy
- Generous whitespace, 8px spacing system
- Dark mode using Tailwind `class` strategy
- No clutter: every section should have a clear purpose

## Animation strategy
- Smooth page transitions using Framer Motion AnimatePresence
- Parallax hero background on scroll
- Reveal sections on scroll with staggered children
- Hover micro-interactions on nav links, buttons, and cards
- Avoid layout-shifting animations and preserve Lighthouse performance

## Code quality standards
- `app/` for pages, `components/` for reusable UI
- Strong TypeScript typing, no `any`
- Semantic HTML and accessible components
- ARIA labels where needed
- Keyboard navigable interactions
- SEO metadata per page, `og:image`, canonical tags
- Responsive mobile-first design at 375px, 768px, 1280px
- Aim for Lighthouse 90+ across performance, accessibility, SEO, best practices

## Content guidance
- Use realistic placeholder content, not Lorem ipsum
- Write like an engineering student: real project names, real tech stacks, realistic blog post ideas
- Include exactly 3 sample MDX blog posts in `/content/posts/`

## Deliverables
1. Full file tree created for the project
2. Working local dev environment with `npm run dev`
3. Verified `npm run build` creates an `out/` folder with no build errors
4. `CONTENT.md` documenting where to edit profile, projects, blog, contact data, and deploy settings
5. GitHub Actions deploy workflow ready for `gh-pages`

## Implementation path
1. Scaffold Next.js project and install dependencies
2. Add `next.config.ts` with static export options and GitHub Pages compatibility
3. Confirm `npm run build` and `npm run export` succeed and produce `out/`
4. Build each page in this order: Home, About, Projects, Blog, Resume, Contact
5. Add blog MDX content and static MDX rendering logic
6. Add animations, dark mode, and responsive polish
7. Add deploy workflow and test final static export

## Notes
- Use a placeholder Formspree endpoint like `https://formspree.io/f/placeholder` and leave a TODO comment in the code.
- Prefer local content and simple assets so the app remains fully static and fast.
- Add a lightweight customization toolbar for the prototype that lets the user adjust theme settings such as accent color, font choice, and spacing. This should be client-side only and optional for early design exploration.
- Keep the project ready for GitHub Pages from the start; avoid any server-only features.
