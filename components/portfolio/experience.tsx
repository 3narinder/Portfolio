"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { EXPERIENCES as experiences } from "@/lib/constants";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
            <span className="text-primary font-mono text-lg md:text-xl">
              02.
            </span>
            Where I&apos;ve Worked
            <span className="h-px bg-border flex-1 max-w-xs" />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Tab List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-sm font-mono whitespace-nowrap transition-all duration-300 text-left
                  ${
                    activeTab === index
                      ? "text-primary bg-secondary border-b-2 md:border-b-0 md:border-l-2 border-primary -mb-px md:mb-0 md:-ml-px"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-25">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: activeTab === index ? 1 : 0,
                  x: activeTab === index ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className={activeTab === index ? "block" : "hidden"}
              >
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {exp.role}{" "}
                  <span className="text-primary">@ {exp.company}</span>
                </h3>
                <p className="text-muted-foreground font-mono text-sm mb-6">
                  {exp.period}
                </p>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="text-primary mt-1.5">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-6">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
