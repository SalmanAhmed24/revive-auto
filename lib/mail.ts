// Server-only: imported solely from server actions ('use server'), so it never reaches the browser.
/**
 * Server-side delivery for website forms (no secrets reach the browser).
 *
 * Sends through Resend (https://resend.com) when RESEND_API_KEY is set:
 *   - From address: CONTACT_FROM_EMAIL, e.g. "Revive Auto Care <website@reviveautocareia.com>"
 *     (needs the domain verified in Resend). Without it, Resend's test sender is used,
 *     which can only deliver to the email address that owns the Resend account.
 * Or POSTs JSON to a webhook (Zapier, Make, Formspree…) when one is given.
 */
export type Delivery = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  /** Sent as-is to a webhook */
  payload: Record<string, unknown>;
  webhookUrl?: string;
};

export class NotConfiguredError extends Error {}

export async function deliver(d: Delivery) {
  if (d.webhookUrl) {
    const r = await fetch(d.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...d.payload, to: d.to, subject: d.subject }),
      cache: 'no-store',
    });
    if (!r.ok) throw new Error(`Webhook ${r.status}`);
    return;
  }
  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Revive Auto Care website <onboarding@resend.dev>',
        to: d.to,
        ...(d.replyTo ? { reply_to: d.replyTo } : {}),
        subject: d.subject,
        text: d.text,
      }),
      cache: 'no-store',
    });
    if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text().catch(() => '')}`);
    return;
  }
  throw new NotConfiguredError('No email delivery configured');
}
