'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import ScrollTop from './ScrollTop';

// reducedMotion="user" makes every Framer Motion animation respect the visitor's OS setting.
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <ScrollTop />
    </MotionConfig>
  );
}
