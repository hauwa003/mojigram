"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
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
          <span className="text-4xl animate-bounce inline-block">🎯</span>
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
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
