import Link from 'next/link';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { navLinks, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.title}</p>
          <p className="mt-1 text-sm text-muted">{site.location}</p>
          <div className="mt-5 flex gap-3">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-btn"><Github size={18} /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-btn"><Linkedin size={18} /></a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="icon-btn"><Mail size={18} /></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted">
            {navLinks.map((l) => <li key={l.id}><Link href={`/#${l.id}`} className="link-u transition hover:text-accent">{l.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <a href={`mailto:${site.email}`} className="link-u break-all text-sm text-muted transition hover:text-accent">{site.email}</a>
          <div className="mt-6"><Link href="/#home" className="btn-outline !py-2">Back to top <ArrowUp size={14} /></Link></div>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
