'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Activity, Check, Database, GitBranch, Layers3, Pause, Play, RotateCcw, SkipForward, Sparkles, Terminal, Workflow } from 'lucide-react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { buildAlgorithmFrames, calculateDemoMatch, matchExample, type AlgorithmName } from '@/lib/simulations';

type LabTool = 'architecture' | 'code' | 'algorithms' | 'database' | 'pipeline';

const tools: { id: LabTool; label: string; number: string; icon: typeof Activity }[] = [
  { id: 'architecture', label: 'Architecture', number: '01', icon: Workflow },
  { id: 'code', label: 'Code run', number: '02', icon: Terminal },
  { id: 'algorithms', label: 'Algorithms', number: '03', icon: Activity },
  { id: 'database', label: 'Data flow', number: '04', icon: Database },
  { id: 'pipeline', label: 'Deployment', number: '05', icon: GitBranch },
];

const nodes = [
  { label: 'USER', detail: 'A person starts an interaction from a page or form.' },
  { label: 'FRONTEND', detail: 'The Next.js interface gathers input and presents the response.' },
  { label: 'API GATEWAY', detail: 'A route handler validates the request before business logic runs.' },
  { label: 'BACKEND', detail: 'Services apply the application rules and coordinate data work.' },
  { label: 'DATABASE', detail: 'MongoDB models persist the application data.' },
];

function PanelIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-5">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <span className="lab-simulation-tag"><span className="lab-status-dot" /> LOCAL SIMULATION</span>
    </div>
  );
}

function ControlButton({ children, onClick, disabled = false, primary = false, label }: { children: ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean; label: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled} className={primary ? 'btn-solid !px-4 !py-2.5 disabled:cursor-not-allowed disabled:opacity-50' : 'btn-outline !px-4 !py-2.5 disabled:cursor-not-allowed disabled:opacity-50'}>
      {children}
    </button>
  );
}

