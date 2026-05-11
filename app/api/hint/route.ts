import { NextRequest, NextResponse } from "next/server";
import { getPuzzleById } from "@/lib/game/puzzleData";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { puzzleId } = body;

  const puzzle = getPuzzleById(puzzleId);
  if (!puzzle) {
    return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
  }

  return NextResponse.json({ hint: puzzle.hint });
}
