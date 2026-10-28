'use client';

import { useEffect, useState } from 'react';

/** Live open/closed pill computed in shop time (America/Chicago). Renders nothing server-side. */
export default function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Chicago',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
      const day = get('weekday');
      const mins = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
      setOpen(['Mon', 'Tue', 'Wed', 'Thu'].includes(day) && mins >= 450 && mins < 1050);
    };
    compute();
    const t = window.setInterval(compute, 60_000);
    return () => window.clearInterval(t);
  }, []);

  if (open === null) return <span className="status status--idle" aria-hidden="true" />;
  return (
    <span className={`status ${open ? 'status--open' : 'status--closed'}`}>
      <span className="status__dot" aria-hidden="true" />
      {open ? 'Open now' : 'Closed now'}
    </span>
  );
}
