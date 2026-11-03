'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import HeroScene from './hero/HeroScene';
import SplitText from './SplitText';
import MagneticButton from './MagneticButton';
import { site } from '@/lib/site';

const fade = (delay: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } });

export default function Hero() {
  const socials = [
    { label: 'GitHub', href: site.github, icon: <Github size={19} />, external: true },
    { label: 'LinkedIn', href: site.linkedin, icon: <Linkedin size={19} />, external: true },
    { label: 'Email', href: `mailto:${site.email}`, icon: <Mail size={19} />, external: false },
  ];

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D scene sits behind the text and ignores pointer events, so buttons and links always work */}
      <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-40 md:w-[56%] md:opacity-100">
        <HeroScene />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28 md:pt-32">
        <motion.p {...fade(0.2)} className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
          {site.title}
          <span className="inline-flex items-center gap-1.5 text-muted"><MapPin size={13} /> {site.location}</span>
        </motion.p>

        <h1 className="max-w-3xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem]">
          <SplitText text="Engineering ideas into" delay={0.35} />
          <br />
          <SplitText text="digital reality." delay={0.95} className="text-accent" />
        </h1>

        <motion.p {...fade(1.5)} className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Hi, I&apos;m Man Mohan Singh. I build full-stack applications, explore backend engineering and create meaningful digital experiences.
        </motion.p>

        <motion.div {...fade(1.65)} className="mt-9 flex flex-wrap items-center gap-4">
          <MagneticButton><a href="#projects" className="btn-solid group">Explore Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></a></MagneticButton>
          <MagneticButton><a href={site.resume} download className="btn-outline">Download Resume <Download size={16} /></a></MagneticButton>
          <MagneticButton><a href="#contact" className="btn-outline">Contact Me</a></MagneticButton>
        </motion.div>

        <motion.div {...fade(1.8)} className="mt-8 flex items-center gap-3">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} className="icon-btn" {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{s.icon}</a>
          ))}
        </motion.div>
      </div>

      <motion.a {...fade(2.1)} href="#about" aria-label="Scroll to the about section" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex">
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line"><span className="scroll-dot mt-2 h-1.5 w-1.5 rounded-full bg-accent" /></span>
        <ArrowDown size={14} className="sr-only" />
      </motion.a>
    </section>
  );
}
