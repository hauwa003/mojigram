import { NextRequest, NextResponse } from "next/server";
import { getPuzzleById } from "@/lib/game/puzzleData";
import { normalizeAnswer } from "@/lib/game/normalizeAnswer";
import { calculateScore } from "@/lib/game/calculateScore";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { puzzleId, guess, attempt, hintUsed } = body;

  const puzzle = getPuzzleById(puzzleId);
  if (!puzzle) {
    return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
  }

  const normalizedGuess = normalizeAnswer(guess);
  const normalizedCanonical = normalizeAnswer(puzzle.canonical_answer);

  const acceptedNormalized = [
    normalizedCanonical,
    ...puzzle.accepted_answers.map(normalizeAnswer),
  ];

  const correct = acceptedNormalized.includes(normalizedGuess);
  const score = correct ? calculateScore(attempt, hintUsed || false) : 0;

  // If failed (3rd wrong attempt), also return the answer
  const maxAttempts = 3;
  const failed = !correct && attempt >= maxAttempts;

  return NextResponse.json({
    correct,
    score,
    ...(failed && { answer: puzzle.canonical_answer }),
  });
}
