"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { Check, X, RotateCcw, ChevronRight, Grid3X3 } from "lucide-react";

interface LevelCompleteCardProps {
  solved: boolean;
  score: number;
  attempts: number;
  hintUsed: boolean;
  levelNumber: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToLevels: () => void;
}

export function LevelCompleteCard({
  solved,
  score,
  attempts,
  hintUsed,
  levelNumber,
  hasNextLevel,
  onNextLevel,
  onRetry,
  onBackToLevels,
}: LevelCompleteCardProps) {
  return (
    <motion.div
      className="space-y-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring.gentle}
    >
      {/* Status Icon */}
      <motion.div
        className={`mx-auto w-16 h-16 rounded-full border-3 border-foreground flex items-center justify-center ${
          solved ? "bg-green-light" : "bg-pink-light"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={spring.bouncy}
      >
        {solved ? (
          <Check className="h-8 w-8 text-green" strokeWidth={3} />
        ) : (
          <X className="h-8 w-8 text-pink" strokeWidth={3} />
        )}
      </motion.div>

      {/* Result Text */}
      <div>
        <h3 className="font-heading text-xl font-bold">
          {solved ? "Level Complete!" : "Not Quite!"}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Level {levelNumber} {solved ? `— ${score} points` : "— Try again"}
        </p>
        {solved && (
          <div className="flex items-center justify-center gap-3 mt-2 text-sm text-muted-foreground">
            <span>
              {attempts === 1 ? "1st try" : attempts === 2 ? "2nd try" : "3rd try"}
            </span>
            {hintUsed && <span>Hint used</span>}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {solved && hasNextLevel && (
          <motion.button
            onClick={onNextLevel}
            className="w-full px-4 py-3 rounded-xl border-3 border-foreground bg-purple-light font-heading font-bold shadow-brutal-sm brutal-press flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
            transition={spring.bouncy}
          >
            Next Level
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        )}

        {!solved && (
          <motion.button
            onClick={onRetry}
            className="w-full px-4 py-3 rounded-xl border-3 border-foreground bg-yellow-light font-heading font-bold shadow-brutal-sm brutal-press flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
            transition={spring.bouncy}
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </motion.button>
        )}

        <motion.button
          onClick={onBackToLevels}
          className="w-full px-4 py-3 rounded-xl border-3 border-border bg-white font-heading font-bold flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
          transition={spring.bouncy}
        >
          <Grid3X3 className="h-4 w-4" />
          Back to Levels
        </motion.button>
      </div>
    </motion.div>
  );
}
