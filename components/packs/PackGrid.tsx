"use client";

import { PackCard } from "./PackCard";
import type { PuzzlePack } from "@/types/puzzle";

interface PackGridProps {
  packs: PuzzlePack[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function PackGrid({ packs, selectedIds, onToggle }: PackGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {packs.map((pack) => (
        <PackCard
          key={pack.id}
          name={pack.name}
          emoji_icon={pack.emoji_icon}
          description={pack.description}
          selected={selectedIds.includes(pack.id)}
          onClick={() => onToggle(pack.id)}
        />
      ))}
    </div>
  );
}
