'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import Splash from './Splash';
import ScrollProgress from './ScrollProgress';
import ScrollTop from './ScrollTop';

// reducedMotion="user" makes every Framer Motion animation respect the visitor's OS setting.
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Splash />
      <ScrollProgress />
      {children}
      <ScrollTop />
    </MotionConfig>
  );
}
