'use client';

import { useState, type FormEvent } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import Reveal from './Reveal';
import { site } from '@/lib/site';

const field = 'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || form.message.trim().length < 10) {
      setStatus('Please enter your name, a valid email and a message of at least 10 characters.');
      return;
    }
    setSending(true); setStatus('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: '', email: '', message: '' }); setStatus('Thanks, your message has been sent.'); return; }
      const data = await res.json().catch(() => ({}));
      if (res.status === 503 && site.email) {
        const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus('Your email app is opening with the message prepared.');
      } else {
        setStatus(data.error || 'Unable to send your message. Please try again.');
      }
    } catch {
      setStatus('Network error. Please try again or connect through GitHub or LinkedIn.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section">
      <Reveal>
        <h2 className="section-title">Get in touch</h2>
        <p className="mt-3 max-w-2xl text-muted">Interested in collaborating, discussing technology or building something useful? I&apos;d be glad to connect.</p>
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="space-y-4">
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="card flex items-center gap-4 !p-4"><Linkedin size={20} className="text-accent" /><span className="text-sm font-medium">LinkedIn</span></a>
            <a href={site.github} target="_blank" rel="noreferrer" className="card flex items-center gap-4 !p-4"><Github size={20} className="text-accent" /><span className="text-sm font-medium">GitHub</span></a>
            {site.email && <a href={`mailto:${site.email}`} className="card flex items-center gap-4 !p-4"><Mail size={20} className="text-accent" /><span className="text-sm font-medium">{site.email}</span></a>}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <label className="block text-sm font-medium">Name
              <input className={`${field} mt-2`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
            </label>
            <label className="block text-sm font-medium">Email
              <input type="email" className={`${field} mt-2`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" />
            </label>
            <label className="block text-sm font-medium">Message
              <textarea rows={5} className={`${field} mt-2 resize-y`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it..." />
            </label>
            <button type="submit" disabled={sending} className="btn-solid disabled:opacity-60">{sending ? 'Sending...' : 'Send message'} <Send size={15} /></button>
            {status && <p role="status" className="text-sm text-muted">{status}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
