"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { spring } from "@/lib/motion";
import type { PuzzlePack } from "@/types/puzzle";

export default function PracticePage() {
  const [packs, setPacks] = useState<PuzzlePack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPacks() {
      try {
        const res = await fetch("/api/packs");
        if (!res.ok) throw new Error("Failed to load packs");
        const data = await res.json();
        setPacks(data.packs);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadPacks();
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-20">
          <motion.span
            className="text-4xl inline-block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            🎯
          </motion.span>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-xl font-bold">Practice Mode</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a pack and practice at your own pace
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {packs.map((pack) => (
            <Link key={pack.id} href={`/play/practice/${pack.slug}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={spring.bouncy}
              >
                <Card className="hover:shadow-md transition-shadow h-full border border-border">
                  <CardContent className="p-4 text-center space-y-2">
                    <span className="text-3xl">{pack.emoji_icon}</span>
                    <h3 className="font-heading text-sm font-bold">
                      {pack.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {pack.puzzle_count} puzzles
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
