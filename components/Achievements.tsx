import { ArrowUpRight, Trophy } from 'lucide-react';
import Tilt from './Tilt';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { milestones } from '@/lib/data';

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionTitle eyebrow="06 / Achievements" title="Milestones so far." subtitle="Only things that have actually happened. No awards or rankings are claimed." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {milestones.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.07} direction="scale">
            <Tilt className="h-full"><div className="card card-hover flex h-full flex-col">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent"><Trophy size={18} /></span>
              <h3 className="mt-4 font-display text-xl font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              {m.href && <a href={m.href} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">{m.label} <ArrowUpRight size={14} /></a>}
            </div></Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
