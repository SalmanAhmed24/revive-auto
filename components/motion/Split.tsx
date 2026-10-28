import { Fragment } from 'react';

/**
 * Server-side word split: each word sits in a mask so GSAP can slide it up.
 * Spaces live outside the inline-block masks so they never collapse.
 */
export default function Split({ children }: { children: string }) {
  const words = children.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className="w__i">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
