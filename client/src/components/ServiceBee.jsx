import { useEffect, useRef, useState } from "react";

export default function ServiceBee() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`service-bee${visible ? " is-flying" : ""}`}
      viewBox="0 0 240 100"
      fill="none"
      aria-hidden="true"
    >
      <path className="bee-flight-path" d="M12 72C54 13 89 91 126 47S189 16 228 63" />
      <g className="bee-flight">
        <path className="bee-wing" d="M-4 -3C-9 -13 -1 -17 5 -8C7 -5 6 -2 4 0M4 -3C7 -13 16 -12 14 -5C13 -2 10 0 7 1" />
        <ellipse className="bee-body" cx="3" cy="2" rx="10" ry="6" />
        <path className="bee-stripe" d="M0 -3V7M6 -3V7" />
        <path className="bee-antenna" d="M-1 -4L-4 -9M3 -4L4 -10" />
      </g>
    </svg>
  );
}
