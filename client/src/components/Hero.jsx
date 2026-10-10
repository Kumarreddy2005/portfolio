import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import ParticleMesh from "./ParticleMesh";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center section-pad pt-28"
    >
      <ParticleMesh />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hero-copy relative z-10"
      >
        <motion.p variants={item} className="eyebrow mb-6">
          BENGALURU, INDIA
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-[13vw] leading-[0.95] text-bone sm:text-6xl md:text-7xl"
        >
          K Kumar
          <br />
          <span className="text-goldSoft">Reddy</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-xs font-medium uppercase leading-relaxed tracking-[0.17em] text-goldSoft sm:text-sm"
        >
          PROMPT ENGINEER &amp; FULL-STACK DEVELOPER
        </motion.p>

        <motion.p variants={item} className="mt-8 max-w-md text-[15px] leading-relaxed text-fog">
          MCA student and Prompt Engineer passionate about building modern web applications,
          AI-powered solutions, and practical digital products. I combine prompt engineering
          with full-stack development to turn ideas into useful, scalable applications that
          solve real-world problems.
        </motion.p>

        <motion.div
          variants={item}
          className="hero-actions mt-10 flex flex-wrap gap-4"
        >
          <a href="#projects" className="button-primary">
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
        transition={{ delay: 1.4, duration: 0.8 }}
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
