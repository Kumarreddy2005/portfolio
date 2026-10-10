import Reveal from "./Reveal";

const ITEMS = [
  { year: "2024–2025", title: "Data Analytics", org: "ITC & NASSCOM Foundation" },
  { year: "2025", title: "Full Stack Web Development", org: "Zidio Development" },
  { year: "2024–2025", title: "Connect with Work Programme", org: "Magic Bus India Foundation" },
  { year: "July 2025", title: "AWS & DevOps Practices", org: "CodeOrigin.ai" },
  {
    year: "Feb 2025",
    title: "Transforming Data Into Insights",
    org: "SWOC / Enterprises",
    topics: ["Tableau", "Power BI", "Excel"],
  },
];

export default function Learning() {
  return (
    <section id="learning" className="content-section section-pad">
      <Reveal variant="mask">
        <p className="eyebrow mb-6">LEARNING</p>
        <h2 className="section-title">Always Learning.</h2>
      </Reveal>

      <Reveal delay={0.15} className="learning-list mt-12 divide-y divide-line border-y border-line">
        {ITEMS.map((it) => (
          <div
            key={it.title + it.year}
            className="learning-row flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <span className="text-xs tracking-wide text-fog sm:w-28">{it.year}</span>
              <span className="font-display text-lg text-bone">{it.title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {it.topics && (
                <span className="text-xs text-goldSoft">{it.topics.join(" · ")}</span>
              )}
              <span className="text-sm text-fog">{it.org}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
