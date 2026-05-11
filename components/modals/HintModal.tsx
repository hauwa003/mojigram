"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HintModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hint: string;
  onUseHint: () => void;
  hintAlreadyUsed: boolean;
}

export function HintModal({
  open,
  onOpenChange,
  hint,
  onUseHint,
  hintAlreadyUsed,
}: HintModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            💡 Hint
          </DialogTitle>
          <DialogDescription>
            {hintAlreadyUsed
              ? "You already used your hint for this puzzle."
              : "Using a hint will cost you 2 points. Are you sure?"}
          </DialogDescription>
        </DialogHeader>

        {hintAlreadyUsed ? (
          <div className="bg-yellow-light rounded-lg p-4 text-center">
            <p className="text-foreground font-medium">{hint}</p>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Never mind
            </Button>
            <Button
              className="flex-1 bg-yellow hover:bg-yellow/90 text-foreground"
              onClick={() => {
                onUseHint();
                onOpenChange(false);
              }}
            >
              Show hint (-2 pts)
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
