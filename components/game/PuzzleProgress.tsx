"use client";

interface PuzzleProgressProps {
  current: number;
  total: number;
}

export function PuzzleProgress({ current, total }: PuzzleProgressProps) {
  return (
    <span className="text-sm font-heading font-bold text-muted-foreground">
      {current}/{total}
    </span>
  );
}
