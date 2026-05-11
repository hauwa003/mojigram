"use client";

import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <Badge variant="secondary" className="text-base px-3 py-1 font-heading">
      ⭐ {score}
    </Badge>
  );
}
