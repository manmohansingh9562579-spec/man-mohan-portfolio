'use client';

import { motion } from 'framer-motion';

/** Reveals text word by word, sliding up out of a mask. */
export default function SplitText({ text, className = '', delay = 0, stagger = 0.09 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ delay: delay + i * stagger, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
