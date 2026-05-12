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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={spring.bouncy}
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-purple"
      >
        {loading ? "Checking..." : "Submit"}
      </Button>
    </motion.div>
  );
}
