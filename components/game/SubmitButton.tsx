"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SubmitButton({ onClick, disabled = false, loading = false }: SubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90"
    >
      {loading ? "Checking..." : "Submit"}
    </Button>
  );
}
