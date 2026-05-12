"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";
import { getPackStats } from "@/lib/game/progressManager";
import type { PuzzlePack } from "@/types/puzzle";

export default function LevelsPage() {
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
            🏆
          </motion.span>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-xl font-bold">Levels</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a pack and conquer 50 levels
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {packs.map((pack) => {
            const stats = getPackStats(pack.slug);
            return (
              <motion.div key={pack.id} variants={staggerItem}>
                <Link href={`/play/levels/${pack.slug}`}>
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
                          {stats.totalCompleted}/50 completed
                        </p>
                        {stats.totalCompleted > 0 && (
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div
                              className="bg-green rounded-full h-1.5 transition-all"
                              style={{
                                width: `${(stats.totalCompleted / 50) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </AppShell>
  );
}
