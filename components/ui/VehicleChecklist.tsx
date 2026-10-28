import { business } from '@/lib/site';

/** Serviced vehicle types plus the struck-through European-makes line. */
export default function VehicleChecklist({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <ul className={`checklist${dark ? ' checklist--dark' : ''} ${className}`} aria-label="Vehicles we work on" data-checklist>
      {business.vehicles.serviced.map((v) => (
        <li key={v} className="checklist__item">
          <span className="checkbox" aria-hidden="true">
            <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" /></svg>
          </span>
          {v}
        </li>
      ))}
      <li className="checklist__item checklist__item--no">
        <span className="checkbox checkbox--x" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </span>
        <s>{business.vehicles.notServiced}</s>
        <span className="sr-only"> — not serviced</span>
      </li>
    </ul>
  );
}
