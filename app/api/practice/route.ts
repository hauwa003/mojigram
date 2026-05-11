import { NextRequest, NextResponse } from "next/server";
import { getRandomPuzzles, getPuzzlesByPack, stripAnswers } from "@/lib/game/puzzleData";
import type { Puzzle } from "@/types/puzzle";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pack = searchParams.get("pack");
  const count = parseInt(searchParams.get("count") || "5", 10);

  if (pack) {
    const puzzles = getPuzzlesByPack(pack);
    const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
    return NextResponse.json({
      puzzles: shuffled.slice(0, count).map(stripAnswers),
    });
  }

  // General mode — random from all
  const puzzles = getRandomPuzzles(count);
  return NextResponse.json({ puzzles });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { packIds, count = 5 } = body;

  const puzzles = getRandomPuzzles(count, packIds);
  return NextResponse.json({ puzzles });
}
