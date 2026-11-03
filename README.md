# Man Mohan Singh — Portfolio

Portfolio of Man Mohan Singh, a Computer Science Engineering student at Medi-Caps University, Indore. Built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion and React Three Fiber**.

Live: https://man-mohan-portfolio.vercel.app

## Features

- **3D hero** built with Three.js, React Three Fiber and Drei: a metallic torus knot around a glowing core, lit by blue and violet light panels, with cursor-responsive rotation, camera drift and subtle particles.
  Tablets get a lighter version. Phones, reduced-motion users and browsers without WebGL get a static CSS fallback. An error boundary catches 3D failures, and rendering pauses while the hero is off screen.
- **Dark and light themes** driven by CSS variables. The choice is saved and applied before first paint, so there is no flash.
- **Sections:** About, interactive tech stack, featured projects, "Inside my engineering mind" architecture diagrams, currently building, experience, achievements, GitHub activity, contact.
- **Project pages** at `/projects/teamforge` and `/projects/trodomiles`, generated from `lib/data.ts`.
- **GitHub section** reading real public repositories and recent push activity through `/api/github`, with a fallback when the API is unavailable.
- **Contact form** with validation, error and loading states, a honeypot field and per-IP rate limiting, delivering through Resend. If the service is not configured the form says so and opens a prefilled `mailto:` draft instead of pretending the message was sent.
- **Motion:** splash transition, character-by-character headline, scroll reveals, parallax, magnetic buttons, custom cursor ring (mouse devices only), scroll progress bar, animated timeline and diagrams. All of it respects `prefers-reduced-motion`.
- **SEO and accessibility:** metadata, Open Graph image, sitemap, robots, canonical URLs, JSON-LD, semantic HTML, keyboard navigation and labelled forms.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend |
| `GITHUB_TOKEN` | Optional. Raises the GitHub API rate limit. Read on the server only |

Without the Resend variables `/api/contact` returns `503` and the site still builds and runs.

## Editing content

- `lib/site.ts`: name, links, email, resume path, navigation.
- `lib/data.ts`: tech stack, projects, timeline, milestones, current work and architecture diagrams.
- `public/images/profile-cutout.webp`: portrait with a transparent background (the original is `profile.jpg`).
- `public/resume/man-mohan-singh-resume.pdf`: resume.

Project previews are original artwork, labelled "preview artwork", not screenshots. Add real screenshots to `public/projects/` and reference them in `components/ProjectVisual.tsx` when available.

## Structure

```text
app/
  api/contact/route.ts     Contact form API (Resend, honeypot, rate limit)
  api/github/route.ts      Public GitHub data (token stays on the server)
  projects/[slug]/page.tsx Project detail pages
  layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts, opengraph-image.tsx
components/
  hero/Scene.tsx, hero/HeroScene.tsx   3D scene, loader, fallback, error boundary
  Header, Hero, About, TechStack, Projects, EngineeringLab, Building,
  Experience, Achievements, GitHubSection, Contact, Footer
  Providers, Splash, ScrollProgress, ScrollTop, Cursor, Reveal, SplitText,
  MagneticButton, ThemeToggle, ProjectVisual, SectionTitle
lib/
  site.ts, data.ts
```

## Deployment

Import the repository into Vercel (default Next.js settings) and add the environment variables above.

## Notes

No GitHub statistics, employment, awards, skill percentages or scores are hard-coded or invented. Where something does not exist yet (internships, certifications, open-source work) the site says so.
