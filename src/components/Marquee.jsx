import "./Marquee.css";

/**
 * Continuously scrolling band of capability tags. The list is rendered twice so
 * the animation can loop seamlessly; the duplicate is hidden from screen readers.
 */
export default function Marquee({ items = [] }) {
  if (!items.length) return null;

  const run = (hidden) => (
    <div className="marquee-run" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span className="marquee-item" key={`${item}-${i}`}>
          {item}
          <span className="marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee-inner">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
