import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Man Mohan Singh — Software Developer',
  description: 'Computer Science student at Medi-Caps University, exploring software engineering, full-stack development and AI-powered applications.',
  openGraph: { title: 'Man Mohan Singh — Software Developer', description: 'Thoughtful digital products. Practical software. Continuous learning.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
