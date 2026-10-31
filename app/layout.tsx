import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Man Mohan Singh — Software Developer',
  description: 'Computer Science student at Medi-Caps University, exploring software engineering, full-stack development and AI-powered applications.',
  openGraph: { title: 'Man Mohan Singh — Software Developer', description: 'Thoughtful digital products. Practical software. Continuous learning.', type: 'website' },
};

// Sets the theme before first paint to avoid a light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
