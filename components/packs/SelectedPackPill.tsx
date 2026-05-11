"use client";

import { Badge } from "@/components/ui/badge";

interface SelectedPackPillProps {
  name: string;
  emoji_icon: string;
  onRemove: () => void;
}

export function SelectedPackPill({ name, emoji_icon, onRemove }: SelectedPackPillProps) {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 pr-1 cursor-pointer hover:bg-secondary/80"
      onClick={onRemove}
    >
      <span>{emoji_icon}</span>
      <span>{name}</span>
      <span className="ml-0.5 text-muted-foreground hover:text-foreground">×</span>
    </Badge>
  );
}
