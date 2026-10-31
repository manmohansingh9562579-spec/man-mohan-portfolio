'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { site } from '@/lib/site';

const links = [
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Activities', href: '#activities' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-semibold tracking-tight">
          Man Mohan<span className="text-accent"> Singh</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition hover:text-accent">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={site.resume} target="_blank" rel="noreferrer" className="btn-outline hidden !py-2 md:inline-flex">Resume</a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg px-6 pb-4 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-sm text-muted">{l.label}</a>
          ))}
          <a href={site.resume} target="_blank" rel="noreferrer" className="block py-3 text-sm font-medium text-accent">Resume</a>
        </nav>
      )}
    </header>
  );
}
