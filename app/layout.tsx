import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Providers from '@/components/Providers';
import { site, siteUrl } from '@/lib/site';
import './globals.css';

const description = 'Software engineer and full-stack developer from Indore, India. Computer Science student at Medi-Caps University building web applications such as TeamForge and TrodoMiles.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} — Software Engineer & Full-Stack Developer`, template: `%s | ${site.name}` },
  description,
  alternates: { canonical: '/' },
  authors: [{ name: site.name, url: siteUrl }],
  openGraph: { title: `${site.name} — Software Engineer`, description, url: siteUrl, siteName: `${site.name} Portfolio`, type: 'website', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: `${site.name} — Software Engineer`, description },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f6f7fb' }, { media: '(prefers-color-scheme: dark)', color: '#070a14' }] };

// Runs before first paint to apply the saved theme (or the device preference).
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}d.setAttribute('data-theme',t);}catch(e){d.setAttribute('data-theme','dark');}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: 'Software Engineer',
  url: siteUrl,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: 'Indore', addressCountry: 'IN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.university },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="font-sans"><Providers>{children}</Providers></body>
    </html>
  );
}
