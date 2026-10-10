import { useEffect, useRef } from "react";

export default function PhilosophyArtwork() {
  const artworkRef = useRef(null);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let pageVisible = !document.hidden;
    let listeningForPointer = false;
    let width = 0;
    let height = 0;

    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse" || !width || !height) return;
      const x = event.offsetX / width - 0.5;
      const y = event.offsetY / height - 0.5;
      artwork.style.setProperty("--art-pointer-x", `${(x * 7).toFixed(1)}px`);
      artwork.style.setProperty("--art-pointer-y", `${(y * 7).toFixed(1)}px`);
    };

    const onPointerLeave = () => {
      artwork.style.setProperty("--art-pointer-x", "0px");
      artwork.style.setProperty("--art-pointer-y", "0px");
    };

    const syncArtwork = () => {
      const active = inView && pageVisible && !reducedMotion.matches;
      artwork.classList.toggle("is-visible", active);
      if (active && !listeningForPointer) {
        artwork.addEventListener("pointermove", onPointerMove, { passive: true });
        artwork.addEventListener("pointerleave", onPointerLeave, { passive: true });
        listeningForPointer = true;
      } else if (!active && listeningForPointer) {
        artwork.removeEventListener("pointermove", onPointerMove);
        artwork.removeEventListener("pointerleave", onPointerLeave);
        listeningForPointer = false;
        onPointerLeave();
      }
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncArtwork();
    });
    const resizeObserver = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    });
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      syncArtwork();
    };

    intersectionObserver.observe(artwork);
    resizeObserver.observe(artwork);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", syncArtwork);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", syncArtwork);
      artwork.removeEventListener("pointermove", onPointerMove);
      artwork.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={artworkRef} className="philosophy-art" aria-hidden="true">
      <svg
        className="philosophy-art-svg"
        viewBox="0 0 900 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="philosophy-flow" x1="18" y1="210" x2="866" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C9A36A" stopOpacity="0.08" />
            <stop offset="0.37" stopColor="#E7CFA0" stopOpacity="0.65" />
            <stop offset="0.7" stopColor="#C9A36A" stopOpacity="0.8" />
            <stop offset="1" stopColor="#C9A36A" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        <g className="philosophy-art-pointer">
          <path
            className="philosophy-art-line philosophy-art-contour"
            d="M20 150C93 103 130 271 218 235C267 215 289 210 335 210"
          />
          <path
            className="philosophy-art-line philosophy-art-contour philosophy-art-contour--second"
            d="M20 210C92 210 124 185 185 199C245 212 283 210 335 210"
          />
          <path
            className="philosophy-art-line philosophy-art-contour philosophy-art-contour--third"
            d="M20 270C98 315 137 143 222 187C270 212 291 210 335 210"
          />
          <path className="philosophy-art-line philosophy-art-trace" d="M25 112H150" />
          <path className="philosophy-art-line philosophy-art-trace" d="M29 307H168" />

          <path className="philosophy-art-line philosophy-art-structure" d="M335 210H410V120H518V300H410V210" />
          <path className="philosophy-art-line philosophy-art-structure philosophy-art-structure--second" d="M518 120H610V164H714V256H610V300" />
          <path className="philosophy-art-line philosophy-art-structure philosophy-art-structure--third" d="M410 120L448 82H554L610 120" />
          <path className="philosophy-art-line philosophy-art-structure philosophy-art-structure--third" d="M410 300L448 338H554L610 300" />
          <path className="philosophy-art-line philosophy-art-route" d="M610 164H748M610 210H820M610 256H770" />

          <circle className="philosophy-art-node philosophy-art-node--source" cx="335" cy="210" r="5" />
          <circle className="philosophy-art-node" cx="410" cy="120" r="3" />
          <circle className="philosophy-art-node" cx="410" cy="300" r="3" />
          <circle className="philosophy-art-node" cx="518" cy="120" r="4" />
          <circle className="philosophy-art-node" cx="518" cy="300" r="4" />
          <circle className="philosophy-art-node" cx="610" cy="164" r="3" />
          <circle className="philosophy-art-node" cx="610" cy="256" r="3" />
          <circle className="philosophy-art-node philosophy-art-node--output" cx="748" cy="164" r="4" />
          <circle className="philosophy-art-node philosophy-art-node--output" cx="820" cy="210" r="4" />
          <circle className="philosophy-art-node philosophy-art-node--output" cx="770" cy="256" r="4" />

          <path className="philosophy-art-line philosophy-art-dash" d="M335 210H410" />
          <path className="philosophy-art-line philosophy-art-dash philosophy-art-dash--second" d="M518 210H610" />
          <path className="philosophy-art-line philosophy-art-dash philosophy-art-dash--third" d="M714 164H748M714 210H820M714 256H770" />
        </g>

        <g className="philosophy-art-labels">
          <text x="24" y="76">IDEAS</text>
          <text x="280" y="76">CLARITY</text>
          <text x="502" y="76">SYSTEMS</text>
          <text x="744" y="76">IMPACT</text>
          <path d="M24 89H106M280 89H370M502 89H584M744 89H832" />
        </g>
      </svg>

      <span className="philosophy-art-caption">FROM THOUGHT TO FORM&nbsp; / &nbsp;01</span>
    </div>
  );
}
