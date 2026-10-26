"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  featuredProjects,
  type Project,
  type ProjectImage,
} from "@/data/content";
import { ProjectLinks } from "@/components/portfolio/project-links";

interface Slide {
  project: Project;
  image: ProjectImage;
  frame: number;
}

const pad = (value: number) => value.toString().padStart(2, "0");

const assetPath = (project: Project, file: string) =>
  file.startsWith("http") || file.startsWith("/")
    ? file
    : `/projects/${project.folder}/${file}`;

function SlideMedia({ slide, eager }: { slide: Slide; eager: boolean }) {
  const reduceMotion = useReducedMotion();
  const { project } = slide;
  if (slide.frame === 0 && project.video && !reduceMotion) {
    return (
      <video
        className="absolute inset-0 size-full object-cover object-top"
        src={assetPath(project, project.video)}
        poster={assetPath(project, slide.image.src)}
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
      src={assetPath(project, slide.image.src)}
      alt={slide.image.alt}
      fill
      sizes="(min-width: 1280px) 630px, (min-width: 1024px) 45vw, 92vw"
      priority={eager && slide.frame === 0}
      loading={eager && slide.frame === 0 ? undefined : "lazy"}
      className="object-cover object-top transition-transform duration-700 ease-out group-hover/slide:scale-[1.02]"
      draggable={false}
    />
  );
}

function ProjectDetails({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex min-w-0 flex-col"
    >
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

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div>
          <dt className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">
            Role
          </dt>
          <dd className="font-medium leading-snug">{project.role}</dd>
        </div>
        <div>
          <dt className="text-[0.6875rem] uppercase tracking-wide text-muted-foreground">
            Year
          </dt>
          <dd className="font-medium leading-snug">{project.year}</dd>
        </div>
      </dl>

      <ul
        className="mt-5 flex flex-wrap gap-2"
        aria-label="Featured technologies"
      >
        {project.technologies.slice(0, 5).map((tech) => (
          <li key={tech} className="chip">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/work/${project.slug}`}
          scroll={false}
          className="btn btn-primary group"
          aria-label={`Read the ${project.title} case study`}
        >
          View case study
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
        <ProjectLinks project={project} />
      </div>
    </motion.div>
  );
}

function ProjectSlider({
  project,
  eager,
}: {
  project: Project;
  eager: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [viewportRef, api] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: reduceMotion ? 12 : 32,
  });
  const [selected, setSelected] = useState(0);
  const wheelLock = useRef(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const slides = project.images.map((image, frame) => ({
    project,
    image,
    frame,
  }));

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

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${project.title} screenshots`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="min-w-0 rounded-3xl focus-visible:outline-offset-8"
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
                key={`${project.slug}-${slide.frame}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.image.alt}`}
                aria-hidden={!isActive}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="@container">
                  <div
                    className={`group/slide relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-black/25 transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out)] @3xl:aspect-video ${
                      isActive
                        ? "opacity-100"
                        : "scale-[0.94] opacity-40 saturate-50"
                    }`}
                  >
                    <SlideMedia slide={slide} eager={eager && index === 0} />
                    <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/45 via-35% to-transparent to-70% opacity-90 transition-opacity duration-500 group-hover/slide:opacity-100 group-focus-within/slide:opacity-100 @3xl:block" />
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[0.6875rem] tabular-nums text-white/90 backdrop-blur @3xl:right-6 @3xl:top-6"
                    >
                      {pad(slide.frame + 1)}/{pad(slides.length)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <p
          className="font-mono text-sm tabular-nums text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-foreground">{pad(selected + 1)}</span>/
          {pad(slides.length)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="icon-btn"
            aria-label={`Previous ${project.title} screenshot`}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="icon-btn"
            aria-label={`Next ${project.title} screenshot`}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      className="section relative overflow-hidden"
      aria-labelledby="work-title"
    >
      <div className="shell">
        <header className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">02 — Selected work</p>
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

      <div className="shell mt-12 space-y-20 lg:mt-14 lg:space-y-24">
        {featuredProjects.map((project, index) => {
          const flipped = index % 2 === 1;
          return (
            <article
              key={project.slug}
              className="grid min-w-0 items-center gap-8 lg:grid-cols-2 lg:gap-10"
              aria-labelledby={`case-${project.slug}`}
            >
              <div className={flipped ? "lg:order-2" : undefined}>
                <ProjectSlider project={project} eager={index === 0} />
              </div>
              <div className={`min-w-0 ${flipped ? "lg:order-1" : ""}`}>
                <ProjectDetails project={project} index={index} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
