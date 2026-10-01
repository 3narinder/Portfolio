import { experiences } from "@/data/content";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export function Experience() {
  return (
    <section
      id="experience"
      className="section border-t border-hairline"
      aria-labelledby="experience-title"
    >
      <div className="shell">
        <SectionHeader
          id="experience-title"
          index="03"
          eyebrow="Experience"
          title="Where I've shipped."
          lede="Product teams and agencies where I built, reviewed, and maintained production React and Node code."
        />

        <ol className="mt-16 flex flex-col">
          {experiences.map((exp, index) => (
            <li key={`${exp.company}-${exp.period}`}>
              <Reveal
                delay={index * 0.05}
                className="grid gap-6 border-t border-border py-10 md:grid-cols-2 md:gap-16"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs tabular-nums tracking-[0.08em] text-muted-foreground">
                    {exp.period}
                  </p>
                  <h3 className="text-[length:var(--step-2)] font-semibold leading-tight">
                    {exp.company}
                  </h3>
                  <p className="text-primary">{exp.role}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {exp.technologies.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {exp.description.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2.5 h-px w-3 shrink-0 bg-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
