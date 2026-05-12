"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export function ResultGrid({
  puzzleResults,
  totalScore,
  maxScore,
  rankLabel,
  shareText,
  onPlayAgain,
}: ResultGridProps) {
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
    <div className="flex flex-col gap-6">
      {/* Score Summary */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="font-heading text-3xl font-bold">{rankLabel}</h2>
        <p className="text-4xl font-heading font-bold text-primary">
          {totalScore}/{maxScore}
        </p>
        <p className="text-muted-foreground text-sm">points</p>
      </div>

      {/* Puzzle Breakdown */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3">
          {puzzleResults.map((result, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{result.emoji_clue}</span>
                <span
                  className={`inline-block w-6 h-6 rounded text-center text-sm leading-6 ${
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
                <p className="font-semibold">{result.score} pts</p>
                {result.hintUsed && (
                  <p className="text-xs text-muted-foreground">hint used</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleShare}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          📤 Share Results
        </Button>
        {onPlayAgain && (
          <Button
            onClick={onPlayAgain}
            variant="outline"
            className="w-full h-12 text-base"
          >
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
}
