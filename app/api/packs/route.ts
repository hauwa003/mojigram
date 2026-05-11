import { NextResponse } from "next/server";
import { getAllPacks } from "@/lib/game/puzzleData";

export async function GET() {
  const packs = getAllPacks();
  return NextResponse.json({ packs });
}
