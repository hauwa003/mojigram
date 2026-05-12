"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { spring } from "@/lib/motion";

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
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={spring.bouncy}
    >
      <Card
        onClick={onClick}
        className={`cursor-pointer transition-all ${
          selected
            ? "border-2 border-primary shadow-purple ring-2 ring-primary/20"
            : "border-2 border-border hover:shadow-sm"
        }`}
      >
        <CardContent className="p-4 text-center flex flex-col gap-1.5">
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
    </motion.div>
  );
}
