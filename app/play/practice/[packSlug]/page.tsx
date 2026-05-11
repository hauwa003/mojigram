"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import type { PuzzleForPlay } from "@/types/puzzle";

export default function PracticePackPage() {
  const params = useParams();
  const router = useRouter();
  const packSlug = params.packSlug as string;
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startPractice() {
      try {
        const anonId = createAnonymousId();

        const res = await fetch(`/api/practice?pack=${packSlug}&count=5`);
        if (!res.ok) throw new Error("Failed to load puzzles");
        const data = await res.json();

        const sessionRes = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            anonId,
            sessionType: "practice",
            packSlug,
            puzzleIds: data.puzzles.map((p: PuzzleForPlay) => p.id),
          }),
        });
        const sessionData = await sessionRes.json();

        setPuzzles(data.puzzles);
        setSessionId(sessionData.sessionId);
      } catch {
        // fall back
      } finally {
        setLoading(false);
      }
    }
    startPractice();
  }, [packSlug]);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <span className="text-4xl animate-bounce inline-block">🎯</span>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div>
        <h2 className="font-heading text-xl font-bold mb-2">
          Practice: {packSlug}
        </h2>
        <GameScreen
          sessionId={sessionId}
          sessionType="practice"
          puzzles={puzzles}
          onPlayAgain={() => router.refresh()}
        />
      </div>
    </AppShell>
  );
}
