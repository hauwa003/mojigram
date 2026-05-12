"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const prevScore = useRef(score);
  const springValue = useSpring(score, { stiffness: 200, damping: 20 });
  const display = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    springValue.set(score);
    prevScore.current = score;
  }, [score, springValue]);

  const changed = score !== prevScore.current;

  return (
    <motion.div
      animate={changed ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      <Badge variant="secondary" className="text-base px-3 py-1 font-heading">
        ⭐ <motion.span>{display}</motion.span>
      </Badge>
    </motion.div>
  );
}
