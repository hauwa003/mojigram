"use client";

import { Button } from "@/components/ui/button";

interface HintButtonProps {
  onClick: () => void;
  disabled?: boolean;
  hintUsed?: boolean;
}

export function HintButton({ onClick, disabled = false, hintUsed = false }: HintButtonProps) {
  if (hintUsed) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        💡 Hint used (-2 points)
      </p>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className="text-sm text-muted-foreground hover:text-primary"
    >
      💡 Need a tiny nudge?
    </Button>
  );
}
