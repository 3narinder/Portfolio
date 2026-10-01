"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { featuredProjects, type Project } from "@/data/content";

interface Slide {
  project: Project;
  projectIndex: number;
  src: string;
  frame: number;
}

const pad = (value: number) => value.toString().padStart(2, "0");

const assetPath = (project: Project, file: string) =>
  file.startsWith("http") || file.startsWith("/")
    ? file
    : `/projects/${project.folder}/${file}`;

function ProjectLinks({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const size = compact ? "h-9 px-4 text-[0.8125rem]" : "";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.external && (
        <a
          href={project.external}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary group ${size}`}
          aria-label={`Live demo of ${project.title} (opens in new tab)`}
        >
          Live demo
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      )}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-ghost ${compact ? "glass" : ""} ${size}`}
          aria-label={`Source code for ${project.title} (opens in new tab)`}
        >
          <Github size={16} />
          Source
        </a>
      ) : (
        <span
          className={`btn btn-ghost cursor-default opacity-60 ${compact ? "glass" : ""} ${size}`}
          title="Client work — source is private"
        >
          <Github size={16} />
          Private repo
        </span>
      )}
    </div>
  );
}

function SlideMedia({ slide, eager }: { slide: Slide; eager: boolean }) {
  const reduceMotion = useReducedMotion();
  const { project } = slide;
  if (slide.frame === 0 && project.video && !reduceMotion) {
    return (
      <video
        className="absolute inset-0 size-full object-cover object-top"
        src={assetPath(project, project.video)}
        poster={assetPath(project, slide.src)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <Image
      src={assetPath(project, slide.src)}
      alt={`${project.title} — screen ${slide.frame + 1} of ${project.images.length}`}
      fill
      sizes="(min-width: 1280px) 1120px, (min-width: 768px) 82vw, 92vw"
      priority={eager}
      loading={eager ? undefined : "lazy"}
      className="object-cover object-top transition-transform duration-700 ease-out group-hover/slide:scale-[1.02]"
      draggable={false}
    />
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const study = project.caseStudy;
  const blocks = [
    { label: "Problem", body: study?.problem },
    { label: "Contribution", body: study?.contribution },
    { label: "Approach", body: study?.approach },
    { label: "Outcome", body: study?.outcome },
  ].filter((block): block is { label: string; body: string } =>
    Boolean(block.body),
  );

  return (
    <motion.article
      key={project.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-12 lg:grid-cols-2 lg:gap-16"
      aria-labelledby={`case-${project.slug}`}
    >
      <div className="flex flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Case study {pad(index + 1)} · {project.category}
        </p>
        <h3
          id={`case-${project.slug}`}
          className="mt-4 text-(length:--step-3) font-semibold leading-[1.05]"
        >
          {project.title}
        </h3>
        <p className="lede mt-4 max-w-[40ch]">{project.tagline}</p>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium">{project.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Year</dt>
            <dd className="font-medium">{project.year}</dd>
          </div>
        </dl>

        {project.metrics && (
          <ul className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-border">
            {project.metrics.map((metric) => (
              <li
                key={metric.label}
                className="flex flex-col gap-1 p-4 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border"
              >
                <span className="text-[length:var(--step-2)] font-semibold leading-none tracking-tight text-primary">
                  {metric.value}
                </span>
                <span className="text-xs leading-snug text-muted-foreground">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {blocks.map((block, blockIndex) => (
            <section key={block.label} className="bg-background p-6">
              <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">
                <span className="text-muted-foreground">
                  {pad(blockIndex + 1)}
                </span>
                {block.label}
              </h4>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            </section>
          ))}
        </div>
        {study?.architecture && (
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Architecture notes
            </h4>
            <ul className="mt-4 flex flex-col">
              {study.architecture.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 border-t border-hairline py-3 text-[0.9375rem] last:border-b"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const reduceMotion = useReducedMotion();
  const slides = useMemo<Slide[]>(
    () =>
      featuredProjects.flatMap((project, projectIndex) =>
        project.images.map((src, frame) => ({
          project,
          projectIndex,
          src,
          frame,
        })),
      ),
    [],
  );
  const chapters = useMemo(
    () =>
      featuredProjects.map((project, index) => ({
        project,
        start: slides.findIndex((slide) => slide.projectIndex === index),
        count: project.images.length,
      })),
    [slides],
  );

  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: reduceMotion ? 12 : 32,
  });
  const [selected, setSelected] = useState(0);
  const wheelLock = useRef(0);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const node = regionRef.current;
    if (!node || !api) return;
    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;
      if (Math.abs(delta) < 12) return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheelLock.current < 420) return;
      wheelLock.current = now;
      if (delta > 0) api.scrollNext();
      else api.scrollPrev();
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: scrollPrev,
      ArrowRight: scrollNext,
      Home: () => scrollTo(0),
      End: () => scrollTo(slides.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const current = slides[selected] ?? slides[0];
  const activeProject = current.project;

  return (
    <section
      id="work"
      className="section relative overflow-hidden"
      aria-labelledby="work-title"
    >
      <div className="shell">
        <header className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">01 — Selected work</p>
            <h2 id="work-title" className="h-section mt-5">
              Case studies
            </h2>
          </div>
          <p className="lede max-w-[44ch] md:justify-self-end md:text-right">
            A curated set of shipped products. Drag, swipe, scroll sideways, or
            use your arrow keys to explore each build.
          </p>
        </header>
      </div>

      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project screenshots"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="group/carousel mt-16 rounded-3xl focus-visible:outline-offset-8"
      >
        <div
          ref={viewportRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <ul className="flex touch-pan-y">
            {slides.map((slide, index) => {
              const isActive = index === selected;
              return (
                <li
                  key={`${slide.project.slug}-${slide.frame}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}: ${slide.project.title}`}
                  aria-hidden={!isActive}
                  className="min-w-0 shrink-0 grow-0 basis-[92%] px-2 sm:basis-[86%] md:px-3 lg:basis-[min(76%,72rem)]"
                >
                  <div className="@container">
                    <div
                      className={`group/slide relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-black/25 transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out)] @3xl:aspect-video ${
                        isActive
                          ? "opacity-100"
                          : "scale-[0.94] opacity-40 saturate-50"
                      }`}
                    >
                      <SlideMedia slide={slide} eager={index < 2} />
                      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/45 via-35% to-transparent to-70% opacity-90 transition-opacity duration-500 group-hover/slide:opacity-100 group-focus-within/slide:opacity-100 @3xl:block" />

                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 backdrop-blur py-1 font-mono text-[0.6875rem] tabular-nums text-white/90 @3xl:right-6 @3xl:top-6">
                        {pad(slide.frame + 1)}/
                        {pad(slide.project.images.length)}
                      </span>

                      <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-6 p-8 text-white @3xl:flex">
                        <div className="min-w-0">
                          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70">
                            {slide.project.role} · {slide.project.year}
                          </p>
                          <h3 className="mt-2 text-3xl font-semibold leading-tight">
                            {slide.project.title}
                          </h3>
                          <ul
                            className="mt-3 flex translate-y-2 flex-wrap gap-1.5 opacity-0 transition-all duration-500 ease-[var(--ease-out)] group-hover/slide:translate-y-0 group-hover/slide:opacity-100 group-focus-within/slide:translate-y-0 group-focus-within/slide:opacity-100"
                            aria-label="Technologies"
                          >
                            {slide.project.technologies
                              .slice(0, 5)
                              .map((tech) => (
                                <li
                                  key={tech}
                                  className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[0.6875rem] text-white/90 backdrop-blur"
                                >
                                  {tech}
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="shrink-0" inert={!isActive}>
                          <ProjectLinks project={slide.project} compact />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`mt-4 flex flex-col gap-3 transition-opacity duration-500 @3xl:hidden ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      inert={!isActive}
                    >
                      <div>
                        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {slide.project.role} · {slide.project.year}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold leading-tight">
                          {slide.project.title}
                        </h3>
                      </div>
                      <ProjectLinks project={slide.project} compact />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="shell mt-10">
        <div className="grid grid-cols-2 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div
            className="flex items-baseline gap-3 font-mono tabular-nums"
            aria-hidden
          >
            <span className="text-2xl font-medium text-foreground">
              {pad(selected + 1)}
            </span>
            <span className="text-sm text-muted-foreground">
              / {pad(slides.length)}
            </span>
          </div>

          <ol
            className="order-first col-span-2 flex w-full items-center gap-2 md:order-none md:col-span-1 md:w-[min(32rem,44vw)]"
            aria-label="Projects"
          >
            {chapters.map((chapter) => {
              const isCurrent = chapter.project.slug === activeProject.slug;
              const progress = isCurrent
                ? ((current.frame + 1) / chapter.count) * 100
                : chapter.start + chapter.count <= selected
                  ? 100
                  : 0;
              return (
                <li
                  key={chapter.project.slug}
                  style={{ flexGrow: chapter.count }}
                  className="basis-0"
                >
                  <button
                    type="button"
                    onClick={() => scrollTo(chapter.start)}
                    aria-current={isCurrent ? "true" : undefined}
                    className="group flex w-full flex-col gap-2 rounded-md py-1 text-left"
                  >
                    <span
                      className={`truncate font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors ${
                        isCurrent
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {chapter.project.title.split(" ")[0]}
                    </span>
                    <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-border">
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-500 ease-[var(--ease-out)]"
                        style={{ width: `${progress}%` }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={scrollPrev}
              className="icon-btn"
              aria-label="Previous slide"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="icon-btn"
              aria-label="Next slide"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Slide {selected + 1} of {slides.length}: {activeProject.title}
        </p>
      </div>

      <div className="shell mt-24">
        <AnimatePresence mode="wait" initial={false}>
          <CaseStudy
            key={activeProject.slug}
            project={activeProject}
            index={current.projectIndex}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
