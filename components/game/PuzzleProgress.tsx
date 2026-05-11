"use client";

interface PuzzleProgressProps {
  current: number;
  total: number;
}

export function PuzzleProgress({ current, total }: PuzzleProgressProps) {
  const progress = ((current) / total) * 100;

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground text-center">
        Puzzle {current} of {total}
      </p>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
