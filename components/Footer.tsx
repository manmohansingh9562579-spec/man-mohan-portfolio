import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex gap-5">
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
