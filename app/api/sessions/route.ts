import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In-memory session store for MVP (replace with Supabase later)
const sessions = new Map<string, {
  id: string;
  anonId: string;
  sessionType: string;
  puzzleIds: string[];
  status: string;
  totalScore: number;
  startedAt: string;
}>();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { anonId, sessionType, puzzleIds } = body;

  const sessionId = `sess_${nanoid(12)}`;

  sessions.set(sessionId, {
    id: sessionId,
    anonId,
    sessionType,
    puzzleIds: puzzleIds || [],
    status: "active",
    totalScore: 0,
    startedAt: new Date().toISOString(),
  });

  return NextResponse.json({ sessionId });
}

export { sessions };