function ArchitectureSimulation() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (step >= nodes.length - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setStep((current) => Math.min(current + 1, nodes.length - 1)), 850);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const start = () => {
    if (step >= nodes.length - 1) setStep(0);
    setPlaying(true);
  };
  const reset = () => { setPlaying(false); setStep(0); setSelected(0); };

  return (
    <>
      <PanelIntro eyebrow="01 / Request path" title="System architecture" description="Follow one request through the layers used by a typical full-stack application. Select a node to inspect its role." />
      <div className="lab-panel-grid">
        <div className="lab-main-card">
          <div className="lab-diagram-scroll" aria-label="Scrollable architecture diagram">
            <div className="lab-architecture-track">
              <svg className="lab-architecture-lines" viewBox="0 0 1000 150" preserveAspectRatio="none" aria-hidden="true">
                <defs><marker id="arch-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" className="lab-arrow" /></marker></defs>
                <path d="M95 72H905" className="lab-flow-base" markerEnd="url(#arch-arrow)" />
              </svg>
              <span className="lab-flow-packet" style={{ left: `${9.5 + (step * 20.25)}%` }} aria-hidden />
              <div className="lab-architecture-nodes">
                {nodes.map((node, index) => (
                  <button key={node.label} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`lab-node ${selected === index ? 'lab-node-selected' : ''} ${step === index && playing ? 'lab-node-live' : ''}`}>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-accent">0{index + 1}</span>
                    <span className="mt-2 block font-display text-xs font-semibold sm:text-sm">{node.label}</span>
                    <span className="mt-2 block font-mono text-[9px] uppercase tracking-widest text-muted">{index === step && playing ? 'ACTIVE' : 'NODE'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ControlButton label={playing ? 'Pause request flow' : 'Start request flow'} onClick={() => playing ? setPlaying(false) : start()} primary>
              {playing ? <><Pause size={14} /> Pause flow</> : <><Play size={14} /> {step === nodes.length - 1 ? 'Replay flow' : 'Start flow'}</>}
            </ControlButton>
            <ControlButton label="Reset request flow" onClick={reset}><RotateCcw size={14} /> Reset</ControlButton>
            <span className="ml-auto font-mono text-[10px] tracking-widest text-muted" aria-live="polite">{playing ? 'REQUEST IN FLIGHT' : step === nodes.length - 1 ? '200 · RESPONSE RETURNED' : 'READY'}</span>
          </div>
        </div>
        <aside className="lab-side-card" aria-live="polite">
          <span className="lab-side-icon"><Layers3 size={17} /></span>
          <p className="eyebrow mt-5">Selected layer</p>
          <h4 className="mt-2 font-display text-xl font-semibold">{nodes[selected].label}</h4>
          <p className="mt-3 text-sm leading-relaxed text-muted">{nodes[selected].detail}</p>
          <p className="mt-7 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-widest text-muted">TeamForge · Next.js · MongoDB</p>
        </aside>
      </div>
      <p className="lab-footnote">Visual flow only. It does not send a request to the live TeamForge service.</p>
    </>
  );
}

const codeSample = [
  'if (profile.skills.length === 0) {',
  '  throw new Error("profile.skills is required");',
  '}',
  '',
  'const match = calculateMatch(profile, team);',
  'return match.score;',
].join('\n');

function CodeSimulation() {
  const [runState, setRunState] = useState<'ready' | 'running' | 'paused' | 'success' | 'error'>('ready');
  const [stage, setStage] = useState(0);
  const [emptySkills, setEmptySkills] = useState(false);
  const result = useMemo(() => calculateDemoMatch(), []);

  useEffect(() => {
    if (runState !== 'running') return;
    const timer = window.setTimeout(() => {
      if (stage >= 2) { setStage(3); setRunState(emptySkills ? 'error' : 'success'); }
      else setStage((current) => current + 1);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [runState, stage, emptySkills]);

  const run = () => {
    setStage(0);
    setRunState('running');
  };
  const reset = () => { setRunState('ready'); setStage(0); };
  const highlighted = codeSample.split(/("[^"\n]*"|\b(?:if|throw|new|const|return)\b|\/\/[^\n]*)/g).map((part, index) => {
    const cls = /^(if|throw|new|const|return)$/.test(part) ? 'text-accent' : part.startsWith('"') ? 'text-cyan-300' : part.startsWith('//') ? 'text-muted' : '';
    return <span key={index} className={cls}>{part}</span>;
  });
  const steps = ['Input check', 'Type check', 'Calculate score', 'Result'];

  return (
    <>
      <PanelIntro eyebrow="02 / Local code preview" title="A real scoring path, shown honestly" description="The snippet is based on TeamForge’s deterministic matching service. This panel runs the example calculation in the browser; it does not start a shell command or backend build." />
      <div className="lab-panel-grid">
        <div className="lab-main-card !p-0 overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
            <span className="flex gap-1.5" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-rose-400/80" /><i className="h-2.5 w-2.5 rounded-full bg-amber-300/80" /><i className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" /></span>
            <span className="font-mono text-xs text-muted">matchingService.ts</span>
            <span className="ml-auto rounded-full border border-line px-2 py-1 font-mono text-[9px] tracking-widest text-muted">LOCAL PREVIEW</span>
          </div>
          <pre className="min-h-[218px] overflow-x-auto px-5 py-5 font-mono text-xs leading-7 sm:text-sm" aria-label="TeamForge matching example code"><code>{highlighted}</code></pre>
          <div className="border-t border-line px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted"><input type="checkbox" checked={emptySkills} onChange={(event) => setEmptySkills(event.target.checked)} disabled={runState === 'running'} className="accent-cyan-400" /> Use empty skills (show validation error)</label>
              <div className="ml-auto flex gap-2">
                <ControlButton label={runState === 'running' ? 'Pause code simulation' : 'Run code simulation'} onClick={() => runState === 'running' ? setRunState('paused') : runState === 'paused' ? setRunState('running') : run()} primary>
                  {runState === 'running' ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {runState === 'paused' ? 'Resume' : 'Run sample'}</>}
                </ControlButton>
                <ControlButton label="Reset code simulation" onClick={reset}><RotateCcw size={14} /></ControlButton>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2" aria-label="Simulation progress">
              {steps.map((stepName, index) => <div key={stepName} className={`lab-progress-step ${stage >= index && runState !== 'ready' ? 'lab-progress-step-done' : ''}`}><span>{String(index + 1).padStart(2, '0')}</span>{stepName}</div>)}
            </div>
          </div>
        </div>
        <aside className="lab-side-card">
          <div className="flex items-center gap-2"><Terminal size={16} className="text-accent" /><p className="eyebrow">Output</p></div>
          <div className="mt-5 min-h-24 rounded-xl border border-line bg-bg/70 p-4 font-mono text-xs leading-6" aria-live="polite">
            <p className="text-muted">{runState === 'ready' ? 'Click “Run sample” to begin.' : runState === 'paused' ? 'Simulation paused. Resume when ready.' : runState === 'running' ? ['Checking input…', 'Simulating compile step…', 'Calculating weighted match…'][Math.min(stage, 2)] : runState === 'error' ? 'Validation error: profile.skills is required.' : 'Preview complete.'}</p>
            {runState === 'success' && <p className="mt-2 text-cyan-300">match.score → {result.score} / 100</p>}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
            {Object.entries(result.breakdown).map(([label, value]) => <div key={label} className="rounded-lg border border-line px-3 py-2"><span className="block font-mono uppercase text-muted">{label}</span><span className="mt-1 block font-display font-semibold">{Math.round(value)}%</span></div>)}
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted">TeamForge · weighted formula · not AI</p>
        </aside>
      </div>
      <p className="lab-footnote">The profile and team inputs are sample data. No command, build, API call, or production service is run.</p>
    </>
  );
}

function AlgorithmSimulation() {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>('bubble');
  const [target, setTarget] = useState(42);
  const [speed, setSpeed] = useState(360);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frames = useMemo(() => buildAlgorithmFrames(algorithm, target), [algorithm, target]);
  const frame = frames[Math.min(frameIndex, frames.length - 1)];

  useEffect(() => {
    if (!playing) return;
    if (frameIndex >= frames.length - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setFrameIndex((current) => Math.min(current + 1, frames.length - 1)), speed);
    return () => window.clearTimeout(timer);
  }, [playing, frameIndex, frames.length, speed]);

  const choose = (next: AlgorithmName) => { setPlaying(false); setAlgorithm(next); setFrameIndex(0); };
  const reset = () => { setPlaying(false); setFrameIndex(0); };
  const run = () => { if (frameIndex >= frames.length - 1) setFrameIndex(0); setPlaying(true); };
  const complexity = algorithm === 'binary' ? 'O(log n)' : 'O(n²)';

  return (
    <>
      <PanelIntro eyebrow="03 / Algorithm visualizer" title="Watch the comparisons do the work" description="Bubble sort, selection sort and binary search generate real steps from a fixed array. Pause, step through each comparison and change the playback speed." />
      <div className="lab-main-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an algorithm">
            {(['bubble', 'selection', 'binary'] as AlgorithmName[]).map((name) => <button key={name} type="button" aria-pressed={algorithm === name} onClick={() => choose(name)} className={`lab-choice ${algorithm === name ? 'lab-choice-active' : ''}`}>{name === 'binary' ? 'Binary search' : `${name[0].toUpperCase()}${name.slice(1)} sort`}</button>)}
          </div>
          {algorithm === 'binary' && <label className="flex items-center gap-2 font-mono text-xs text-muted">Target <input aria-label="Search target" type="number" min="0" max="70" value={target} onChange={(event) => { setPlaying(false); setTarget(Number(event.target.value)); setFrameIndex(0); }} className="w-20 rounded-lg border border-line bg-bg px-3 py-2 text-ink" /></label>}
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-bg/55 p-4 sm:p-6">
          <div className="flex h-44 items-end justify-center gap-2 sm:gap-3" aria-label={`${algorithm} values: ${frame.values.join(', ')}. ${frame.action}`} role="img">
            {frame.values.map((value, index) => {
              const active = frame.active.includes(index);
              const found = frame.foundIndex === index;
              return <div key={`${index}-${value}`} className="flex h-full min-w-0 flex-1 max-w-16 flex-col items-center justify-end gap-2">
                <span className={`font-mono text-[10px] ${active ? 'text-accent' : 'text-muted'}`}>{value}</span>
                <div className={`w-full rounded-t-md border ${found ? 'border-emerald-300 bg-emerald-400/80' : active ? 'border-cyan-300 bg-cyan-400/70' : 'border-accent/50 bg-accent/30'}`} style={{ height: `${Math.max(12, value * 1.75)}px` }} />
                <span className="font-mono text-[9px] text-muted">{index}</span>
              </div>;
            })}
          </div>
        </div>

        <p className="mt-5 min-h-10 rounded-xl border border-line bg-surface/70 px-4 py-3 font-mono text-xs leading-relaxed text-cyan-100" aria-live="polite">{frame.action}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ControlButton label={playing ? 'Pause algorithm' : 'Run algorithm'} onClick={() => playing ? setPlaying(false) : run()} primary>{playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {frameIndex >= frames.length - 1 ? 'Run again' : 'Run'}</>}</ControlButton>
          <ControlButton label="Step forward one operation" onClick={() => { setPlaying(false); setFrameIndex((current) => Math.min(current + 1, frames.length - 1)); }} disabled={frameIndex >= frames.length - 1}><SkipForward size={14} /> Step</ControlButton>
          <ControlButton label="Reset algorithm" onClick={reset}><RotateCcw size={14} /> Reset</ControlButton>
          <label className="ml-auto flex min-w-44 items-center gap-3 font-mono text-[10px] text-muted">SPEED<input aria-label="Algorithm speed" type="range" min="100" max="700" step="50" value={800 - speed} onChange={(event) => setSpeed(800 - Number(event.target.value))} className="w-24 accent-cyan-400" /></label>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-xs">
          <div><span className="block font-mono uppercase tracking-widest text-muted">Comparisons</span><strong className="mt-1 block font-display text-lg">{frame.comparisons}</strong></div>
          <div><span className="block font-mono uppercase tracking-widest text-muted">Swaps</span><strong className="mt-1 block font-display text-lg">{frame.swaps}</strong></div>
          <div><span className="block font-mono uppercase tracking-widest text-muted">Time</span><strong className="mt-1 block font-display text-lg">{complexity}</strong></div>
        </div>
      </div>
      <p className="lab-footnote">Binary search uses sorted input. Sort examples begin with the same unsorted values.</p>
    </>
  );
}

type BuilderRecord = { id: number; name: string; role: string };
const initialRecords: BuilderRecord[] = [
  { id: 1, name: 'Ananya', role: 'Frontend' },
  { id: 2, name: 'Rohan', role: 'Full-stack' },
  { id: 3, name: 'Ishan', role: 'Designer' },
];
const dbOperations = [
  { id: 'create', label: 'CREATE', query: `db.builders.insertOne({ name: 'You', role: 'Builder' })` },
  { id: 'read', label: 'READ', query: 'db.builders.findOne({ id: 2 })' },
  { id: 'update', label: 'UPDATE', query: `db.builders.updateOne({ id: 2 }, { $set: { role: 'Backend' } })` },
  { id: 'delete', label: 'DELETE', query: 'db.builders.deleteOne({ id: 3 })' },
] as const;
type DbOperation = (typeof dbOperations)[number]['id'];

function DatabaseSimulation() {
  const [records, setRecords] = useState<BuilderRecord[]>(initialRecords);
  const [operation, setOperation] = useState<DbOperation>('read');
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [result, setResult] = useState('Choose a CRUD action and send the request.');
  const currentOperation = dbOperations.find((item) => item.id === operation)!;

  useEffect(() => {
    if (!playing) return;
    if (step >= 3) {
      const found = records.find((record) => record.id === 2);
      if (operation === 'create') {
        setRecords((current) => current.some((record) => record.id === 4) ? current : [...current, { id: 4, name: 'You', role: 'Builder' }]);
        setResult('Created one local builder record.');
      } else if (operation === 'read') setResult(found ? `Read ${found.name}: ${found.role}.` : 'Record 2 was not found.');
      else if (operation === 'update') {
        setRecords((current) => current.map((record) => record.id === 2 ? { ...record, role: 'Backend' } : record));
        setResult(found ? `Updated ${found.name} to Backend.` : 'Record 2 was not found.');
      } else {
        setRecords((current) => current.filter((record) => record.id !== 3));
        setResult('Deleted local record 3.');
      }
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setStep((current) => current + 1), 520);
    return () => window.clearTimeout(timer);
  }, [playing, step, operation, records]);

  const reset = () => { setPlaying(false); setStep(0); setRecords(initialRecords); setResult('Local records reset. Choose an operation.'); };
  const begin = () => { setStep(0); setResult('Request sent from the browser.'); setPlaying(true); };
  const pathLabels = ['CLIENT', 'API', 'DATABASE', 'RESPONSE'];

  return (
    <>
      <PanelIntro eyebrow="04 / Database flow" title="A request, a query, a response" description="Run basic CRUD operations against a tiny in-memory collection. The records change locally so the data path is more than a moving diagram." />
      <div className="lab-panel-grid">
        <div className="lab-main-card">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Database operation">
            {dbOperations.map((item) => <button key={item.id} type="button" aria-pressed={operation === item.id} onClick={() => { setPlaying(false); setStep(0); setOperation(item.id); }} className={`lab-choice ${operation === item.id ? 'lab-choice-active' : ''}`}>{item.label}</button>)}
          </div>
          <div className="lab-db-track" aria-hidden><span style={{ width: `${Math.round((step / 3) * 100)}%` }} /></div>
          <div className="relative mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {pathLabels.map((label, index) => <div key={label} className={`lab-flow-node ${step === index && playing ? 'lab-flow-node-active' : ''}`}><span className="font-mono text-[9px] tracking-widest text-accent">0{index + 1}</span><span className="mt-2 block font-display text-xs font-semibold">{label}</span></div>)}
          </div>
          <div className="mt-6 rounded-xl border border-line bg-bg/65 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">MongoDB-style query</p>
            <code className="mt-2 block overflow-x-auto font-mono text-xs leading-relaxed text-cyan-100">{currentOperation.query}</code>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <ControlButton label="Send CRUD request" onClick={begin} disabled={playing} primary><Play size={14} /> Send request</ControlButton>
            <ControlButton label="Reset local records" onClick={reset}><RotateCcw size={14} /> Reset data</ControlButton>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted" aria-live="polite">{playing ? `STAGE 0${step + 1} / 04` : 'IN-MEMORY DEMO'}</span>
          </div>
        </div>
        <aside className="lab-side-card">
          <div className="flex items-center justify-between"><p className="eyebrow">db.builders</p><span className="font-mono text-[10px] text-muted">{records.length} RECORDS</span></div>
          <div className="mt-4 space-y-2" aria-live="polite">
            {records.map((record) => <div key={record.id} className="flex items-center justify-between rounded-lg border border-line bg-bg/50 px-3 py-2 text-xs"><span className="font-mono text-muted">#{record.id}</span><span className="mx-3 flex-1 font-medium">{record.name}</span><span className="text-muted">{record.role}</span></div>)}
            {!records.length && <p className="rounded-lg border border-dashed border-line px-3 py-4 text-xs text-muted">Collection is empty.</p>}
          </div>
          <p className="mt-4 border-t border-line pt-4 font-mono text-xs leading-relaxed text-cyan-100">{result}</p>
        </aside>
      </div>
      <p className="lab-footnote">Local demo data only. No API or database is contacted.</p>
    </>
  );
}

const pipelineStages = [
  { name: 'Code', description: 'A developer changes source files and reviews the local diff.' },
  { name: 'Git push', description: 'A commit is pushed to the project repository.' },
  { name: 'Build', description: 'The project is compiled and optimized for production.' },
  { name: 'Tests', description: 'Automated checks run against the code and build output.' },
  { name: 'Deploy', description: 'A hosting provider publishes the built application.' },
  { name: 'Live app', description: 'The deployed site can be opened by its visitors.' },
];

function PipelineSimulation() {
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (step >= pipelineStages.length - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setStep((current) => current + 1), 700);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const start = () => { if (step >= pipelineStages.length - 1) setStep(-1); setPlaying(true); };
  const reset = () => { setPlaying(false); setStep(-1); };

  return (
    <>
      <PanelIntro eyebrow="05 / Delivery path" title="From a change to a live page" description="Walk through a standard CI/CD path and expand any stage for context. Status changes are deliberately simulated; nothing is pushed or deployed from this page." />
      <div className="lab-main-card">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Sample workflow · no live services</p>
          <span className="font-mono text-[10px] text-cyan-100" aria-live="polite">{step === pipelineStages.length - 1 ? 'SIMULATION COMPLETE' : playing ? 'RUNNING SAMPLE' : 'READY'}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Simulated deployment progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={step < 0 ? 0 : Math.round(((step + 1) / pipelineStages.length) * 100)}>
          <div className="h-full rounded-full bg-accent" style={{ width: `${step < 0 ? 0 : ((step + 1) / pipelineStages.length) * 100}%` }} />
        </div>
        <div className="mt-6 space-y-2">
          {pipelineStages.map((stage, index) => {
            const complete = index <= step;
            return <details key={stage.name} className={`lab-pipeline-stage ${complete ? 'lab-pipeline-complete' : ''}`} open={index === step && playing}>
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded-xl border border-line bg-bg/45 px-4 py-3 transition hover:border-accent/60">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${complete ? 'border-accent bg-accent/15 text-accent' : 'border-line text-muted'}`}>{complete ? <Check size={15} /> : <span className="font-mono text-[10px]">0{index + 1}</span>}</span>
                <span className="flex-1 font-display text-sm font-semibold">{stage.name}</span>
                <span className={`font-mono text-[9px] tracking-widest ${complete ? 'text-cyan-100' : 'text-muted'}`}>{complete ? 'DONE' : 'WAITING'}</span>
                <span className="font-mono text-xs text-muted" aria-hidden>+</span>
              </summary>
              <p className="ml-12 border-l border-accent/30 px-4 py-3 text-xs leading-relaxed text-muted">{stage.description}</p>
            </details>;
          })}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <ControlButton label={playing ? 'Pause pipeline simulation' : 'Run pipeline simulation'} onClick={() => playing ? setPlaying(false) : start()} primary>{playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {step === pipelineStages.length - 1 ? 'Replay path' : 'Run path'}</>}</ControlButton>
          <ControlButton label="Reset pipeline simulation" onClick={reset}><RotateCcw size={14} /> Reset</ControlButton>
        </div>
      </div>
      <p className="lab-footnote">This visual does not trigger GitHub Actions or Vercel deployment.</p>
    </>
  );
}

const panels: Record<LabTool, () => ReactNode> = {
  architecture: ArchitectureSimulation,
  code: CodeSimulation,
  algorithms: AlgorithmSimulation,
  database: DatabaseSimulation,
  pipeline: PipelineSimulation,
};

export default function EngineeringPlayground() {
  const [activeTool, setActiveTool] = useState<LabTool>('architecture');
  const ActivePanel = panels[activeTool];

  return (
    <section id="playground" className="section">
      <SectionTitle eyebrow="04 / Engineering playground" title="Proof you can interact with." subtitle="Five small, working previews. Choose a path, change the inputs and see what the interface does." />
      <Reveal>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="group" aria-label="Choose an engineering simulation">
          {tools.map(({ id, label, number, icon: Icon }) => <button key={id} type="button" aria-pressed={activeTool === id} onClick={() => setActiveTool(id)} className={`lab-tab ${activeTool === id ? 'lab-tab-active' : ''}`}>
            <span className="flex items-center gap-2"><Icon size={15} /><span>{label}</span></span><span className="font-mono text-[9px] tracking-widest text-muted">{number}</span>
          </button>)}
        </div>
        <motion.div key={activeTool} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="lab-workbench mt-5">
          <ActivePanel />
        </motion.div>
        <div className="mt-5 flex items-center gap-2 text-[10px] text-muted"><Sparkles size={13} className="text-accent" /> Reduced-motion preferences are respected; every control also works by keyboard.</div>
      </Reveal>
    </section>
  );
}
