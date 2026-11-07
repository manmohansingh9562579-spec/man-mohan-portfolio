'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { navLinks, site } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [hidden, setHidden] = useState(false);

  // Highlights the nav link of the section currently in view (home page only).
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    let previousY = window.scrollY;
    let lastDirection = 0;
    let directionDistance = 0;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      const direction = Math.sign(delta);
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) setActive('contact');
      if (direction !== 0) {
        directionDistance = direction === lastDirection ? directionDistance + Math.abs(delta) : Math.abs(delta);
        lastDirection = direction;
      }
      if (currentY < 120) { setHidden(false); directionDistance = 0; }
      else if (directionDistance > 14) {
        if (direction > 0) setHidden(true);
        else if (direction < 0) setHidden(false);
        directionDistance = 0;
      }
      previousY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-md"
      animate={{ y: hidden && !open ? '-105%' : '0%' }}
      transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.7 }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/#home" className="font-display text-lg font-semibold tracking-tight">
          Man Mohan<span className="text-accent"> Singh</span>
        </Link>

        <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} className={`relative py-1 text-sm transition ${active === l.id ? 'text-ink' : 'text-muted hover:text-ink'}`}>
              {l.label}
              {active === l.id && <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={site.resume} download className="btn-solid hidden !py-2 lg:inline-flex">Resume <Download size={14} /></a>
          <button type="button" className="icon-btn !h-10 !w-10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

    </motion.header>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg px-6 pb-10 lg:hidden"
            aria-label="Mobile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.02 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/#${l.id}`} onClick={() => setOpen(false)} className={`block border-b border-line py-4 font-display text-2xl ${active === l.id ? 'text-accent' : 'text-ink'}`}>{l.label}</Link>
              </motion.div>
            ))}
            <a href={site.resume} download className="btn-solid mt-8 w-full">Download Resume <Download size={14} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
