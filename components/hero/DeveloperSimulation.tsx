'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Play, Pause, Layers3, Monitor, Terminal } from 'lucide-react';

/* ─── Real Code Sequence that builds the website ─── */
interface CodeToken {
  text: string;
  color: string;
}

interface BuildStep {
  phase: string;
  file: string;
  tokens: CodeToken[];
  action: string;
  badge: string;
}

const BUILD_STEPS: BuildStep[] = [
  {
    phase: '01 / INIT',
    file: 'app/layout.tsx',
    tokens: [
      { text: 'const ', color: '#c792ea' },
      { text: 'app ', color: '#82aaff' },
      { text: '= ', color: '#89ddff' },
      { text: 'createPortfolio', color: '#82aaff' },
      { text: '({ ', color: '#89ddff' },
      { text: 'dev: ', color: '#ffcb6b' },
      { text: '"Man Mohan Singh"', color: '#c3e88d' },
      { text: ' });', color: '#89ddff' },
    ],
    action: 'Initializing root architecture & reactive layout...',
    badge: 'BLUEPRINT MOUNTED',
  },
  {
    phase: '02 / NAVBAR',
    file: 'components/Header.tsx',
    tokens: [
      { text: '<', color: '#89ddff' },
      { text: 'Header ', color: '#f07178' },
      { text: 'navItems', color: '#ffcb6b' },
      { text: '={[', color: '#89ddff' },
      { text: '"About"', color: '#c3e88d' },
      { text: ', ', color: '#89ddff' },
      { text: '"Projects"', color: '#c3e88d' },
      { text: ', ', color: '#89ddff' },
      { text: '"Code"', color: '#c3e88d' },
      { text: ']} />', color: '#89ddff' },
    ],
    action: 'Mounting glassmorphic floating navigation...',
    badge: 'NAVBAR ACTIVE',
  },
  {
    phase: '03 / HERO CARD',
    file: 'components/Hero.tsx',
    tokens: [
      { text: '<', color: '#89ddff' },
      { text: 'Hero ', color: '#f07178' },
      { text: 'title', color: '#ffcb6b' },
      { text: '="Man Mohan Singh" ', color: '#c3e88d' },
      { text: 'role', color: '#ffcb6b' },
      { text: '="Software Engineer"', color: '#c3e88d' },
      { text: ' />', color: '#89ddff' },
    ],
    action: 'Unfolding 3D hero showcase & interactive identity...',
    badge: 'HERO RENDERED',
  },
  {
    phase: '04 / TELEMETRY',
    file: 'components/Metrics.tsx',
    tokens: [
      { text: '<', color: '#89ddff' },
      { text: 'SystemMetrics ', color: '#f07178' },
      { text: 'latency', color: '#ffcb6b' },
      { text: '="14ms" ', color: '#c3e88d' },
      { text: 'uptime', color: '#ffcb6b' },
      { text: '="99.98%"', color: '#c3e88d' },
      { text: ' />', color: '#89ddff' },
    ],
    action: 'Streaming live telemetry & animated performance charts...',
    badge: 'METRICS ONLINE',
  },
  {
    phase: '05 / PRODUCTION',
    file: 'deploy.config.ts',
    tokens: [
      { text: 'export default ', color: '#c792ea' },
      { text: 'deploy', color: '#82aaff' },
      { text: '({ ', color: '#89ddff' },
      { text: 'target: ', color: '#ffcb6b' },
      { text: '"Vercel"', color: '#c3e88d' },
      { text: ', ', color: '#89ddff' },
      { text: 'status: ', color: '#ffcb6b' },
      { text: '"LIVE"', color: '#c3e88d' },
      { text: ' });', color: '#89ddff' },
    ],
    action: 'Build successful! 100% production ready.',
    badge: 'VERCEL DEPLOYED',
  },
];

