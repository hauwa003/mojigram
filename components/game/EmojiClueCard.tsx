"use client";

interface EmojiClueCardProps {
  emojiClue: string;
  accessibilityLabel: string;
}

export function EmojiClueCard({ emojiClue, accessibilityLabel }: EmojiClueCardProps) {
  return (
    <div
      className="flex items-center justify-center py-8"
      role="img"
      aria-label={accessibilityLabel}
    >
      <span className="text-6xl sm:text-7xl tracking-wider select-none">
        {emojiClue}
      </span>
    </div>
  );
}
