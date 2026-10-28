/** Big statement whose words light up as it scrolls through the viewport (GSAP `signs` key). Text stays plain for crawlers. */
export default function ScrubStatement({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <p className={`scrub ${className}`} data-scrub>
      {words.map((w, i) => (
        <span key={i}>
          <span className="scrub__w">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
