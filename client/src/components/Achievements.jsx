import { motion, useReducedMotion } from "framer-motion";
import { Trophy, Leaf } from "lucide-react";
import Reveal from "./Reveal";

export default function Achievements() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="achievements" className="content-section section-pad">
      <Reveal variant="mask">
        <p className="eyebrow mb-6">ACHIEVEMENTS</p>
        <h2 className="section-title">Recognition &amp; Service</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal delay={0.05}>
          <motion.div
            whileHover={reducedMotion ? undefined : { y: -4 }}
            className="achievement-card surface-card flex h-full items-center gap-6 p-6 sm:p-8"
          >
            <Trophy className="shrink-0 text-gold" size={34} strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-2xl text-bone">First Prize</h3>
              <p className="mt-1 text-sm text-fog">
                Hackathon conducted by Maharani Cluster University.
              </p>
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            whileHover={reducedMotion ? undefined : { y: -4 }}
            className="achievement-card achievement-card--service surface-card flex h-full items-center gap-6 p-6 sm:p-8"
          >
            <Leaf className="shrink-0 text-gold" size={34} strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-2xl text-bone">NSS Volunteer</h3>
              <p className="mt-1 text-sm text-fog">Active volunteer.</p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
