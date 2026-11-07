import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-accent to-accent2" />
      {subtitle && <p className="mt-5 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  );
}
