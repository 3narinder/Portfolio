import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/content";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.external && (
        <a
          href={project.external}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary group"
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
          className="btn btn-ghost"
          aria-label={`Source code for ${project.title} (opens in new tab)`}
        >
          <Github size={16} />
          Source
        </a>
      ) : (
        <span
          className="btn btn-ghost cursor-default opacity-60"
          title="Client work — source is private"
        >
          <Github size={16} />
          Private repo
        </span>
      )}
    </div>
  );
}
