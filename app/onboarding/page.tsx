"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";

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

const emojiAnimations = [
  { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] },
  { y: [0, -15, 0], scale: [1, 1.05, 1] },
  { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("mojigram_onboarded", "true");
      router.push("/");
    }
  }

  const step = steps[currentStep];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-background">
      <div className="max-w-sm w-full flex flex-col gap-8 text-center">
        {/* Step indicator */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full border-2 border-foreground ${
                i === currentStep
                  ? "bg-primary"
                  : i < currentStep
                  ? "bg-primary/40"
                  : "bg-muted"
              }`}
              animate={{
                width: i === currentStep ? 32 : 16,
              }}
              transition={spring.gentle}
            />
          ))}
        </div>

        {/* Content with AnimatePresence */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            className="flex flex-col gap-4 items-center"
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={spring.gentle}
          >
            <div className="w-24 h-24 rounded-xl bg-purple-light border-3 border-foreground shadow-brutal flex items-center justify-center">
              <motion.span
                className="text-5xl inline-block"
                animate={emojiAnimations[currentStep]}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              >
                {step.emoji}
              </motion.span>
            </div>
            <h2 className="font-heading text-2xl font-extrabold">{step.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <motion.div whileTap={{ scale: 0.97, x: 2, y: 2 }} transition={spring.bouncy}>
            <Button
              onClick={handleNext}
              className="w-full h-12 text-base font-extrabold bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal brutal-press"
            >
              {currentStep < steps.length - 1 ? "Next" : "Let's Play!"}
            </Button>
          </motion.div>
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
