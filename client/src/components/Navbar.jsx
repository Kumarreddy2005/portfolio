import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE_LINKS, MOTION } from "../data/site";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#learning", label: "Learning" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 12);
        setProgress(max > 0 ? Math.round((y / max) * 100) : 0);
        if (Math.abs(y - lastY) > 5) {
          setVisible(reducedMotion || y < 100 || y < lastY || open);
          lastY = y;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [open, reducedMotion]);

  useEffect(() => {
    const sections = LINKS.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const resumeIsReady = !SITE_LINKS.resume.startsWith("TODO_");

  return (
    <>
      <div
        className="scroll-progress"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <motion.header
        initial={reducedMotion ? false : { y: -40, opacity: 0 }}
        animate={{ y: visible || open ? 0 : -110, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease }}
        className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-ink/95" : "bg-transparent"
        }`}
      >
        <div className="section-pad flex items-center justify-between py-5">
          <a href="#home" className="font-display text-xl tracking-wide text-bone">
            KKR<span className="text-gold">.</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href.slice(1) ? "location" : undefined}
                className={`nav-link group relative text-[13px] transition-colors ${
                  active === link.href.slice(1) ? "text-goldSoft" : "text-fog hover:text-bone"
                }`}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-gold"
                    transition={{ duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease }}
                  />
                )}
              </a>
            ))}
          </nav>

          {resumeIsReady ? (
            <a
              href={SITE_LINKS.resume}
              className="button-outline-gold hidden text-xs tracking-wide md:inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              Resume ↗
            </a>
          ) : (
            <span
              className="resume-placeholder hidden text-xs tracking-wide text-fog md:inline-flex"
              title="TODO: Add a resume PDF URL in src/data/site.js"
              aria-label="Resume PDF link not provided yet"
            >
              Resume · TODO
            </span>
          )}

          <button
            className="min-h-11 min-w-11 text-bone lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : MOTION.fast }}
              className="lg:hidden border-t border-line bg-ink/95"
            >
              <div className="section-pad grid grid-cols-2 gap-x-5 gap-y-1 py-4 sm:grid-cols-3">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href.slice(1) ? "location" : undefined}
                    className="min-h-11 py-3 text-sm text-fog hover:text-goldSoft"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
