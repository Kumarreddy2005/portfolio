import { useState } from "react";
import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      className={`${className}${revealed ? " is-revealed" : ""}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setRevealed(true)}
    >
      {children}
    </motion.div>
  );
}
