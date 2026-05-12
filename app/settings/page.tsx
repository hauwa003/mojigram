"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout";
import { PackGrid } from "@/components/packs/PackGrid";
import { Button } from "@/components/ui/button";
import { getSelectedPacks, saveSelectedPacks } from "@/lib/preferences/selectedPacks";
import { getNickname, saveNickname } from "@/lib/utils/nickname";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { PuzzlePack } from "@/types/puzzle";

export default function SettingsPage() {
  const [packs, setPacks] = useState<PuzzlePack[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    setSelectedIds(getSelectedPacks());
    setNickname(getNickname() ?? "");

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

  function handleSaveNickname() {
    if (!nickname.trim()) return;
    saveNickname(nickname.trim());
    toast.success("Nickname saved!");
  }

  function handleSave() {
    saveSelectedPacks(selectedIds);
    toast.success("Pack preferences saved!");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your Mojigram experience
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-lg font-bold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Set a nickname for the leaderboard
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter a nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              className="border-3 border-foreground shadow-brutal-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveNickname();
              }}
            />
            <Button
              onClick={handleSaveNickname}
              disabled={!nickname.trim()}
              className="bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal-sm brutal-press font-bold"
            >
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-foreground">
          <h2 className="font-heading text-lg font-bold">
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
            className="w-full bg-primary hover:bg-primary/90 border-3 border-foreground shadow-brutal-sm brutal-press font-bold"
          >
            Save Preferences
          </Button>
        </div>

        <div className="space-y-4 pt-4 border-t-2 border-foreground">
          <h2 className="font-heading text-lg font-bold">About</h2>
          <p className="text-sm text-muted-foreground">
            Mojigram v0.1.0 — Made with 💜 and emojis
          </p>
        </div>
      </div>
    </AppShell>
  );
}
