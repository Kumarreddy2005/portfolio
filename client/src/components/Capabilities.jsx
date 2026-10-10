import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

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

  return (
    <section id="skills" className="content-section section-pad">
      <Reveal>
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
          >
            {GROUPS[active].items.map((item) => (
              <div
                key={item}
                className="skill-card surface-card px-4 py-4 text-sm text-bone"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
