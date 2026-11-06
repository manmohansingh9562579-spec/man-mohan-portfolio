'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { timeline } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionTitle eyebrow="05 / Experience" title="Learning in public. Growing through doing." />

      <div className="relative mt-12 pl-8">
        {/* The line draws itself as the timeline scrolls into view */}
        <motion.span aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-accent to-accent2" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, ease: 'easeOut' }} />
        <ol className="space-y-9">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08} direction="right">
              <li className="relative">
                <span className="absolute -left-[2.45rem] top-1.5 flex h-3 w-3" aria-hidden>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-4 ring-bg" />
                </span>
                <p className="flex items-center gap-3 font-mono text-xs text-muted">{t.date} <span className="chip !py-0.5 !text-[10px]">{t.kind}</span></p>
                <h3 className="mt-2 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{t.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal>
        <p className="mt-12 max-w-2xl rounded-xl border border-dashed border-line p-4 text-sm text-muted">
          No internships, certifications or open-source contributions are listed yet. They will be added here when they are real and verifiable.
        </p>
      </Reveal>
    </section>
  );
}
