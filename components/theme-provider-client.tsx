"use client";

import type { ThemeProviderProps } from "next-themes";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";

export default function ThemeProviderClient({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </MotionConfig>
  );
}
