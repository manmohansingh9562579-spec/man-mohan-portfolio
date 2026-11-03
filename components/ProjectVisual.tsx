'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/** Original artwork for each project (not a screenshot). It is labelled as such on the card. */
function Art({ slug }: { slug: string }) {
  if (slug === 'teamforge') {
    const nodes = [[120, 120], [300, 70], [470, 150], [620, 90], [220, 280], [400, 320], [590, 280], [700, 200]];
    const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 7], [3, 7], [2, 6]];
    return (
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="tf-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="rgb(var(--accent))" stopOpacity="0.28" /><stop offset="1" stopColor="rgb(var(--accent2))" stopOpacity="0.2" /></linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#tf-bg)" />
        {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1] + 40} x2={nodes[b][0]} y2={nodes[b][1] + 40} stroke="rgb(var(--accent))" strokeOpacity="0.5" strokeWidth="1.5" />)}
        {nodes.map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y + 40})`}>
            <circle r={i % 3 === 0 ? 26 : 18} fill="rgb(var(--surface))" stroke="rgb(var(--accent))" strokeWidth="2" />
            <circle r={i % 3 === 0 ? 8 : 5} fill={i % 2 ? 'rgb(var(--accent2))' : 'rgb(var(--accent))'} />
          </g>
        ))}
        <g transform="translate(60 400)" fill="rgb(var(--surface))" stroke="rgb(var(--line))">
          {[0, 1, 2].map((c) => <rect key={c} x={c * 120} width="104" height="56" rx="10" />)}
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="tm-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgb(var(--accent2))" stopOpacity="0.3" /><stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.22" /></linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#tm-bg)" />
      <circle cx="610" cy="120" r="54" fill="rgb(var(--accent))" fillOpacity="0.45" />
      <path d="M0 360 L140 250 L250 330 L390 190 L520 320 L640 240 L800 340 L800 500 L0 500Z" fill="rgb(var(--accent2))" fillOpacity="0.35" />
      <path d="M0 420 L120 340 L260 410 L420 300 L580 400 L700 340 L800 400 L800 500 L0 500Z" fill="rgb(var(--accent))" fillOpacity="0.45" />
      <path d="M90 430 C 220 330, 300 390, 400 300 S 600 250, 700 180" fill="none" stroke="rgb(var(--ink))" strokeOpacity="0.7" strokeWidth="2.5" strokeDasharray="4 9" strokeLinecap="round" />
      <circle cx="90" cy="430" r="8" fill="rgb(var(--ink))" />
      <g transform="translate(700 180)"><circle r="14" fill="rgb(var(--accent))" /><circle r="5" fill="rgb(var(--on-accent))" /></g>
    </svg>
  );
}

export default function ProjectVisual({ slug, className = '' }: { slug: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // The observed wrapper is never clipped, so visibility is detected reliably. Only the inner layer is revealed.
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <div ref={ref} className={`relative aspect-[16/10] ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-surface"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="absolute inset-0 scale-[1.15]" style={{ y }}><Art slug={slug} /></motion.div>
        <span className="absolute bottom-3 left-4 rounded-full bg-bg/70 px-3 py-1 font-mono text-[10px] tracking-widest text-muted backdrop-blur">PREVIEW ARTWORK</span>
      </motion.div>
    </div>
  );
}
