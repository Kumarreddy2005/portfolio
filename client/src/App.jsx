import { useEffect, useRef } from "react";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Capabilities from "./components/Capabilities";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Learning from "./components/Learning";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function SignatureCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    let frame = 0;
    let x = -20;
    let y = -20;
    const cursor = cursorRef.current;
    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        cursor?.style.setProperty("--cursor-x", `${x}px`);
        cursor?.style.setProperty("--cursor-y", `${y}px`);
      });
    };
    const onOver = (event) => {
      if (event.target.closest("a, button, [role='button']")) cursor?.classList.add("is-hovering");
    };
    const onOut = (event) => {
      const current = event.target.closest("a, button, [role='button']");
      const next = event.relatedTarget?.closest?.("a, button, [role='button']");
      if (current && current !== next) cursor?.classList.remove("is-hovering");
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={cursorRef} className="signature-cursor" aria-hidden="true" />;
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SignatureCursor />
      <Backdrop />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Capabilities />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
