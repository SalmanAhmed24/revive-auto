'use server';

import { deliver, NotConfiguredError } from '@/lib/mail';
import { business } from '@/lib/site';

/**
 * Careers "Apply now" form → emails the application to Andy.
 * Recipient: CAREERS_TO_EMAIL (default andy@reviveautocareia.com).
 * Delivery: RESEND_API_KEY (see lib/mail.ts), or CAREERS_WEBHOOK_URL for a webhook instead.
 */
const TO = process.env.CAREERS_TO_EMAIL || 'andy@reviveautocareia.com';
const POSITIONS = ['Technician', 'Customer Service', 'Other'] as const;

export type ApplyState = { status: 'idle' | 'ok' | 'error'; message: string; fields?: Record<string, string> };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').trim().slice(0, max);

export async function sendApplication(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  // Honeypot: real people never fill this hidden field.
  if (clean(form.get('company'), 200)) return { status: 'ok', message: 'Thanks — your application is in.' };

  const name = clean(form.get('name'), 120);
  const phone = clean(form.get('phone'), 40);
  const email = clean(form.get('email'), 160);
  const position = clean(form.get('position'), 40);
  const note = clean(form.get('note'), 4000);
  const fields = { name, phone, email, position, note };

  if (!name || !phone || !email || !position) {
    return { status: 'error', message: 'Please fill in your name, phone, email and the position you’re applying for.', fields };
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return { status: 'error', message: 'Please enter a phone number with area code.', fields };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.', fields };
  }
  if (!(POSITIONS as readonly string[]).includes(position)) {
    return { status: 'error', message: 'Please choose the position you’re applying for.', fields };
  }

  const sentAt = new Date();
  const text = [
    `New job application from the ${business.name} website`,
    '',
    `Position: ${position}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    '',
    'Experience / note:',
    note || '(none)',
    '',
    `Sent ${sentAt.toLocaleString('en-US', { timeZone: 'America/Chicago' })} (Central) from /careers`,
    'Reply to this email to answer the applicant directly.',
  ].join('\n');

  try {
    await deliver({
      to: TO,
      subject: `Job application: ${position} — ${name}`,
      text,
      replyTo: email,
      webhookUrl: process.env.CAREERS_WEBHOOK_URL,
      payload: { type: 'job-application', name, phone, email, position, note, page: '/careers', sentAt: sentAt.toISOString() },
    });
  } catch (err) {
    console.error('[careers] delivery failed', err);
    const notSetUp = err instanceof NotConfiguredError;
    return {
      status: 'error',
      message: notSetUp
        ? `Online applications aren’t switched on yet. Please call ${business.phoneDisplay} during shop hours — we’d love to hear from you.`
        : `Sorry — your application didn’t go through. Please try again, or call ${business.phoneDisplay} during shop hours.`,
      fields,
    };
  }

  return {
    status: 'ok',
    message: 'Thanks for applying to Revive Auto Care. The team will be in touch by phone or email.',
  };
}
