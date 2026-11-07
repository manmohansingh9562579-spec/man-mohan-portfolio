# Man Mohan Singh — Portfolio

Portfolio of Man Mohan Singh, a Computer Science Engineering student at Medi-Caps University, Indore. Built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion and React Three Fiber**.

Live: https://man-mohan-portfolio.vercel.app

## Features

- **3D computational network** built with Three.js and React Three Fiber. Connected nodes and moving packets respond gently to pointer movement. Tablets get a lighter render; phones, reduced-motion users and browsers without WebGL get a static SVG fallback. Rendering pauses while the hero is off screen.
- **Dark and light themes** driven by CSS variables. The choice is saved and applied before first paint, so there is no flash.
- **Engineering Playground:** interactive request architecture, a local code preview based on TeamForge's matching service, real algorithm visualizers, in-memory CRUD flow, and a simulated delivery pipeline. Each simulation explains what it does and makes clear when it does not call a live service.
- **Sections:** About, interactive tech stack, featured projects, engineering playground, current work, experience, milestones and contact.
- **Project pages** at `/projects/teamforge` and `/projects/trodomiles`, generated from `lib/data.ts`.
- **Contact form** with validation, error and loading states, a honeypot field and per-IP rate limiting, delivering through Resend. If the service is not configured the form says so and opens a prefilled `mailto:` draft instead of pretending the message was sent.
- **Motion:** a short splash, character-by-character headline, restrained section reveals, tilt cards, tech marquee, parallax, magnetic buttons, scroll progress and timeline details. Motion is reduced or removed when the visitor requests it.
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

Without the Resend variables `/api/contact` returns `503` and the site still builds and runs.

## Editing content

- `lib/site.ts`: name, links, email, resume path, navigation.
- `lib/data.ts`: tech stack, projects, timeline, milestones and current work.
- `lib/simulations.ts`: deterministic algorithm steps and the local TeamForge scoring example used by the playground.
- `public/images/profile-cutout.webp`: portrait with a transparent background (the original is `profile.jpg`).
- `public/resume/man-mohan-singh-resume.pdf`: resume.

Project previews are real screenshots of the live sites in `public/projects/` (`teamforge.webp`, `trodomiles.webp`). Replace the files to update them.

## Structure

```text
app/
  api/contact/route.ts     Contact form API (Resend, honeypot, rate limit)
  projects/[slug]/page.tsx Project detail pages
  layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts, opengraph-image.tsx
components/
  hero/Scene.tsx, hero/HeroScene.tsx   3D network, loader, fallback, error boundary
  Header, Hero, About, TechStack, Projects, EngineeringPlayground, Building,
  Experience, Achievements, Contact, Marquee, Tilt, Footer
  Providers, Splash, ScrollProgress, ScrollTop, Cursor, Reveal, SplitText,
  MagneticButton, ThemeToggle, ProjectVisual, SectionTitle
lib/
  site.ts, data.ts, simulations.ts
```

## Deployment

Import the repository into Vercel (default Next.js settings) and add the environment variables above.

## Notes

No GitHub statistics, employment, awards, skill percentages or scores are hard-coded or invented. Where something does not exist yet (internships, certifications, open-source work) the site says so.
