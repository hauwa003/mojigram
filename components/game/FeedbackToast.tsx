"use client";

import { toast } from "sonner";

const correctMessages = [
  "Nailed it! 🎯",
  "You're a genius! 🧠",
  "Boom! Got it! 💥",
  "Emoji master! 👑",
  "Crushed it! 💪",
];

const wrongMessages = [
  "Not quite! Try again 🤔",
  "So close! One more try? 💭",
  "Hmm, not that one 🙈",
  "Keep going! You got this 💪",
];

const failedMessages = [
  "Better luck next time! 🍀",
  "That was a tough one! 😅",
  "Don't worry, keep playing! 🎮",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function showCorrectFeedback() {
  toast.success(randomFrom(correctMessages));
}

export function showWrongFeedback() {
  toast.error(randomFrom(wrongMessages));
}

export function showFailedFeedback(answer: string) {
  toast.error(`${randomFrom(failedMessages)} The answer was: ${answer}`);
}
