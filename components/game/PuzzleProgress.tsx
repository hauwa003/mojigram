"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface PuzzleProgressProps {
  current: number;
  total: number;
}

export function PuzzleProgress({ current, total }: PuzzleProgressProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const index = i + 1;
        const isDone = index < current;
        const isCurrent = index === current;
        return (
          <motion.div
            key={i}
            className={`h-2 rounded-full ${
              isDone
                ? "bg-primary w-2"
                : isCurrent
                  ? "bg-primary w-6"
                  : "bg-muted w-2"
            }`}
            initial={isCurrent ? { width: 8 } : undefined}
            animate={isCurrent ? { width: 24 } : undefined}
            transition={spring.gentle}
          />
        );
      })}
    </div>
  );
}
