'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import SectionTitle from './SectionTitle';

/* ─── Code snippets that animate on the laptop screen ─── */
const CODE_LINES = [
  { text: "import { useState, useEffect } from 'react';", color: '#c792ea' },
  { text: "import { motion } from 'framer-motion';", color: '#c792ea' },
  { text: '', color: '' },
  { text: "interface Project {", color: '#82aaff' },
  { text: "  id: string;", color: '#eeffff' },
  { text: "  name: string;", color: '#eeffff' },
  { text: "  stack: string[];", color: '#eeffff' },
  { text: "  active: boolean;", color: '#eeffff' },
  { text: "}", color: '#82aaff' },
  { text: '', color: '' },
  { text: "export default function Portfolio() {", color: '#82aaff' },
  { text: "  const [projects, setProjects] = useState<Project[]>([]);", color: '#eeffff' },
  { text: "  const [status, setStatus] = useState('shipping');", color: '#eeffff' },
  { text: '', color: '' },
  { text: "  useEffect(() => {", color: '#c792ea' },
  { text: "    // Initializing 3D developer workspace", color: '#546e7a' },
  { text: "    connectSignals().then(data => {", color: '#eeffff' },
  { text: "      setProjects(data);", color: '#eeffff' },
  { text: "      setStatus('ready');", color: '#eeffff' },
  { text: "    });", color: '#eeffff' },
  { text: "  }, []);", color: '#eeffff' },
  { text: '', color: '' },
  { text: "  return (", color: '#c792ea' },
  { text: "    <main className='behind-the-code'>", color: '#f07178' },
  { text: "      <Workspace projects={projects} />", color: '#f07178' },
  { text: "      <Terminal status={status} />", color: '#f07178' },
  { text: "    </main>", color: '#f07178' },
  { text: "  );", color: '#eeffff' },
  { text: "}", color: '#82aaff' },
];

const TERMINAL_LINES = [
  { text: '$ npm run dev', color: '#c3e88d' },
  { text: '▲ Next.js 14.2.35 ready on http://localhost:3000', color: '#89ddff' },
  { text: '✓ Compiled /api/signals in 84ms', color: '#546e7a' },
  { text: '$ git status -s', color: '#c3e88d' },
  { text: 'M components/DeveloperDesk.tsx', color: '#ffcb6b' },
  { text: '$ git commit -m "feat: behind the code 3D simulation"', color: '#c3e88d' },
  { text: '[main 6c8fbc0] Behind The Code simulation active', color: '#546e7a' },
  { text: '$ git push origin main', color: '#c3e88d' },
  { text: 'Enumerating objects: 5, done. Deployed to Vercel.', color: '#82aaff' },
];

