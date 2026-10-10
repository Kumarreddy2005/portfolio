import Reveal from "./Reveal";

const TIMELINE = [
  { year: "2025–Present", degree: "MCA", place: "Cambridge Institute of Technology, Bengaluru", note: "In progress" },
  { year: "2025", degree: "BCA", place: "Nrupathunga University, Bengaluru", note: "CGPA: 8.56" },
  { year: "PUC", degree: "PU College", place: "Sri Venkateshwara Institutions", note: "77%" },
  { year: "2020", degree: "SSLC", place: "Little Flower High School, Bengaluru Urban", note: "66.56%" },
];

export default function Education() {
  return (
    <section id="education" className="content-section section-pad">
      <Reveal>
        <p className="eyebrow mb-6">EDUCATION</p>
        <h2 className="section-title">The Foundation</h2>
      </Reveal>

      <Reveal delay={0.15} className="education-timeline relative mt-16">
        <div className="education-track absolute left-0 right-0 top-2 hidden h-px bg-line lg:block" />
        <div className="education-items grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((t) => (
            <div key={t.degree + t.year} className="education-item relative pt-6">
              <span className="education-node absolute left-0 top-0 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-gold lg:block" />
              <p className="eyebrow mb-2">{t.year}</p>
              <h3 className="font-display text-lg text-bone">{t.degree}</h3>
              <p className="mt-1 text-sm text-fog">{t.place}</p>
              <p className="mt-1 text-sm text-goldSoft">{t.note}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
