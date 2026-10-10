import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION } from "../data/site";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  variant = "fade",
}) {
  const [revealed, setRevealed] = useState(
    () => document.hidden || !("IntersectionObserver" in window),
  );
  const reducedMotion = useReducedMotion();
  const masked = variant === "mask";

  return (
    <motion.div
      className={`${className}${revealed ? " is-revealed" : ""}`}
      initial={
        reducedMotion || revealed
          ? false
          : masked
            ? { opacity: 1, clipPath: "inset(0 0 100% 0)" }
            : { opacity: 0, y }
      }
      whileInView={masked ? { clipPath: "inset(0 0 0% 0)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : masked ? MOTION.reveal : MOTION.reveal,
        delay: reducedMotion ? 0 : delay,
        ease: MOTION.ease,
      }}
      onViewportEnter={() => setRevealed(true)}
    >
      {children}
    </motion.div>
  );
}
