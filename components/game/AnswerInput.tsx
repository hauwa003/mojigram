"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  shake?: boolean;
}

export function AnswerInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Type your answer...",
  shake = false,
}: AnswerInputProps) {
  return (
    <motion.div
      animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            onSubmit();
          }
        }}
        disabled={disabled}
        placeholder={placeholder}
        className="text-center text-lg h-14 rounded-xl border-3 border-foreground shadow-brutal-sm focus-visible:shadow-brutal-purple focus-visible:border-purple bg-background"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </motion.div>
  );
}
