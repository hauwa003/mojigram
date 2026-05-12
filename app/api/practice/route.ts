import { NextRequest, NextResponse } from "next/server";
import { getRandomPuzzles, getPuzzlesByPack, stripAnswers } from "@/lib/game/puzzleData";

type Difficulty = "easy" | "medium" | "hard";

function parseDifficulty(val: string | null): Difficulty | undefined {
  if (val && ["easy", "medium", "hard"].includes(val)) return val as Difficulty;
  return undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pack = searchParams.get("pack");
  const count = parseInt(searchParams.get("count") || "5", 10);
  const difficulty = parseDifficulty(searchParams.get("difficulty"));

  if (pack) {
    let puzzles = getPuzzlesByPack(pack);
    if (difficulty) {
      puzzles = puzzles.filter((p) => p.difficulty === difficulty);
    }
    const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
    return NextResponse.json({
      puzzles: shuffled.slice(0, count).map(stripAnswers),
    });
  }

  // General mode — random from all (optionally filtered by difficulty)
  const puzzles = getRandomPuzzles(count, undefined, difficulty);
  return NextResponse.json({ puzzles });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { packIds, count = 5, difficulty } = body;

  const puzzles = getRandomPuzzles(
    count,
    packIds,
    parseDifficulty(difficulty)
  );
  return NextResponse.json({ puzzles });
}
