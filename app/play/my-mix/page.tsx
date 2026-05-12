"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { GameScreen } from "@/components/game/GameScreen";
import { PackGrid } from "@/components/packs/PackGrid";
import { SelectedPackPill } from "@/components/packs/SelectedPackPill";
import { DifficultyPicker } from "@/components/levels/DifficultyPicker";
import { Button } from "@/components/ui/button";
import { createAnonymousId } from "@/lib/utils/createAnonymousId";
import { getSelectedPacks, saveSelectedPacks } from "@/lib/preferences/selectedPacks";
import { spring } from "@/lib/motion";
import type { PuzzleForPlay } from "@/types/puzzle";
import type { PuzzlePack } from "@/types/puzzle";

type Difficulty = "easy" | "medium" | "hard";

export default function MyMixPage() {
  const [phase, setPhase] = useState<"pick" | "play">("pick");
  const [packs, setPacks] = useState<PuzzlePack[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [puzzles, setPuzzles] = useState<PuzzleForPlay[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [loadingPacks, setLoadingPacks] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    async function loadPacks() {
      try {
        const res = await fetch("/api/packs");
        if (!res.ok) return;
        const data = await res.json();
        setPacks(data.packs);
        const saved = getSelectedPacks();
        if (saved.length > 0) setSelectedIds(saved);
      } catch {
        // silently fail
      } finally {
        setLoadingPacks(false);
      }
    }
    loadPacks();
  }, []);

  function handleToggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  const startGame = useCallback(async () => {
    setStarting(true);
    try {
      const anonId = createAnonymousId();
      saveSelectedPacks(selectedIds);

      const res = await fetch("/api/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packIds: selectedIds.length > 0 ? selectedIds : undefined,
          count: 5,
          difficulty,
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
      setPhase("play");
    } catch {
      // fall back
    } finally {
      setStarting(false);
    }
  }, [selectedIds, difficulty]);

  const selectedPacks = packs.filter((p) => selectedIds.includes(p.id));

  if (loadingPacks) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <motion.span
            className="text-4xl inline-block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            🎨
          </motion.span>
        </div>
      </AppShell>
    );
  }

  if (phase === "pick") {
    return (
      <AppShell>
        <div className="space-y-5">
          <div>
            <h2 className="font-heading text-xl font-extrabold">My Mix 🎨</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pick packs and difficulty, then hit start
            </p>
          </div>

          <DifficultyPicker selected={difficulty} onSelect={setDifficulty} />

          {selectedPacks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedPacks.map((pack) => (
                <SelectedPackPill
                  key={pack.id}
                  name={pack.name}
                  emoji_icon={pack.emoji_icon}
                  onRemove={() => handleToggle(pack.id)}
                />
              ))}
            </div>
          )}

          <PackGrid
            packs={packs}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />

          <motion.div whileTap={{ scale: 0.97, x: 2, y: 2 }} transition={spring.bouncy}>
            <Button
              onClick={startGame}
              disabled={starting}
              className="w-full h-12 text-base font-extrabold bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal brutal-press"
            >
              {starting
                ? "Mixing..."
                : selectedIds.length > 0
                ? `Start with ${selectedIds.length} pack${selectedIds.length > 1 ? "s" : ""}`
                : "Start with all packs"}
            </Button>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div>
        <h2 className="font-heading text-xl font-extrabold mb-2">My Mix</h2>
        <GameScreen
          sessionId={sessionId}
          sessionType="my_mix"
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
