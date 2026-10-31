'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section id="home" className="section grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-medium text-accent">
          <span className="h-2 w-2 rounded-full bg-accent" /> Software developer · CSE student
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Hi, I&apos;m <span className="text-accent">Man Mohan Singh</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          I&apos;m a Computer Science student at {site.university}, building full-stack web applications and
          strengthening my fundamentals in algorithms, backend engineering and AI-powered software.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"><Github size={19} /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent"><Linkedin size={19} /></a>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#contact" className="btn-solid">Contact me</a>
          <a href={site.resume} target="_blank" rel="noreferrer" className="btn-outline">See my resume</a>
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> {site.location}</p>
      </motion.div>

      <motion.div className="relative mx-auto w-full max-w-sm" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2rem] bg-accent-soft" aria-hidden />
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-xl">
          <Image src="/images/profile.jpg" alt="Portrait of Man Mohan Singh" fill priority sizes="(max-width: 768px) 90vw, 380px" className="object-cover object-top" />
        </div>
      </motion.div>
    </section>
  );
}
