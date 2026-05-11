import { NextResponse } from "next/server";
import { getDailyPuzzles } from "@/lib/game/puzzleData";

export async function GET() {
  const puzzles = getDailyPuzzles();

  if (puzzles.length === 0) {
    return NextResponse.json(
      { error: "No daily challenge available today" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    date: new Date().toISOString().split("T")[0],
    puzzles,
  });
}
