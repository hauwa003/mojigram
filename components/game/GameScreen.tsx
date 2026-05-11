"use client";

import { useReducer, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { EmojiClueCard } from "./EmojiClueCard";
import { AnswerInput } from "./AnswerInput";
import { SubmitButton } from "./SubmitButton";
import { HintButton } from "./HintButton";
import { AttemptsIndicator } from "./AttemptsIndicator";
import { PuzzleProgress } from "./PuzzleProgress";
import { ScoreBadge } from "./ScoreBadge";
import { ResultGrid } from "./ResultGrid";
import { HintModal } from "@/components/modals/HintModal";
import { showCorrectFeedback, showWrongFeedback, showFailedFeedback } from "./FeedbackToast";
import { track } from "@/lib/analytics/track";
import type { PuzzleForPlay } from "@/types/puzzle";
import type { GameState, PuzzleState, GameAction, SessionResult, PuzzleResult } from "@/types/game";
import type { SessionType } from "@/types/game";

function getRankLabel(score: number, maxScore: number): string {
  const pct = maxScore > 0 ? score / maxScore : 0;
  if (pct === 1) return "Emoji Legend! 👑";
  if (pct >= 0.8) return "Emoji Master! 🏆";
  if (pct >= 0.6) return "Emoji Pro! ⭐";
  if (pct >= 0.4) return "Getting There! 💪";
  return "Keep Practicing! 🌱";
}

function initGameState(
  sessionId: string,
  sessionType: SessionType,
  puzzles: PuzzleForPlay[]
): GameState {
  return {
    sessionId,
    sessionType,
    puzzles,
    puzzleStates: puzzles.map((puzzle) => ({
      puzzle,
      attempts: 0,
      maxAttempts: 3,
      hintUsed: false,
      score: 0,
      status: "active",
      guesses: [],
    })),
    currentPuzzleIndex: 0,
    totalScore: 0,
    status: "playing",
    startedAt: new Date().toISOString(),
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  const currentPuzzle = state.puzzleStates[state.currentPuzzleIndex];
  if (!currentPuzzle) return state;

  switch (action.type) {
    case "SUBMIT_GUESS": {
      const newAttempts = currentPuzzle.attempts + 1;
      const newGuesses = [...currentPuzzle.guesses, action.guess];

      if (action.correct) {
        const updatedPuzzle: PuzzleState = {
          ...currentPuzzle,
          attempts: newAttempts,
          guesses: newGuesses,
          score: action.score,
          status: "solved",
        };
        const newStates = [...state.puzzleStates];
        newStates[state.currentPuzzleIndex] = updatedPuzzle;

        return {
          ...state,
          puzzleStates: newStates,
          totalScore: state.totalScore + action.score,
        };
      }

      // Wrong guess
      const failed = newAttempts >= currentPuzzle.maxAttempts;
      const updatedPuzzle: PuzzleState = {
        ...currentPuzzle,
        attempts: newAttempts,
        guesses: newGuesses,
        status: failed ? "failed" : "active",
      };
      const newStates = [...state.puzzleStates];
      newStates[state.currentPuzzleIndex] = updatedPuzzle;

      return { ...state, puzzleStates: newStates };
    }

    case "USE_HINT": {
      const updatedPuzzle: PuzzleState = {
        ...currentPuzzle,
        hintUsed: true,
      };
      const newStates = [...state.puzzleStates];
      newStates[state.currentPuzzleIndex] = updatedPuzzle;
      return { ...state, puzzleStates: newStates };
    }

    case "NEXT_PUZZLE": {
      const nextIndex = state.currentPuzzleIndex + 1;
      if (nextIndex >= state.puzzles.length) {
        return { ...state, status: "completed" };
      }
      return { ...state, currentPuzzleIndex: nextIndex };
    }

    case "SKIP_PUZZLE": {
      const updatedPuzzle: PuzzleState = {
        ...currentPuzzle,
        status: "failed",
      };
      const newStates = [...state.puzzleStates];
      newStates[state.currentPuzzleIndex] = updatedPuzzle;
      return { ...state, puzzleStates: newStates };
    }

    case "COMPLETE_SESSION":
      return { ...state, status: "completed" };

    default:
      return state;
  }
}

interface GameScreenProps {
  sessionId: string;
  sessionType: SessionType;
  puzzles: PuzzleForPlay[];
  onPlayAgain?: () => void;
}

export function GameScreen({
  sessionId,
  sessionType,
  puzzles,
  onPlayAgain,
}: GameScreenProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(
    gameReducer,
    initGameState(sessionId, sessionType, puzzles)
  );
  const [guess, setGuess] = useState("");
  const [loading, setLoading] = useState(false);
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [currentHint, setCurrentHint] = useState("");

  const currentPuzzleState = state.puzzleStates[state.currentPuzzleIndex];
  const currentPuzzle = currentPuzzleState?.puzzle;

  const handleSubmit = useCallback(async () => {
    if (!guess.trim() || loading || !currentPuzzle) return;

    setLoading(true);
    try {
      const res = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: state.sessionId,
          puzzleId: currentPuzzle.id,
          guess: guess.trim(),
          attempt: currentPuzzleState.attempts + 1,
          hintUsed: currentPuzzleState.hintUsed,
        }),
      });

      const data = await res.json();

      track("guess_submitted", {
        sessionType,
        correct: data.correct,
        attempt: currentPuzzleState.attempts + 1,
      });

      dispatch({
        type: "SUBMIT_GUESS",
        guess: guess.trim(),
        correct: data.correct,
        score: data.score || 0,
      });

      if (data.correct) {
        showCorrectFeedback();
        setGuess("");
        // Auto-advance after short delay
        setTimeout(() => {
          if (state.currentPuzzleIndex + 1 >= state.puzzles.length) {
            dispatch({ type: "COMPLETE_SESSION" });
          } else {
            dispatch({ type: "NEXT_PUZZLE" });
          }
        }, 1200);
      } else if (currentPuzzleState.attempts + 1 >= currentPuzzleState.maxAttempts) {
        showFailedFeedback(data.answer || "???");
        setGuess("");
        setTimeout(() => {
          if (state.currentPuzzleIndex + 1 >= state.puzzles.length) {
            dispatch({ type: "COMPLETE_SESSION" });
          } else {
            dispatch({ type: "NEXT_PUZZLE" });
          }
        }, 2000);
      } else {
        showWrongFeedback();
        setGuess("");
      }
    } catch {
      showWrongFeedback();
    } finally {
      setLoading(false);
    }
  }, [guess, loading, currentPuzzle, currentPuzzleState, state, sessionType]);

  const handleHint = useCallback(async () => {
    if (!currentPuzzle) return;

    try {
      const res = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          puzzleId: currentPuzzle.id,
        }),
      });
      const data = await res.json();
      setCurrentHint(data.hint || currentPuzzle.hint);
      dispatch({ type: "USE_HINT" });
      track("hint_used", { sessionType });
    } catch {
      setCurrentHint(currentPuzzle.hint);
      dispatch({ type: "USE_HINT" });
    }
  }, [currentPuzzle, sessionType]);

  // Game completed — show results
  if (state.status === "completed") {
    const maxScore = state.puzzles.length * 10;
    const puzzleResults: PuzzleResult[] = state.puzzleStates.map((ps) => ({
      emoji_clue: ps.puzzle.emoji_clue,
      status: ps.status === "solved" ? "solved" : "failed",
      attempts: ps.attempts,
      hintUsed: ps.hintUsed,
      score: ps.score,
    }));

    const rankLabel = getRankLabel(state.totalScore, maxScore);

    const emojiGrid = puzzleResults
      .map((r) =>
        r.status === "solved"
          ? r.attempts === 1
            ? "🟩"
            : "🟨"
          : "🟥"
      )
      .join("");

    const shareText = `Mojigram ${sessionType === "daily" ? "Daily" : sessionType} 🎯\n${emojiGrid}\nScore: ${state.totalScore}/${maxScore}\n\nPlay at mojigram.app`;

    track("session_completed", {
      sessionType,
      score: state.totalScore,
      maxScore,
    });

    return (
      <div className="py-4">
        <ResultGrid
          puzzleResults={puzzleResults}
          totalScore={state.totalScore}
          maxScore={maxScore}
          rankLabel={rankLabel}
          shareText={shareText}
          sessionType={sessionType}
          onPlayAgain={onPlayAgain || (() => router.push("/"))}
        />
      </div>
    );
  }

  if (!currentPuzzle || !currentPuzzleState) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No puzzles available</p>
      </div>
    );
  }

  const isPuzzleDone =
    currentPuzzleState.status === "solved" ||
    currentPuzzleState.status === "failed";

  return (
    <div className="space-y-6 py-4">
      {/* Progress + Score */}
      <div className="flex items-center justify-between">
        <PuzzleProgress
          current={state.currentPuzzleIndex + 1}
          total={state.puzzles.length}
        />
        <ScoreBadge score={state.totalScore} />
      </div>

      {/* Emoji Clue */}
      <EmojiClueCard
        emojiClue={currentPuzzle.emoji_clue}
        accessibilityLabel={currentPuzzle.accessibility_label}
      />

      {/* Attempts */}
      <div className="flex justify-center">
        <AttemptsIndicator
          attempts={currentPuzzleState.attempts}
          maxAttempts={currentPuzzleState.maxAttempts}
        />
      </div>

      {/* Input + Submit */}
      {!isPuzzleDone && (
        <div className="space-y-3">
          <AnswerInput
            value={guess}
            onChange={setGuess}
            onSubmit={handleSubmit}
            disabled={loading}
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={!guess.trim()}
            loading={loading}
          />
        </div>
      )}

      {/* Hint */}
      {!isPuzzleDone && (
        <div className="text-center">
          <HintButton
            onClick={() => {
              if (currentPuzzleState.hintUsed) {
                setCurrentHint(currentPuzzle.hint);
                setHintModalOpen(true);
              } else {
                setHintModalOpen(true);
              }
            }}
            hintUsed={currentPuzzleState.hintUsed}
          />
          {currentPuzzleState.hintUsed && currentHint && (
            <p className="mt-2 text-sm bg-yellow-light rounded-lg px-4 py-2 text-foreground">
              {currentHint}
            </p>
          )}
        </div>
      )}

      {/* Hint Modal */}
      <HintModal
        open={hintModalOpen}
        onOpenChange={setHintModalOpen}
        hint={currentHint || currentPuzzle.hint}
        onUseHint={handleHint}
        hintAlreadyUsed={currentPuzzleState.hintUsed}
      />
    </div>
  );
}
