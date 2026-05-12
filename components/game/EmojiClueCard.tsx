"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface EmojiClueCardProps {
  emojiClue: string;
  accessibilityLabel: string;
}

export function EmojiClueCard({ emojiClue, accessibilityLabel }: EmojiClueCardProps) {
  return (
    <motion.div
      key={emojiClue}
      className="flex items-center justify-center py-8"
      role="img"
      aria-label={accessibilityLabel}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={spring.bouncy}
    >
      <span className="text-4xl sm:text-5xl tracking-wider select-none">
        {emojiClue}
      </span>
    </motion.div>
  );
}
