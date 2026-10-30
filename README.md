# Man Mohan Singh — Portfolio

A motion-led, editorial portfolio built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion and Lucide React**. The visual direction takes inspiration from the supplied cream/black reference without reproducing its layout: oversized editorial typography, a live typewriter line, a subtle 3D portrait tilt, orbit graphics, scroll reveals and custom project visualisations.

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

## Personalise before publishing

1. Replace `public/images/profile.png` with your original high-resolution portrait. The included image is a crop from the supplied portfolio reference screenshot, used as a temporary visual stand-in because a separate original portrait file was not attached in this turn. Keep the filename `profile.png` or update the path in `components/Portfolio.tsx`.
2. Add your public email in `lib/site.ts` (`email`). The contact form validates fields and opens a prefilled email draft only after an email is configured. It does not pretend to send messages itself.
3. Add your actual resume PDF at `public/resume/man-mohan-singh.pdf` and set `resume: '/resume/man-mohan-singh.pdf'` in `lib/site.ts`.
4. Add the verified TrodoMiles live and GitHub URLs in `lib/site.ts`. They are intentionally left blank rather than fabricated.
5. Confirm the TeamForge live link and replace its GitHub link with the exact project repository if it differs from your profile URL.
6. Update the activity descriptions in `components/Portfolio.tsx` if your participation status changes.

## Main structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Portfolio.tsx
lib/
  site.ts
public/
  images/profile.png
  projects/
  resume/
```

## Motion and accessibility

- Framer Motion powers entrance and scroll reveals, orbit motion, and the portrait's spring-based 3D tilt.
- The hero's typewriter line rotates through three short statements.
- Reduced-motion preferences are respected in CSS.
- Navigation, links, form labels, image alt text, and keyboard-focusable controls are included.
- The project preview artwork is an original CSS composition, not a claim that these are captured product screenshots.

## GitHub and deployment

Push this folder to a new GitHub repository, then import the repository into Vercel. The default Next.js build settings are sufficient. No environment variables are required for the current static experience; see `.env.example` for optional future integrations.

## Notes

- GitHub statistics are not fabricated or hard-coded.
- No employment experience, awards, skill percentages or academic scores have been invented.
- Contact delivery requires a real email address or a configured backend/provider before it can send anything.
