"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { featuredProjects, otherProjects } from "@/data/content";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div
      className="relative aspect-video rounded-lg overflow-hidden bg-secondary group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow-lg"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} image gallery. Use left and right arrow keys to navigate.`}
    >
      <div
        rel="noopener noreferrer"
        className="block w-full h-full relative"
        tabIndex={-1}
      >
        {mounted ? (
          <img
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted animate-pulse" />
        )}
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
      </div>

      {mounted && images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1,
              );
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1,
              );
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
            {images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(imgIndex);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ease-in-out backdrop-blur-sm ${
                  currentIndex === imgIndex
                    ? "bg-primary w-6 shadow-lg"
                    : "bg-white/60 hover:bg-white w-2.5"
                }`}
                aria-label={`Go to image ${imgIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">
              03.
            </span>
            Some Things I&apos;ve Built
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`flex flex-col gap-6 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <div className="lg:w-1/2 shrink-0">
                <ProjectCarousel
                  images={project.images.map((img) => {
                    if (img.startsWith("http")) return img;
                    return `/projects/${project.folder}/${img}`;
                  })}
                  title={project.title}
                />
              </div>

              {/* Project Content */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <p className="text-primary font-mono text-sm mb-2">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {project.title}
                  </a>
                </h3>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border/50 mb-4 hover:shadow-xl transition-shadow duration-300">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors duration-300 p-2 hover:bg-primary/10 rounded-lg"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors duration-300 p-2 hover:bg-primary/10 rounded-lg"
                    aria-label="External link"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {/*         
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">
              Other Noteworthy Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-card p-6 rounded-lg border border-border/50 group hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Folder
                      size={40}
                      className="text-primary"
                      strokeWidth={1.5}
                    />
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="External link"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="text-muted-foreground font-mono text-xs"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
}
