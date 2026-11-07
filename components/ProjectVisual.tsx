'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectVisual({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  return (
    <motion.div
      className={`relative aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image src={`/projects/${slug}.webp`} alt={`${slug === 'teamforge' ? 'TeamForge' : 'TrodoMiles'} home page screenshot`} fill sizes="(max-width: 768px) 100vw, 70vw" priority={priority} className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <span className="absolute bottom-3 left-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] tracking-widest text-muted">LIVE SCREENSHOT</span>
    </motion.div>
  );
}
