"use client";

import { motion } from "framer-motion";

interface AttemptsIndicatorProps {
  attempts: number;
  maxAttempts: number;
}

export function AttemptsIndicator({ attempts, maxAttempts }: AttemptsIndicatorProps) {
  const remaining = maxAttempts - attempts;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxAttempts }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-3.5 h-3.5 rounded-full ${
            i < attempts ? "bg-orange" : "bg-muted"
          }`}
          animate={
            i === attempts - 1 && i < maxAttempts
              ? { scale: [1, 1.4, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.3 }}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1.5">
        {remaining} left
      </span>
    </div>
  );
}
