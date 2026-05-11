import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In-memory store for MVP
const customPuzzles = new Map<string, {
  id: string;
  creatorAnonId: string;
  emojiClue: string;
  canonicalAnswer: string;
  acceptedAnswers: string[];
  hint: string;
  shareSlug: string;
  playCount: number;
}>();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { creatorAnonId, emojiClue, canonicalAnswer, acceptedAnswers, hint } = body;

  const id = `custom_${nanoid(12)}`;
  const shareSlug = nanoid(8);

  const puzzle = {
    id,
    creatorAnonId,
    emojiClue,
    canonicalAnswer,
    acceptedAnswers: acceptedAnswers || [],
    hint: hint || "",
    shareSlug,
    playCount: 0,
  };

  customPuzzles.set(id, puzzle);

  return NextResponse.json({
    id,
    shareSlug,
    shareUrl: `/c/${shareSlug}`,
  });
}

export async function GET() {
  return NextResponse.json({
    puzzles: Array.from(customPuzzles.values()),
  });
}
