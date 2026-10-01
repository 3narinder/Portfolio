"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { personal, social, contact } from "@/data/content";

const layers = [
  { label: "Interface", detail: "React · Next.js · TypeScript", tone: "bg-primary" },
  { label: "State", detail: "TanStack Query · Redux", tone: "bg-chart-2" },
  { label: "API", detail: "Node.js · Express · REST", tone: "bg-chart-3" },
  { label: "Data", detail: "MongoDB · Mongoose", tone: "bg-chart-4" },
];

const channels = [
  { name: "GitHub", href: social.github, icon: Github },
  { name: "LinkedIn", href: social.linkedin, icon: Linkedin },
  { name: "Email", href: `mailto:${contact.email}`, icon: Mail },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function StackVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl shadow-black/20 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            ~/narinder/stack.ts
          </span>
        </div>
        <ol className="relative flex flex-col gap-3 p-5">
          <span className="absolute inset-y-9 left-[2.05rem] w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
          {layers.map((layer, index) => (
            <motion.li
              key={layer.label}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center gap-4 rounded-xl border border-hairline bg-background/60 px-3 py-3"
            >
              <span className="relative grid size-6 place-items-center">
                <span className={`size-2 rounded-full ${layer.tone}`} />
                {index === 0 && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/30 motion-reduce:hidden" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{layer.label}</span>
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {layer.detail}
                </span>
              </span>
            </motion.li>
          ))}
        </ol>
        <div className="grid grid-cols-3 border-t border-hairline text-center">
          {[
            ["Accessible", "WCAG-minded"],
            ["Fast", "CWV-first"],
            ["Typed", "End to end"],
          ].map(([title, sub]) => (
            <div key={title} className="border-hairline px-2 py-4 [&:not(:last-child)]:border-r">
              <p className="text-sm font-medium">{title}</p>
              <p className="font-mono text-[0.6875rem] text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          className="flex flex-col items-start"
        >
          <motion.p
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {personal.availability}
          </motion.p>

          <motion.p variants={fadeUp} className="eyebrow mb-5">
            {personal.role} · MERN
          </motion.p>

          <motion.h1 variants={fadeUp} className="display max-w-[15ch]">
            Web products that feel{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              fast &amp; considered.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="lede mt-6 max-w-[46ch]">
            {personal.headline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-primary group">
              View selected work
              <ArrowDownRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost group"
            >
              Résumé
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex items-center gap-2" aria-label="Elsewhere">
            {channels.map((channel) => (
              <li key={channel.name}>
                <a
                  href={channel.href}
                  target={channel.name === "Email" ? undefined : "_blank"}
                  rel={channel.name === "Email" ? undefined : "noopener noreferrer"}
                  className="icon-btn hover:text-primary"
                  aria-label={channel.name}
                >
                  <channel.icon size={18} />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <StackVisual />
        </motion.div>
      </div>
    </section>
  );
}
