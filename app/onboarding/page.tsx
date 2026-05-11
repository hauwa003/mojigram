"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const steps = [
  {
    emoji: "🎯",
    title: "Decode the Emojis",
    description:
      "Each puzzle gives you a set of emojis that represent a word, phrase, movie, song, or more. Your job? Figure out what they mean!",
  },
  {
    emoji: "⌨️",
    title: "Type Your Answer",
    description:
      "You get 3 attempts per puzzle. Type your guess and hit submit. Don't worry about spelling — we're pretty forgiving!",
  },
  {
    emoji: "💡",
    title: "Hints & Sharing",
    description:
      "Stuck? Use a hint (costs 2 points). When you're done, share your emoji scorecard with friends!",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/onboarding/vibe");
    }
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full space-y-8 text-center">
        {/* Step indicator */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStep
                  ? "w-8 bg-primary"
                  : i < currentStep
                  ? "w-4 bg-primary/40"
                  : "w-4 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <span className="text-6xl inline-block">{step.emoji}</span>
          <h2 className="font-heading text-2xl font-bold">{step.title}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleNext}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
          >
            {currentStep < steps.length - 1 ? "Next" : "Choose Your Vibe"}
          </Button>
          {currentStep === 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.setItem("mojigram_onboarded", "true");
                router.push("/");
              }}
              className="text-sm text-muted-foreground"
            >
              Skip — I know what I&apos;m doing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
