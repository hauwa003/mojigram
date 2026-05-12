import { NextRequest, NextResponse } from "next/server";
import { getPuzzleByLevel, stripAnswers, getLevelCount } from "@/lib/game/puzzleData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pack = searchParams.get("pack");
  const difficulty = searchParams.get("difficulty") as
    | "easy"
    | "medium"
    | "hard"
    | null;
  const level = searchParams.get("level");

  if (!pack || !difficulty || !level) {
    return NextResponse.json(
      { error: "Missing required params: pack, difficulty, level" },
      { status: 400 }
    );
  }

  if (!["easy", "medium", "hard"].includes(difficulty)) {
    return NextResponse.json(
      { error: "Invalid difficulty. Must be easy, medium, or hard." },
      { status: 400 }
    );
  }

  const levelOrder = parseInt(level, 10);
  if (isNaN(levelOrder) || levelOrder < 1) {
    return NextResponse.json(
      { error: "Invalid level number" },
      { status: 400 }
    );
  }

  const totalLevels = getLevelCount(pack, difficulty);
  if (levelOrder > totalLevels) {
    return NextResponse.json(
      { error: "Level not found" },
      { status: 404 }
    );
  }

  const puzzle = getPuzzleByLevel(pack, difficulty, levelOrder);
  if (!puzzle) {
    return NextResponse.json(
      { error: "Puzzle not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    puzzle: stripAnswers(puzzle),
    totalLevels,
  });
}
