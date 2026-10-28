/** Five stars filled to `value` out of 5 (e.g. 4.5 → 90%). Decorative; the number is stated in text. */
export default function StarMeter({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={`stars ${className}`} aria-hidden="true" style={{ '--fill': `${pct}%` } as React.CSSProperties}>
      <span className="stars__base">★★★★★</span>
      <span className="stars__fill">★★★★★</span>
    </span>
  );
}
