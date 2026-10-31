# Man Mohan Singh — Portfolio

Personal portfolio of Man Mohan Singh, a Computer Science Engineering student at Medi-Caps University, Indore. Built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Lucide React**.

## Features

- Editorial single-page layout: hero, about, toolkit, selected work, journey, contact.
- Typewriter intro line, spring-based 3D portrait tilt, scroll reveals and orbit graphics (Framer Motion).
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

Site content lives in `lib/site.ts` (name, links, resume path, email, projects). Page sections are in `components/Portfolio.tsx`.

- Replace `public/images/profile.jpg` to change the portrait (use a plain white or light background; it is blended into the page colour).
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
  Portfolio.tsx
lib/
  site.ts                Site data and project list
public/
  images/profile.jpg
  resume/man-mohan-singh-resume.pdf
```

## Deployment

Import the repository into Vercel. Default Next.js settings work. Add the three environment variables above in the Vercel project settings to enable the contact form.

## Notes

- The project preview artwork is an original CSS composition, not captured product screenshots.
- No GitHub statistics, employment experience, awards, skill percentages or academic scores are hard-coded or invented.
