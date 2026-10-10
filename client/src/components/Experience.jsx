import Reveal from "./Reveal";

const BULLETS = [
  "Led a 4-member development team.",
  "Designed and developed a full-stack Task Manager.",
  "Built responsive interfaces using React.js and Tailwind CSS.",
  "Developed backend services using Node.js, Express.js and MongoDB.",
  "Implemented authentication, CRUD workflows, task filtering and data management.",
];

export default function Experience() {
  return (
    <section id="experience" className="content-section section-pad">
      <Reveal>
        <p className="eyebrow mb-6">EXPERIENCE</p>
        <h2 className="section-title">
          Built in the Real World.
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-14 flex flex-col gap-8 border-l border-line pl-8 sm:flex-row sm:gap-14">
        <div className="flex items-start gap-3 sm:w-40 sm:shrink-0">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
          <span className="font-display text-2xl text-goldSoft">2025</span>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl text-bone">Zidio Development</h3>
            <span className="rounded-sm border border-gold/50 px-2.5 py-0.5 text-[11px] tracking-wide text-goldSoft">
              REMOTE
            </span>
          </div>
          <p className="mt-1 text-sm text-fog">Full Stack Web Development Intern</p>

          <ul className="mt-5 space-y-2.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-fog">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
