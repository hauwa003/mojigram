"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HintButtonProps {
  onClick: () => void;
  disabled?: boolean;
  hintUsed?: boolean;
}

export function HintButton({ onClick, disabled = false, hintUsed = false }: HintButtonProps) {
  if (hintUsed) {
    return (
      <motion.p
        className="text-sm text-muted-foreground text-center"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        💡 Hint used (-2 points)
      </motion.p>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className="text-sm text-muted-foreground hover:text-primary"
    >
      <motion.span
        className="inline-block mr-1"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💡
      </motion.span>
      Need a tiny nudge?
    </Button>
  );
}
