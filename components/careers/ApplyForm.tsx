'use client';

import { useActionState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { sendApplication, type ApplyState } from '@/app/careers/actions';
import { ArrowRight } from '@/components/icons';

const initial: ApplyState = { status: 'idle', message: '' };
const positions = ['Technician', 'Customer Service', 'Other'];

/** "Apply now" card. Works without JavaScript (server action form post); with JS it submits in place. */
export default function ApplyForm() {
  const [state, action, pending] = useActionState(sendApplication, initial);
  const f = state.fields ?? {};

  if (state.status === 'ok') {
    return (
      <m.div
        className="cform cform--apply cform--done"
        role="status"
        initial={{ opacity: 0, y: 16, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <span className="cform__stamp" aria-hidden="true">Received</span>
        <p className="cform__done-title">Application sent</p>
        <p>{state.message}</p>
      </m.div>
    );
  }

  return (
    <form className="cform cform--apply" action={action} aria-labelledby="apply-title" data-apply>
      <h2 id="apply-title" className="cform__script">
        Apply now
      </h2>

      <label className="cform__field">
        <span className="mono cform__label">
          Name <span aria-hidden="true">*</span>
        </span>
        <input name="name" type="text" autoComplete="name" placeholder="First and last name" required maxLength={120} defaultValue={f.name} />
      </label>

      <div className="cform__row">
        <label className="cform__field">
          <span className="mono cform__label">
            Phone <span aria-hidden="true">*</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(319) 555-0123" required maxLength={40} defaultValue={f.phone} />
        </label>
        <label className="cform__field">
          <span className="mono cform__label">
            Email <span aria-hidden="true">*</span>
          </span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={160} defaultValue={f.email} />
        </label>
      </div>

      <fieldset className="cform__field cform__choices">
        <legend className="mono cform__label">
          Position applied for <span aria-hidden="true">*</span>
        </legend>
        <div className="chips">
          {positions.map((p) => (
            <label key={p} className="chip">
              <input type="radio" name="position" value={p} required defaultChecked={(f.position || 'Technician') === p} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="cform__field">
        <span className="mono cform__label">Experience or a note (optional)</span>
        <textarea name="note" rows={3} placeholder="Certifications, years in the trade, when you could start…" maxLength={4000} defaultValue={f.note} />
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

      <button type="submit" className="btn btn--red" disabled={pending}>
        {pending ? 'Sending…' : 'Submit application'} <ArrowRight />
      </button>
    </form>
  );
}
