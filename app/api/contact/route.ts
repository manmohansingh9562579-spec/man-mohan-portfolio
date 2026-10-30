import { NextResponse } from 'next/server';
import { Resend } from 'resend';
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (typeof name !== 'string' || name.trim().length < 2 || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof message !== 'string' || message.trim().length < 10) return NextResponse.json({ error: 'Please provide a valid name, email and message (at least 10 characters).' }, { status: 400 });
    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return NextResponse.json({ error: 'The contact service is not configured yet. Please connect through GitHub or LinkedIn instead.' }, { status: 503 });
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({ from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL, replyTo: email, subject: `Portfolio message from ${name.trim()}`, text: `Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}` });
    if (result.error) return NextResponse.json({ error: 'The email provider could not send your message. Please try again later.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Unable to process your message. Please try again.' }, { status: 500 }); }
}
