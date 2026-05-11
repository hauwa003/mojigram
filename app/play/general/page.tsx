"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import type { PuzzleForPlay } from "@/types/puzzle";

export default function GeneralPage() {
  const router = useRouter();
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startGeneral() {
      try {
        const anonId = createAnonymousId();

        const res = await fetch("/api/practice?mode=general&count=5");
        if (!res.ok) throw new Error("Failed to load puzzles");
        const data = await res.json();

        const sessionRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anonId,
            sessionType: "general",
            puzzleIds: data.puzzles.map((p: PuzzleForPlay) => p.id),
          }),
        });
        const sessionData = await sessionRes.json();

        setPuzzles(data.puzzles);
        setSessionId(sessionData.sessionId);
      } catch {
        // Fall back to home
      } finally {
        setLoading(false);
      }
    }

    startGeneral();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <span className="text-4xl animate-bounce inline-block">🎲</span>
            <p className="text-muted-foreground">Loading puzzles...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">General Mode</h2>
        <GameScreen
          sessionId={sessionId}
          sessionType="general"
          puzzles={puzzles}
          onPlayAgain={() => router.refresh()}
        />
      </div>
    </AppShell>
  );
}
