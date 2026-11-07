import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { building, type BuildStatus } from '@/lib/data';

const order: BuildStatus[] = ['Active', 'Planned', 'Completed'];
const dot: Record<BuildStatus, string> = { Active: 'bg-accent', Planned: 'bg-accent2', Completed: 'bg-emerald-500' };

export default function Building() {
  return (
    <section id="building" className="section">
      <SectionTitle eyebrow="Now" title="Currently building." subtitle="Active, planned and completed work, kept separate so nothing is overstated." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {order.map((status, i) => (
          <Reveal key={status} delay={i * 0.08}>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"><span className={`h-2 w-2 rounded-full ${dot[status]}`} /> {status}</h3>
            <div className="space-y-4">
              {building.filter((b) => b.status === status).map((b) => (
                <div key={b.title} className="card card-hover">
                  <h4 className="font-display text-lg font-semibold">{b.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
