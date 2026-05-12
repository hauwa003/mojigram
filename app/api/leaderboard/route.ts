import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import type { LeaderboardEntry } from "@/types/game";

// In-memory leaderboard store for MVP (replace with Supabase later)
const leaderboard = new Map<string, LeaderboardEntry>();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { anonId, nickname, sessionType, totalScore, maxScore } = body;

  if (!anonId || !nickname || !sessionType || totalScore == null || maxScore == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry: LeaderboardEntry = {
    id: `lb_${nanoid(12)}`,
    anonId,
    nickname,
    sessionType,
    totalScore,
    maxScore,
    completedAt: new Date().toISOString(),
  };

  leaderboard.set(entry.id, entry);

  return NextResponse.json({ id: entry.id });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "alltime";

  let entries = Array.from(leaderboard.values());

  if (type === "daily") {
    const today = new Date().toISOString().slice(0, 10);
    entries = entries.filter((e) => e.completedAt.slice(0, 10) === today);
  }

  // Sort by totalScore desc, then by completedAt asc (earlier = better tiebreak)
  entries.sort((a, b) => b.totalScore - a.totalScore || a.completedAt.localeCompare(b.completedAt));

  // Limit to top 50
  entries = entries.slice(0, 50);

  return NextResponse.json({ entries });
}
