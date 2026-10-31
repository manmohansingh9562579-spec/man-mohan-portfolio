# Man Mohan Singh — Portfolio

Personal portfolio of Man Mohan Singh, a Computer Science Engineering student at Medi-Caps University, Indore. Built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Lucide React**.

## Features

- Single-page developer portfolio: hero, skills, education, projects, activities, contact.
- Light and dark theme toggle (respects system preference), scroll reveals (Framer Motion), fully responsive.
- Contact form with client and server validation. Messages are delivered through a Next.js API route (`app/api/contact/route.ts`) using [Resend](https://resend.com).
- If the email service is not configured, the form falls back to a prefilled `mailto:` draft (requires `email` in `lib/site.ts`).
- Reduced-motion preferences respected; labelled form fields, image alt text and keyboard-focusable controls.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives contact messages |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend |

All three are needed for server-side delivery. Without them, `/api/contact` returns `503` and the site still builds and runs.

## Configuring content

Site content lives in `lib/site.ts` (name, links, resume path, email, skills, education, activities, projects). Each page section is its own component in `components/`.

- Replace `public/images/profile.jpg` to change the portrait.
- Replace `public/resume/man-mohan-singh-resume.pdf` to update the resume.
- Set `email` in `lib/site.ts` to enable the mailto fallback.
- Check the project links in `lib/site.ts` (TeamForge live and repository URLs, TrodoMiles URLs).

## Project structure

```text
app/
  api/contact/route.ts   Contact form API (Resend)
  globals.css
  layout.tsx
  page.tsx
components/
  Header.tsx, Hero.tsx, Skills.tsx, Education.tsx,
  Projects.tsx, Activities.tsx, Contact.tsx, Footer.tsx
  ThemeToggle.tsx        Light/dark theme (saved in localStorage)
  Reveal.tsx             Scroll-reveal animation wrapper
lib/
  site.ts                Site data and project list
public/
  images/profile.jpg
  resume/man-mohan-singh-resume.pdf
```

## Deployment

Import the repository into Vercel. Default Next.js settings work. Add the three environment variables above in the Vercel project settings to enable the contact form.

## Notes

- No GitHub statistics, employment experience, awards, skill percentages or academic scores are hard-coded or invented.
