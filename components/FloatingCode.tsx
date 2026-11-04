// Decorative code symbols drifting upward behind the hero. Pure CSS, hidden from assistive tech.
const bits = [
  ['{ }', 8, 18, 0], ['</>', 22, 26, 3], ['=>', 38, 20, 6], ['[ ]', 52, 30, 1.5], ['&&', 66, 22, 4.5],
  ['git', 15, 34, 5], ['npm', 45, 36, 8], ['async', 72, 38, 9.5],
] as const;

export default function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {bits.map(([s, left, dur, delay], i) => (
        <span key={i} className="code-float" style={{ left: `${left}%`, animationDuration: `${dur}s`, animationDelay: `-${delay}s` }}>{s}</span>
      ))}
    </div>
  );
}
