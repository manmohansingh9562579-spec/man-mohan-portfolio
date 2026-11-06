'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { animate, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import Tilt from './Tilt';
import ProjectVisual from './ProjectVisual';
import { projects } from '@/lib/data';

/** Counts the project number up from 0 when it scrolls into view. */
function CountNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 0.9, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{String(n).padStart(2, '0')}</span>;
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle eyebrow="03 / Featured projects" title="Made to be used, not just seen." subtitle="Two full-stack projects that are live today. Open a project to read the problem, the solution and how it is built." />

      <div className="mt-16 space-y-28">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.slug} className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${i % 2 ? 'md:mt-4' : ''}`}>
              <Reveal direction={flip ? 'right' : 'left'} className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                <Link href={`/projects/${p.slug}`} aria-label={`Open the ${p.name} project page`} className="group block" data-cursor>
                  <Tilt><ProjectVisual slug={p.slug} /></Tilt>
                </Link>
              </Reveal>

              <Reveal delay={0.1} className={`md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
                <p className="font-display text-7xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(var(--accent)/0.55)] md:text-8xl" aria-hidden><CountNumber value={p.number} /></p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{p.category}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {p.status}</span>
                </div>
                <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{p.name}</h3>
                <p className="mt-2 text-sm font-medium text-accent">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{p.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/projects/${p.slug}`} className="btn-solid !px-5 !py-2.5">Case study <ArrowUpRight size={15} /></Link>
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn-outline !px-5 !py-2.5">Live demo</a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline !px-5 !py-2.5">GitHub <Github size={15} /></a>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>

      <motion.p className="mt-20 text-center text-sm text-muted" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        More projects will appear here once their repositories and live links are ready to share.
      </motion.p>
    </section>
  );
}
