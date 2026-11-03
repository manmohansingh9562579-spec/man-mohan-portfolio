'use client';

import { motion } from 'framer-motion';
import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal direction="left">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="section-title" aria-label={title}>
        {title.split(' ').map((w, i) => (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span className="inline-block" initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
          </span>
        ))}
      </h2>
      <motion.span
        aria-hidden
        className="mt-4 block h-1 rounded-full bg-gradient-to-r from-accent to-accent2"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      />
      {subtitle && <p className="mt-5 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  );
}
