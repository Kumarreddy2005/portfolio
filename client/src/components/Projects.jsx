import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import PyramidArchitecture from "./PyramidArchitecture";
import Reveal from "./Reveal";

const STACK_CGIS = ["React + TypeScript", "Express + TypeScript", "FastAPI", "MongoDB", "Socket.IO"];

const OTHER_PROJECTS = [
  {
    tag: "02",
    title: "Task Manager",
    stack: "MERN Stack / Tailwind CSS",
    desc: "A full-stack task management application with authentication, CRUD operations, task filtering and interactive workflows.",
  },
  {
    tag: "03",
    title: "E-Commerce",
    stack: "MERN Stack / Postman / VS Code",
    desc: "A full-stack e-commerce platform with product browsing, search, cart and checkout workflows.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="content-section section-pad">
      <Reveal>
        <p className="eyebrow mb-6">SELECTED SYSTEMS</p>
        <h2 className="section-title">
          Three systems.
          <br />
          One approach: build useful software.
        </h2>
      </Reveal>

      {/* Featured project */}
      <Reveal delay={0.1} className="project-featured surface-card mt-12 p-6 sm:p-8 md:mt-14 md:p-12">
        <div className="project-featured-grid">
          <div className="project-featured-copy">
            <p className="eyebrow mb-3">FEATURED PROJECT</p>
            <h3 className="font-display text-2xl text-goldSoft sm:text-3xl">CGIS</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-fog">
              Citizen Grievance Intelligence System
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog">
              An end-to-end civic grievance platform with OCR, NLP, priority
              detection, department routing and real-time resolution tracking.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {STACK_CGIS.map((s) => (
                <span key={s} className="outline-chip px-3 py-1 text-xs text-fog">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="button-primary">
                View Case Study <ArrowUpRight size={15} />
              </a>
              <a href="#contact" className="button-secondary">
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
          <PyramidArchitecture />
        </div>
      </Reveal>

      {/* Other projects */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {OTHER_PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={0.1 * i}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="surface-card h-full p-6 sm:p-7"
            >
              <p className="eyebrow mb-2">{p.tag}</p>
              <h3 className="font-display text-xl text-bone">{p.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-fog">{p.stack}</p>
              <p className="mt-4 text-sm leading-relaxed text-fog">{p.desc}</p>
              <a href="#contact" className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-goldSoft transition-colors hover:text-bone">
                View Project <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
