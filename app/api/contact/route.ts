import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Best-effort rate limit per server instance (5 messages per IP per 10 minutes).
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.reset < now) { hits.set(ip, { count: 1, reset: now + WINDOW }); return false; }
  rec.count += 1;
  return rec.count > LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (limited(ip)) return NextResponse.json({ error: 'Too many messages. Please try again in a few minutes.' }, { status: 429 });

    const body = await request.json();
    const { name, email, message, company } = body ?? {};

    // Honeypot: real visitors never see or fill this field. Bots do. Reply "ok" without sending anything.
    if (typeof company === 'string' && company.trim() !== '') return NextResponse.json({ ok: true });

    if (
      typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 ||
      typeof message !== 'string' || message.trim().length < 10 || message.length > 5000
    ) {
      return NextResponse.json({ error: 'Please provide a valid name, email and message (at least 10 characters).' }, { status: 400 });
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      return NextResponse.json({ error: 'The contact service is not configured yet. Please email me directly or connect through GitHub or LinkedIn.' }, { status: 503 });
    }

    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio message from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`,
    });
    if (result.error) return NextResponse.json({ error: 'The email provider could not send your message. Please try again later.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to process your message. Please try again.' }, { status: 500 });
  }
}
