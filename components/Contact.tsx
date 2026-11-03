'use client';

import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { site } from '@/lib/site';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const field = 'w-full rounded-xl border bg-surface/80 px-4 py-3 text-sm outline-none transition focus:border-accent';

function validate(f: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'error'; text: string }>({ kind: 'idle', text: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) { setStatus({ kind: 'error', text: 'Please fix the highlighted fields.' }); return; }

    setSending(true); setStatus({ kind: 'idle', text: '' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: '', email: '', message: '', company: '' }); setStatus({ kind: 'ok', text: 'Thanks, your message has been sent.' }); return; }
      const data = await res.json().catch(() => ({}));
      if (res.status === 503) {
        // Email service not configured: fall back to the visitor's own mail app instead of pretending it was sent.
        const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus({ kind: 'ok', text: 'Your email app is opening with the message prepared. It has not been sent yet.' });
      } else {
        setStatus({ kind: 'error', text: data.error || 'Unable to send your message. Please try again.' });
      }
    } catch {
      setStatus({ kind: 'error', text: 'Network error. Please try again or email me directly.' });
    } finally {
      setSending(false);
    }
  };

  const bind = (k: 'name' | 'email' | 'message') => ({
    value: form[k],
    onChange: (ev: { target: { value: string } }) => setForm({ ...form, [k]: ev.target.value }),
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
    className: `${field} mt-2 ${errors[k] ? 'border-red-500' : 'border-line'}`,
  });

  return (
    <section id="contact" className="section">
      <SectionTitle eyebrow="08 / Contact" title="Have an idea? Let's make it real." subtitle="Interested in collaborating, discussing technology or building something useful? I'd be glad to connect." />

      <div className="mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal direction="left">
          <div className="space-y-4">
            <a href={`mailto:${site.email}`} className="card card-hover flex items-center gap-4 !p-4"><Mail size={20} className="text-accent" /><span className="break-all text-sm font-medium">{site.email}</span></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="card card-hover flex items-center gap-4 !p-4"><Linkedin size={20} className="text-accent" /><span className="text-sm font-medium">LinkedIn</span></a>
            <a href={site.github} target="_blank" rel="noreferrer" className="card card-hover flex items-center gap-4 !p-4"><Github size={20} className="text-accent" /><span className="text-sm font-medium">GitHub</span></a>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <form onSubmit={submit} className="space-y-5" noValidate>
            {/* Honeypot field for spam bots. Hidden from people and from assistive technology. */}
            <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>Company<input tabIndex={-1} autoComplete="off" value={form.company} onChange={(ev) => setForm({ ...form, company: ev.target.value })} /></label>
            </div>

            <label className="block text-sm font-medium">Name
              <input {...bind('name')} placeholder="Your name" autoComplete="name" />
              {errors.name && <span id="name-error" className="mt-1 block text-xs font-normal text-red-500">{errors.name}</span>}
            </label>
            <label className="block text-sm font-medium">Email
              <input type="email" {...bind('email')} placeholder="you@example.com" autoComplete="email" />
              {errors.email && <span id="email-error" className="mt-1 block text-xs font-normal text-red-500">{errors.email}</span>}
            </label>
            <label className="block text-sm font-medium">Message
              <textarea rows={5} {...bind('message')} placeholder="Tell me a little about it..." />
              {errors.message && <span id="message-error" className="mt-1 block text-xs font-normal text-red-500">{errors.message}</span>}
            </label>

            <button type="submit" disabled={sending} className="btn-solid disabled:opacity-60">
              {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <Send size={15} /></>}
            </button>
            <p role="status" className={`text-sm ${status.kind === 'error' ? 'text-red-500' : 'text-muted'}`}>{status.text}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
