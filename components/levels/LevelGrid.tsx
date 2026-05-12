"use client";

import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import { staggerContainer, staggerItem, spring } from "@/lib/motion";

interface LevelGridProps {
  totalLevels: number;
  highestUnlocked: number;
  completedLevels: Record<number, unknown>;
  packColor: string;
  onSelectLevel: (level: number) => void;
}

export function LevelGrid({
  totalLevels,
  highestUnlocked,
  completedLevels,
  packColor,
  onSelectLevel,
}: LevelGridProps) {
  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);

  return (
    <motion.div
      className="grid grid-cols-5 gap-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {levels.map((level) => {
        const isCompleted = !!completedLevels[level];
        const isUnlocked = level <= highestUnlocked;
        const isCurrent = isUnlocked && !isCompleted;

        return (
          <motion.button
            key={level}
            variants={staggerItem}
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelectLevel(level)}
            className={`relative aspect-square rounded-xl border-3 flex items-center justify-center font-heading text-base font-bold transition-colors ${
              isCompleted
                ? "bg-green-light border-foreground text-foreground"
                : isCurrent
                  ? "border-foreground text-foreground shadow-brutal-sm"
                  : "bg-muted border-border text-muted-foreground opacity-60"
            }`}
            style={
              isCurrent
                ? { backgroundColor: packColor + "20", borderColor: packColor }
                : undefined
            }
            whileTap={isUnlocked ? { scale: 0.9 } : undefined}
            transition={spring.bouncy}
          >
            {isCompleted ? (
              <Check className="h-5 w-5 text-green" strokeWidth={3} />
            ) : !isUnlocked ? (
              <Lock className="h-4 w-4" />
            ) : (
              level
            )}
            {isCurrent && (
              <motion.div
                className="absolute inset-0 rounded-xl border-3"
                style={{ borderColor: packColor }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
