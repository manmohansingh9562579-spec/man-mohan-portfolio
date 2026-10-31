import { Code2 } from 'lucide-react';
import Reveal from './Reveal';
import { skillGroups, focusAreas } from '@/lib/site';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <h2 className="section-title">What I work with</h2>
        <p className="mt-3 max-w-2xl text-muted">A growing toolkit built through hands-on practice. These are technologies I use and keep learning, with no inflated percentages.</p>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="card h-full">
                <h3 className="text-sm font-semibold text-accent">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="space-y-6 md:pl-6">
            <h3 className="text-xl font-semibold">Where my focus is</h3>
            <ul className="space-y-4">
              {focusAreas.map((f) => (
                <li key={f} className="flex gap-3 text-muted">
                  <Code2 size={18} className="mt-1 shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
