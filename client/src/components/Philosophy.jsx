import Reveal from "./Reveal";
import PhilosophyArtwork from "./PhilosophyArtwork";

export default function Philosophy() {
  return (
    <section id="about" className="content-section section-pad">
      <Reveal className="philosophy-heading">
        <p className="eyebrow mb-6">PHILOSOPHY</p>
        <h2 className="section-title section-title--statement philosophy-title">
          I build software that turns complex problems into useful systems.
        </h2>
      </Reveal>
      <Reveal delay={0.2} className="philosophy-content mt-10 grid gap-10 xl:grid-cols-2">
        <div className="philosophy-bio max-w-xl">
          <p className="philosophy-role">Prompt Engineer &amp; Full-Stack Developer | MCA Student</p>
          <p className="mt-5 text-[15px] leading-relaxed text-fog">
            MCA student and Prompt Engineer passionate about building modern web applications and
            AI-powered solutions. I specialize in prompt engineering and full-stack development,
            combining AI capabilities with practical software solutions to create user-friendly,
            scalable digital products. I enjoy exploring emerging technologies, transforming
            ideas into reality, and solving real-world problems through innovation and creativity.
          </p>
        </div>

        <div className="philosophy-quote-wrap">
          <PhilosophyArtwork />
          <span className="philosophy-quote-index" aria-hidden="true">
            PRINCIPLE&nbsp; / &nbsp;01
          </span>
          <blockquote className="philosophy-quote border-l border-gold/50 pl-6 font-display text-lg italic text-goldSoft/90">
            "The right tools, when used with clarity, turn ideas into impactful
            solutions."
            <footer className="mt-3 font-body text-xs not-italic tracking-wide text-fog">
              — K Kumar Reddy
            </footer>
          </blockquote>
        </div>
      </Reveal>
    </section>
  );
}
