"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SubmitButton({ onClick, disabled = false, loading = false }: SubmitButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.97, x: 2, y: 2 }}
      transition={spring.bouncy}
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full h-14 text-base font-extrabold rounded-xl bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal brutal-press"
      >
        {loading ? "Checking..." : "Submit"}
      </Button>
    </motion.div>
  );
}
