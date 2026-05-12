"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { LevelPlayScreen } from "@/components/game/LevelPlayScreen";
import { isLevelUnlocked } from "@/lib/game/progressManager";
import type { PuzzleForPlay } from "@/types/puzzle";

type Difficulty = "easy" | "medium" | "hard";

export default function LevelPlayPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const packSlug = params.packSlug as string;
  const levelOrder = parseInt(params.level as string, 10);
  const difficulty = (searchParams.get("difficulty") || "easy") as Difficulty;

  const [puzzle, setPuzzle] = useState<PuzzleForPlay | null>(null);
  const [totalLevels, setTotalLevels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    // Validate unlock status client-side
    if (!isLevelUnlocked(packSlug, difficulty, levelOrder)) {
      router.replace(`/play/levels/${packSlug}`);
      return;
    }

    async function loadLevel() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/levels?pack=${packSlug}&difficulty=${difficulty}&level=${levelOrder}`
        );
        if (!res.ok) throw new Error("Failed to load level");
        const data = await res.json();
        setPuzzle(data.puzzle);
        setTotalLevels(data.totalLevels);
      } catch {
        router.replace(`/play/levels/${packSlug}`);
      } finally {
        setLoading(false);
      }
    }

    loadLevel();
  }, [packSlug, difficulty, levelOrder, router, gameKey]);

  if (loading || !puzzle) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <motion.span
            className="text-4xl inline-block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            🏆
          </motion.span>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <LevelPlayScreen
        key={gameKey}
        puzzle={puzzle}
        packSlug={packSlug}
        difficulty={difficulty}
        levelOrder={levelOrder}
        totalLevels={totalLevels}
        onNextLevel={() => {
          router.push(
            `/play/levels/${packSlug}/${levelOrder + 1}?difficulty=${difficulty}`
          );
        }}
        onRetry={() => {
          setGameKey((k) => k + 1);
        }}
        onBackToLevels={() => {
          router.push(`/play/levels/${packSlug}`);
        }}
      />
    </AppShell>
  );
}
