"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/3narinder", icon: Github },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/narinder-kumar-3216a9153/",
    icon: Linkedin,
  },
];

export function SocialSidebar() {
  return (
    <>
      {/* Left Side - Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="hidden md:flex fixed left-8 bottom-0 flex-col items-center gap-6"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label={link.name}
          >
            <link.icon size={20} />
          </motion.a>
        ))}
        <div className="w-px h-24 bg-muted-foreground" />
      </motion.div>

      {/* Right Side - Email */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="hidden md:flex fixed right-8 bottom-0 flex-col items-center gap-6"
      >
        <motion.a
          href="mailto:alex@example.com"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ y: -2 }}
          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          narinderd9@gmail.com
        </motion.a>
        <div className="w-px h-24 bg-muted-foreground" />
      </motion.div>
    </>
  );
}
