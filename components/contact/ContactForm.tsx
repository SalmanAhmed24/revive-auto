'use client';

import { useActionState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { sendContact, type ContactState } from '@/app/contact-us/actions';
import { ArrowRight } from '@/components/icons';

const initial: ContactState = { status: 'idle', message: '' };

/** Works without JavaScript (server action form post); with JS it submits in place. */
export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const f = state.fields ?? {};

  if (state.status === 'ok') {
    return (
      <m.div
        className="cform cform--done"
        role="status"
        initial={{ opacity: 0, y: 16, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <span className="cform__stamp" aria-hidden="true">Received</span>
        <p className="cform__done-title">Message sent</p>
        <p>{state.message}</p>
      </m.div>
    );
  }

  return (
    <form className="cform" action={action} noValidate={false} data-reveal>
      <div className="cform__row">
        <label className="cform__field">
          <span className="mono cform__label">Name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Your name" required maxLength={120} defaultValue={f.name} />
        </label>
        <label className="cform__field">
          <span className="mono cform__label">Phone or email</span>
          <input name="contact" type="text" autoComplete="email" inputMode="email" placeholder="How should we reach you?" required maxLength={160} defaultValue={f.contact} />
        </label>
      </div>
      <label className="cform__field">
        <span className="mono cform__label">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Describe what your vehicle is doing — the team can point you in the right direction."
          required
          maxLength={4000}
          defaultValue={f.message}
        />
      </label>
      {/* Honeypot — hidden from people and assistive tech */}
      <div className="cform__hp" aria-hidden="true">
        <label>
          Company <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <AnimatePresence>
        {state.status === 'error' && (
          <m.p
            key={state.message}
            className="cform__error"
            role="alert"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {state.message}
          </m.p>
        )}
      </AnimatePresence>

      <div className="cform__foot">
        <p className="cform__privacy">We use your details only to reply to this message.</p>
        <button type="submit" className="btn btn--red" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'} <ArrowRight />
        </button>
      </div>
    </form>
  );
}
