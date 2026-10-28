'use server';

/**
 * Contact form delivery (server-only; no secrets reach the browser).
 * Configure ONE of these in the host's environment:
 *   CONTACT_WEBHOOK_URL            → POSTs JSON { name, contact, message, page, sentAt } (Zapier, Make, Formspree, Slack…)
 *   RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL) → sends an email via Resend
 * If neither is set, the visitor is asked to call instead — the phone number is always shown.
 */

export type ContactState = { status: 'idle' | 'ok' | 'error'; message: string; fields?: Record<string, string> };

const clean = (v: FormDataEntryValue | null, max: number) => String(v ?? '').trim().slice(0, max);

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (clean(form.get('company'), 200)) return { status: 'ok', message: 'Thanks — your message is on its way.' };

  const name = clean(form.get('name'), 120);
  const contact = clean(form.get('contact'), 160);
  const message = clean(form.get('message'), 4000);
  const fields = { name, contact, message };

  if (!name || !contact || !message) {
    return { status: 'error', message: 'Please fill in your name, a phone or email, and a short message.', fields };
  }
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = contact.replace(/\D/g, '').length >= 10;
  if (!isEmail && !isPhone) {
    return { status: 'error', message: 'Please enter a phone number or email address we can reply to.', fields };
  }

  const payload = { name, contact, message, page: '/contact-us', sentAt: new Date().toISOString() };

  try {
    if (process.env.CONTACT_WEBHOOK_URL) {
      const r = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store',
      });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
    } else if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? 'Website <onboarding@resend.dev>',
          to: process.env.CONTACT_TO_EMAIL,
          ...(isEmail ? { reply_to: contact } : {}),
          subject: `Website message from ${name}`,
          text: `Name: ${name}\nPhone or email: ${contact}\n\n${message}`,
        }),
        cache: 'no-store',
      });
      if (!r.ok) throw new Error(`Resend ${r.status}`);
    } else {
      return {
        status: 'error',
        message: 'Online messages aren’t switched on yet. Please call (319) 261-0999 — we’ll be glad to help.',
        fields,
      };
    }
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return {
      status: 'error',
      message: 'Sorry — your message didn’t go through. Please call (319) 261-0999 and we’ll help right away.',
      fields,
    };
  }

  return { status: 'ok', message: 'Thanks — your message is on its way. The team will reply during shop hours.' };
}
