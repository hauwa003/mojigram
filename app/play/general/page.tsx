"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { DifficultyPicker } from "@/components/levels/DifficultyPicker";
import { Button } from "@/components/ui/button";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { spring } from "@/lib/motion";
import type { PuzzleForPlay } from "@/types/puzzle";

type Difficulty = "easy" | "medium" | "hard";

export default function GeneralPage() {
  const [phase, setPhase] = useState<"pick" | "play">("pick");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);

  const startGame = useCallback(async () => {
    setLoading(true);
    try {
      const anonId = createAnonymousId();

      const res = await fetch(
        `/api/practice?mode=general&count=5&difficulty=${difficulty}`
      );
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
      setPhase("play");
    } catch {
      // Fall back
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  if (phase === "pick") {
    return (
      <AppShell>
        <div className="flex flex-col justify-center min-h-[calc(100dvh-10rem)]">
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-4xl">🎲</span>
              <h2 className="font-heading text-xl font-extrabold mt-2">
                General Mode
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Random puzzles from all packs
              </p>
            </div>

            <DifficultyPicker selected={difficulty} onSelect={setDifficulty} />

            <motion.div
              whileTap={{ scale: 0.97, x: 2, y: 2 }}
              transition={spring.bouncy}
            >
              <Button
                onClick={startGame}
                disabled={loading}
                className="w-full h-12 text-base font-extrabold bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal brutal-press"
              >
                {loading ? "Loading..." : "Start"}
              </Button>
            </motion.div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <motion.span
            className="text-4xl inline-block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            🎲
          </motion.span>
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
          onPlayAgain={() => {
            setPhase("pick");
            setPuzzles([]);
            setSessionId("");
          }}
        />
      </div>
    </AppShell>
  );
}
