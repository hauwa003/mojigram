"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { getSelectedPacks } from "@/lib/preferences/selectedPacks";
import type { PuzzleForPlay } from "@/types/puzzle";

export default function MyMixPage() {
  const router = useRouter();
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startMyMix() {
      try {
        const anonId = createAnonymousId();
        const selectedPacks = getSelectedPacks();

        const res = await fetch("/api/practice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packIds: selectedPacks.length > 0 ? selectedPacks : undefined,
            count: 5,
          }),
        });
        if (!res.ok) throw new Error("Failed to load puzzles");
        const data = await res.json();

        const sessionRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anonId,
            sessionType: "my_mix",
            puzzleIds: data.puzzles.map((p: PuzzleForPlay) => p.id),
          }),
        });
        const sessionData = await sessionRes.json();

        setPuzzles(data.puzzles);
        setSessionId(sessionData.sessionId);
      } catch {
        // Fall back
      } finally {
        setLoading(false);
      }
    }

    startMyMix();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <span className="text-4xl animate-bounce inline-block">🎨</span>
            <p className="text-muted-foreground">Mixing your puzzles...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">My Mix</h2>
        <GameScreen
          sessionId={sessionId}
          sessionType="my_mix"
          puzzles={puzzles}
          onPlayAgain={() => router.refresh()}
        />
      </div>
    </AppShell>
  );
}
