"use client";

import { Card, CardContent } from "@/components/ui/card";

interface PackCardProps {
  name: string;
  emoji_icon: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function PackCard({
  name,
  emoji_icon,
  description,
  selected,
  onClick,
}: PackCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all ${
        selected
          ? "border-2 border-primary shadow-md ring-2 ring-primary/20"
          : "border border-border hover:shadow-sm"
      }`}
    >
      <CardContent className="p-4 text-center space-y-1.5">
        <span className="text-3xl">{emoji_icon}</span>
        <h3 className="font-heading text-sm font-bold">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        {selected && (
          <span className="inline-block text-xs bg-primary text-white px-2 py-0.5 rounded-full">
            Selected
          </span>
        )}
      </CardContent>
    </Card>
  );
}
