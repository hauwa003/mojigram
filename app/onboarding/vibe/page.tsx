"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PackGrid } from "@/components/packs/PackGrid";
import { SelectedPackPill } from "@/components/packs/SelectedPackPill";
import { saveSelectedPacks } from "@/lib/preferences/selectedPacks";
import type { PuzzlePack } from "@/types/puzzle";

export default function VibeSelectionPage() {
  const router = useRouter();
  const [packs, setPacks] = useState<PuzzlePack[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  function handleToggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleContinue() {
    saveSelectedPacks(selectedIds);
    localStorage.setItem("mojigram_onboarded", "true");
    router.push("/");
  }

  const selectedPacks = packs.filter((p) => selectedIds.includes(p.id));

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <span className="text-4xl animate-bounce">🎨</span>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-4 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-2xl font-bold">
            Choose Your Vibe 🎨
          </h1>
          <p className="text-muted-foreground text-sm">
            Pick the packs you love. You can change these later.
            {selectedIds.length === 0 && " (or skip to play all packs)"}
          </p>
        </div>

        {/* Selected pills */}
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

        <Button
          onClick={handleContinue}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          {selectedIds.length > 0
            ? `Continue with ${selectedIds.length} pack${selectedIds.length > 1 ? "s" : ""}`
            : "Continue with all packs"}
        </Button>
      </div>
    </div>
  );
}
