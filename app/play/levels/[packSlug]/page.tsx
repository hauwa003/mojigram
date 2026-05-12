"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout";
import { DifficultyPicker } from "@/components/levels/DifficultyPicker";
import { LevelGrid } from "@/components/levels/LevelGrid";
import { getProgress, getPackStats } from "@/lib/game/progressManager";
import { spring } from "@/lib/motion";
import type { PuzzlePack } from "@/types/puzzle";

type Difficulty = "easy" | "medium" | "hard";

const levelCounts: Record<Difficulty, number> = { easy: 17, medium: 17, hard: 16 };

export default function PackLevelsPage() {
  const params = useParams();
  const router = useRouter();
  const packSlug = params.packSlug as string;

  const [pack, setPack] = useState<PuzzlePack | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadPack() {
      try {
        const res = await fetch("/api/packs");
        if (!res.ok) return;
        const data = await res.json();
        const found = data.packs.find((p: PuzzlePack) => p.slug === packSlug);
        if (found) setPack(found);
      } catch {
        // silently fail
      }
    }
    loadPack();
  }, [packSlug]);

  // Re-read progress when refreshKey changes (e.g. after navigating back from a level)
  const progress = getProgress();
  const packProgress = progress.packs[packSlug];
  const stats = getPackStats(packSlug);

  const diffProgress = packProgress?.[difficulty];
  const highestUnlocked = diffProgress?.highestUnlocked ?? 1;
  const completedLevels = diffProgress?.completedLevels ?? {};

  // Trigger re-render on focus (when user navigates back)
  useEffect(() => {
    const onFocus = () => setRefreshKey((k) => k + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (!pack) {
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
      <div className="space-y-5" key={refreshKey}>
        {/* Header */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => router.push("/play/levels")}
            className="w-8 h-8 rounded-lg border-2 border-border flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            transition={spring.bouncy}
          >
            <ArrowLeft className="h-4 w-4" />
          </motion.button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{pack.emoji_icon}</span>
            <h2 className="font-heading text-xl font-bold">{pack.name}</h2>
          </div>
        </div>

        {/* Difficulty Picker */}
        <DifficultyPicker
          selected={difficulty}
          onSelect={setDifficulty}
          stats={stats}
        />

        {/* Level Grid */}
        <LevelGrid
          totalLevels={levelCounts[difficulty]}
          highestUnlocked={highestUnlocked}
          completedLevels={completedLevels}
          packColor={pack.color}
          onSelectLevel={(level) =>
            router.push(
              `/play/levels/${packSlug}/${level}?difficulty=${difficulty}`
            )
          }
        />
      </div>
    </AppShell>
  );
}
