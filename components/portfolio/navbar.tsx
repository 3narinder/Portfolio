"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { personal } from "@/data/content";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Open Source", href: "#open-source" },
  { name: "Contact", href: "#contact" },
];

const initials = personal.name
  .split(" ")
  .map((part) => part[0])
  .join("");

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled || open
            ? "border-hairline bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-18"
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-3 justify-self-start"
            aria-label={`${personal.name} — back to top`}
          >
            <span className="grid size-9 place-items-center rounded-full border border-border font-mono text-xs font-semibold tracking-wider transition-colors group-hover:border-primary group-hover:text-primary">
              {initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight lg:inline">
              {personal.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-hairline bg-surface p-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            >
              Résumé
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-full border border-border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 border-t border-hairline bg-background md:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-8">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.href.slice(1) ? "true" : undefined}
                    className="flex items-baseline gap-4 border-b border-hairline py-4 text-2xl font-medium tracking-tight aria-[current]:text-primary"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full"
                >
                  Résumé
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
