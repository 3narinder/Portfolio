import { ArrowUpRight } from "lucide-react";
import { openSource } from "@/data/content";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="section border-t border-hairline"
      aria-labelledby="open-source-title"
    >
      <div className="shell">
        <SectionHeader
          id="open-source-title"
          index="04"
          eyebrow="Open source & notes"
          title="Working in public."
          lede="Smaller builds, documentation, and practice repos — the process behind the polished work."
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-3">
          {openSource.map((item, index) => (
            <li key={item.href} className="flex">
              <Reveal delay={index * 0.06} className="flex w-full">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-10 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
