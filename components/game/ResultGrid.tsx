"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "./ConfettiOverlay";
import { spring, scaleIn, staggerContainer, staggerItem } from "@/lib/motion";
import type { PuzzleResult } from "@/types/game";
import { toast } from "sonner";

interface ResultGridProps {
  puzzleResults: PuzzleResult[];
  totalScore: number;
  maxScore: number;
  rankLabel: string;
  shareText: string;
  sessionType: string;
  onPlayAgain?: () => void;
}

function AnimatedScore({ value }: { value: number }) {
  const springValue = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span>{display}</motion.span>;
}

export function ResultGrid({
  puzzleResults,
  totalScore,
  maxScore,
  rankLabel,
  shareText,
  onPlayAgain,
}: ResultGridProps) {
  const { fire: fireConfetti, ConfettiOverlay } = useConfetti();
  const pct = maxScore > 0 ? totalScore / maxScore : 0;

  useEffect(() => {
    if (pct >= 0.8) {
      const timer = setTimeout(() => fireConfetti(), 600);
      return () => clearTimeout(timer);
    }
  }, [pct, fireConfetti]);

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Copied to clipboard!");
      }
    } catch {
      // User cancelled share
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <ConfettiOverlay />

      {/* Score Summary */}
      <motion.div
        className="text-center flex flex-col gap-2 p-6 bg-purple-light border-3 border-foreground rounded-xl shadow-brutal"
        variants={scaleIn}
      >
        <h2 className="font-heading text-3xl font-extrabold">{rankLabel}</h2>
        <p className="text-4xl font-heading font-extrabold text-primary">
          <AnimatedScore value={totalScore} />/{maxScore}
        </p>
        <p className="text-muted-foreground text-sm font-medium">points</p>
      </motion.div>

      {/* Puzzle Breakdown */}
      <motion.div variants={staggerItem}>
        <Card className="border-3 border-foreground shadow-brutal">
          <CardContent className="p-4 flex flex-col gap-3">
            {puzzleResults.map((result, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, ...spring.gentle }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{result.emoji_clue}</span>
                  <span
                    className={`inline-block w-7 h-7 rounded-lg border-2 border-foreground text-center text-sm leading-6 font-bold ${
                      result.status === "solved"
                        ? result.attempts === 1
                          ? "bg-green text-white"
                          : "bg-yellow text-foreground"
                        : "bg-destructive text-white"
                    }`}
                  >
                    {result.status === "solved"
                      ? result.attempts === 1
                        ? "🟩"
                        : "🟨"
                      : "🟥"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{result.score} pts</p>
                  {result.hintUsed && (
                    <p className="text-xs text-muted-foreground">hint used</p>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div className="flex flex-col gap-3" variants={staggerItem}>
        <motion.div whileTap={{ scale: 0.97, x: 2, y: 2 }} transition={spring.bouncy}>
          <Button
            onClick={handleShare}
            className="w-full h-12 text-base font-extrabold bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal brutal-press"
          >
            📤 Share Results
          </Button>
        </motion.div>
        {onPlayAgain && (
          <motion.div whileTap={{ scale: 0.97, x: 2, y: 2 }} transition={spring.bouncy}>
            <Button
              onClick={onPlayAgain}
              variant="outline"
              className="w-full h-12 text-base font-bold border-3 border-foreground shadow-brutal-sm brutal-press"
            >
              Play Again
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
