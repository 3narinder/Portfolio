"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_ME } from "@/lib/constants";

const skills = ABOUT_ME.skills;

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-8">
            <span className="text-primary font-mono text-lg md:text-xl">
              01.
            </span>
            About Me
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              {ABOUT_ME.description}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {ABOUT_ME.journey}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {ABOUT_ME.fastForward}{" "}
            </p>

            <div className="pt-4">
              <p className="text-foreground font-medium mb-4">
                Here are a few technologies I&apos;ve been working with
                recently:
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skills.map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <span className="text-primary">▹</span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="relative w-full aspect-square max-w-70 mx-auto">
              <div className="absolute inset-0 border-2 border-primary rounded-md translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              <div className="relative w-full h-full rounded-md overflow-hidden bg-primary/20">
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-transparent transition-colors duration-300" />
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/50">AC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
