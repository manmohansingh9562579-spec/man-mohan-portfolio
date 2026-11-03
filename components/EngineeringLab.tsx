'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { architectures } from '@/lib/data';

const W = 150;
const H = 62;

export default function EngineeringLab() {
  const [archId, setArchId] = useState(architectures[0].id);
  const arch = architectures.find((a) => a.id === archId) ?? architectures[0];
  const [activeId, setActiveId] = useState(arch.nodes[0].id);
  const active = arch.nodes.find((n) => n.id === activeId) ?? arch.nodes[0];
  const byId = Object.fromEntries(arch.nodes.map((n) => [n.id, n]));

  const pick = (id: string) => { setArchId(id); setActiveId(architectures.find((a) => a.id === id)?.nodes[0].id ?? ''); };

  return (
    <section id="lab" className="section">
      <SectionTitle eyebrow="04 / Engineering lab" title="Inside my engineering mind." subtitle="How my projects are put together. Select a project, then hover or focus a block to see what it does." />

      <Reveal>
        <div className="mt-10 flex gap-2" role="tablist" aria-label="Project architecture">
          {architectures.map((a) => (
            <button key={a.id} role="tab" aria-selected={a.id === archId} onClick={() => pick(a.id)} className={`rounded-full border px-5 py-2 text-sm font-medium transition ${a.id === archId ? 'border-accent bg-accent text-on-accent' : 'border-line text-muted hover:text-ink'}`}>{a.title}</button>
          ))}
        </div>

        <div className="card mt-6 overflow-x-auto !p-4 md:!p-6">
          <AnimatePresence mode="wait">
            <motion.svg key={arch.id} viewBox="0 0 780 330" className="mx-auto h-auto min-w-[640px] w-full" role="img" aria-label={`${arch.title} architecture diagram`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {arch.edges.map(([from, to], i) => {
                const a = byId[from]; const b = byId[to];
                const x1 = a.x + W; const y1 = a.y + H / 2; const x2 = b.x; const y2 = b.y + H / 2;
                const mid = (x1 + x2) / 2;
                return <path key={i} className="svg-edge flow-line" d={`M${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`} />;
              })}
              {arch.nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`} tabIndex={0} role="button" aria-label={`${n.label}: ${n.desc}`} onMouseEnter={() => setActiveId(n.id)} onFocus={() => setActiveId(n.id)} onClick={() => setActiveId(n.id)} style={{ cursor: 'pointer', outline: 'none' }}>
                  <rect width={W} height={H} rx="12" className={`svg-node ${active.id === n.id ? 'svg-node-active' : ''}`} />
                  <text x={W / 2} y="26" textAnchor="middle" className="svg-ink" fontSize="13" fontWeight="600">{n.label}</text>
                  <text x={W / 2} y="46" textAnchor="middle" className="svg-muted" fontSize="9.5">{n.sub}</text>
                </g>
              ))}
            </motion.svg>
          </AnimatePresence>

          <div className="mt-4 rounded-xl bg-accent/10 p-4 text-sm" aria-live="polite">
            <p className="font-display text-base font-semibold">{active.label} <span className="font-sans text-xs font-normal text-muted">· {active.sub}</span></p>
            <p className="mt-1 text-muted">{active.desc}</p>
          </div>
          <p className="mt-3 text-xs text-muted">{arch.caption}</p>
        </div>
      </Reveal>
    </section>
  );
}