/* ─── Canvas Code Editor ─── */
function CodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const stateRef = useRef({
    lineIndex: 0,
    charIndex: 0,
    tick: 0,
    cursorVisible: true,
    terminalLineIndex: 0,
    terminalCharIndex: 0,
    showTerminal: false,
    terminalTick: 0,
    pause: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let destroyed = false;
    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    let W = Math.max(canvas.offsetWidth, 200);
    let H = Math.max(canvas.offsetHeight, 120);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);

    const updateSize = () => {
      if (!canvas || destroyed) return;
      const rect = canvas.getBoundingClientRect();
      W = Math.max(rect.width, 200);
      H = Math.max(rect.height, 120);
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
    };

    updateSize();
    const ro = new ResizeObserver(() => updateSize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const FONT_SIZE = 7.5;
    const LINE_H = 12;
    const PAD_TOP = 28;
    const PAD_LEFT = 10;
    const TERMINAL_H = 72;

    let lastTime = 0;
    const CHAR_INTERVAL = 36;
    const CURSOR_INTERVAL = 500;

    const displayedLines: { text: string; color: string }[] = [];

    function drawFrame(ts: number) {
      if (destroyed || !ctx) return;
      const s = stateRef.current;
      const delta = ts - lastTime;
      lastTime = ts;

      const CODE_H = H - TERMINAL_H - 2;
      const VISIBLE_LINES = Math.floor(CODE_H / LINE_H);

      ctx.save();
      ctx.scale(DPR, DPR);
      ctx.clearRect(0, 0, W, H);

      /* Background */
      ctx.fillStyle = '#0a0d11';
      ctx.fillRect(0, 0, W, H);

      /* Title bar */
      ctx.fillStyle = '#12171d';
      ctx.fillRect(0, 0, W, 20);
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath(); ctx.arc(8, 10, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath(); ctx.arc(18, 10, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#27c93f';
      ctx.beginPath(); ctx.arc(28, 10, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#8b949e';
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
      ctx.fillText('Workspace.tsx', 42, 13.5);

      /* Line numbers gutter */
      ctx.fillStyle = '#12171d';
      ctx.fillRect(0, 20, 22, CODE_H);

      /* Code lines */
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
      const startLine = Math.max(0, displayedLines.length - VISIBLE_LINES);

      displayedLines.slice(startLine).forEach((line, i) => {
        const y = PAD_TOP + i * LINE_H;
        const lineNum = startLine + i + 1;

        /* Line number */
        ctx.fillStyle = '#484f58';
        ctx.fillText(String(lineNum).padStart(2, ' '), 2, y);

        /* Code text */
        ctx.fillStyle = line.color || '#eeffff';
        ctx.fillText(line.text, PAD_LEFT + 24, y);
      });

      /* Cursor on current typing position */
      s.tick += delta;
      if (s.tick > CURSOR_INTERVAL) {
        s.tick -= CURSOR_INTERVAL;
        s.cursorVisible = !s.cursorVisible;
      }

      if (!s.showTerminal && s.cursorVisible && displayedLines.length > 0) {
        const relLine = displayedLines.length - 1 - startLine;
        if (relLine >= 0 && relLine < VISIBLE_LINES) {
          const curLine = displayedLines[displayedLines.length - 1];
          const textW = ctx.measureText(curLine.text.slice(0, s.charIndex)).width;
          const cursorX = PAD_LEFT + 24 + textW;
          const cursorY = PAD_TOP + relLine * LINE_H - FONT_SIZE;
          ctx.fillStyle = '#c792ea';
          ctx.fillRect(cursorX, cursorY, 1.5, FONT_SIZE + 2);
        }
      }

      /* Typing animation */
      if (s.pause > 0) {
        s.pause -= delta;
      } else if (!s.showTerminal) {
        const currentCodeLine = CODE_LINES[s.lineIndex];
        if (!currentCodeLine) {
          s.showTerminal = true;
        } else if (s.charIndex < currentCodeLine.text.length) {
          if (displayedLines.length <= s.lineIndex) {
            displayedLines.push({ text: '', color: currentCodeLine.color });
          }
          displayedLines[s.lineIndex] = {
            text: currentCodeLine.text.slice(0, s.charIndex + 1),
            color: currentCodeLine.color,
          };
          s.charIndex++;
        } else {
          s.pause = currentCodeLine.text.length === 0 ? 50 : CHAR_INTERVAL * 2;
          displayedLines.push({ text: currentCodeLine.text, color: currentCodeLine.color });
          s.lineIndex++;
          s.charIndex = 0;
          if (displayedLines.length > s.lineIndex) {
            displayedLines.length = s.lineIndex;
          }
        }
      }

      /* Terminal panel */
      const termY = CODE_H + 2;
      ctx.fillStyle = '#0a0d11';
      ctx.fillRect(0, termY, W, TERMINAL_H);
      ctx.fillStyle = '#181e26';
      ctx.fillRect(0, termY, W, 14);
      ctx.fillStyle = '#8b949e';
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
      ctx.fillText('TERMINAL (zsh)', 10, termY + 10);

      if (s.showTerminal) {
        s.terminalTick += delta;
        const termLine = TERMINAL_LINES[s.terminalLineIndex];
        if (termLine && s.terminalTick > CHAR_INTERVAL) {
          s.terminalTick = 0;
          if (s.terminalCharIndex < termLine.text.length) {
            s.terminalCharIndex++;
          } else {
            s.terminalTick = 0;
            s.terminalLineIndex = (s.terminalLineIndex + 1) % TERMINAL_LINES.length;
            s.terminalCharIndex = 0;
            if (s.terminalLineIndex === 0) {
              s.showTerminal = false;
              s.lineIndex = 0;
              s.charIndex = 0;
              displayedLines.length = 0;
            }
          }
        }

        TERMINAL_LINES.slice(0, s.terminalLineIndex + 1).forEach((tl, i) => {
          const isLast = i === s.terminalLineIndex;
          const displayText = isLast ? tl.text.slice(0, s.terminalCharIndex) : tl.text;
          ctx.fillStyle = tl.color;
          ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;
          ctx.fillText(displayText, 10, termY + 26 + i * 10);
        });

        /* Terminal cursor */
        if (s.cursorVisible) {
          const tl = TERMINAL_LINES[s.terminalLineIndex];
          if (tl) {
            const tw = ctx.measureText(tl.text.slice(0, s.terminalCharIndex)).width;
            ctx.fillStyle = '#c3e88d';
            ctx.fillRect(10 + tw, termY + 18 + s.terminalLineIndex * 10, 4, FONT_SIZE);
          }
        }
      }

      /* Subtle Screen glow gradient */
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.75);
      grd.addColorStop(0, 'rgba(101,184,255,0.04)');
      grd.addColorStop(1, 'rgba(0,0,0,0.12)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      frameRef.current = requestAnimationFrame(drawFrame);
    }

    frameRef.current = requestAnimationFrame(drawFrame);
    return () => {
      destroyed = true;
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: '4px' }}
    />
  );
}

/* ─── Floating particles ─── */
function Particles({ count = 20 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.2 + Math.random() * 2.2,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * -18,
      opacity: 0.12 + Math.random() * 0.25,
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'rgb(var(--accent))',
          }}
          animate={{ y: [0, -42, 0], opacity: [p.opacity, p.opacity * 1.8, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Ambient warm lamp glow ─── */
function LampGlow() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '6%',
        right: '16%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,215,120,0.22) 0%, rgba(255,190,70,0.06) 50%, transparent 70%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }}
      animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.08, 1] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Screen glow reflection on desk surface ─── */
function ScreenGlow() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '22%',
        left: '32%',
        width: 240,
        height: 70,
        background: 'radial-gradient(ellipse, rgba(101,184,255,0.18) 0%, transparent 74%)',
        filter: 'blur(16px)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Realistic Developer character ─── */
function Developer({ typing }: { typing: boolean }) {
  return (
    <div className="dev-character" aria-hidden>
      {/* Ergonomic Chair */}
      <div className="dev-chair">
        <div className="chair-headrest" />
        <div className="chair-back" />
        <div className="chair-armrest armrest-l" />
        <div className="chair-armrest armrest-r" />
        <div className="chair-seat" />
        <div className="chair-base" />
      </div>

      {/* Body & Clothes */}
      <div className="dev-body">
        {/* Torso */}
        <div className="dev-torso">
          <div className="dev-shirt" />
          <div className="dev-collar" />
        </div>

        {/* Arms */}
        <motion.div
          className="dev-arm arm-left"
          animate={typing ? { rotate: [-2, 3, -2], y: [0, -1, 0] } : { rotate: 0 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="dev-arm arm-right"
          animate={typing ? { rotate: [3, -2, 3], y: [0, -1, 0] } : { rotate: 0 }}
          transition={{ duration: 0.36, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
        />

        {/* Hands on keyboard */}
        <motion.div
          className="dev-hand hand-left"
          animate={typing ? { y: [0, -1.8, 0.4, 0] } : { y: 0 }}
          transition={{ duration: 0.26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="dev-hand hand-right"
          animate={typing ? { y: [0, 0.8, -1.6, 0] } : { y: 0 }}
          transition={{ duration: 0.29, repeat: Infinity, ease: 'easeInOut', delay: 0.09 }}
        />
      </div>

      {/* Head + neck + blinking eyes */}
      <motion.div
        className="dev-head-group"
        animate={{
          rotate: [-1, 1, -1],
          y: [0, -1.2, 0],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="dev-neck" />
        <div className="dev-head">
          <div className="dev-hair" />
          <div className="dev-face">
            <motion.div
              className="dev-eye eye-l"
              animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.44, 0.46, 0.48, 1] }}
            />
            <motion.div
              className="dev-eye eye-r"
              animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.44, 0.46, 0.48, 1] }}
            />
            <div className="dev-nose" />
            <div className="dev-mouth" />
          </div>
          <div className="dev-ear" />
          <div className="dev-headphone-band" />
          <div className="dev-headphone-cup cup-l" />
          <div className="dev-headphone-cup cup-r" />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Desk + Scene Objects ─── */
function DeskScene({ typing, onLaptopClick }: { typing: boolean; onLaptopClick: () => void }) {
  return (
    <div className="desk-scene">
      {/* Back wall / ambient backdrop */}
      <div className="desk-wall" />

      {/* Desk lamp with warm cone light */}
      <div className="desk-lamp">
        <div className="lamp-base" />
        <div className="lamp-stem" />
        <div className="lamp-arm" />
        <div className="lamp-head" />
        <motion.div
          className="lamp-cone-light"
          animate={{ opacity: [0.65, 0.92, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Small desk plant */}
      <div className="desk-plant">
        <div className="plant-pot" />
        <div className="plant-stem" />
        <div className="plant-leaf leaf-1" />
        <div className="plant-leaf leaf-2" />
        <div className="plant-leaf leaf-3" />
        <div className="plant-leaf leaf-4" />
      </div>

      {/* Coffee mug with animated steam */}
      <div className="desk-mug">
        <div className="mug-body" />
        <div className="mug-handle" />
        <div className="mug-rim" />
        <motion.div
          className="mug-steam steam-1"
          animate={{ y: [0, -15, 0], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="mug-steam steam-2"
          animate={{ y: [0, -13, 0], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Developer character */}
      <Developer typing={typing} />

      {/* Modern wooden desk surface */}
      <div className="desk-surface">
        {/* Interactive Laptop */}
        <div
          className="laptop-wrapper"
          onClick={onLaptopClick}
          role="button"
          tabIndex={0}
          aria-label="Open full code editor"
          onKeyDown={e => e.key === 'Enter' && onLaptopClick()}
        >
          <div className="laptop-base">
            <div className="laptop-keyboard">
              <div className="key-row" />
              <div className="key-row" />
              <div className="key-row" />
              <div className="key-row" />
              <div className="key-spacebar" />
            </div>
            <div className="laptop-touchpad" />
          </div>
          <div className="laptop-screen-assembly">
            <div className="laptop-bezel">
              <div className="laptop-screen">
                <CodeCanvas />
              </div>
              <div className="laptop-camera-dot" />
            </div>
          </div>
        </div>

        {/* Mechanical keyboard */}
        <div className="ext-keyboard">
          <div className="key-row" />
          <div className="key-row" />
          <div className="key-row" />
          <div className="key-row" />
        </div>

        {/* Mouse */}
        <div className="desk-mouse">
          <div className="mouse-body" />
          <div className="mouse-scroll" />
        </div>

        {/* Mousepad */}
        <div className="mousepad" />
      </div>

      {/* Desk legs */}
      <div className="desk-leg leg-l" />
      <div className="desk-leg leg-r" />
    </div>
  );
}

/* ─── Code Overlay Modal (Expanded editor on click) ─── */
function CodeOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="code-overlay-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="code-overlay-window"
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="overlay-titlebar">
          <button className="overlay-close-btn" onClick={onClose} aria-label="Close modal">
            <span />
          </button>
          <span className="overlay-title">Workspace.tsx — Visual Studio Code</span>
          <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-muted">Press ESC or click outside to close</span>
        </div>
        <div className="overlay-editor">
          <CodeCanvas />
        </div>
        <div className="overlay-statusbar">
          <span>TypeScript · React 18</span>
          <span>UTF-8</span>
          <span>Ln 18, Col 42</span>
          <span className="text-emerald-400">✓ 0 Errors · Ready</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Exported Section ─── */
export default function DeveloperDesk() {
  const prefersReduced = useReducedMotion();
  const [typing, setTyping] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22 });
  const sy = useSpring(my, { stiffness: 55, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], prefersReduced ? [0, 0] : [-3.5, 3.5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], prefersReduced ? [0, 0] : [2, -2]);

  /* Keydown escape to close overlay */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlayOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* Natural typing pauses */
  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setTyping(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => setTyping(true), 1200 + Math.random() * 1800);
    }, 6000 + Math.random() * 5000);

    return () => {
      clearInterval(interval);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [prefersReduced]);

  /* Pause rendering when tab is inactive */
  useEffect(() => {
    const onVis = () => {
      setTyping(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my, prefersReduced]);

  const handleMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <section className="desk-section relative isolate overflow-hidden py-24 sm:py-32" id="behind-the-code">
      {/* Background particles */}
      {!prefersReduced && <Particles count={18} />}

      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="05 // WORKSPACE SIMULATION"
          title="Behind The Code"
          subtitle="Turning ideas into code, one line at a time."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Left column — Information & Controls */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm shadow-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Interactive Simulation</span>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Turning Ideas Into Code
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A realistic 3D perspective of my daily development space: crafting scalable frontend architectures, writing clean TypeScript, running local build loops, and shipping thoughtful digital experiences.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['React 18', 'TypeScript', 'Next.js 14', 'Tailwind CSS', 'Canvas API', 'Framer Motion'].map((tag) => (
                  <span key={tag} className="rounded-md border border-line bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-muted">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                  className="btn-solid inline-flex items-center gap-2 text-xs"
                >
                  Inspect Live Code <span aria-hidden>↗</span>
                </button>
                <span className="font-mono text-[10px] text-muted">
                  Tip: click laptop to expand
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right column — 3D Workspace Scene */}
          <motion.div
            className="desk-scene-col relative min-h-[460px] sm:min-h-[520px] rounded-2xl border border-line bg-gradient-to-b from-surface/80 to-surface/40 p-4 backdrop-blur-md shadow-xl"
            initial={{ opacity: 0, x: 48, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateY, rotateX, perspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <LampGlow />
            <ScreenGlow />
            <DeskScene typing={typing && !prefersReduced} onLaptopClick={() => setOverlayOpen(true)} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Code Modal */}
      {overlayOpen && (
        <CodeOverlay onClose={() => setOverlayOpen(false)} />
      )}
    </section>
  );
}
