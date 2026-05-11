"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout";
import { PackGrid } from "@/components/packs/PackGrid";
import { Button } from "@/components/ui/button";
import { getSelectedPacks, saveSelectedPacks } from "@/lib/preferences/selectedPacks";
import { toast } from "sonner";
import type { PuzzlePack } from "@/types/puzzle";

export default function SettingsPage() {
  const [packs, setPacks] = useState<PuzzlePack[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds(getSelectedPacks());

    async function loadPacks() {
      try {
        const res = await fetch("/api/packs");
        if (!res.ok) return;
        const data = await res.json();
        setPacks(data.packs);
      } catch {
        // silently fail
      }
    }
    loadPacks();
  }, []);

  function handleToggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleSave() {
    saveSelectedPacks(selectedIds);
    toast.success("Pack preferences saved!");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your Mojigram experience
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold">
            My Mix Packs
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose which packs appear in My Mix mode
          </p>
          <PackGrid
            packs={packs}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Save Preferences
          </Button>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="font-heading text-lg font-semibold">About</h2>
          <p className="text-sm text-muted-foreground">
            Mojigram v0.1.0 — Made with 💜 and emojis
          </p>
        </div>
      </div>
    </AppShell>
  );
}
