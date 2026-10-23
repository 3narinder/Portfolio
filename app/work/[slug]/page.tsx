import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/portfolio/footer";
import { Navbar } from "@/components/portfolio/navbar";
import { ProjectLinks } from "@/components/portfolio/project-links";
import { ProjectRouteScroll } from "@/components/portfolio/project-route-scroll";
import { featuredProjects } from "@/data/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const pad = (value: number) => value.toString().padStart(2, "0");

const imagePath = (folder: string | undefined, file: string) =>
  file.startsWith("http") || file.startsWith("/")
    ? file
    : `/projects/${folder}/${file}`;

function getProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Narinder Kumar`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = featuredProjects.findIndex(
    (item) => item.slug === slug,
  );
  const project = featuredProjects[projectIndex];
  if (!project) notFound();

  const study = project.caseStudy;
  const sections = [
    { title: "Problem", body: study?.problem },
    { title: "Contribution", body: study?.contribution },
    { title: "Approach", body: study?.approach },
    { title: "Outcome", body: study?.outcome },
  ].filter((section): section is { title: string; body: string } =>
    Boolean(section.body),
  );
  const otherProjects = featuredProjects.filter(
    (item) => item.slug !== project.slug,
  );

  return (
    <>
      <Navbar />
      <ProjectRouteScroll slug={project.slug} />
      <main id="main" className="min-h-screen bg-background">
        <section className="section">
          <div className="shell">
            <Link
              href="/#work"
              className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to selected work
            </Link>

            <header className="mt-12 max-w-4xl">
              <p className="eyebrow">
                Case study {pad(projectIndex + 1)} — {project.category}
              </p>
              <h1 className="mt-5 text-(length:--step-4) font-semibold leading-[1.02] tracking-tight">
                {project.title}
              </h1>
              <p className="lede mt-5 max-w-[56ch]">{project.tagline}</p>

              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-5 border-y border-hairline py-5 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Role
                  </dt>
                  <dd className="mt-1 font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Year
                  </dt>
                  <dd className="mt-1 font-medium">{project.year}</dd>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Project type
                  </dt>
                  <dd className="mt-1 font-medium">{project.category}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <ProjectLinks project={project} />
              </div>
            </header>

            <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-black/25">
              <Image
                src={imagePath(project.folder, project.images[0].src)}
                alt={project.images[0].alt}
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1280px) 1200px, 92vw"
                className="h-auto w-full object-cover object-top"
              />
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
              <div>
                <p className="eyebrow">Overview</p>
                <h2 className="mt-4 text-(length:--step-2) font-semibold tracking-tight">
                  A closer look at the project
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {project.metrics && (
                  <ul className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-border">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric.label}
                        className="flex min-w-0 flex-col gap-1 p-3 sm:p-4 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-border"
                      >
                        <span className="break-words text-[length:var(--step-2)] font-semibold leading-none tracking-tight text-primary">
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
                  {project.technologies.map((technology) => (
                    <li key={technology} className="chip">
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <section
                    key={section.title}
                    className="rounded-2xl border border-border p-5 sm:p-6"
                  >
                    <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                      <span className="mr-2 text-muted-foreground">
                        {pad(index + 1)}
                      </span>
                      {section.title}
                    </h2>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            {project.images.length > 1 && (
              <section className="mt-20" aria-labelledby="gallery-title">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">Screenshots</p>
                    <h2
                      id="gallery-title"
                      className="mt-3 text-(length:--step-2) font-semibold tracking-tight"
                    >
                      A look inside
                    </h2>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {pad(project.images.length)} screens
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={image.src}
                      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl shadow-black/25"
                    >
                      <Image
                        src={imagePath(project.folder, image.src)}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 45vw, 92vw"
                        loading="lazy"
                        className="object-cover object-top"
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[0.6875rem] tabular-nums text-white/90 backdrop-blur">
                        {pad(index + 2)}/{pad(project.images.length)}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {study?.architecture && (
              <section className="mt-16" aria-labelledby="architecture-title">
                <p className="eyebrow">Build notes</p>
                <h2
                  id="architecture-title"
                  className="mt-3 text-(length:--step-2) font-semibold tracking-tight"
                >
                  Architecture
                </h2>
                <ul className="mt-5 flex max-w-3xl flex-col">
                  {study.architecture.map((note) => (
                    <li
                      key={note}
                      className="flex min-w-0 gap-3 border-t border-hairline py-4 text-[0.9375rem] last:border-b"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="min-w-0">{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </section>

        {otherProjects.length > 0 && (
          <section className="shell pb-24" aria-labelledby="more-work-title">
            <div className="flex flex-wrap items-end justify-between gap-5 border-t border-hairline pt-10">
              <div>
                <p className="eyebrow">Keep exploring</p>
                <h2
                  id="more-work-title"
                  className="mt-3 text-(length:--step-2) font-semibold tracking-tight"
                >
                  More selected work
                </h2>
              </div>
              <Link
                href="/#work"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                All projects <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {otherProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  scroll={false}
                  className="group rounded-2xl border border-border p-5 transition-colors hover:border-primary/50 sm:p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {item.category} · {item.year}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
