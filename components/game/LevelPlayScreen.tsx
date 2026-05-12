"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmojiClueCard } from "./EmojiClueCard";
import { AnswerInput } from "./AnswerInput";
import { SubmitButton } from "./SubmitButton";
import { HintButton } from "./HintButton";
import { AttemptsIndicator } from "./AttemptsIndicator";
import { HintModal } from "@/components/modals/HintModal";
import { useConfetti } from "./ConfettiOverlay";
import {
  showCorrectFeedback,
  showWrongFeedback,
  showFailedFeedback,
} from "./FeedbackToast";
import { LevelCompleteCard } from "@/components/levels/LevelCompleteCard";
import { completeLevel } from "@/lib/game/progressManager";
import { spring } from "@/lib/motion";
import type { PuzzleForPlay } from "@/types/puzzle";

interface LevelPlayScreenProps {
  puzzle: PuzzleForPlay;
  packSlug: string;
  difficulty: "easy" | "medium" | "hard";
  levelOrder: number;
  totalLevels: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToLevels: () => void;
}

export function LevelPlayScreen({
  puzzle,
  packSlug,
  difficulty,
  levelOrder,
  totalLevels,
  onNextLevel,
  onRetry,
  onBackToLevels,
}: LevelPlayScreenProps) {
  const [guess, setGuess] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [status, setStatus] = useState<"active" | "solved" | "failed">("active");
  const [score, setScore] = useState(0);
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [currentHint, setCurrentHint] = useState("");
  const [shake, setShake] = useState(false);
  const { fire: fireConfetti, ConfettiOverlay } = useConfetti();

  const maxAttempts = 3;

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!guess.trim() || loading || status !== "active") return;

    setLoading(true);
    try {
      const res = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          puzzleId: puzzle.id,
          guess: guess.trim(),
          attempt: attempts + 1,
          hintUsed,
        }),
      });

      const data = await res.json();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (data.correct) {
        showCorrectFeedback();
        fireConfetti();
        setScore(data.score || 0);
        setStatus("solved");
        setGuess("");
        completeLevel(packSlug, difficulty, levelOrder, {
          score: data.score || 0,
          attempts: newAttempts,
          hintUsed,
          completedAt: new Date().toISOString(),
        });
      } else if (newAttempts >= maxAttempts) {
        showFailedFeedback(data.answer || "???");
        triggerShake();
        setStatus("failed");
        setGuess("");
      } else {
        showWrongFeedback();
        triggerShake();
        setGuess("");
      }
    } catch {
      showWrongFeedback();
    } finally {
      setLoading(false);
    }
  }, [guess, loading, status, puzzle.id, attempts, hintUsed, packSlug, difficulty, levelOrder, fireConfetti, triggerShake]);

  const handleHint = useCallback(async () => {
    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ puzzleId: puzzle.id }),
      });
      const data = await res.json();
      setCurrentHint(data.hint || puzzle.hint);
      setHintUsed(true);
    } catch {
      setCurrentHint(puzzle.hint);
      setHintUsed(true);
    }
  }, [puzzle.id, puzzle.hint]);

  const hasNextLevel = levelOrder < totalLevels;
  const isDone = status === "solved" || status === "failed";

  if (isDone) {
    return (
      <div className="space-y-6 py-4">
        <ConfettiOverlay />
        {/* Show the emoji one more time */}
        <EmojiClueCard
          emojiClue={puzzle.emoji_clue}
          accessibilityLabel={puzzle.accessibility_label}
        />
        <LevelCompleteCard
          solved={status === "solved"}
          score={score}
          attempts={attempts}
          hintUsed={hintUsed}
          levelNumber={levelOrder}
          hasNextLevel={hasNextLevel}
          onNextLevel={onNextLevel}
          onRetry={onRetry}
          onBackToLevels={onBackToLevels}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <ConfettiOverlay />

      {/* Level indicator */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground font-heading">
          Level {levelOrder} of {totalLevels}
        </span>
      </div>

      {/* Emoji Clue */}
      <AnimatePresence mode="wait">
        <motion.div
          key={puzzle.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={spring.gentle}
        >
          <EmojiClueCard
            emojiClue={puzzle.emoji_clue}
            accessibilityLabel={puzzle.accessibility_label}
          />
        </motion.div>
      </AnimatePresence>

      {/* Attempts */}
      <div className="flex justify-center">
        <AttemptsIndicator attempts={attempts} maxAttempts={maxAttempts} />
      </div>

      {/* Input + Submit */}
      <div className="space-y-3">
        <AnswerInput
          value={guess}
          onChange={setGuess}
          onSubmit={handleSubmit}
          disabled={loading}
          shake={shake}
        />
        <SubmitButton
          onClick={handleSubmit}
          disabled={!guess.trim()}
          loading={loading}
        />
      </div>

      {/* Hint */}
      <div className="text-center">
        <HintButton
          onClick={() => {
            if (hintUsed) {
              setCurrentHint(puzzle.hint);
              setHintModalOpen(true);
            } else {
              setHintModalOpen(true);
            }
          }}
          hintUsed={hintUsed}
        />
        {hintUsed && currentHint && (
          <motion.p
            className="mt-2 text-sm bg-yellow-light rounded-lg px-4 py-2 text-foreground"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentHint}
          </motion.p>
        )}
      </div>

      <HintModal
        open={hintModalOpen}
        onOpenChange={setHintModalOpen}
        hint={currentHint || puzzle.hint}
        onUseHint={handleHint}
        hintAlreadyUsed={hintUsed}
      />
    </div>
  );
}
