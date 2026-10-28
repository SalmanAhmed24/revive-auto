type P = { className?: string };
const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, focusable: false as const };

export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={`icon icon-arrow ${className ?? ''}`}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const Phone = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
export const Calendar = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
export const Chevron = ({ className }: P) => (
  <svg {...base} width={12} height={12} className={`icon ${className ?? ''}`}><path d="M6 9l6 6 6-6" /></svg>
);
export const MapPin = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const Clock = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const MessageIcon = ({ className }: P) => (
  <svg {...base} className={`icon ${className ?? ''}`}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
);
