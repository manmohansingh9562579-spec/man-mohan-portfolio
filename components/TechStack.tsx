'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Braces, Cloud, Database, Layout, Server, Sparkles, Wrench, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { techGroups, techStack, type TechGroup } from '@/lib/data';

const icons: Record<TechGroup, LucideIcon> = { Languages: Braces, Frontend: Layout, Backend: Server, Database, Tools: Wrench, 'Cloud & Deployment': Cloud, 'AI / ML': Sparkles };

export default function TechStack() {
  const [selected, setSelected] = useState(techStack.find((t) => t.name === 'TypeScript') ?? techStack[0]);

  return (
    <section id="skills" className="section">
      <SectionTitle eyebrow="02 / Tech stack" title="Tools I use. Things I'm learning." subtitle="Hover, focus or tap a technology to see where I have actually used it. There are no skill percentages here, only what is real." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-7">
          {techGroups.map((group, gi) => {
            const Icon = icons[group];
            return (
              <Reveal key={group} delay={gi * 0.05}>
                <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"><Icon size={14} className="text-accent" /> {group}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.filter((t) => t.group === group).map((t) => {
                    const on = selected.name === t.name;
                    return (
                      <button
                        key={t.name}
                        type="button"
                        onMouseEnter={() => setSelected(t)}
                        onFocus={() => setSelected(t)}
                        onClick={() => setSelected(t)}
                        aria-pressed={on}
                        className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${on ? 'border-accent bg-accent/10 text-ink shadow-lg shadow-accent/10' : 'border-line bg-surface/70 text-muted hover:text-ink'}`}
                      >
                        <Icon size={15} /> {t.name}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal direction="right">
          <div className="card min-h-[18rem] lg:sticky lg:top-24" aria-live="polite">
              <motion.div key={selected.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                <p className="eyebrow flex items-center gap-2"><Boxes size={14} /> {selected.group}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold">{selected.name}</h3>
                <p className="mt-3 text-sm text-muted">{selected.blurb}</p>
                <dl className="mt-6 space-y-4 text-sm">
                  <div><dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Related project</dt><dd className="mt-1 font-medium">{selected.project}</dd></div>
                  <div><dt className="font-mono text-[11px] uppercase tracking-widest text-muted">In practice</dt><dd className="mt-1 leading-relaxed text-muted">{selected.detail}</dd></div>
                </dl>
              </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
