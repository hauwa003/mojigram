"use client";

import { Input } from "@/components/ui/input";

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function AnswerInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Type your answer...",
}: AnswerInputProps) {
  return (
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
      className="text-center text-lg h-12 rounded-xl"
      autoComplete="off"
      autoCapitalize="off"
      spellCheck={false}
    />
  );
}
