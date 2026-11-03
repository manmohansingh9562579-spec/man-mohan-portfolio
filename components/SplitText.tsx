'use client';

import { motion } from 'framer-motion';

/** Reveals text character by character. Words never break across lines. */
export default function SplitText({ text, className = '', delay = 0, stagger = 0.028 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(' ');
  let index = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom" aria-hidden>
            {[...word].map((ch) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: delay + i * stagger, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
