import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="content-section section-pad">
      <Reveal>
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
              whileTap={{ scale: 0.97 }}
              disabled={status === "sending"}
              type="submit"
              className="button-primary mt-2 w-fit"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            <AnimatePresence mode="wait">
              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className="text-sm text-goldSoft"
                >
                  Thanks — your message is in. I'll reply soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="text-sm text-red-400"
                >
                  Something went wrong — start the server and try again.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.2} className="contact-details flex flex-col gap-4">
          <a href="mailto:kumarrdy669@gmail.com" className="flex items-center gap-3 text-sm text-fog hover:text-goldSoft">
            <Mail size={17} /> kumarrdy669@gmail.com
          </a>
          <a href="tel:+916362542568" className="flex items-center gap-3 text-sm text-fog hover:text-goldSoft">
            <Phone size={17} /> +91 63625 42568
          </a>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:kumarrdy669@gmail.com" className="button-secondary">
              Email Me
            </a>
            <a href="#" className="button-secondary">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="#" className="button-secondary">
              <Github size={15} /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
