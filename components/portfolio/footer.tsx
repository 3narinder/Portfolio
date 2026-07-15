"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/3narinder", icon: Github },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/narinder-kumar-3216a9153/",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-6 mb-8 md:hidden">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label={link.name}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://github.com/3narinder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm font-mono hover:text-primary transition-colors duration-300"
          >
            <p>Designed & Built by Narinder Kumar</p>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
