import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { otherProjects } from "@/data/content";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export function MinorProjects() {
  if (otherProjects.length === 0) return null;

  return (
    <section
      id="minor-projects"
      className="section border-t border-hairline"
      aria-labelledby="minor-projects-title"
    >
      <div className="shell">
        <SectionHeader
          id="minor-projects-title"
          index="01"
          eyebrow="More experiments"
          title="Small projects"
          lede="A few smaller interfaces and web experiences, built to explore ideas and sharpen the details."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {otherProjects.map((project, index) => (
            <Reveal key={project.title} delay={index % 2 === 1 ? 0.1 : 0}>
              <article className="group flex aspect-square flex-col overflow-hidden rounded-3xl border border-hairline bg-surface">
                {project.images[0] && (
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-secondary">
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex shrink-0 items-center justify-between gap-3 p-3 sm:p-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 truncate text-[11px] text-muted-foreground">
                      {project.technologies.slice(0, 2).join(" · ")}
                    </p>
                  </div>

                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary h-10 shrink-0 px-4 text-sm"
                      aria-label={`Visit ${project.title} (opens in new tab)`}
                    >
                      Visit
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-btn size-10 shrink-0"
                      aria-label={`View ${project.title} source code (opens in new tab)`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
