import { motion } from "framer-motion";
import { Trophy, Leaf } from "lucide-react";
import Reveal from "./Reveal";
import ServiceBee from "./ServiceBee";

export default function Achievements() {
  return (
    <section className="content-section section-pad">
      <Reveal>
        <p className="eyebrow mb-6">ACHIEVEMENTS</p>
        <h2 className="section-title">Recognition &amp; Service</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal delay={0.05}>
          <motion.div
            whileHover={{ y: -6 }}
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
            whileHover={{ y: -6 }}
            className="achievement-card achievement-card--service surface-card flex h-full items-center gap-6 p-6 sm:p-8"
          >
            <Leaf className="shrink-0 text-gold" size={34} strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-2xl text-bone">NSS Volunteer</h3>
              <p className="mt-1 text-sm text-fog">Active volunteer.</p>
            </div>
            <ServiceBee />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
