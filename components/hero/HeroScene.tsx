/** Static hero illustration; the gentle loop is applied in CSS to match the reference's animated artwork. */
export default function HeroScene() {
  return (
    <div className="hero-network-fallback" aria-hidden>
      <svg viewBox="0 0 520 420" className="h-full w-full" fill="none">
        <path d="M75 110 180 60 280 120 415 80 455 215 350 300 240 235 125 320 75 110M180 60 240 235M280 120 350 300M75 110 240 235M415 80 240 235" className="hero-fallback-line" />
        {[[75,110],[180,60],[280,120],[415,80],[455,215],[350,300],[240,235],[125,320]].map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r={index === 6 ? 8 : 5} className={index === 6 ? 'hero-fallback-node hero-fallback-node-core' : 'hero-fallback-node'} />
        ))}
      </svg>
      <span className="hero-fallback-label">CONNECTED SYSTEMS / 08 NODES</span>
    </div>
  );
}
