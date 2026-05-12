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
      <p className="text-sm text-muted-foreground font-medium mb-1">
        Puzzle {current} of {total}
      </p>
      <div className="h-3 bg-muted rounded-full overflow-hidden border-2 border-foreground">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={spring.gentle}
        />
      </div>
    </div>
  );
}
