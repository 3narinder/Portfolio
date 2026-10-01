import type { ReactNode } from "react";
import { Reveal } from "@/components/portfolio/reveal";

interface SectionHeaderProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}

export function SectionHeader({ id, index, eyebrow, title, lede }: SectionHeaderProps) {
  return (
    <Reveal className="grid items-end gap-8 md:grid-cols-2">
      <div>
        <p className="eyebrow">
          {index} — {eyebrow}
        </p>
        <h2 id={id} className="h-section mt-5">
          {title}
        </h2>
      </div>
      {lede && (
        <p className="lede max-w-[44ch] md:justify-self-end md:text-right">{lede}</p>
      )}
    </Reveal>
  );
}
