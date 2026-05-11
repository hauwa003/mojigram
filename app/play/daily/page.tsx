"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { track } from "@/lib/analytics/track";
import type { PuzzleForPlay } from "@/types/puzzle";

export default function DailyPage() {
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function startDaily() {
      try {
        const anonId = createAnonymousId();

        // Fetch daily puzzles
        const dailyRes = await fetch("/api/daily");
        if (!dailyRes.ok) throw new Error("No daily challenge available");
        const dailyData = await dailyRes.json();

        // Create session
        const sessionRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anonId,
            sessionType: "daily",
            puzzleIds: dailyData.puzzles.map((p: PuzzleForPlay) => p.id),
          }),
        });
        const sessionData = await sessionRes.json();

        setPuzzles(dailyData.puzzles);
        setSessionId(sessionData.sessionId);
        track("daily_started");
      } catch {
        setError("No daily challenge available today. Check back tomorrow!");
      } finally {
        setLoading(false);
      }
    }

    startDaily();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <span className="text-4xl animate-bounce inline-block">📅</span>
            <p className="text-muted-foreground">Loading today&apos;s challenge...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <span className="text-4xl">😅</span>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">Daily Mojigram</h2>
        <GameScreen
          sessionId={sessionId}
          sessionType="daily"
          puzzles={puzzles}
        />
      </div>
    </AppShell>
  );
}
