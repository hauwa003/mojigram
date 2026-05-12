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
        className={`cursor-pointer transition-all border-3 border-foreground ${
          selected
            ? "bg-purple-light shadow-brutal-purple"
            : "bg-card shadow-brutal-sm hover:shadow-brutal"
        }`}
      >
        <CardContent className="p-4 text-center flex flex-col gap-1.5">
          <span className="text-3xl">{emoji_icon}</span>
          <h3 className="font-heading text-sm font-extrabold">{name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
          {selected && (
            <span className="inline-block text-xs bg-primary text-white px-2 py-0.5 rounded-full border-2 border-foreground font-bold">
              Selected
            </span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
