"use client";

import { motion } from "framer-motion";

export function AnimatedAvatar({ className }: { className?: string }) {
  // Lightweight animated SVG avatar using framer-motion — no external deps
  return (
    <div
      className={className ?? "w-48 h-48 rounded-full bg-muted flex items-center justify-center overflow-hidden"}
      role="img"
      aria-label="Animated avatar"
    >
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 0.96 }}
        animate={{ scale: [0.96, 1, 0.98] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Simple stylized person: circle head + body + subtle floating */}
        <motion.circle
          cx="60"
          cy="34"
          r="12"
          fill="var(--foreground)"
          initial={{ y: -2 }}
          animate={{ y: [ -2, 2, -2 ] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.rect
          x="44"
          y="52"
          width="32"
          height="30"
          rx="6"
          fill="var(--muted-foreground, #94a3b8)"
          initial={{ y: 0 }}
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.path
          d="M36 88c8-6 24-6 24-6s16 0 24 6"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0.95, 0.5, 0.95] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
}
