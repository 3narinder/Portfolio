import { ArrowUpRight, Github } from "lucide-react";
import { about, personal, social } from "@/data/content";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export function About() {
  return (
    <section id="about" className="section border-t border-hairline" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeader
          id="about-title"
          index="02"
          eyebrow="About"
          title="Craft, end to end."
          lede="I care about the details users feel but rarely notice — load time, focus states, and copy that gets out of the way."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-5 text-muted-foreground">
            <p className="text-[length:var(--step-1)] leading-snug text-foreground">
              {about.description}
            </p>
            <p>{about.journey}</p>
            <p>{about.fastForward}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group"
              >
                Download résumé
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                aria-label={`${personal.name} on GitHub (opens in new tab)`}
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </Reveal>

          <ul className="grid gap-4" aria-label="Skills">
            {about.skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.06}>
                <li className="group @container rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-primary/40">
                  <div className="flex flex-col gap-1 @md:flex-row @md:items-baseline @md:justify-between">
                    <h3 className="text-lg font-semibold">
                      <span className="mr-3 font-mono text-xs text-primary">0{index + 1}</span>
                      {group.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="chip transition-colors duration-200 group-hover:border-primary/30 hover:!border-primary hover:text-foreground"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
