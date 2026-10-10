import { useEffect, useRef, useState } from "react";

export default function PyramidArchitecture() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-architecture${visible ? " is-open" : ""}`}
      aria-hidden="true"
    >
      <div className="project-architecture-meta">
        <span>SYSTEM ARCHITECTURE</span>
        <span>01 / 03</span>
      </div>
      <svg viewBox="0 0 480 360" className="project-architecture-svg" fill="none">
        <path className="architecture-orbit" d="M38 183H442M240 27V331" />
        <path className="architecture-orbit architecture-orbit--diagonal" d="M96 49L384 311M384 49L96 311" />
        <g className="architecture-pyramid">
          <path className="pyramid-outline" d="M240 66L108 274H372L240 66Z" />
          <path className="pyramid-face pyramid-face--left" d="M240 66L108 274H240V66Z" />
          <path className="pyramid-face pyramid-face--right" d="M240 66L372 274H240V66Z" />
          <path className="pyramid-face pyramid-face--base" d="M108 274H372L240 324L108 274Z" />
          <path className="pyramid-inner" d="M240 105L143 255H337L240 105Z" />
          <circle className="architecture-node architecture-node--top" cx="240" cy="66" r="4" />
          <circle className="architecture-node" cx="108" cy="274" r="4" />
          <circle className="architecture-node" cx="372" cy="274" r="4" />
          <circle className="architecture-node" cx="240" cy="324" r="3" />
        </g>
        <g className="architecture-system">
          <path pathLength="1" className="system-path" d="M240 105V164M143 255L190 221M337 255L290 221M190 221H290V279H190V221Z" />
          <path pathLength="1" className="system-path system-path--branch" d="M190 249H149V293H105M290 249H331V293H375M240 279V319" />
          <circle className="architecture-node architecture-node--core" cx="240" cy="164" r="7" />
          <circle className="architecture-node architecture-node--core" cx="190" cy="221" r="4" />
          <circle className="architecture-node architecture-node--core" cx="290" cy="221" r="4" />
          <circle className="architecture-node architecture-node--output" cx="105" cy="293" r="4" />
          <circle className="architecture-node architecture-node--output" cx="375" cy="293" r="4" />
          <circle className="architecture-node architecture-node--output" cx="240" cy="319" r="4" />
        </g>
      </svg>
      <div className="project-architecture-labels">
        <span>IDEA</span>
        <span>INTELLIGENCE</span>
        <span>USEFUL SYSTEMS</span>
      </div>
    </div>
  );
}
