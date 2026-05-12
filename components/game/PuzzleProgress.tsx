"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface PuzzleProgressProps {
  current: number;
  total: number;
}

export function PuzzleProgress({ current, total }: PuzzleProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="flex-1 mr-4">
      <p className="text-sm text-muted-foreground mb-1">
        Puzzle {current} of {total}
      </p>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple to-pink rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={spring.gentle}
        />
      </div>
    </div>
  );
}
