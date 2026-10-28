import { useId } from 'react';

/** Rotating circular "seal". Ring text is decorative; the centre holds the real figure. */
export default function Seal({
  ring,
  tone,
  children,
}: {
  ring: string;
  tone: 'ink' | 'red';
  children: React.ReactNode;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`seal seal--${tone}`} data-seal>
      <svg className="seal__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={`c${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="97" className="seal__outer" />
        <circle cx="100" cy="100" r="62" className="seal__inner" />
        <text className="seal__text">
          <textPath href={`#c${id}`} textLength="486" lengthAdjust="spacing">
            {ring.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <div className="seal__core">{children}</div>
    </div>
  );
}
