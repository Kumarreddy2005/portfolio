import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { MOTION } from "../data/site";

const GROUPS = [
  {
    label: "Full-Stack Development",
    items: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Applied AI",
    items: ["OCR & NLP pipelines", "Priority detection", "Prompt-assisted workflows"],
  },
  {
    label: "Data & BI",
    items: ["MongoDB", "MySQL", "Data analytics", "Dashboards"],
  },
  {
    label: "Tools & Platforms",
    items: ["Git & GitHub", "Postman", "VS Code", "Socket.IO"],
  },
  {
    label: "Languages",
    items: ["JavaScript / TypeScript", "Java", "Python", "SQL"],
  },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="content-section section-pad">
      <Reveal variant="mask">
        <p className="eyebrow mb-6">CAPABILITIES</p>
        <h2 className="section-title">What I Work With</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-4">
        {GROUPS.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`relative pb-2 text-sm transition-colors ${
              active === i ? "text-goldSoft" : "text-fog hover:text-bone"
            }`}
          >
            {g.label}
            {active === i && (
              <motion.span layoutId="tab-underline" className="absolute -bottom-[17px] left-0 right-0 h-px bg-gold" />
            )}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            exit={{ opacity: 0, y: -12 }}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease, staggerChildren: 0.045 },
              },
            }}
            transition={{ duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          >
            {GROUPS[active].items.map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease } },
                }}
                whileHover={reducedMotion ? undefined : { y: -2 }}
                transition={{ duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease }}
                className="skill-card surface-card px-4 py-4 text-sm text-bone"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
