"use client";

interface AttemptsIndicatorProps {
  attempts: number;
  maxAttempts: number;
}

export function AttemptsIndicator({ attempts, maxAttempts }: AttemptsIndicatorProps) {
  const remaining = maxAttempts - attempts;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxAttempts }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-colors ${
            i < attempts ? "bg-orange" : "bg-muted"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1.5">
        {remaining} left
      </span>
    </div>
  );
}
