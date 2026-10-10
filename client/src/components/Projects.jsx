import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { CASE_STUDY, MOTION, SITE_LINKS } from "../data/site";
import PyramidArchitecture from "./PyramidArchitecture";
import Reveal from "./Reveal";

const STACK_CGIS = ["React + TypeScript", "Express + TypeScript", "FastAPI", "MongoDB", "Socket.IO"];
const OTHER_PROJECTS = [
  {
    tag: "02",
    key: "taskManager",
    title: "SYNAPSE - AI Powered Collaborative Work OS",
    stack: "MERN Stack / Tailwind CSS",
    desc: "A full-stack task management application with authentication, CRUD operations, task filtering and interactive workflows.",
  },
  {
    tag: "03",
    key: "ecommerce",
    title: "CartIQ-Smarter Filters, Sharper Shopping",
    stack: "MERN Stack / Postman / VS Code",
    desc: "A full-stack e-commerce platform with product browsing, search, cart and checkout workflows.",
  },
];

function ProjectPlaceholder({ label, variant, source }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = source && !source.startsWith("TODO_") && !imageFailed;

  return (
    <div
      className={`project-preview project-preview--${variant}`}
      role="img"
      aria-label={`${label} project visual${hasImage ? "" : " placeholder"}`}
    >
      {hasImage ? (
        <img
          src={source}
          alt={`${label} project preview`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <span className="project-preview-label">PROJECT VISUAL / TODO</span>
          <div className="project-preview-art" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="project-preview-title">{label}</span>
          <span className="project-preview-note">Replace with an approved project screenshot or video</span>
        </>
      )}
    </div>
  );
}

function CaseStudyDialog({ onClose }) {
  const closeButton = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        document.querySelectorAll(".case-study-dialog button, .case-study-dialog a[href]"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="case-study-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : MOTION.normal }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cgis-case-study-title"
        className="case-study-dialog"
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: reducedMotion ? 0 : MOTION.normal, ease: MOTION.ease }}
      >
        <div className="case-study-header">
          <div>
            <p className="eyebrow">CASE STUDY / 01</p>
            <h2 id="cgis-case-study-title" className="font-display text-3xl text-goldSoft">
              Citizen Grievance Intelligence System
            </h2>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="icon-button"
            aria-label="Close case study"
          >
            <X size={20} />
          </button>
        </div>

        <div className="case-study-grid">
          <div className="case-study-copy">
            <div>
              <h3>Problem</h3>
              <p>{CASE_STUDY.problem}</p>
            </div>
            <div>
              <h3>Approach</h3>
              <p>{CASE_STUDY.approach}</p>
            </div>
            <div>
              <h3>Architecture</h3>
              <ol className="case-study-steps">
                {CASE_STUDY.architecture.map((step, index) => (
                  <li key={step}>
                    <span>0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3>Outcome</h3>
              <p>{CASE_STUDY.outcome}</p>
            </div>
          </div>
          <div className="case-study-architecture">
            <PyramidArchitecture />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
          {STACK_CGIS.map((item) => (
            <span className="outline-chip px-3 py-1 text-xs text-fog" key={item}>
              {item}
            </span>
          ))}
        </div>
        <a
          href={SITE_LINKS.projects.cgis}
          target="_blank"
          rel="noreferrer"
          className="button-primary mt-7 w-fit"
        >
          Open CGIS repository <Github size={15} />
        </a>
      </motion.section>
    </motion.div>
  );
}

export default function Projects() {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const closeCaseStudy = useCallback(() => setCaseStudyOpen(false), []);

  const trackProjectCard = (event) => {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--spotlight-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--tilt-x", `${(x - 0.5) * 2.5}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(0.5 - y) * 2.5}deg`);
  };

  const resetProjectCard = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section id="projects" className="content-section section-pad">
      <Reveal variant="mask">
        <p className="eyebrow mb-6">SELECTED SYSTEMS</p>
        <h2 className="section-title">
          Three systems.
          <br />
          One approach: build useful software.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="project-featured surface-card mt-12 p-6 sm:p-8 md:mt-14 md:p-12">
        <div className="project-featured-grid">
          <div className="project-featured-copy">
            <p className="eyebrow mb-3">FEATURED PROJECT</p>
            <h3 className="font-display text-2xl text-goldSoft sm:text-3xl">CGIS</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-fog">
              Citizen Grievance Intelligence System
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog">
              An end-to-end civic grievance platform with OCR, NLP, priority detection, department
              routing and real-time resolution tracking.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {STACK_CGIS.map((item) => (
                <span key={item} className="outline-chip px-3 py-1 text-xs text-fog">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" className="button-primary" onClick={() => setCaseStudyOpen(true)}>
                View Case Study <ArrowUpRight size={15} />
              </button>
              <a
                href={SITE_LINKS.projects.cgis}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
          <div className="project-featured-visual">
            <ProjectPlaceholder
              label="CGIS"
              variant="cgis"
              source={SITE_LINKS.previews.cgis}
            />
            <PyramidArchitecture />
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {OTHER_PROJECTS.map((project, index) => {
          const url = SITE_LINKS.projects[project.key];
          const hasLink = !url.startsWith("TODO_");
          return (
            <Reveal key={project.title} delay={0.1 * index}>
              <motion.article
                onPointerMove={trackProjectCard}
                onPointerLeave={resetProjectCard}
                className="project-card surface-card h-full p-6 sm:p-7"
              >
                <ProjectPlaceholder
                  label={project.title}
                  variant={project.key}
                  source={SITE_LINKS.previews[project.key]}
                />
                <p className="eyebrow mb-2 mt-6">{project.tag}</p>
                <h3 className="font-display text-xl text-bone">{project.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-fog">{project.stack}</p>
                <p className="mt-4 text-sm leading-relaxed text-fog">{project.desc}</p>
                {hasLink ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm text-goldSoft transition-colors hover:text-bone"
                  >
                    View Project <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="mt-5 inline-flex min-h-11 items-center text-sm text-fog">
                    Project link · TODO
                  </span>
                )}
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {caseStudyOpen && <CaseStudyDialog onClose={closeCaseStudy} />}
      </AnimatePresence>
    </section>
  );
}
