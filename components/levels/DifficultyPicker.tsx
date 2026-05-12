"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultyPickerProps {
  selected: Difficulty;
  onSelect: (d: Difficulty) => void;
  stats?: {
    easy: { completed: number; total: number };
    medium: { completed: number; total: number };
    hard: { completed: number; total: number };
  };
}

const config: Record<Difficulty, { label: string; bg: string; border: string }> = {
  easy: { label: "Easy", bg: "bg-green-light", border: "border-green" },
  medium: { label: "Medium", bg: "bg-yellow-light", border: "border-yellow" },
  hard: { label: "Hard", bg: "bg-pink-light", border: "border-pink" },
};

export function DifficultyPicker({ selected, onSelect, stats }: DifficultyPickerProps) {
  return (
    <div className="flex gap-2">
      {(["easy", "medium", "hard"] as Difficulty[]).map((d) => {
        const isActive = selected === d;
        const c = config[d];
        const stat = stats?.[d];
        return (
          <motion.button
            key={d}
            onClick={() => onSelect(d)}
            className={`flex-1 rounded-xl border-3 px-3 py-2 text-center font-heading text-sm font-bold transition-colors ${
              isActive
                ? `${c.bg} ${c.border} border-foreground shadow-brutal-sm`
                : "bg-white border-border"
            }`}
            whileTap={{ scale: 0.95 }}
            transition={spring.bouncy}
          >
            {c.label}
            {stat && (
              <span className="block text-xs font-normal text-muted-foreground mt-0.5">
                {stat.completed}/{stat.total}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
