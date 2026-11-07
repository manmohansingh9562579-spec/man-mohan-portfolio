'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

const from: Record<Direction, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 18 },
  left: { opacity: 0, x: -24 },
  right: { opacity: 0, x: 24 },
  scale: { opacity: 0, y: 18 },
};

export default function Reveal({ children, delay = 0, direction = 'up', className = '', as = 'div' }: { children: ReactNode; delay?: number; direction?: Direction; className?: string; as?: 'div' | 'li' }) {
  const Tag = as === 'li' ? motion.li : motion.div;
  return (
    <Tag
      className={className}
      initial={from[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
