"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { personal, contact, social } from "@/data/content";
import { Reveal } from "@/components/portfolio/reveal";

const fieldClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

const channels = [
  { name: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { name: "LinkedIn", value: "narinder-kumar", href: social.linkedin, icon: Linkedin },
  { name: "GitHub", value: "@3narinder", href: social.github, icon: Github },
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormState({ name: "", email: "", message: "" });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <section id="contact" className="section border-t border-hairline" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card/50 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div
            className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
            aria-hidden
          />
          <div
            className="absolute -top-40 left-1/2 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
            aria-hidden
          />

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="eyebrow">05 — Contact</p>
            <h2 id="contact-title" className="display mt-6">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                worth using.
              </span>
            </h2>
            <p className="lede mt-6 max-w-[52ch]">
              I&apos;m open to full-time roles and select freelance projects. Whether it&apos;s a
              product idea, a role, or just a question — my inbox is open and I usually
              reply within a day.
            </p>
            <a href={`mailto:${contact.email}`} className="btn btn-primary group mt-10 h-14 px-8 text-base">
              <Mail size={18} />
              {contact.email}
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ul className="grid content-start gap-3" aria-label="Contact channels">
              {channels.map((channel) => (
                <li key={channel.name}>
                  <a
                    href={channel.href}
                    target={channel.name === "Email" ? undefined : "_blank"}
                    rel={channel.name === "Email" ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-background/50 p-4 transition-colors duration-300 hover:border-primary/40"
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                      <channel.icon size={18} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm text-muted-foreground">{channel.name}</span>
                      <span className="truncate font-medium">{channel.value}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
              <li className="mt-3 rounded-2xl border border-dashed border-border p-5 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">A quick note — </span>
                the best messages tell me what you&apos;re building and where you&apos;re stuck.
                I&apos;ll reply with honest thoughts either way.
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className={fieldClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className={fieldClass}
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                  placeholder={`Hi ${personal.name.split(" ")[0]}, I'd love to talk about…`}
                />
              </div>

              <div aria-live="polite" className="min-h-5 text-sm">
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <AlertCircle size={16} />
                    {errorMessage}
                  </motion.p>
                )}
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-primary"
                  >
                    <CheckCircle size={16} />
                    Message sent — I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
