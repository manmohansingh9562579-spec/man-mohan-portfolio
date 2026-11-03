'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { site } from '@/lib/site';

const blocks = [
  { label: 'What I build', text: 'Full-stack web applications. TeamForge helps people find teammates and run a project together. TrodoMiles helps travellers explore India.' },
  { label: 'How I work', text: 'I like to understand how a product works beneath the surface, keep the code simple and keep the claims honest. If something is unfinished, I say so.' },
  { label: 'Learning now', text: 'Data structures and algorithms in Java, Python, backend engineering, databases and testing.' },
  { label: 'Where I am headed', text: 'A Software Development Engineer role at a product-focused company, where I can keep building things people actually use.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="section">
      <SectionTitle eyebrow="01 / About" title="Curious by nature. Builder by practice." />

      <div className="mt-14 grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal direction="left">
          <div ref={ref} className="relative mx-auto max-w-sm">
            <div className="absolute inset-x-6 bottom-0 top-10 -z-10 rounded-[2rem] bg-gradient-to-b from-accent/20 via-accent2/10 to-transparent blur-2xl" aria-hidden />
            <motion.div style={{ y }}>
              {/* The photo has a transparent background and fades out at the bottom, so it sits directly on the page */}
              <Image
                src="/images/profile-cutout.webp"
                alt={`Portrait of ${site.name}`}
                width={994}
                height={1250}
                sizes="(max-width: 768px) 80vw, 380px"
                className="h-auto w-full [mask-image:linear-gradient(to_bottom,#000_72%,transparent_100%)]"
              />
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-xl font-medium leading-snug md:text-2xl">
              I&apos;m a Computer Science Engineering student at {site.university}, {site.location}, learning software engineering by shipping real projects.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.07}>
                <h3 className="eyebrow">{b.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
