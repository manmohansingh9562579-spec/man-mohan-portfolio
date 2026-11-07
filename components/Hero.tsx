'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Github, Linkedin, MapPin, Terminal } from 'lucide-react';
import HeroScene from './hero/HeroScene';
import SplitText from './SplitText';
import MagneticButton from './MagneticButton';
import { site } from '@/lib/site';

const fade = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } });

function ProfileTerminal() {
  return (
    <motion.aside {...fade(0.75)} className="hero-terminal" aria-label="Profile snapshot">
      <div className="flex items-center gap-2 border-b border-line/80 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden><i className="h-2 w-2 rounded-full bg-rose-400/80" /><i className="h-2 w-2 rounded-full bg-amber-300/80" /><i className="h-2 w-2 rounded-full bg-emerald-400/80" /></span>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted">profile.signal</span>
        <Terminal size={14} className="ml-auto text-accent" />
      </div>
      <div className="space-y-3 px-5 py-5 font-mono text-xs">
        <p><span className="text-accent">$</span> <span className="text-muted">identity</span> <span className="text-cyan-200">→</span> Man Mohan Singh</p>
        <p><span className="text-accent">$</span> <span className="text-muted">focus</span> <span className="text-cyan-200">→</span> full-stack engineering</p>
        <p><span className="text-accent">$</span> <span className="text-muted">stack</span> <span className="text-cyan-200">→</span> Next.js · TypeScript</p>
        <p><span className="text-accent">$</span> <span className="text-muted">learning</span> <span className="text-cyan-200">→</span> backend systems</p>
      </div>
      <div className="flex items-center justify-between border-t border-line/80 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
        <span>Profile snapshot · not a running shell</span>
        <span className="flex items-center gap-2 text-cyan-100"><i className="hero-signal-dot" /> READY</span>
      </div>
    </motion.aside>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="home" className="hero-shell relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <div className="hero-grid" aria-hidden />
      <motion.div style={{ y: sceneY }} className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-30 md:w-[64%] md:opacity-80" aria-hidden>
        <HeroScene />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fadeOut }} className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-24 pt-28 lg:grid-cols-[1.05fr_0.8fr] lg:pt-32">
        <div>
          <motion.p {...fade(0.16)} className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="hero-live-marker" />
            <span>{site.title}</span>
            <span className="inline-flex items-center gap-1.5 text-muted"><MapPin size={12} /> {site.location}</span>
          </motion.p>

          <h1 className="max-w-3xl font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            <SplitText text="Man Mohan" delay={0.26} />
            <br />
            <SplitText text="Singh" delay={0.62} className="text-accent" />
          </h1>
          <motion.p {...fade(1.05)} className="mt-7 font-mono text-xs uppercase tracking-[0.24em] text-muted sm:text-sm">
            <span className="text-accent">Build.</span> Engineer. Innovate.
          </motion.p>
          <motion.p {...fade(1.16)} className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            I build full-stack applications, explore backend engineering and turn practical ideas into software people can use.
          </motion.p>

          <motion.div {...fade(1.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton><a href="#projects" className="btn-solid group">Explore My Work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></a></MagneticButton>
            <MagneticButton><a href={site.resume} download className="btn-outline">View Resume <Download size={15} /></a></MagneticButton>
          </motion.div>

          <motion.div {...fade(1.48)} className="mt-6 flex flex-wrap items-center gap-3">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-social"><Github size={16} /> GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-social"><Linkedin size={16} /> LinkedIn</a>
            <span className="ml-1 h-4 w-px bg-line" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Medi-Caps University · CSE</span>
          </motion.div>
        </div>

        <div className="relative hidden min-h-[440px] items-end justify-end pb-4 lg:flex">
          <div className="hero-orbit-label hero-orbit-label-top" aria-hidden>REQUEST / RESPONSE</div>
          <div className="hero-orbit-label hero-orbit-label-side" aria-hidden>NODE 04 — ACTIVE</div>
          <ProfileTerminal />
        </div>
      </motion.div>

      <motion.a {...fade(1.8)} href="#about" aria-label="Scroll to the about section" className="absolute bottom-7 left-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-muted md:left-8">
        <span className="grid h-9 w-7 place-items-center rounded-full border border-line"><ArrowDown size={13} className="hero-scroll-arrow" /></span>
        SCROLL TO EXPLORE
      </motion.a>
    </section>
  );
}
