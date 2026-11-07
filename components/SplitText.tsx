'use client';

import { motion } from 'framer-motion';

/** Reveals each character through a clipped mask while exposing the full phrase once to assistive technology. */
export default function SplitText({ text, className = '', delay = 0, stagger = 0.026 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-nowrap">
        {Array.from(text).map((character, index) => (
          <span key={`${character}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span className="inline-block" initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ delay: delay + index * stagger, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
              {character === ' ' ? '\u00a0' : character}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
