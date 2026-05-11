import { NextRequest, NextResponse } from "next/server";
import { sessions } from "../route";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = sessions.get(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ session });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = sessions.get(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const body = await request.json();

  if (body.status === "completed") {
    session.status = "completed";
    session.totalScore = body.totalScore || session.totalScore;
  }

  sessions.set(sessionId, session);

  return NextResponse.json({ session });
}
