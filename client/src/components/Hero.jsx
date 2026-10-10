import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ParticleMesh from "./ParticleMesh";
import { MOTION, ROLES } from "../data/site";

const INTRO_KEY = "kkr-portfolio-intro-seen";
const NAME_LINES = ["K Kumar", "Reddy"];

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [intro, setIntro] = useState(() => {
    try {
      return !reducedMotion && !sessionStorage.getItem(INTRO_KEY);
    } catch {
      return false;
    }
  });
  const [role, setRole] = useState(0);
  const [heroInView, setHeroInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const heroRef = useRef(null);
  const primaryRef = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    if (!intro) return undefined;
    try {
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      // The intro still completes when session storage is unavailable.
    }
    const timer = window.setTimeout(() => {
      setIntro(false);
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [intro]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting));
    observer.observe(hero);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || !heroInView || !pageVisible) return undefined;
    const timer = window.setInterval(() => {
      setRole((current) => (current + 1) % ROLES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [heroInView, pageVisible, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const onScroll = () => {
      const delta = Math.min(window.scrollY, window.innerHeight);
      if (Math.abs(delta - lastScroll.current) < 2) return;
      lastScroll.current = delta;
      heroRef.current?.style.setProperty("--hero-scroll", `${delta * 0.08}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const skipIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "true");
    } catch {
      // The control remains functional without session storage.
    }
    setIntro(false);
  };

  const movePrimary = (event) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const bounds = primaryRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    primaryRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const resetPrimary = () => {
    if (primaryRef.current) primaryRef.current.style.transform = "";
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section relative flex min-h-screen items-center section-pad pt-28"
    >
      <ParticleMesh />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-signal" aria-hidden="true">
        <span
          className={`hero-signal-ring${heroInView && pageVisible && !reducedMotion ? " hero-signal-ring--active" : ""}`}
        />
        <span className="hero-signal-core" />
      </div>

      <div className="hero-art-label hero-art-label--prompt" aria-hidden="true">
        <span className="hero-label-dot" />
        PROMPT ENGINEERING
      </div>
      <div className="hero-art-label hero-art-label--fullstack" aria-hidden="true">
        <span className="hero-label-dot" />
        FULL-STACK DEVELOPMENT
      </div>
      <div className="hero-art-label hero-art-label--ai" aria-hidden="true">
        <span className="hero-label-dot" />
        AI APPLICATIONS
      </div>

      {intro && (
        <button type="button" className="intro-skip" onClick={skipIntro}>
          Skip intro
        </button>
      )}

      <motion.div
        initial={intro ? "hidden" : false}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
        }}
        className="hero-copy relative z-10"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: MOTION.normal } },
          }}
          className="eyebrow mb-6"
        >
          BENGALURU, INDIA
        </motion.p>

        <h1
          aria-label="K Kumar Reddy"
          className={`font-display text-[13vw] leading-[0.95] text-bone sm:text-6xl md:text-7xl ${
            intro ? "hero-name hero-name--intro" : ""
          }`}
        >
          {NAME_LINES.map((line, lineIndex) => (
            <span className="hero-name-line" aria-hidden="true" key={line}>
              {Array.from(line).map((character, index) => (
                <motion.span
                  className={lineIndex === 1 ? "text-goldSoft" : ""}
                  key={`${line}-${index}`}
                  initial={intro ? { y: "110%", opacity: 0 } : false}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: intro ? 0.48 : 0,
                    delay: intro ? 0.08 + lineIndex * 0.12 + index * 0.025 : 0,
                    ease: MOTION.ease,
                  }}
                >
                  {character === " " ? "\u00a0" : character}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={intro ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.normal, delay: intro ? 0.42 : 0 }}
          className="mt-7 max-w-xl text-xs font-medium uppercase leading-relaxed tracking-[0.17em] text-goldSoft sm:text-sm"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={role}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : MOTION.fast }}
            >
              {ROLES[role]}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.normal }}
          className="mt-8 max-w-md text-[15px] leading-relaxed text-fog"
        >
          I turn emerging AI capabilities and thoughtful engineering into practical digital
          products—designed to be useful, clear, and ready for real-world workflows.
        </motion.p>

        <motion.div
          initial={intro ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.normal, delay: intro ? 0.68 : 0 }}
          className="hero-actions mt-10 flex flex-wrap gap-4"
        >
          <a
            ref={primaryRef}
            href="#projects"
            onPointerMove={movePrimary}
            onPointerLeave={resetPrimary}
            className="button-primary magnetic-button"
          >
            View My Work <ArrowUpRight size={16} />
          </a>
          <a href="#contact" className="button-secondary">
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-coordinate hero-coordinate--top" aria-hidden="true">
        12°58&apos; N&nbsp;&nbsp; 77°35&apos; E <span> / &nbsp;BENGALURU</span>
      </div>
      <div className="hero-coordinate hero-coordinate--side" aria-hidden="true">
        DIGITAL SYSTEMS&nbsp; / &nbsp;01
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: intro ? 1.4 : 0.5, duration: MOTION.reveal }}
        className="hero-scroll relative z-10 flex items-center justify-center gap-3"
      >
        <div className="text-gold">
          <ArrowDown size={16} />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-fog">SCROLL TO EXPLORE</span>
      </motion.div>
    </section>
  );
}