/* ─── Canvas Code Editor Screen (Runs on the monitor) ─── */
function MonitorCanvas({ stepIndex, isTyping }: { stepIndex: number; isTyping: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    charIndex: 0,
    cursorBlink: true,
    blinkTick: 0,
    typingTick: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let destroyed = false;
    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

    const updateSize = () => {
      if (!canvas || destroyed) return;
      const rect = canvas.getBoundingClientRect();
      const W = Math.max(rect.width, 240);
      const H = Math.max(rect.height, 140);
      if (canvas.width !== Math.round(W * DPR) || canvas.height !== Math.round(H * DPR)) {
        canvas.width = Math.round(W * DPR);
        canvas.height = Math.round(H * DPR);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    stateRef.current.charIndex = 0;
    stateRef.current.typingTick = 0;
    const currentTokens = BUILD_STEPS[stepIndex]?.tokens || BUILD_STEPS[0].tokens;
    const totalChars = currentTokens.reduce((acc, t) => acc + t.text.length, 0);

    let lastTime = performance.now();

    function render(ts: number) {
      if (destroyed || !canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dt = ts - lastTime;
      lastTime = ts;

      const W = canvas.width / DPR;
      const H = canvas.height / DPR;

      ctx.save();
      ctx.scale(DPR, DPR);
      ctx.clearRect(0, 0, W, H);

      // Editor background
      ctx.fillStyle = '#070a0f';
      ctx.fillRect(0, 0, W, H);

      // Tab bar
      ctx.fillStyle = '#0f141e';
      ctx.fillRect(0, 0, W, 22);

      // Window controls (macOS style)
      ctx.fillStyle = '#ff5f56'; ctx.beginPath(); ctx.arc(10, 11, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffbd2e'; ctx.beginPath(); ctx.arc(20, 11, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#27c93f'; ctx.beginPath(); ctx.arc(30, 11, 3.5, 0, Math.PI * 2); ctx.fill();

      // Tab filename
      ctx.fillStyle = '#7dd3fc';
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillText(BUILD_STEPS[stepIndex]?.file || 'Workspace.tsx', 44, 14.5);

      // Gutter
      ctx.fillStyle = '#0b0f16';
      ctx.fillRect(0, 22, 24, H - 22);

      // Line numbers
      ctx.fillStyle = '#3a4454';
      for (let i = 1; i <= 6; i++) {
        ctx.fillText(String(i), 8, 38 + (i - 1) * 15);
      }

      // Static context lines
      ctx.font = '9px ui-monospace, monospace';
      ctx.fillStyle = '#c792ea';
      ctx.fillText('import { createPortfolio } from "@/lib";', 30, 38);

      ctx.fillStyle = '#546e7a';
      ctx.fillText(`// Phase: ${BUILD_STEPS[stepIndex]?.phase}`, 30, 53);

      // Variable burst typing logic (40-60ms per char)
      const s = stateRef.current;
      if (isTyping && s.charIndex < totalChars) {
        s.typingTick += dt;
        if (s.typingTick > 45) {
          s.typingTick = 0;
          s.charIndex += 1;
        }
      }

      // Cursor blinking
      s.blinkTick += dt;
      if (s.blinkTick > 480) {
        s.blinkTick = 0;
        s.cursorBlink = !s.cursorBlink;
      }

      // Render tokenized active line
      let remainingToRender = s.charIndex;
      let currentX = 30;
      const lineY = 68;

      for (const token of currentTokens) {
        if (remainingToRender <= 0) break;
        const textSlice = token.text.slice(0, remainingToRender);
        ctx.fillStyle = token.color;
        ctx.fillText(textSlice, currentX, lineY);
        currentX += ctx.measureText(textSlice).width;
        remainingToRender -= textSlice.length;
      }

      // Render typing cursor
      if (s.cursorBlink && isTyping) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(currentX + 1, lineY - 9, 5, 11);
      }

      // Live status line
      ctx.fillStyle = '#a3e635';
      ctx.font = '8.5px ui-monospace, monospace';
      ctx.fillText(`→ ${BUILD_STEPS[stepIndex]?.action || 'Building...'}`, 30, 86);

      // Bottom terminal panel
      const termY = H - 36;
      ctx.fillStyle = '#080c13';
      ctx.fillRect(0, termY, W, 36);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, termY, W, 1);

      ctx.fillStyle = '#4ade80';
      ctx.font = '8px ui-monospace, monospace';
      ctx.fillText(`▲ [HMR] compiled ${BUILD_STEPS[stepIndex]?.file} in 42ms`, 10, termY + 15);
      ctx.fillStyle = '#64748b';
      ctx.fillText('Ready on http://localhost:3000 • 0 errors', 10, termY + 28);

      ctx.restore();
      frameRef.current = requestAnimationFrame(render);
    }

    frameRef.current = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
    };
  }, [stepIndex, isTyping]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

/* ─── Floating Holographic Website UI Projection ─── */
function HolographicWebsite({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="holo-projection-container pointer-events-none absolute inset-0 z-30">
      {/* 3D Wireframe Grid Floor (Phase 0+) */}
      <motion.div
        className="holo-wireframe"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* ── Holographic Floating Window Assembling in 3D ── */}
      <div className="holo-browser-window">
        {/* Stage 1: Floating Navigation Bar */}
        <AnimatePresence>
          {stepIndex >= 1 && (
            <motion.div
              className="holo-navbar"
              initial={{ y: -24, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                <span className="font-mono text-[9px] font-semibold text-cyan-200">MM.dev</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[8px] text-slate-300">
                <span className="text-cyan-400">About</span>
                <span>Work</span>
                <span>Contact</span>
              </div>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[7px] text-cyan-300">
                v2.4
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Hero Identity Card Component */}
        <AnimatePresence>
          {stepIndex >= 2 && (
            <motion.div
              className="holo-hero-card"
              initial={{ x: -30, opacity: 0, rotateY: 15 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.05 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400">
                  ● ACTIVE BUILD
                </span>
                <span className="rounded bg-sky-400/20 px-1 font-mono text-[7px] text-sky-200">
                  Next.js 14
                </span>
              </div>
              <h4 className="mt-1 font-display text-sm font-bold text-white">
                Man Mohan Singh
              </h4>
              <p className="font-mono text-[8px] text-cyan-300/90">
                Full-Stack &amp; Software Systems
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-[7px] text-slate-400">
                  Building with intention
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Live Telemetry & Metrics Charts */}
        <AnimatePresence>
          {stepIndex >= 3 && (
            <motion.div
              className="holo-metrics-card"
              initial={{ y: 25, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, delay: 0.08 }}
            >
              <div className="flex items-center justify-between font-mono text-[8px]">
                <span className="text-slate-400">LATENCY / UPTIME</span>
                <span className="font-bold text-cyan-300">99.98%</span>
              </div>
              <div className="mt-1.5 flex h-7 items-end gap-1">
                {[45, 68, 52, 90, 75, 88, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-cyan-600 to-teal-300 shadow-[0_0_6px_rgba(45,212,191,0.5)]"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between font-mono text-[7px] text-slate-400">
                <span>0.14ms</span>
                <span>Optimized</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 4: Deployed Banner with Particle Burst */}
        <AnimatePresence>
          {stepIndex >= 4 && (
            <motion.div
              className="holo-deployed-badge"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CheckCircle2 size={13} className="text-emerald-400 animate-pulse" />
              <span className="font-mono text-[8px] font-bold tracking-wider text-emerald-200">
                PRODUCTION DEPLOYED TO VERCEL
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient floating tech badges */}
      <motion.div
        className="holo-pill pill-top"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>TypeScript 5</span>
      </motion.div>
      <motion.div
        className="holo-pill pill-side"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span>Tailwind · Canvas</span>
      </motion.div>
    </div>
  );
}

/* ─── High-Fidelity 3D Workspace Scene (Desk, Chair, Developer, Lamp, Screens) ─── */
function StudioDesk({
  stepIndex,
  isTyping,
}: {
  stepIndex: number;
  isTyping: boolean;
}) {
  return (
    <div className="studio-3d-scene relative h-full w-full select-none">
      {/* Dynamic ambient LED light on the back wall */}
      <div className="ambient-wall-glow" />

      {/* Modern Dual Screen Desk Setup */}
      <div className="studio-workstation">
        {/* Ultrawide Monitor Arm & Display 1 (Main Editor) */}
        <div className="studio-monitor monitor-main">
          <div className="monitor-frame">
            <MonitorCanvas stepIndex={stepIndex} isTyping={isTyping} />
            <div className="screen-led-edge" />
          </div>
          <div className="monitor-stand-neck" />
          <div className="monitor-stand-base" />
        </div>

        {/* Vertical Monitor 2 (Live Preview / Terminal) */}
        <div className="studio-monitor monitor-side">
          <div className="monitor-frame-side">
            <div className="h-full w-full bg-[#080c12] p-2 font-mono text-[7px] text-cyan-300">
              <div className="border-b border-cyan-800/40 pb-1 font-bold text-slate-300">
                NODE_SIGNAL
              </div>
              <div className="mt-1 space-y-1 text-slate-400">
                <p className="text-emerald-400">✓ git branch main</p>
                <p>▸ webpack ready</p>
                <p>▸ 100% test pass</p>
                <p className="text-cyan-400">● Live preview on</p>
              </div>
              <div className="mt-3 rounded border border-cyan-500/20 bg-cyan-950/40 p-1.5 text-center font-mono text-[6px] text-cyan-200">
                [LIVE RENDER ACTIVE]
              </div>
            </div>
          </div>
        </div>

        {/* Ergonomic Desk Lamp with Real Volumetric Glow */}
        <div className="studio-lamp">
          <div className="lamp-pole" />
          <div className="lamp-shade" />
          <motion.div
            className="lamp-glow-cone"
            animate={{ opacity: [0.75, 0.95, 0.75] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Coffee Mug with Animated Steam Particles */}
        <div className="studio-mug">
          <div className="mug-core" />
          <motion.span
            className="steam-wisp wisp-1"
            animate={{ y: [0, -18, 0], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="steam-wisp wisp-2"
            animate={{ y: [0, -15, 0], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </div>

        {/* Mechanical RGB Keyboard with Typing Glow */}
        <div className="studio-keyboard">
          <div className="key-caps-grid">
            <span className="key-row r1" />
            <span className="key-row r2" />
            <span className="key-row r3" />
          </div>
          <motion.div
            className="keyboard-rgb-line"
            animate={isTyping ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.4 }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </div>

        {/* Ergonomic Mouse & Desk Pad */}
        <div className="studio-mousepad" />
        <div className="studio-mouse" />

        {/* Realistic Wooden Surface Desk */}
        <div className="studio-desk-top">
          <div className="desk-bevel" />
        </div>
      </div>

      {/* ── Realistic Developer Character in Ergonomic Chair ── */}
      <div className="studio-developer-group">
        {/* Ergonomic Mesh Chair with Pelvis Seat, Backrest and Armrests */}
        <div className="studio-chair">
          <div className="chair-cushion-head" />
          <div className="chair-mesh-back" />
          <div className="chair-armrest-left" />
          <div className="chair-armrest-right" />
          <div className="chair-seat-cushion" />
          <div className="chair-swivel-base" />
        </div>

        {/* Lower Body (Thighs/Knees connecting to chair) */}
        <div className="dev-lower-body">
          <div className="dev-thigh thigh-l" />
          <div className="dev-thigh thigh-r" />
        </div>

        {/* Developer Torso & Clothes */}
        <motion.div
          className="dev-character-torso"
          animate={{ y: [0, -1.2, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="dev-hoodie-core" />
          <div className="dev-hoodie-strings" />

          {/* Left Arm with articulable elbow & wrist over keyboard */}
          <motion.div
            className="dev-limb arm-l"
            animate={isTyping ? { rotate: [-3, 4, -3], y: [0, -1.2, 0] } : { rotate: 0 }}
            transition={{ duration: 0.38, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="dev-forearm">
              <div className="dev-hand-left" />
            </div>
          </motion.div>

          {/* Right Arm with articulable elbow & wrist over keyboard */}
          <motion.div
            className="dev-limb arm-r"
            animate={isTyping ? { rotate: [4, -3, 4], y: [0, -1.2, 0] } : { rotate: 0 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
          >
            <div className="dev-forearm">
              <div className="dev-hand-right" />
            </div>
          </motion.div>
        </motion.div>

        {/* Developer Head & Face with Anatomical Neck Posture */}
        <motion.div
          className="dev-character-head-group"
          animate={{
            rotate: [-1.2, 1.2, -1.2],
            y: [0, -1, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="dev-neck-posture" />
          <div className="dev-head-profile">
            {/* Dark Hair cut */}
            <div className="dev-hair-layer" />

            {/* Profile face */}
            <div className="dev-face-layer">
              {/* Natural Blinking Eye */}
              <motion.div
                className="dev-blink-eye"
                animate={{ scaleY: [1, 1, 0.05, 1, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.45, 0.47, 0.49, 1] }}
              />
              <div className="dev-nose-tip" />
              <div className="dev-jawline" />
            </div>

            {/* Over-ear headphones with ambient LED ring */}
            <div className="dev-headset-band" />
            <div className="dev-headset-earcup" />
          </div>
        </motion.div>
      </div>

      {/* Holographic Website Building Motion Graphic Projection */}
      <HolographicWebsite stepIndex={stepIndex} />
    </div>
  );
}

/* ─── Main Exported Hero Simulation Component ─── */
export default function DeveloperSimulation() {
  const prefersReduced = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance through build steps as the developer codes
  useEffect(() => {
    if (prefersReduced || !isAutoPlay) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % BUILD_STEPS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [prefersReduced, isAutoPlay]);

  // Subtle natural pauses in typing with clean timer lifecycle cleanup
  useEffect(() => {
    if (prefersReduced) return;
    const pauseTimer = setInterval(() => {
      setIsTyping(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        setIsTyping(true);
      }, 1000 + Math.random() * 1200);
    }, 5500);

    return () => {
      clearInterval(pauseTimer);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [prefersReduced]);

  // Mouse Parallax for 3D Depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], prefersReduced ? [0, 0] : [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], prefersReduced ? [0, 0] : [4, -4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const currentStep = BUILD_STEPS[stepIndex] || BUILD_STEPS[0];

  return (
    <div className="relative w-full max-w-xl">
      {/* ── Status HUD Header ── */}
      <div className="mb-3 flex items-center justify-between rounded-xl border border-line/80 bg-surface/70 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
            {currentStep.phase}
          </span>
          <span className="font-mono text-[10px] text-muted">
            • {currentStep.file}
          </span>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5">
          {BUILD_STEPS.map((s, idx) => (
            <button
              key={s.phase}
              type="button"
              onClick={() => setStepIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === stepIndex
                  ? 'w-6 bg-gradient-to-r from-accent to-accent2'
                  : 'w-2 bg-line hover:bg-muted'
              }`}
              aria-label={`Go to ${s.phase}`}
            />
          ))}
        </div>
      </div>

      {/* ── 3D Viewport Box ── */}
      <motion.div
        className="relative h-[390px] sm:h-[430px] w-full overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0a0e17] via-[#090c13] to-[#040609] p-4 shadow-2xl backdrop-blur-lg"
        style={{ perspective: 1100, rotateY, rotateX }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <StudioDesk stepIndex={stepIndex} isTyping={isTyping} />

        {/* Bottom Banner overlay: What is being constructed */}
        <div className="absolute inset-x-4 bottom-3 z-40 flex items-center justify-between rounded-lg border border-cyan-500/20 bg-slate-950/80 px-3.5 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono text-[9px] text-cyan-200">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>{currentStep.action}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center gap-1 font-mono text-[8px] text-muted hover:text-cyan-300 transition"
          >
            {isAutoPlay ? <Pause size={10} /> : <Play size={10} />}
            <span>{isAutoPlay ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
