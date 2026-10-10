import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import Reveal from "./Reveal";
import { CONTACT, MOTION, SITE_LINKS } from "../data/site";

export default function Contact() {
  const reducedMotion = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [fallbackMailto, setFallbackMailto] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Portfolio message from ${form.name}`,
    )}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\n${form.email}`)}`;
    const apiBase = import.meta.env.VITE_API_URL?.trim();
    const endpoint = apiBase
      ? `${apiBase.replace(/\/$/, "")}/api/contact`
      : import.meta.env.DEV
        ? "/api/contact"
        : "";

    if (!endpoint) {
      setFallbackMailto(mailto);
      setStatus("fallback");
      window.location.assign(mailto);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFallbackMailto(mailto);
      setStatus("fallback");
      window.location.assign(mailto);
    }
  };

  return (
    <section id="contact" className="content-section section-pad">
      <Reveal variant="mask">
        <p className="eyebrow mb-6">CONTACT</p>
        <h2 className="section-title">
          Let's Build Something Useful.
        </h2>
        <p className="mt-4 max-w-md text-[15px] text-fog">
          Have a project, opportunity or idea? Let's connect.
        </p>
      </Reveal>

      <div className="contact-layout mt-14 grid gap-14 md:grid-cols-2">
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <input
              required
              name="name"
              aria-label="Your name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="form-field"
            />
            <input
              required
              type="email"
              name="email"
              aria-label="Your email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              className="form-field"
            />
            <textarea
              required
              name="message"
              aria-label="Tell me about it"
              value={form.message}
              onChange={onChange}
              rows={4}
              placeholder="Tell me about it"
              className="form-field"
            />

            <motion.button
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              disabled={status === "sending"}
              type="submit"
              className="button-primary mt-2 w-fit"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : MOTION.fast }}
                  role="status"
                  aria-live="polite"
                  className="text-sm text-goldSoft"
                >
                  Thanks — your message is in. I'll reply soon.
                </motion.p>
              )}
              {status === "fallback" && (
                <motion.p
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : MOTION.fast }}
                  role="status"
                  aria-live="polite"
                  className="text-sm text-goldSoft"
                >
                  Your email app should open with the message ready. If it did not,{" "}
                  <a className="underline underline-offset-4" href={fallbackMailto}>
                    open it here
                  </a>
                  .
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.2} className="contact-details flex flex-col gap-4">
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-fog hover:text-goldSoft">
            <Mail size={17} /> {CONTACT.email}
          </a>
          <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-sm text-fog hover:text-goldSoft">
            <Phone size={17} /> {CONTACT.phoneLabel}
          </a>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT.email}`} className="button-secondary">
              Email Me
            </a>
            {SITE_LINKS.linkedin.startsWith("TODO_") ? (
              <span className="button-secondary social-placeholder" title="TODO: Add LinkedIn URL in src/data/site.js">
                <Linkedin size={15} /> LinkedIn · TODO
              </span>
            ) : (
              <a href={SITE_LINKS.linkedin} className="button-secondary" target="_blank" rel="noreferrer">
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
            <a href={SITE_LINKS.github} className="button-secondary" target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
